package recoeve.http;

import io.vertx.core.buffer.Buffer;
// import io.vertx.core.Promise;
import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

// import java.net.MalformedURLException;
// import java.time.Duration;
import java.util.concurrent.CompletableFuture;
// import java.util.concurrent.atomic.AtomicReference;
import java.util.List;
import javax.xml.xpath.XPath;
// import javax.xml.xpath.XPathConstants;
// import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
// import org.openqa.selenium.By;
// import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
// import org.openqa.selenium.WebElement;
// import org.openqa.selenium.chrome.ChromeDriver;
// import org.openqa.selenium.support.ui.FluentWait;
// import org.openqa.selenium.support.ui.Wait;
// import org.w3c.dom.Element;

import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class RecoeveWebClient {
	public static final WebClientOptions options = new WebClientOptions().setMaxHeaderSize(16384)
			.setFollowRedirects(true);

	public Vertx vertx;
	public RecoeveDB db;
	public WebClient webClient;
	// public long timerId;
	// public int timerN;
	public XPath xpath;
	public WebDriver driver;

	public RecoeveWebClient(Vertx vertx, RecoeveDB db) {
		this.vertx = vertx;
		this.db = db;
		webClient = WebClient.create(vertx, options);
		// timerN = 0;
		xpath = XPathFactory.newInstance().newXPath();
	}

	public CompletableFuture<String> redirected(String shortURI) {
		CompletableFuture<String> completableFuture = new CompletableFuture<>();
		try {
			webClient.headAbs(shortURI)
				.send()
				.onSuccess(response -> {
					if (response.statusCode() == 200) {
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
		catch (VertxException e) {
			RecoeveDB.err(e);
			completableFuture.completeExceptionally(e);
		}
		return completableFuture;
	}

	public void findTitles(String uri, PrintLog pl) {
		// System.out.println("findTitles :: uri : " + uri);
		// System.out.println("findTitles :: host : " + host);
		// if (host == "www.tiktok.com") {
		// 	driver = new ChromeDriver();
		// 	String heads = "";
		// 	String contents = "";
		// 	driver.get(uri);
		// 	Wait<WebDriver> wait = new FluentWait<>(driver)
		// 		.withTimeout(Duration.ofMillis(8096))
		// 		.pollingEvery(Duration.ofMillis(512))
		// 		.ignoring(NoSuchElementException.class);
		// 	WebElement tiktokElement0 = wait.until(d -> d.findElement(By.xpath("//*[@id=\"main-content-video_detail\"]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/h1")));
		// 	heads += "tiktok0";
		// 	contents += "" + tiktokElement0.getText();
		// 	driver.quit();
		// 	pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
		// 		.end(heads + "\n" + contents, Recoeve.ENCODING);
		// 	return;
		// }
		// else {
		webClient.getAbs(uri).putHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36").send(ar -> {
			if (ar.succeeded()) {
				HttpResponse<Buffer> response = ar.result();
				System.out.println("response.statusCode(): " + response.statusCode());
				if (response.statusCode() >= 200 && response.statusCode() < 300) {
					// If the response is a redirect, so get the followedRedirects().
					List<String> followedURIs = response.followedRedirects();
					String fullURI = null;
					if (followedURIs.size() > 0) {
						fullURI = followedURIs.get(followedURIs.size() - 1);
					}
					if (fullURI == null) {
						fullURI = uri;
					}
					System.out.println("The last redirected URL: " + fullURI);
					String body = response.bodyAsString();
					Document document = Jsoup.parse(body);

					String heads = "redirectedURI";
					String contents = fullURI;

					String conciseURI = null;
					if (RecoeveDB.getutf8mb4Length(fullURI) > 255) {
						conciseURI = db.getConciseURI(fullURI);
					}
					if (conciseURI != null) {
						heads += "\tconciseURI";
						contents += "\t" + conciseURI;
					}

					String title = document.title();
					if (!title.isEmpty()) {
						heads += "\ttitle";
						contents += "\t" + StrArray.enclose(title);
					}

					Elements h1Elements = document.select("h1");
					if (!h1Elements.isEmpty()) {
						for (int i = 0; i < h1Elements.size(); i++) {
							heads += "\th1-" + i;
							contents += "\t" + StrArray.enclose(h1Elements.get(i).text());
						}
					}

					Elements h2Elements = document.select("h2");
					if (!h2Elements.isEmpty()) {
						for (int i = 0; i < h2Elements.size(); i++) {
							heads += "\th2-" + i;
							contents += "\t" + StrArray.enclose(h2Elements.get(i).text());
						}
					}

					Elements naverElements = document.select(".se-fs-, .se-ff-");
					if (!naverElements.isEmpty()) {
						for (int i = 0; i < Math.min(5, naverElements.size()); i = i + 1) {
							heads += "\tnaver-" + i;
							contents += "\t" + StrArray.enclose(naverElements.get(i).text());
						}
					}

					Elements leetCodeElements = document.select(".text-title-large");
					if (!leetCodeElements.isEmpty()) {
						for (int i = 0; i < leetCodeElements.size(); i = i + 1) {
							heads += "\tLeetCode-" + i;
							contents += "\t" + StrArray.enclose(leetCodeElements.get(i).text());
						}
					}

					System.out.println(heads + "\n" + contents);
					pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
							.end(heads + "\n" + contents, Recoeve.ENCODING);
				} else {
					System.out.println("Failed to retrieve the webpage: "
							+ ar.cause().getMessage());
					pl.req.response().end("Failed to retrieve the webpage.",
							Recoeve.ENCODING);
				}
			} else {
				System.out.println("Failed to retrieve the webpage: "
						+ ar.cause().getMessage());
				pl.req.response().end("Failed to retrieve the webpage.",
						Recoeve.ENCODING);
			}
		});
		// }
		// webClient.close();
	}

	public static void main(String... args) {
		// Do nothing.
	}
}