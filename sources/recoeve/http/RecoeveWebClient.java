package recoeve.http;

import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;



public class RecoeveWebClient {
public static final WebClientOptions options=new WebClientOptions().setMaxHeaderSize(16384).setFollowRedirects(true);

public WebClient webClient;
public long timerId;
public int timerN;

public RecoeveWebClient() {
	webClient=WebClient.create(Recoeve.vertx, options);
	timerN=0;
}
public void doUntilH1IsFound(HttpResponse response, PrintLog pl) {
	timerId=Recoeve.vertx.setTimer(2048, timerHandler -> {
		timerN++;
		if (response.statusCode()==200) {
			String body=response.bodyAsString();
			Document document=Jsoup.parse(body);

			// Select the first <h1> element and extract its text content
			Elements h1Elements=document.select("title, h1");
			if (h1Elements.isEmpty()&&timerN<7) {
				doUntilH1IsFound(response, pl);
			}
			else {
				if (!h1Elements.isEmpty()) {
					Element firstH1Element=h1Elements.first();
					String h1Text=firstH1Element.text();
					System.out.println("Content of the first <h1> tag: "+h1Text);
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
						.end(h1Text, Recoeve.ENCODING);
				}
				else {
					System.out.println("No <h1> tags found on the page.");
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
						.end("No <h1> tag.", Recoeve.ENCODING);
				}
			}
		}
	});
}

public static void main(String... args) {
	// Do nothing.
}
}