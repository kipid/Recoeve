package recoeve.http;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

import java.net.MalformedURLException;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicReference;
import java.util.List;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
// import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.w3c.dom.Element;

import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class RecoeveWebClient {
	public static final WebClientOptions options = new WebClientOptions().setMaxHeaderSize(16384)
			.setFollowRedirects(true);

	// public Vertx vertx;
	public WebClient webClient;
	// public long timerId;
	// public int timerN;
	public XPath xpath;
	public WebDriver driver;

	public RecoeveWebClient(Vertx vertx) {
		// this.vertx = vertx;
		webClient = WebClient.create(vertx, options);
		// timerN = 0;
		xpath = XPathFactory.newInstance().newXPath();
	}

	public String redirected(String shortURI) {
		final AtomicReference<String> res = new AtomicReference<>();
		res.set(shortURI);
		try {
			webClient.headAbs(shortURI)
				.send()
				.onSuccess(response -> {
					if (response.statusCode() == 200) {
						// If the response is a redirect, so get the followedRedirects().
						List<String> followedURIs = response.followedRedirects();
						if (followedURIs.size() > 0) {
							String fullURI = followedURIs.get(followedURIs.size() - 1);
							System.out.println("The last redirected URL: " + fullURI);
							res.set(fullURI);
						}
					}
				})
				.onFailure(throwable -> {
					throwable.printStackTrace();
					System.out.println("Sended shortURI.");
				});
		}
		catch (VertxException e) {
			RecoeveDB.err(e);
		}
		return res.get();
	}

	public void findTitles(String uri, String host, PrintLog pl) {
		System.out.println("findTitles :: uri : " + uri);
		System.out.println("findTitles :: host : " + host);
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
			webClient.getAbs(uri).send(ar -> {
				if (ar.succeeded()) {
					HttpResponse<Buffer> response = ar.result();
					if (response.statusCode() == 200) {
						// If the response is a redirect, so get the followedRedirects().
						List<String> followedURIs = response.followedRedirects();
						String fullURI = null;
						if (followedURIs.size() > 0) {
							fullURI = followedURIs.get(followedURIs.size() - 1);
						}
						System.out.println("The last redirected URL: " + fullURI);
						String body = response.bodyAsString();
						Document document = Jsoup.parse(body);

						// Select the first <h1> element and extract its text content
						Elements titleElements = document.select("title");
						Elements h1Elements = document.select("h1");
						Elements h2Elements = document.select("h2");
						Elements tiktokElements = document.select("h1.css-1fbzdvh-H1Container.ejg0rhn1");
						Elements naverElements = document.select(".se-fs-");

						String heads = "redirectedURI";
						String contents = fullURI;
						if (!titleElements.isEmpty()) {
							heads += "\ttitle";
							contents += "\t" + titleElements.first().text();
						}
						if (!h1Elements.isEmpty()) {
							heads += "\th1";
							contents += "\t" + h1Elements.first().text();
						}
						if (!h2Elements.isEmpty()) {
							heads += "\th2";
							contents += "\t" + h2Elements.first().text();
						}
						if (!tiktokElements.isEmpty()) {
							heads += "\ttiktok";
							contents += "\t" + tiktokElements.first().text();
						}
						if (!naverElements.isEmpty()) {
							heads += "\tnaver";
							contents += "\t" + naverElements.first().text();
						}
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
							.end(heads + "\n" + contents, Recoeve.ENCODING);
					}
					else {
						System.out.println("Failed to retrieve the webpage: "
								+ ar.cause().getMessage());
						pl.req.response().end("Failed to retrieve the webpage.",
								Recoeve.ENCODING);
					}
				}
				else {
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