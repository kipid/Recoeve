package recoeve.http;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.Vertx;
import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

import java.util.concurrent.atomic.AtomicReference;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

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
		webClient.headAbs(shortURI)
			.send()
			.onSuccess(response -> {
				if (response.statusCode() == 200) {
					// If the response is a redirect, so get the followedRedirects().
					List<String> followedURIs = response.followedRedirects();
					if (followedURIs.size() >= 1) {
						String fullURI = followedURIs.get(followedURIs.size() - 1);
						System.out.println("The last redirected URL: " + fullURI);
						res.set(fullURI);
					}
					else {
						res.set(shortURI);
					}
				} else {
					res.set(shortURI);
				}
			})
			.onFailure(throwable -> {
				throwable.printStackTrace();
				System.out.println("Sended shortURI.");
				res.set(shortURI);
			});
		return res.get();
	}

	public void doUntilH1IsFound(HttpResponse<Buffer> response, PrintLog pl, int delay) {
		timerId = vertx.setTimer(delay, timerHandler -> {
			timerN++;
			if (response.statusCode() == 200) {
				// If the response is a redirect, so get the followedRedirects().
				List<String> followedURIs = response.followedRedirects();
				String fullURI = followedURIs.get(followedURIs.size() - 1);
				System.out.println("The last redirected URL: " + fullURI);
				pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
						.end(fullURI, Recoeve.ENCODING);
				String body = response.bodyAsString();
				Document document = Jsoup.parse(body);

				// Select the first <h1> element and extract its text content
				Elements h1Elements = document.select("title, h1, .se-fs-");
				Elements h2Elements = document.select("h2");
				if (h1Elements.isEmpty() && timerN < 7) {
					doUntilH1IsFound(response, pl, delay + 512);
				} else {
					if (!h1Elements.isEmpty()) {
						Element firstH1Element = h1Elements.first();
						String h1Text = firstH1Element.text();
						System.out.println("Content of the first <h1> tag: " + h1Text);
						if (!h2Elements.isEmpty()) {
							Element firstH2Element = h2Elements.first();
							String h2Text = firstH2Element.text();
							System.out.println("Content of the first <h2> tag: " + h2Text);
							pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
									.end("h1\th2\n" + StrArray.enclose(h1Text) + "\t" + StrArray.enclose(h2Text),
											Recoeve.ENCODING);
						} else {
							pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
									.end("h1\n" + StrArray.enclose(h1Text), Recoeve.ENCODING);
						}
					} else if (!h2Elements.isEmpty()) {
						Element firstH2Element = h2Elements.first();
						String h2Text = firstH2Element.text();
						System.out.println("Content of the first <h2> tag: " + h2Text);
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
								.end("h1\th2\nNo <h1> tag.\t" + StrArray.enclose(h2Text), Recoeve.ENCODING);
					} else {
						System.out.println("No <h1>, <h2> tags found on the page.");
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
								.end("h1\nNo <h1> tag.", Recoeve.ENCODING);
					}
					// webClient.close();
				}
			}
		});
	}

	public static void main(String... args) {
		// Do nothing.
	}
}