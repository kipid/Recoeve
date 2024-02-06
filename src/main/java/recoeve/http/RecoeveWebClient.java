package recoeve.http;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.Vertx;
import io.vertx.core.VertxException;
import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

import java.net.MalformedURLException;
import java.util.concurrent.atomic.AtomicReference;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class RecoeveWebClient {
	public static final WebClientOptions options = new WebClientOptions().setMaxHeaderSize(16384)
			.setFollowRedirects(true);

	public Vertx vertx;
	public WebClient webClient;
	public long timerId;
	public int timerN;

	public RecoeveWebClient(Vertx vertx) {
		this.vertx = vertx;
		webClient = WebClient.create(vertx, options);
		timerN = 0;
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

	public void findTitles(HttpResponse<Buffer> response, PrintLog pl, int delay) {
		timerId = vertx.setTimer(delay, timerHandler -> {
			timerN++;
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
				Elements tiktokElements = document.select(".efbd9f0");
				Elements naverElements = document.select(".se-fs-");

				String heads = "";
				String contents = "";
				if (!titleElements.isEmpty()) {
					heads += "title";
					contents += titleElements.first().text();
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
				// webClient.close();
			}
		});
	}

	public static void main(String... args) {
		// Do nothing.
	}
}