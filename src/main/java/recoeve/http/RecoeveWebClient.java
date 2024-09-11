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
import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class RecoeveWebClient extends AbstractVerticle {
	public static final WebClientOptions options = new WebClientOptions()
			.setMaxHeaderSize(20000)
			.setFollowRedirects(true);
	public static final int MIN_PORT = 50000;
	public static final int MAX_PORT = 60000;
	public static final int DEFAULT_MAX_DRIVERS = 8;
	public static final int UNTIL_TOP = 10;
	public static final Map<String, String> hostCSSMap;
	static {
		hostCSSMap = new HashMap<>(20);
		hostCSSMap.put("blog.naver.com", ".se-fs-, .se-ff-, .htitle");
		hostCSSMap.put("m.blog.naver.com", ".se-fs-, .se-ff-, h3.tit_h3");
		hostCSSMap.put("apod.nasa.gov", "center>b:first-child");
		hostCSSMap.put("www.codeit.kr", "#header p:first-child");
		hostCSSMap.put("codeit.kr", "#header p:first-child");
		hostCSSMap.put("www.instagram.com", "section main article h1");
		hostCSSMap.put("instagram.com", "section main article h1");
	}

	public RecoeveDB db;
	public WebClient webClient;
	public long[] pID = {0, 0, 0};
	public long timeoutMilliSecs = 4000L;
	public long findPerMilliSecs = 500L;
	public ChromeOptions curChromeOptions;
	public int maxDrivers;
	private final ConcurrentLinkedQueue<TimestampedDriver> driverPool;
	public final long driverTimeout = 600000; // 10 minutes in milliseconds
	public final int RECURSE_MAX = 10;
	public int recurseCount;
	public int curPort;

	public RecoeveWebClient(Vertx vertx, Context context, RecoeveDB db) {
		this.vertx = vertx;
		this.context = context;
		this.db = db;
		curPort = MIN_PORT;
		webClient = WebClient.create(vertx, options);
		maxDrivers = context.config().getInteger("maxDrivers", DEFAULT_MAX_DRIVERS);
		driverPool = new ConcurrentLinkedQueue<>();
		recurseCount = 0;
	}

	@Override
	public void start(Promise<Void> startPromise) {
	}

	private static class TimestampedDriver {
		public final WebDriver driver;
		public final long timestamp;

		public TimestampedDriver(WebDriver driver, long timestamp) {
			this.driver = driver;
			this.timestamp = timestamp;
		}
	}

	private WebDriver getDriver() throws RuntimeException {
		recurseCount++;
		if (recurseCount >= RECURSE_MAX) {
			recurseCount = 0;
			throw new RuntimeException("\nError: Too many recursive!");
		}
		TimestampedDriver timestampedDriver;
		while ((timestampedDriver = driverPool.poll()) != null) {
			if (System.currentTimeMillis() - timestampedDriver.timestamp > driverTimeout) {
				closeDriver(timestampedDriver.driver);
			} else {
				recurseCount = 0;
				return timestampedDriver.driver;
			}
		}

		if (driverPool.size() < maxDrivers) {
			try {
				curChromeOptions = new ChromeOptions();
				curChromeOptions.addArguments("--window-size=365,667", "--disable-notifications", "--headless=new", "--remote-debugging-pipe", "--remote-allow-origins=*", "--no-sandbox", "--disable-dev-shm-usage", "--port=" + curPort);
				curChromeOptions.setAcceptInsecureCerts(true);
				curChromeOptions.setBrowserVersion("128.0.6613.114");
				curChromeOptions.setExperimentalOption("detach", true);
				curPort++;
				if (curPort > MAX_PORT) { curPort = MIN_PORT; }
				driverPool.add(new TimestampedDriver(new ChromeDriver(curChromeOptions), System.currentTimeMillis()));
			}
			catch (RuntimeException err) {
				System.out.println(err.getMessage());
			}
			catch (Exception err) {
				System.out.println("Failed to create new WebDriver: " + err);
			}
		}
		else {
			cleanupDrivers();
			curChromeOptions = new ChromeOptions();
			curChromeOptions.addArguments("--window-size=365,667", "--disable-notifications", "--headless=new", "--remote-debugging-pipe", "--remote-allow-origins=*", "--no-sandbox", "--disable-dev-shm-usage", "--port=" + curPort);
			curChromeOptions.setAcceptInsecureCerts(true);
			curChromeOptions.setBrowserVersion("128.0.6613.114");
			curChromeOptions.setExperimentalOption("detach", true);
			curPort++;
			if (curPort > MAX_PORT) { curPort = MIN_PORT; }
			driverPool.add(new TimestampedDriver(new ChromeDriver(curChromeOptions), System.currentTimeMillis()));
		}
		while ((timestampedDriver = driverPool.poll()) != null) {
			if (System.currentTimeMillis() - timestampedDriver.timestamp > driverTimeout) {
				closeDriver(timestampedDriver.driver);
			} else {
				recurseCount = 0;
				return timestampedDriver.driver;
			}
		}
		curChromeOptions = new ChromeOptions();
		curChromeOptions.addArguments("--window-size=365,667", "--disable-notifications", "--headless=new", "--remote-debugging-pipe", "--remote-allow-origins=*", "--no-sandbox", "--disable-dev-shm-usage", "--port=" + curPort);
		curChromeOptions.setAcceptInsecureCerts(true);
		curChromeOptions.setBrowserVersion("128.0.6613.114");
		curChromeOptions.setExperimentalOption("detach", true);
		curPort++;
		if (curPort > MAX_PORT) { curPort = MIN_PORT; }
		WebDriver webDriver = new ChromeDriver(curChromeOptions);
		return webDriver;
	}

	private void closeDriver(WebDriver driver) {
		try {
			if (driver != null) { driver.close(); }
		}
		catch (Exception e) {
			System.out.println("Error closing WebDriver: " + e.getMessage());
		}
	}

	private synchronized void releaseOrOfferDriver(WebDriver driver) {
		if (driver != null) {
			if (driverPool.size() < maxDrivers) {
				driverPool.offer(new TimestampedDriver(driver, System.currentTimeMillis())); // * offer(E e) : Inserts the specified element at the tail of this queue.
			} else {
				closeDriver(driver);
			}
		}
		else {
			if (driverPool.size() < maxDrivers) {
				curChromeOptions = new ChromeOptions();
				curChromeOptions.addArguments("--window-size=365,667", "--disable-notifications", "--headless=new", "--remote-debugging-pipe", "--remote-allow-origins=*", "--no-sandbox", "--disable-dev-shm-usage", "--port=" + curPort);
				curChromeOptions.setAcceptInsecureCerts(true);
				curChromeOptions.setBrowserVersion("128.0.6613.114");
				curChromeOptions.setExperimentalOption("detach", true);
				curPort++;
				if (curPort > MAX_PORT) { curPort = MIN_PORT; }
				driver = new ChromeDriver(curChromeOptions);
				driverPool.offer(new TimestampedDriver(driver, System.currentTimeMillis())); // * offer(E e) : Inserts the specified element at the tail of this queue.
			}
		}
	}

	public void cleanupDrivers() {
		TimestampedDriver timestampedDriver;
		while ((timestampedDriver = driverPool.poll()) != null) {
			closeDriver(timestampedDriver.driver);
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
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is null."));
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
			}
			catch (NoSuchSessionException err) {
				closeDriver(chromeDriver);
				System.out.println(err);
				cfElements.completeExceptionally(new NoSuchSessionException("\nError: No valid session. Please try again.: " + err.getMessage()));
			}
			catch (NoSuchElementException
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

	public CompletableFuture<String> asyncFindTitleUntilEveryIsFound(WebDriver chromeDriver, String cssSelector) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();
		if (cssSelector == null) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is null."));
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
			}
			catch (NoSuchSessionException err) {
				closeDriver(chromeDriver);
				System.out.println(err);
				cfElements.completeExceptionally(new NoSuchSessionException("\nError: No valid session. Please try again.: " + err.getMessage()));
			}
			catch (NoSuchElementException
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

		final WebDriver[] chromeDriver = new WebDriver[]{ getDriver() };
		try {
			if (chromeDriver[0] == null) {
				if (!resp.ended()) {
					resp.end("Error: null WebDriver.");
				}
				releaseOrOfferDriver(chromeDriver[0]);
				return;
			}
			vertx.setTimer(200, id -> {
				try {
					chromeDriver[0].get((new URI(uri.trim())).toString());
					CompletableFuture<String> findTitle = asyncFindTitle(chromeDriver[0], "title, h1, h2")
							.thenApply(applyFn);
					CompletableFuture<String> findHostSpecific = asyncFindTitle(chromeDriver[0], hostCSSMap.get(uriHost))
							.thenApply(applyFn);

					CompletableFuture<String> findTitleUntil = asyncFindTitleUntilEveryIsFound(chromeDriver[0], "title, h1, h2")
							.thenApply(applyFn);
					CompletableFuture<String> findHostSpecificUntil = asyncFindTitleUntilEveryIsFound(chromeDriver[0], hostCSSMap.get(uriHost))
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
							}
							catch (Exception e) {
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
						releaseOrOfferDriver(chromeDriver[0]);
					});
				}
				catch (NoSuchSessionException e) {
					closeDriver(chromeDriver[0]);
					System.out.println("Closed chromeDriver\nNoSuchSessionException: " + e.getMessage());
					resp.end("\nError: No valid session. Please try again.: " + e.getMessage());
				}
				catch (Exception e) {
					closeDriver(chromeDriver[0]);
					resp.end("\nError: " + e.getMessage());
				}
			});
		}
		catch (NoSuchSessionException e) {
			closeDriver(chromeDriver[0]);
			System.out.println("Closed chromeDriver\nNoSuchSessionException: " + e.getMessage());
			resp.end("\nError: No valid session. Please try again.: " + e.getMessage());
		}
		catch (RuntimeException e) {
			closeDriver(chromeDriver[0]);
			System.out.println("Closed chromeDriver\nRuntimeException: " + e.getMessage());
			resp.end("\nError: RuntimeException: " + e.getMessage());
		}
		catch (Exception e) {
			closeDriver(chromeDriver[0]);
			System.out.println("Closed chromeDriver\nException: " + e.getMessage());
			resp.end("\nError: Exception: " + e.getMessage());
		}
	}

	@Override
	public void stop(Promise<Void> stopPromise) {
		cleanupDrivers();
	}

	public static void main(String... args) {
		MainVerticle verticle = new MainVerticle();
		try {
			verticle.start();
			verticle.getVertx().setTimer(10, id -> {
				WebDriver chromeDriver = verticle.recoeveWebClient.getDriver();
				chromeDriver.get("https://www.youtube.com/watch?v=1MhugHxbhGE");
				try {
					verticle.recoeveWebClient.asyncFindTitle(chromeDriver, "h1")
							.thenAccept(result -> {
								System.out.println(result);
							});
				}
				catch (Exception err0) {
					System.out.println("Error: " + err0.getMessage());
				}
			});
		}
		catch (Exception err) {
			System.out.println("Error: " + err.getMessage());
		}
	}
}
