package recoeve.http;



import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.BiConsumer;
import java.util.function.Function;

import org.openqa.selenium.By;
import org.openqa.selenium.InvalidElementStateException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.NoSuchSessionException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Context;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;
import recoeve.db.FileMap;
import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class RecoeveWebClient extends AbstractVerticle {
	public static final WebClientOptions options = new WebClientOptions()
			.setMaxHeaderSize(20000)
			.setFollowRedirects(true);
	public static final int DEFAULT_MAX_DRIVERS = 5;
	public static final int UNTIL_TOP = 20;
	public static final Map<String, String> hostCSSMap;
	static {
		hostCSSMap = new HashMap<>(10);
		hostCSSMap.put("blog.naver.com", ".se-fs-, .se-ff-");
		hostCSSMap.put("m.blog.naver.com", ".se-fs-, .se-ff-");
		hostCSSMap.put("apod.nasa.gov", "center>b:first-child");
	}

	public final Vertx vertx;
	public final Context context;
	public RecoeveDB db;
	public WebClient webClient;
	public long[] pID = {0, 0, 0};
	public long timeoutMilliSecs = 7000L;
	public long findPerMilliSecs = 500L;
	public ChromeOptions chromeOptions;
	// public EdgeOptions edgeOptions;
	public int maxDrivers;
	private ConcurrentLinkedQueue<TimestampedDriver> driverPool;
	private final long driverTimeout = 300000; // 5 minutes in milliseconds

	public RecoeveWebClient(Vertx vertx, Context context, RecoeveDB db) {
		this.vertx = vertx;
		this.context = context;
		this.db = db;
		webClient = WebClient.create(vertx, options);
		// System.setProperty("webdriver.edge.driver", FileMap.preFilePath + "/Recoeve/webdriver/msedgedriver.exe");
		// edgeOptions = new EdgeOptions();
		// edgeOptions.setBinary(FileMap.preFilePath + "/Recoeve/webdriver/msedgedriver.exe");
		// edgeOptions.addArguments("--headless", "--remote-allow-origins=*");
		System.setProperty("webdriver.chrome.driver", FileMap.preFilePath + "/Recoeve/webdriver/chrome-headless-shell.exe");
		chromeOptions = new ChromeOptions();
		chromeOptions.setBinary(FileMap.preFilePath + "/Recoeve/webdriver/chrome-headless-shell.exe");
		chromeOptions.addArguments("--headless=new", "--disable-gpu", "--remote-allow-origins=*", "--no-sandbox", "--disable-dev-shm-usage");
	}

	@Override
	public void start(Promise<Void> startPromise) {
		maxDrivers = context.config().getInteger("maxDrivers", DEFAULT_MAX_DRIVERS);
		driverPool = new ConcurrentLinkedQueue<>();
		startPromise.complete();
	}

	private static class TimestampedDriver {
		final WebDriver driver;
		final long timestamp;

		TimestampedDriver(WebDriver driver, long timestamp) {
			this.driver = driver;
			this.timestamp = timestamp;
		}
	}

	private WebDriver getDriver() {
		TimestampedDriver timestampedDriver;
		while ((timestampedDriver = driverPool.poll()) != null) {
			if (System.currentTimeMillis() - timestampedDriver.timestamp > driverTimeout) {
				quitDriver(timestampedDriver.driver);
			} else {
				return timestampedDriver.driver;
			}
		}

		if (driverPool.size() < maxDrivers) {
			try {
				return new ChromeDriver(chromeOptions);
			} catch (Exception err) {
				System.out.println("Failed to create new WebDriver: " + err);
			}
		}
		return new ChromeDriver(chromeOptions);
	}

	private void quitDriver(WebDriver driver) {
		try {
			driver.quit();
		} catch (Exception e) {
			System.out.println("Error quitting WebDriver: " + e);
		}
	}

	private synchronized void releaseDriver(WebDriver driver) {
		if (driver != null) {
			if (driverPool.size() < maxDrivers) {
				driverPool.offer(new TimestampedDriver(driver, System.currentTimeMillis()));
			} else {
				quitDriver(driver);
			}
		}
	}

	public void cleanupDrivers() {
		TimestampedDriver timestampedDriver;
		while ((timestampedDriver = driverPool.poll()) != null) {
			quitDriver(timestampedDriver.driver);
		}
	}

	public CompletableFuture<String> redirected(String originalURI) {
		CompletableFuture<String> completableFuture = new CompletableFuture<>();
		try {
			webClient.headAbs(originalURI)
				.send()
				.onSuccess(response -> {
					if (response.statusCode() >= 200 && response.statusCode() < 300) {
						List<String> followedURIs = response.followedRedirects();
						if (!followedURIs.isEmpty()) {
							String fullURI = followedURIs.get(followedURIs.size() - 1);
							System.out.println("The last redirected URL: " + fullURI);
							completableFuture.complete(fullURI);
						}
					}
				})
				.onFailure(throwable -> {
					System.out.println("Sended originalURI.: " + throwable.getMessage());
					completableFuture.complete(originalURI);
				});
		}
		catch (VertxException err) {
			RecoeveDB.err(err);
			completableFuture.completeExceptionally(err);
		}
		return completableFuture;
	}

	public CompletableFuture<String> asyncFindTitle(WebDriver chromeDriver, String cssSelector) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();
		if (cssSelector == null) {
			cfElements.complete("Error: cssSelector is null.");
			return cfElements;
		}

		pID[0] = vertx.setPeriodic(findPerMilliSecs, id -> {
			try {
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector(cssSelector));
				if (elements != null && !elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					boolean someIsNotEmpty = false;
					for (int i = 0; i < Math.min(UNTIL_TOP, elements.size()); i++) {
						String text = elements.get(i).getText().replaceAll("\\s", " ").trim();
						if (!text.isEmpty()) {
							someIsNotEmpty = true;
							sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
						}
					}
					if (someIsNotEmpty) {
						vertx.cancelTimer(pID[0]);
						cfElements.complete(sb.toString());
					}
				}
			} catch (NoSuchElementException
				| StaleElementReferenceException
				| InvalidElementStateException
				| VertxException err) {
				System.out.println(err);
			}
		});

		vertx.setTimer(timeoutMilliSecs, id -> {
			vertx.cancelTimer(pID[0]);
			cfElements.complete("\nError: timeout " + timeoutMilliSecs+"ms.");
		});

		return cfElements;
	}

	public CompletableFuture<String> asyncFindTitleUntilEveryIsFound(WebDriver chromeDriver, String cssSelector) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();
		if (cssSelector == null) {
			cfElements.complete("Error: cssSelector is null.");
			return cfElements;
		}

		pID[0] = vertx.setPeriodic(findPerMilliSecs, id -> {
			try {
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector(cssSelector));
				if (elements != null && !elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < Math.min(UNTIL_TOP, elements.size()); i++) {
						String text = elements.get(i).getText();
						if (text.isEmpty()) {
							return;
						}
						sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
					}
					vertx.cancelTimer(pID[0]);
					cfElements.complete(sb.toString());
				}
			} catch (NoSuchElementException
				| StaleElementReferenceException
				| InvalidElementStateException
				| VertxException err) {
				System.out.println(err);
			}
		});

		vertx.setTimer(timeoutMilliSecs, id -> {
			vertx.cancelTimer(pID[0]);
			List<WebElement> elements = chromeDriver.findElements(By.cssSelector(cssSelector));
			if (elements != null && !elements.isEmpty()) {
				StringBuilder sb = new StringBuilder();
				for (int i = 0; i < Math.min(UNTIL_TOP, elements.size()); i++) {
					String text = elements.get(i).getText().replaceAll("\\s", " ").trim();
					if (!text.isEmpty()) {
						sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
					}
				}
				cfElements.complete(sb.toString());
			}
			else {
				cfElements.complete("\nError: timeout " + timeoutMilliSecs+"ms.");
			}
		});

		return cfElements;
	}

	public void findTitles(String uri, String uriHost, HttpServerResponse resp) {
		resp.putHeader("Content-Type", "text/plain; charset=utf-8")
				.setChunked(true);
		resp.write("\nuri\t" + StrArray.enclose(uri));

		String conciseURI = null;
		if (RecoeveDB.getutf8mb4Length(uri) > 255) {
			conciseURI = db.getConciseURI(uri);
		}
		if (conciseURI != null) {
			resp.write("\nconciseURI\t" + StrArray.enclose(conciseURI));
		}

		Function<String, String> applyFn = (result) -> {
			return result;
		};

		try {
			WebDriver chromeDriver = getDriver();
			chromeDriver.get("https://recoeve.net/CDN/empty.html");
			chromeDriver.get((new URI(uri.trim())).toString());
			CompletableFuture<String> findTitle = asyncFindTitle(chromeDriver, "title, h1, h2")
					.thenApply(applyFn);
			CompletableFuture<String> findHostSpecific = asyncFindTitle(chromeDriver, hostCSSMap.get(uriHost))
					.thenApply(applyFn);

			CompletableFuture<String> findTitleUntil = asyncFindTitleUntilEveryIsFound(chromeDriver, "title, h1, h2")
					.thenApply(applyFn);
			CompletableFuture<String> findHostSpecificUntil = asyncFindTitleUntilEveryIsFound(chromeDriver, hostCSSMap.get(uriHost))
					.thenApply(applyFn);

			CompletableFuture<Void> allOf = CompletableFuture.allOf(findTitle, findHostSpecific, findTitleUntil, findHostSpecificUntil);

			BiConsumer<String, Throwable> writeChunk = (result, error) -> {
				if (error == null) {
					try {
						result = result.trim();
						if (result.isEmpty()) {
							result = "\nError: Empty result.";
							System.out.println(result);
						}
						resp.write(result, Recoeve.ENCODING);
					} catch (Exception e) {
						result = "\nError: writing chunk: " + e.getMessage();
						System.err.println(result);
						resp.write(result, Recoeve.ENCODING);
					}
				} else {
					result = "\nError: in future: " + error.getMessage();
					System.err.println(result);
					resp.write(result, Recoeve.ENCODING);
				}
			};

			findTitle.whenComplete(writeChunk);
			findHostSpecific.whenComplete(writeChunk);

			findTitleUntil.whenComplete(writeChunk);
			findHostSpecificUntil.whenComplete(writeChunk);

			allOf.whenComplete((v, error) -> {
				String errorMsg = "";
				if (error != null) {
					errorMsg = "\nError in futures: " + error.getMessage();
					System.err.println(errorMsg);
				}
				if (!resp.ended()) {
					resp.end(errorMsg);
				}
				releaseDriver(chromeDriver);
			});
		}
		catch (NoSuchSessionException e) {
			resp.end("\nError: No valid session. Please try again.");
		}
		catch (Exception e) {
			resp.end("\nError: " + e.getMessage());
		}
	}

	@Override
	public void stop(Promise<Void> stopPromise) {
		cleanupDrivers();
		stopPromise.complete();
	}

	public static void main(String... args) {
		// Do nothing.
	}
}
