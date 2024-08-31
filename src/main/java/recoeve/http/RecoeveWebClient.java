package recoeve.http;



import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.InvalidElementStateException;
import org.openqa.selenium.NoSuchSessionException;

import recoeve.db.FileMap;
import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class RecoeveWebClient extends AbstractVerticle {
	public static final WebClientOptions options = new WebClientOptions()
			.setMaxHeaderSize(20000)
			.setFollowRedirects(true);
	private static final int DEFAULT_MAX_DRIVERS = 5;
	private static final int UNTIL_TOP = 20;
	public static final Map<String, String> hostCSSMap;
	static {
		hostCSSMap = new HashMap<String, String>(10);
		hostCSSMap.put("blog.naver.com", ".se-fs-, .se-ff-");
		hostCSSMap.put("m.blog.naver.com", ".se-fs-, .se-ff-");
		hostCSSMap.put("apod.nasa.gov", "center>b:first-child");
		System.setProperty("webdriver.chrome.driver", FileMap.preFilePath + "/Recoeve/chromedriver-win64/chromedriver.exe");
	}

	private final Vertx vertx;
	private final RecoeveDB db;
	private final WebClient webClient;
	private final long[] pID = {0, 0, 0};
	private final long timeoutMilliSecs = 7000L;
	private final long findPerMilliSecs = 500L;
	private final ChromeOptions chromeOptions;
	private ConcurrentLinkedQueue<WebDriver> driverPool;
	private int maxDrivers;

	public RecoeveWebClient(Vertx vertx, RecoeveDB db) {
		this.vertx = vertx;
		this.db = db;
		webClient = WebClient.create(vertx, options);
		chromeOptions = new ChromeOptions();
		chromeOptions.addArguments("--headless=new");
		chromeOptions.addArguments("--remote-allow-origins=*");
	}

	@Override
	public void start(Promise<Void> startPromise) {
		maxDrivers = config().getInteger("maxDrivers", DEFAULT_MAX_DRIVERS);
		driverPool = new ConcurrentLinkedQueue<>();
		startPromise.complete();
	}

	private WebDriver getDriver() {
		WebDriver driver = driverPool.poll();
		if (driver == null && driverPool.size() < maxDrivers) {
			driver = new ChromeDriver(chromeOptions);
		}
		return driver;
	}

	private void releaseDriver(WebDriver driver) {
		if (driverPool.size() < maxDrivers) {
			driverPool.offer(driver);
		} else {
			driver.quit();
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
						if (followedURIs.size() > 0) {
							String fullURI = followedURIs.get(followedURIs.size() - 1);
							System.out.println("The last redirected URL: " + fullURI);
							completableFuture.complete(fullURI);
						}
					}
				})
				.onFailure(throwable -> {
					throwable.printStackTrace();
					System.out.println("Sended originalURI.");
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
							sb.append("\n" + cssSelector+"-"+i + "\t" + StrArray.enclose(text));
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
						sb.append("\n" + cssSelector+"-"+i + "\t" + StrArray.enclose(text));
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
						sb.append("\n" + cssSelector+"-"+i + "\t" + StrArray.enclose(text));
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
			chromeDriver.get(uri);
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

	public static void main(String... args) {
		// Do nothing.
	}
}
