package recoeve.http;



import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

import java.util.concurrent.CompletableFuture;
import java.util.List;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

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

	public Vertx vertx;
	public RecoeveDB db;
	public WebClient webClient;
	private final long[] pID = {0, 0, 0};
	private final long timeout = 512L;
	private final long findPerSeconds = 128L;

	public XPath xpath;
	public WebDriver driver;

	public ChromeOptions chromeOptions;

	public RecoeveWebClient(Vertx vertx, RecoeveDB db) {
		this.vertx = vertx;
		this.db = db;
		webClient = WebClient.create(vertx, options);
		xpath = XPathFactory.newInstance().newXPath();
		chromeOptions = new ChromeOptions();
		chromeOptions.addArguments("--remote-allow-origins=*");
		chromeOptions.addArguments("--headless=new");
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
						sb.append("\nh1-" + i + "\t" + StrArray.enclose(elements.get(i).getText()));
					}
					cfElements.complete(sb.toString());
				}
			} catch (org.openqa.selenium.NoSuchElementException
				| org.openqa.selenium.StaleElementReferenceException
				| org.openqa.selenium.InvalidElementStateException err) {
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
						sb.append("\nh1-" + i + "\t" + StrArray.enclose(elements.get(i).getText()));
					}
					cfElements.complete(sb.toString());
				}
			} catch (org.openqa.selenium.NoSuchElementException
				| org.openqa.selenium.StaleElementReferenceException
				| org.openqa.selenium.InvalidElementStateException err) {
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
						sb.append("\nh1-" + i + "\t" + StrArray.enclose(elements.get(i).getText()));
					}
					cfElements.complete(sb.toString());
				}
			} catch (org.openqa.selenium.NoSuchElementException
				| org.openqa.selenium.StaleElementReferenceException
				| org.openqa.selenium.InvalidElementStateException err) {
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

		WebDriver chromeDriver = new ChromeDriver(chromeOptions);
		try {
			chromeDriver.get(uri);
			CompletableFuture<String> findTitle = asyncFindTitle(chromeDriver);
			CompletableFuture<String> findH1s = asyncFindH1s(chromeDriver);
			CompletableFuture<String> findH2s = asyncFindH2s(chromeDriver);

			CompletableFuture<Object> anyOf = CompletableFuture.anyOf(findTitle, findH1s, findH2s);

			anyOf.thenAccept((titles) -> {
				try {
					resp.write(titles.toString(), Recoeve.ENCODING);
				}
				catch (Exception err) {
					System.out.println(err);
				}
			})
			.thenAccept((titles) -> {
				try {
					resp.write(titles.toString(), Recoeve.ENCODING);
				}
				catch (Exception err) {
					System.out.println(err);
				}
			})
			.thenAccept((titles) -> {
				try {
					resp.write(titles.toString(), Recoeve.ENCODING);
				}
				catch (Exception err) {
					System.out.println(err);
				}
			});
		}
		catch (org.openqa.selenium.NoSuchSessionException e) {
			this.findTitles(uri, resp);
			return;
		}
		catch (Exception e) {
			System.out.println(e);
		}
		finally {
			if (chromeDriver != null) {
				chromeDriver.quit();
			}
		}
		if (!resp.ended()) {
			resp.end();
		}
	}

	public static void main(String... args) {
		// Do nothing.
	}
}
