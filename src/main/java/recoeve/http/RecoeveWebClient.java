package recoeve.http;



import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.BiConsumer;

import org.openqa.selenium.By;
import org.openqa.selenium.InvalidElementStateException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.NoSuchSessionException;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.UnexpectedAlertBehaviour;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.chromium.ChromiumDriverLogLevel;

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
	public static final int MAX_PORT = 51000;
	public static final int DEFAULT_MAX_DRIVERS = 2;
	public static final long EXPIRES_IN_MS = 210L * 24L * 60L * 60L * 1000L;
		// * 210 days in milliseconds
	public static final long TIMEOUT_MS = 7200L;
	public static final long FIND_PER_MS = 500L;
	public static final long TIMEOUT_DRIVER = 600000;
		// * 10 minutes in milliseconds
	public static final int RECURSE_MAX = 10;
	public static final ChromeDriverService service = new ChromeDriverService.Builder().withLogOutput(System.out).withLogLevel(ChromiumDriverLogLevel.DEBUG).withAppendLog(true).withReadableTimestamp(true).build();
	public static final String EMPTY_URL = "https://tistory1.daumcdn.net/tistory/1468360/skin/images/empty.html";
		// = "https://recoeve.net/CDN/empty.html"
	public static final Map<String, String> HOST_TO_CSS;
	static {
		HOST_TO_CSS = new HashMap<>(20);
		HOST_TO_CSS.put("www.youtube.com", "title,h1,h2");
		HOST_TO_CSS.put("blog.naver.com", ".se-fs-,.se-ff-,.htitle");
		HOST_TO_CSS.put("m.blog.naver.com", ".se-fs-,.se-ff-,h3.tit_h3");
		HOST_TO_CSS.put("apod.nasa.gov", "center>b:first-child");
		HOST_TO_CSS.put("www.codeit.kr", "title,#header p:first-child");
		HOST_TO_CSS.put("codeit.kr", "title,#header p:first-child");
		HOST_TO_CSS.put("www.instagram.com", "h1");
		HOST_TO_CSS.put("instagram.com", "h1");
		HOST_TO_CSS.put("www.tiktok.com", "h1[data-e2e]");
		HOST_TO_CSS.put("tiktok.com", "h1[data-e2e]");
	}

	public RecoeveDB db;
	public WebClient[] webClient;
	public int curWebClientI;
	public long[] pID = {0, 0};
	public int maxDrivers;
	private final ConcurrentLinkedQueue<WebDriver> driverPool;
	public int recurseCount;
	public int curPort;

	public RecoeveWebClient(Vertx vertx, Context context, RecoeveDB db) {
		this.vertx = vertx;
		this.context = context;
		this.db = db;
		webClient = new WebClient[]{ WebClient.create(vertx, options), WebClient.create(vertx, options) };
		curWebClientI = -1;
		maxDrivers = context.config().getInteger("maxDrivers", DEFAULT_MAX_DRIVERS);
		driverPool = new ConcurrentLinkedQueue<>();
		recurseCount = 0;
		curPort = MIN_PORT + (int)((MAX_PORT - MIN_PORT) * Math.random());
	}

	@Override
	public void start(Promise<Void> startPromise) {
		startPromise.complete();
	}

	@Override
	public void stop(Promise<Void> stopPromise) {
		cleanupDrivers();
		stopPromise.complete();
	}

	private synchronized void releaseOrOfferDriver(WebDriver driver) {
		try {
			if (driver != null) {
				if (driverPool.size() < maxDrivers) {
					driver.get(EMPTY_URL);
					driver.getTitle();
						// * Attempt to get the title of the current page. If no exception is thrown, the WebDriver is still active.
					driverPool.offer(driver);
						// * offer(E e) : Inserts the specified element at the tail of this queue.
					System.out.println("\ndriverPool.offer(driver);");
				}
				else {
					closeDriver(driver);
					System.out.println("\ncloseDriver(driver);");
				}
			}
			else {
				if (driverPool.size() < maxDrivers) {
					driver = new ChromeDriver(getChromeOptions());
					driverPool.offer(driver);
						// * offer(E e) : Inserts the specified element at the tail of this queue.
					System.out.println("\ndriverPool.offer(driver);");
				}
			}
		}
		catch (Exception err) {
			System.out.println("\nThe WebDriver is dead.");
			if (driver != null) {
				driver.quit();
			}
			driver = new ChromeDriver(getChromeOptions());
			driverPool.offer(driver);
				// * offer(E e) : Inserts the specified element at the tail of this queue.
			System.out.println("\ndriverPool.offer(driver);");
		}
	}

	private synchronized void closeDriver(WebDriver driver) {
		try {
			if (driver != null) {
				driver.get(EMPTY_URL);
				driver.getTitle();
					// * Attempt to get the title of the current page. If no exception is thrown, the WebDriver is still active.
				driver.close();
			}
		}
		catch (NoSuchSessionException e) {
			System.out.println("\nError: NoSuchSessionException: " + e.getMessage());
			driver.quit();
			System.out.println("\ndriver.quit();");
		}
		catch (Exception e) {
			System.out.println("\nError: closing WebDriver: " + e.getMessage());
			if (driver != null) {
				driver.quit();
				System.out.println("\ndriver.quit();");
			}
		}
	}

	public synchronized void cleanupDrivers() {
		WebDriver driver;
		while ((driver = driverPool.poll()) != null) {
			closeDriver(driver);
		}
		if (driver != null) {
			driver.quit();
		}
	}

	private WebDriver getDriver() throws Exception {
		recurseCount++;
		if (recurseCount >= RECURSE_MAX) {
			recurseCount = 0;
			throw new RuntimeException("\nError: Too many recursive!");
		}
		WebDriver driver;
		while ((driver = driverPool.poll()) != null) {
			recurseCount = 0;
			driver.get(EMPTY_URL);
			driver.getTitle();
				// * Attempt to get the title of the current page. If no exception is thrown, the WebDriver is still active.
			return driver;
		}

		if (driverPool.size() < maxDrivers) {
			try {
				driverPool.add(new ChromeDriver(getChromeOptions()));
			}
			catch (Exception err) {
				System.out.println("\nError: Failed to create new WebDriver: " + err.getMessage());
			}
		}
		else {
			cleanupDrivers();
			driverPool.add(new ChromeDriver(getChromeOptions()));
		}

		while ((driver = driverPool.poll()) != null) {
			recurseCount = 0;
			driver.get(EMPTY_URL);
			driver.getTitle();
				// * Attempt to get the title of the current page. If no exception is thrown, the WebDriver is still active.
			return driver;
		}
		// WebDriver webDriver = new ChromeDriver(getChromeOptions());
		// return webDriver;
			// ! No new WebDriver. WebDriver number must be controlled by driverPool.
		return null;
	}

	private synchronized ChromeOptions getChromeOptions() {
		ChromeOptions chromeOptions = new ChromeOptions();
		chromeOptions.addArguments(
			"--headless=new",
			"--disable-web-security",
			"--allow-running-insecure-content",
			// "--blink-settings=imagesEnabled=false", // For TikTok, disabled.
			"--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
			"--disable-software-rasterizer",
			"--disable-blink-features",
			"--window-size=1920,1080",
			"--window-position=-5000,-5000",
			"--disable-gpu",
			"--disable-notifications",
			"--ignore-certificate-errors",
			"--remote-allow-origins=*",
			"--no-sandbox",
			"--disable-dev-shm-usage",
			"--port=" + curPort
		);
		// chromeOptions.setBrowserVersion("latest");
		chromeOptions.setPageLoadStrategy(PageLoadStrategy.EAGER);
		chromeOptions.setAcceptInsecureCerts(true);
		// Duration duration = Duration.of(5, ChronoUnit.SECONDS);
		// chromeOptions.setScriptTimeout(duration);
		// chromeOptions.setPageLoadTimeout(duration);
		// chromeOptions.setImplicitWaitTimeout(duration);
		chromeOptions.setUnhandledPromptBehaviour(UnexpectedAlertBehaviour.DISMISS_AND_NOTIFY);
		curPort++;
		if (curPort > MAX_PORT) { curPort = MIN_PORT; }
		return chromeOptions;
	}

	public CompletableFuture<String> redirected(String originalURI) {
		CompletableFuture<String> cf = new CompletableFuture<>();
		try {
			curWebClientI++;
			curWebClientI %= DEFAULT_MAX_DRIVERS;
			webClient[curWebClientI].headAbs(originalURI)
				.send()
				.onSuccess(response -> {
					if (response.statusCode() >= 200 && response.statusCode() < 400) {
						List<String> followedURIs = response.followedRedirects();
						if (!followedURIs.isEmpty()) {
							String fullURI = followedURIs.get(followedURIs.size() - 1);
							System.out.println("The last redirected URL: " + fullURI);
							cf.complete(fullURI);
						}
						else {
							System.out.println("Sended originalURI because of No followedURIs.");
							cf.complete(originalURI);
						}
					}
				})
				.onFailure(throwable -> {
					System.out.println("Sended originalURI on Failure: " + throwable.getMessage());
					cf.complete(originalURI);
				});
		}
		catch (Exception err) {
			RecoeveDB.err(err);
			cf.completeExceptionally(err);
		}
		return cf;
	}

	public CompletableFuture<String> asyncFindTitle(WebDriver chromeDriver, String cssSelector) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();
		if (cssSelector == null) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is null."));
			return cfElements;
		}
		if (cssSelector.equals("NO")) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is NO."));
			return cfElements;
		}

		pID[0] = vertx.setPeriodic(FIND_PER_MS, id -> {
			try {
				((JavascriptExecutor)(chromeDriver)).executeScript("let videos = document.querySelectorAll(\"video\"); for(video of videos) {video.pause()}");
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector(cssSelector));
				if (elements != null && !elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					boolean someIsNotEmpty = false;
					for (int i = 0; i < elements.size(); i++) {
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
				System.out.println(err.getMessage());
				cfElements.completeExceptionally(new NoSuchSessionException("\nError: No valid session. Please try again.: " + err.getMessage()));
			}
			catch (NoSuchElementException
				| StaleElementReferenceException
				| InvalidElementStateException
				| VertxException err) {
				System.out.println(err.getMessage());
			}
		});

		vertx.setTimer(TIMEOUT_MS, id -> {
			try {
				vertx.cancelTimer(pID[0]);
				((JavascriptExecutor)(chromeDriver)).executeScript("let videos = document.querySelectorAll(\"video\"); for(video of videos) {video.pause()}");
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector(cssSelector));
				if (elements != null && !elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < elements.size(); i++) {
						String text = elements.get(i).getText().replaceAll("\\s", " ").trim();
						if (!text.isEmpty()) {
							sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
						}
					}
					cfElements.complete(sb.toString());
				}
				else {
					cfElements.complete("\nError: timeout " + TIMEOUT_MS+"ms.");
				}
			}
			catch (Exception err) {
				cfElements.completeExceptionally(err);
			}
		});

		return cfElements;
	}

	public CompletableFuture<String> asyncFindTitleUntilEveryFound(WebDriver chromeDriver, String cssSelector, ResultSet uriHeads, Timestamp tNow, String keyUri) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();
		if (cssSelector == null) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is null."));
			return cfElements;
		}
		if (cssSelector.equals("NO")) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is NO."));
			return cfElements;
		}

		pID[1] = vertx.setPeriodic(FIND_PER_MS, id -> {
			try {
				((JavascriptExecutor)(chromeDriver)).executeScript("let videos = document.querySelectorAll(\"video\"); for(video of videos) {video.pause()}");
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector(cssSelector));
				if (elements != null && !elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < elements.size(); i++) {
						String text = elements.get(i).getText().replaceAll("\\s", " ").trim();
						if (text.isEmpty()) {
							return;
						}
						sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
					}
					vertx.cancelTimer(pID[1]);
					cfElements.complete(sb.toString());
					if (uriHeads != null) {
						uriHeads.updateString("heads", sb.toString().trim());
						uriHeads.updateTimestamp("tUpdate", tNow);
						uriHeads.updateRow();
					}
					else {
						db.putUriHeads(keyUri, sb.toString().trim(), tNow);
					}
				}
			}
			catch (SQLException err) {
				RecoeveDB.err(err);
			}
			catch (NoSuchSessionException err) {
				System.out.println(err.getMessage());
				cfElements.completeExceptionally(new NoSuchSessionException("\nError: No valid session. Please try again.: " + err.getMessage()));
			}
			catch (NoSuchElementException
				| StaleElementReferenceException
				| InvalidElementStateException
				| VertxException err) {
				System.out.println(err.getMessage());
			}
		});

		vertx.setTimer(TIMEOUT_MS, id -> {
			try {
				vertx.cancelTimer(pID[1]);
				((JavascriptExecutor)(chromeDriver)).executeScript("let videos = document.querySelectorAll(\"video\"); for(video of videos) {video.pause()}");
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector(cssSelector));
				if (elements != null && !elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < elements.size(); i++) {
						String text = elements.get(i).getText().replaceAll("\\s", " ").trim();
						if (!text.isEmpty()) {
							sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
						}
					}
					cfElements.complete(sb.toString());
					if (uriHeads != null) {
						uriHeads.updateString("heads", sb.toString().trim());
						uriHeads.updateTimestamp("tUpdate", tNow);
						uriHeads.updateRow();
					}
					else {
						db.putUriHeads(keyUri, sb.toString().trim(), tNow);
					}
				}
				else {
					cfElements.complete("\nError: timeout " + TIMEOUT_MS+"ms.");
				}
			}
			catch (SQLException err) {
				RecoeveDB.err(err);
			}
			catch (Exception err) {
				cfElements.completeExceptionally(err);
			}
		});

		return cfElements;
	}


	public void findTitles(String uri, PrintLog pl) {
		final String[] keyUri = new String[]{ uri };
		HttpServerResponse resp = pl.req.response();
		resp.putHeader("Content-Type", "text/plain; charset=utf-8").setChunked(true);
		resp.write("\nuri\t" + StrArray.enclose(uri));

		String conciseURI = null;
		if (RecoeveDB.getutf8mb4Length(uri) > 255) {
			keyUri[0] = conciseURI = db.getConciseURI(uri);
		}
		if (conciseURI != null) {
			resp.write("\nconciseURI\t" + StrArray.enclose(conciseURI));
		}
		ResultSet uriHeads = db.getUriHeads(keyUri[0]);

		try {
			if (uriHeads != null && uriHeads.getTimestamp("tUpdate").after(new Timestamp(pl.tNow.getTime() - EXPIRES_IN_MS))) {
				resp.end("\n" + uriHeads.getString("heads"));
			}
			else {
				final WebDriver[] chromeDriver = new WebDriver[1];
				try {
					chromeDriver[0] = getDriver();
				}
				catch (Exception err) {
					System.out.println(err.getMessage());
				}
				try {
					if (chromeDriver[0] == null) {
						if (!resp.ended()) {
							resp.end("\nError: null WebDriver.");
						}
						releaseOrOfferDriver(chromeDriver[0]);
						return;
					}
					// chromeDriver[0].get(EMPTY_URL);
					// chromeDriver[0].getTitle();
						// * Attempt to get the title of the current page. If no exception is thrown, the WebDriver is still active.

					// ((JavascriptExecutor)(chromeDriver[0])).executeScript("Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5]}})");
					// ((JavascriptExecutor)(chromeDriver[0])).executeScript("Object.defineProperty(navigator, 'languages', {get: function() {return ['ko-KR', 'ko']}})");
					// ((JavascriptExecutor)(chromeDriver[0])).executeScript("const getParameter = WebGLRenderingContext.getParameter; WebGLRenderingContext.prototype.getParameter = function (parameter) {if (parameter === 37445) {return 'NVIDIA Corporation';} if (parameter === 37446) {return 'NVIDIA GeForce GTX 980 Ti OpenGL Engine';} return getParameter(parameter);};");

					BiConsumer<String, Throwable> writeChunk = (result, error) -> {
						if (error == null) {
							try {
								result = "\n" + result.trim();
								if (result.isEmpty()) {
									result = "\nError: Empty result.";
								}
								resp.write(result, Recoeve.ENCODING);
								System.out.println(result);
							}
							catch (Exception e) {
								result = "\nError: writing chunk: " + e.getMessage();
								resp.write(result, Recoeve.ENCODING);
								System.err.println(result);
							}
						}
						else {
							result = "\nError: in future: " + error.getMessage();
							resp.write(result, Recoeve.ENCODING);
							System.err.println(result);
						}
					};

					redirected(uri).whenComplete((redirectedURI, err) -> {
						System.out.println("\nredirectedURI: " + redirectedURI);
						CompletableFuture<Void> allOf = CompletableFuture.runAsync(() -> {});
						if (err == null) {
							try {
								chromeDriver[0].get(redirectedURI);
								String[] decomposedURI = PrintLog.decomposeURI(redirectedURI);
								CompletableFuture<String> findTitle;
								CompletableFuture<String> findTitleUntilEveryFound;
								if (HOST_TO_CSS.get(decomposedURI[0]) == null) {
									findTitle = asyncFindTitle(chromeDriver[0], "title,meta[name='title'],meta[name='og:title'],h1,h2");
									findTitleUntilEveryFound = asyncFindTitleUntilEveryFound(chromeDriver[0], "title,meta[name='title'],meta[name='og:title'],h1,h2", uriHeads, pl.tNow, keyUri[0]);
								}
								else {
									findTitle = asyncFindTitle(chromeDriver[0], HOST_TO_CSS.get(decomposedURI[0]));
									findTitleUntilEveryFound = asyncFindTitleUntilEveryFound(chromeDriver[0], HOST_TO_CSS.get(decomposedURI[0]), uriHeads, pl.tNow, keyUri[0]);
								}

								allOf = CompletableFuture.allOf(findTitle, findTitleUntilEveryFound);

								findTitle.whenComplete(writeChunk);
								findTitleUntilEveryFound.whenComplete(writeChunk);

								allOf.whenComplete((v, error) -> {
									String errorMsg = "\nComplete with no error. " + v;
									if (error != null) {
										errorMsg = "\nError in futures: " + error.getMessage();
									}
									System.err.println(errorMsg);
									if (!resp.ended()) {
										resp.end(errorMsg);
									}
									releaseOrOfferDriver(chromeDriver[0]);
								});
							}
							catch (Exception e) {
								resp.end("\nError: " + e.getMessage());
								allOf.completeExceptionally(e);
							}
						}
						else {

						}
					});
				}
				catch (NoSuchSessionException e) {
					releaseOrOfferDriver(chromeDriver[0]);
					System.out.println("Release or Offer chromeDriver\nNoSuchSessionException: " + e.getMessage());
					resp.end("\nError: No valid session. Please try again.: " + e.getMessage());
				}
				catch (RuntimeException e) {
					releaseOrOfferDriver(chromeDriver[0]);
					System.out.println("Release or Offer chromeDriver\nRuntimeException: " + e.getMessage());
					resp.end("\nError: RuntimeException: " + e.getMessage());
				}
				catch (Exception e) {
					releaseOrOfferDriver(chromeDriver[0]);
					System.out.println("Release or Offer chromeDriver\nException: " + e.getMessage());
					resp.end("\nError: Exception: " + e.getMessage());
				}
			}
		}
		catch (SQLException err) {
			RecoeveDB.err(err);
		}
	}

	public static void main(String... args) {
		try {
			Vertx vertx = Vertx.vertx();
			RecoeveWebClient recoeveWebClient = new RecoeveWebClient(vertx, vertx.getOrCreateContext(), new RecoeveDB(vertx));

			vertx.setTimer(500L, id -> {
				// String uri = "https://www.instagram.com/p/C_vG4UuPpEh/";
				// String uri = "https://kipid.tistory.com/entry/Terminal-Cmd-Sublime-text-build-results-%EC%B0%BD-%EC%97%90%EC%84%9C%EC%9D%98-%ED%95%9C%EA%B8%80-%EA%B9%A8%EC%A7%90-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-Windows";
				// String uri = "https://tistory1.daumcdn.net/tistory/1468360/skin/images/empty.html";
				// String uri = "https://www.youtube.com/watch?v=OUlCf8WlUVg";
				// String uri = "https://www.tiktok.com/@aespa_official/video/7393964373347224840?is_from_webapp=1&sender_device=pc";
				// String uri = "https://www.tiktok.com/@blue.clip001/video/7397362390418902273?is_from_webapp=1&sender_device=pc";
				// String uri = "https://www.tiktok.com/@khxabi/video/7416536112207891719?is_from_webapp=1&sender_device=pc";
				// String uri = "https://www.codeit.kr/topics/js-server-with-relational-db";
				// String uri = "https://recoeve.net/redirect/97e5b877989cf9e7";
				String uri = "https://recoeve.net/redirect/dbcd7de1989cf9e7";
				// String uri = "https://kipid.tistory.com/entry/week6-%EC%9C%84%ED%81%B4%EB%A6%AC-%ED%8E%98%EC%9D%B4%ED%8D%BC-%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%B0%A9%EC%8B%9D-CSR-SSR-SSG-%EA%B0%81%EA%B0%81%EC%9D%98-%ED%8A%B9%EC%A7%95%EA%B3%BC-%EA%B0%81-%EB%B0%A9%EC%8B%9D%EC%9D%84-%EC%96%B4%EB%96%A4-%EC%83%81%ED%99%A9%EC%97%90-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4-%EC%A2%8B%EC%9D%84%EC%A7%80-%EC%84%A4%EB%AA%85";
				// String uri = "https://recoeve.net/redirect/7ee5d220989cf9e8";
				// String uri = "https://kipid.tistory.com/entry/%EC%9D%B4%EC%A7%84-%ED%83%90%EC%83%89-%ED%8A%B8%EB%A6%AC-Binary-Search-Tree-BST-%EC%9D%98-%EC%A4%91%EC%9C%84-%EC%88%9C%ED%9A%8C-Inorder-%EC%A0%84%EC%9C%84-%EC%88%9C%ED%9A%8C-Preorder-%ED%9B%84%EC%9C%84-%EC%88%9C%ED%9A%8C-Postorder-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90";
				// String uri = "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html";
				// String uri = "https://kipid.tistory.com/entry/Lists";

				final String[] keyUri = new String[]{ uri };
				if (RecoeveDB.getutf8mb4Length(uri) > 255) {
					keyUri[0] = recoeveWebClient.db.getConciseURI(uri);
				}
				ResultSet uriHeads = recoeveWebClient.db.getUriHeads(keyUri[0]);

				try {
					Timestamp tNow = recoeveWebClient.db.now();
					if (uriHeads != null && uriHeads.getTimestamp("tUpdate").after(new Timestamp(tNow.getTime() - EXPIRES_IN_MS))) {
						System.out.println("\nFrom DB\n" + uriHeads.getString("heads"));
					}
					else {
						final WebDriver[] chromeDriver = new WebDriver[1];
						try {
							chromeDriver[0] = recoeveWebClient.getDriver();
						}
						catch (Exception err) {
							System.out.println(err.getMessage());
						}
						try {
							if (chromeDriver[0] == null) {
								System.out.println("\nError: null WebDriver.");
								recoeveWebClient.releaseOrOfferDriver(chromeDriver[0]);
								return;
							}
							// chromeDriver[0].get(EMPTY_URL);
							// chromeDriver[0].getTitle();
								// * Attempt to get the title of the current page. If no exception is thrown, the WebDriver is still active.

							// ((JavascriptExecutor)(chromeDriver[0])).executeScript("Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5]}})");
							// ((JavascriptExecutor)(chromeDriver[0])).executeScript("Object.defineProperty(navigator, 'languages', {get: function() {return ['ko-KR', 'ko']}})");
							// ((JavascriptExecutor)(chromeDriver[0])).executeScript("const getParameter = WebGLRenderingContext.getParameter;WebGLRenderingContext.prototype.getParameter = function (parameter) {if (parameter === 37445) {return 'NVIDIA Corporation';} if (parameter === 37446) {return 'NVIDIA GeForce GTX 980 Ti OpenGL Engine';} return getParameter(parameter);};");

							BiConsumer<String, Throwable> writeChunk = (result, error) -> {
								if (error == null) {
									try {
										result = "\n" + result.trim();
										if (result.isEmpty()) {
											result = "\nError: Empty result.";
										}
										System.out.println(result);
									}
									catch (Exception e) {
										result = "\nError: writing chunk: " + e.getMessage();
										System.err.println(result);
									}
								}
								else {
									result = "\nError: in future: " + result + "\n" + error.getMessage();
									System.err.println(result);
								}
							};

							recoeveWebClient.redirected(uri).whenComplete((redirectedURI, err) -> {
								System.out.println("\nredirectedURI: " + redirectedURI);
								CompletableFuture<Void> allOf = CompletableFuture.runAsync(() -> {});
								if (err == null) {
									try {
										chromeDriver[0].get(redirectedURI);
										String[] decomposedURI = PrintLog.decomposeURI(redirectedURI);
										CompletableFuture<String> findTitle;
										CompletableFuture<String> findTitleUntilEveryFound;
										if (HOST_TO_CSS.get(decomposedURI[0]) == null) {
											findTitle = recoeveWebClient.asyncFindTitle(chromeDriver[0], "title, meta[name='title'], meta[name='og:title'], h1, h2");
											findTitleUntilEveryFound = recoeveWebClient.asyncFindTitleUntilEveryFound(chromeDriver[0], "title, meta[name='title'], meta[name='og:title'], h1, h2", uriHeads, tNow, keyUri[0]);
										}
										else {
											findTitle = recoeveWebClient.asyncFindTitle(chromeDriver[0], HOST_TO_CSS.get(decomposedURI[0]));
											findTitleUntilEveryFound = recoeveWebClient.asyncFindTitleUntilEveryFound(chromeDriver[0], HOST_TO_CSS.get(decomposedURI[0]), uriHeads, tNow, keyUri[0]);
										}

										allOf = CompletableFuture.allOf(findTitle, findTitleUntilEveryFound);

										findTitle.whenComplete(writeChunk);
										findTitleUntilEveryFound.whenComplete(writeChunk);

										allOf.whenComplete((v, error) -> {
											String errorMsg = "\nComplete with no error. " + v;
											if (error != null) {
												errorMsg = "\nError in futures: " + error.getMessage();
											}
											System.err.println(errorMsg);
											recoeveWebClient.releaseOrOfferDriver(chromeDriver[0]);
										});
									}
									catch (Exception e) {
										System.out.println("\nError: " + e.getMessage());
										allOf.completeExceptionally(e);
									}
								}
								else {

								}
							});
						}
						catch (NoSuchSessionException e) {
							recoeveWebClient.releaseOrOfferDriver(chromeDriver[0]);
							System.out.println("Release or Offer chromeDriver\nNoSuchSessionException: " + e.getMessage());
						}
						catch (RuntimeException e) {
							recoeveWebClient.releaseOrOfferDriver(chromeDriver[0]);
							System.out.println("Release or Offer chromeDriver\nRuntimeException: " + e.getMessage());
						}
						catch (Exception e) {
							recoeveWebClient.releaseOrOfferDriver(chromeDriver[0]);
							System.out.println("Release or Offer chromeDriver\nException: " + e.getMessage());
						}
					}
				}
				catch (SQLException err) {
					RecoeveDB.err(err);
				}
			});
		}
		catch (Exception err) {
			System.out.println("Error: " + err.getMessage());
		}
	}
}
