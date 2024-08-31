package recoeve.http;



import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

import java.util.concurrent.CompletableFuture;
import java.util.function.BiConsumer;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.InvalidElementStateException;

import recoeve.db.FileMap;
import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class RecoeveWebClient {
	public static final WebClientOptions options = new WebClientOptions()
			.setMaxHeaderSize(20000)
			.setFollowRedirects(true);
	static {
		System.setProperty("webdriver.chrome.driver", FileMap.preFilePath + "/Recoeve/chromedriver-win64/chromedriver.exe");
	}

	private final Vertx vertx;
	private final RecoeveDB db;
	private final WebClient webClient;
	private final long[] pID = {0, 0, 0};
	private final long timeout = 4096L;
	private final long findPerSeconds = 512L;
	private final ChromeOptions chromeOptions;
	private final WebDriver chromeDriver;

	public RecoeveWebClient(Vertx vertx, RecoeveDB db) {
		this.vertx = vertx;
		this.db = db;
		webClient = WebClient.create(vertx, options);
		chromeOptions = new ChromeOptions();
		chromeOptions.addArguments("--remote-allow-origins=*");
		chromeOptions.addArguments("--headless=new");
		chromeDriver = new ChromeDriver(chromeOptions);
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

	public CompletableFuture<String> asyncFindTitle(WebDriver chromeDriver) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();

		pID[0] = vertx.setPeriodic(findPerSeconds, id -> {
			try {
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector("title"));
				if (elements != null && !elements.isEmpty()) {
					vertx.cancelTimer(pID[0]);
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < Math.min(3, elements.size()); i++) {
						if (elements.get(i).getText().trim().isEmpty()) {
							return;
						}
						sb.append("\nh1-" + i + "\t" + StrArray.enclose(elements.get(i).getText().trim()));
					}
					cfElements.complete(sb.toString());
				}
			} catch (NoSuchElementException
				| StaleElementReferenceException
				| InvalidElementStateException
				| VertxException err) {
				System.out.println(err);
			}
		});

		vertx.setTimer(timeout, id -> {
			vertx.cancelTimer(pID[0]);
			cfElements.complete("");
		});

		return cfElements;
	}

	public CompletableFuture<String> asyncFindH1s(WebDriver chromeDriver) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();

		pID[1] = vertx.setPeriodic(findPerSeconds, id -> {
			try {
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector("h1"));
				if (elements != null && !elements.isEmpty()) {
					vertx.cancelTimer(pID[1]);
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < Math.min(3, elements.size()); i++) {
						if (elements.get(i).getText().trim().isEmpty()) {
							return;
						}
						sb.append("\nh1-" + i + "\t" + StrArray.enclose(elements.get(i).getText()));
					}
					cfElements.complete(sb.toString());
				}
			} catch (NoSuchElementException
				| StaleElementReferenceException
				| InvalidElementStateException
				| VertxException err) {
				System.out.println(err);
			}
		});

		vertx.setTimer(timeout, id -> {
			vertx.cancelTimer(pID[1]);
			cfElements.complete("");
		});

		return cfElements;
	}

	public CompletableFuture<String> asyncFindH2s(WebDriver chromeDriver) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();

		pID[2] = vertx.setPeriodic(findPerSeconds, id -> {
			try {
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector("h2"));
				if (elements != null && !elements.isEmpty()) {
					vertx.cancelTimer(pID[2]);
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < Math.min(3, elements.size()); i++) {
						if (elements.get(i).getText().trim().isEmpty()) {
							return;
						}
						sb.append("\nh1-" + i + "\t" + StrArray.enclose(elements.get(i).getText()));
					}
					cfElements.complete(sb.toString());
				}
			} catch (NoSuchElementException
				| StaleElementReferenceException
				| InvalidElementStateException
				| VertxException err) {
				System.out.println(err);
			}
		});

		vertx.setTimer(timeout, id -> {
			vertx.cancelTimer(pID[2]);
			cfElements.complete("");
		});

		return cfElements;
	}

	public void findTitles(String uri, HttpServerResponse resp) {
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

		try {
			chromeDriver.get(uri);
			CompletableFuture<String> findTitle = asyncFindTitle(chromeDriver)
					.thenApply(result -> result);
			CompletableFuture<String> findH1s = asyncFindH1s(chromeDriver)
					.thenApply(result -> result);
			CompletableFuture<String> findH2s = asyncFindH2s(chromeDriver)
					.thenApply(result -> result);

			CompletableFuture<Void> allOf = CompletableFuture.allOf(findTitle, findH1s, findH2s);

			BiConsumer<String, Throwable> writeChunk = (result, error) -> {
				if (error == null) {
					try {
						if (result.isEmpty()) {
							System.out.println("Empty result.");
						}
						else {
							resp.write(result, Recoeve.ENCODING);
						}
					} catch (Exception e) {
						System.err.println("Error writing chunk: " + e.getMessage());
					}
				} else {
					System.err.println("Error in future: " + error.getMessage());
				}
			};

			findTitle.whenComplete(writeChunk);
			findH1s.whenComplete(writeChunk);
			findH2s.whenComplete(writeChunk);

			allOf.whenComplete((v, error) -> {
				if (error != null) {
					System.err.println("Error in futures: " + error.getMessage());
				}
				if (!resp.ended()) {
					resp.end();
				}
			});
		}
		catch (org.openqa.selenium.NoSuchSessionException e) {
			resp.end("Error: No valid session. Please try again.");
		}
		catch (Exception e) {
			resp.end("Error: " + e.getMessage());
		}
	}

	public static void main(String... args) {
		// Do nothing.
	}
}
