package recoeve.http;



import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

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

	public CompletableFuture<List<WebElement>> asyncFindTitle(WebDriver chromeDriver) throws Exception {
		CompletableFuture<List<WebElement>> cfElements = new CompletableFuture<>();

		pID[0] = vertx.setPeriodic(256L, id -> {
			try {
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector("title"));
				if (elements != null && !elements.isEmpty()) {
					vertx.cancelTimer(pID[0]);
					cfElements.complete(elements);
				}
			} catch (org.openqa.selenium.NoSuchElementException
				| org.openqa.selenium.StaleElementReferenceException
				| org.openqa.selenium.InvalidElementStateException err) {
				System.out.println(err);
			}
		});

		vertx.setTimer(2048L, id -> {
			vertx.cancelTimer(pID[0]);
			cfElements.complete(new ArrayList<WebElement>());
		});

		return cfElements;
	}

	public CompletableFuture<List<WebElement>> asyncFindH1s(WebDriver chromeDriver) throws Exception {
		CompletableFuture<List<WebElement>> cfElements = new CompletableFuture<>();

		pID[1] = vertx.setPeriodic(256L, id -> {
			try {
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector("h1"));
				if (elements != null && !elements.isEmpty()) {
					vertx.cancelTimer(pID[1]);
					cfElements.complete(elements);
				}
			} catch (org.openqa.selenium.NoSuchElementException
				| org.openqa.selenium.StaleElementReferenceException
				| org.openqa.selenium.InvalidElementStateException err) {
				System.out.println(err);
			}
		});

		vertx.setTimer(2048L, id -> {
			vertx.cancelTimer(pID[1]);
			cfElements.complete(new ArrayList<WebElement>());
		});

		return cfElements;
	}

	public CompletableFuture<List<WebElement>> asyncFindH2s(WebDriver chromeDriver) throws Exception {
		CompletableFuture<List<WebElement>> cfElements = new CompletableFuture<>();

		pID[2] = vertx.setPeriodic(256L, id -> {
			try {
				List<WebElement> elements = chromeDriver.findElements(By.cssSelector("h2"));
				if (elements != null && !elements.isEmpty()) {
					vertx.cancelTimer(pID[2]);
					cfElements.complete(elements);
				}
			} catch (org.openqa.selenium.NoSuchElementException
				| org.openqa.selenium.StaleElementReferenceException
				| org.openqa.selenium.InvalidElementStateException err) {
				System.out.println(err);
			}
		});

		vertx.setTimer(2048L, id -> {
			vertx.cancelTimer(pID[2]);
			cfElements.complete(new ArrayList<WebElement>());
		});

		return cfElements;
	}

	public CompletableFuture<String> findTitles(String uri) {
		CompletableFuture<String> cfTitles = new CompletableFuture<>();

		final StringBuilder heads = new StringBuilder();
		final StringBuilder contents = new StringBuilder();

		heads.append("uri");
		contents.append(StrArray.enclose(uri));

		String conciseURI = null;
		if (RecoeveDB.getutf8mb4Length(uri) > 255) {
			conciseURI = db.getConciseURI(uri);
		}
		if (conciseURI != null) {
			heads.append("\tconciseURI");
			contents.append("\t" + StrArray.enclose(conciseURI));
		}

		final WebDriver chromeDriver = new ChromeDriver(chromeOptions);
		try {
			chromeDriver.manage().window().maximize();
			chromeDriver.get(uri);
			CompletableFuture<List<WebElement>> findTitle = asyncFindTitle(chromeDriver);
			CompletableFuture<List<WebElement>> findH1s = asyncFindH1s(chromeDriver);
			CompletableFuture<List<WebElement>> findH2s = asyncFindH2s(chromeDriver);

			CompletableFuture<Void> allOf = CompletableFuture.allOf(findTitle, findH1s, findH2s);

			allOf.thenRun(() -> {
				try {
					List<WebElement> title = findTitle.get();
					List<WebElement> h1s = findH1s.get();
					List<WebElement> h2s = findH2s.get();

					List<WebElement> temp = title;
					for (int i = 0; i < temp.size(); i++) {
						heads.append("\ttitle-" + i);
						contents.append("\t" + StrArray.enclose(temp.get(i).getText()));
					}
					temp = h1s;
					for (int i = 0; i < Math.min(3, temp.size()); i++) {
						heads.append("\th1-" + i);
						contents.append("\t" + StrArray.enclose(temp.get(i).getText()));
					}
					temp = h2s;
					for (int i = 0; i < Math.min(3, temp.size()); i++) {
						heads.append("\th2-" + i);
						contents.append("\t" + StrArray.enclose(temp.get(i).getText()));
					}

					cfTitles.complete(heads.toString() + "\n" + contents.toString());
				}
				catch (Exception err) {
					if (chromeDriver != null) {
						chromeDriver.quit();
					}
					System.out.println(err);
					cfTitles.completeExceptionally(err);
				}
				finally {
					if (chromeDriver != null) {
						chromeDriver.quit();
					}
				}
			});
		} catch (Exception e) {
			System.out.println(e);
		}
		return cfTitles;
	}

	public static void main(String... args) {
		// Do nothing.
	}
}
