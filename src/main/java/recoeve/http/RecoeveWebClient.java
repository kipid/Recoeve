package recoeve.http;



import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

import java.time.Duration;
import java.util.concurrent.CompletableFuture;
import java.util.ArrayList;
import java.util.List;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

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

	public XPath xpath;
	public WebDriver driver;

	public ChromeOptions chromeOptions;
	public WebDriver chromeDriver;

	public RecoeveWebClient(Vertx vertx, RecoeveDB db) {
		this.vertx = vertx;
		this.db = db;
		webClient = WebClient.create(vertx, options);
		xpath = XPathFactory.newInstance().newXPath();
		chromeOptions = new ChromeOptions();
		chromeOptions.addArguments("--headless=new");
	}

	public CompletableFuture<String> redirected(String shortURI) {
		CompletableFuture<String> completableFuture = new CompletableFuture<>();
		try {
			webClient.headAbs(shortURI)
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
					System.out.println("Sended shortURI.");
					completableFuture.complete(shortURI);
				});
		}
		catch (VertxException err) {
			RecoeveDB.err(err);
			completableFuture.completeExceptionally(err);
		}
		return completableFuture;
	}

	public CompletableFuture<String> findTitles(String uri, PrintLog pl) {
		CompletableFuture<String> completableFuture = new CompletableFuture<>();

		System.out.println("findTitles :: uri : " + uri);
		String heads = "uri";
		String contents = StrArray.enclose(uri);

		String conciseURI = null;
		if (RecoeveDB.getutf8mb4Length(uri) > 255) {
			conciseURI = db.getConciseURI(uri);
		}
		if (conciseURI != null) {
			heads += "\tconciseURI";
			contents += "\t" + StrArray.enclose(conciseURI);
		}

		try {
			ArrayList<Class<? extends Exception>> expectedExceptions = new ArrayList<>();
			expectedExceptions.add(org.openqa.selenium.NoSuchElementException.class);
			expectedExceptions.add(org.openqa.selenium.StaleElementReferenceException.class);
			expectedExceptions.add(org.openqa.selenium.ElementNotInteractableException.class);
			expectedExceptions.add(org.openqa.selenium.InvalidElementStateException.class);

			chromeDriver = new ChromeDriver(chromeOptions);
			chromeDriver.get(uri);
			Wait<WebDriver> wait = new FluentWait<>(chromeDriver)
				.withTimeout(Duration.ofMillis(4096L))
				.pollingEvery(Duration.ofMillis(256L))
				.ignoreAll(expectedExceptions);

			List<WebElement> titles = wait.until(d -> d.findElements(By.cssSelector("title")));
			if (!titles.isEmpty()) {
				for (int i = 0; i < titles.size(); i++) {
					heads += "\ttitle-" + i;
					contents += "\t" + StrArray.enclose(titles.get(i).getText());
				}
			}

			List<WebElement> h1Elements = wait.until(d -> d.findElements(By.cssSelector("h1")));
			if (!h1Elements.isEmpty()) {
				for (int i = 0; i < h1Elements.size(); i++) {
					heads += "\th1-" + i;
					contents += "\t" + StrArray.enclose(h1Elements.get(i).getText());
				}
			}

			List<WebElement> h2Elements = wait.until(d -> d.findElements(By.cssSelector("h2")));
			if (!h2Elements.isEmpty()) {
				for (int i = 0; i < Math.min(3, h2Elements.size()); i++) {
					heads += "\th2-" + i;
					contents += "\t" + StrArray.enclose(h2Elements.get(i).getText());
				}
			}

			List<WebElement> naverElements = wait.until(d -> d.findElements(By.cssSelector(".se-fs-, .se-ff-")));
			if (!naverElements.isEmpty()) {
				for (int i = 0; i < Math.min(3, naverElements.size()); i = i + 1) {
					heads += "\tnaver-" + i;
					contents += "\t" + StrArray.enclose(naverElements.get(i).getText());
				}
			}

			List<WebElement> leetCodeElements = wait.until(d -> d.findElements(By.cssSelector(".text-title-large")));
			if (!leetCodeElements.isEmpty()) {
				for (int i = 0; i < Math.min(3, leetCodeElements.size()); i = i + 1) {
					heads += "\tLeetCode-" + i;
					contents += "\t" + StrArray.enclose(leetCodeElements.get(i).getText());
				}
			}
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			chromeDriver.quit();
		}

		completableFuture.complete(heads + "\n" + contents);
		return completableFuture;
		// pl.req.response()
		// 		.putHeader("Content-Type", "text/plain; charset=utf-8")
		// 		.end(heads + "\n" + contents, Recoeve.ENCODING);
	}

	public static void main(String... args) {
		// Do nothing.
	}
}
