package recoeve.http;

import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;



public class RecoeveWebClient {
public static final WebClientOptions options=new WebClientOptions().setMaxHeaderSize(16384).setFollowRedirects(true);
public WebClient webClient;

public RecoeveWebClient() {
	webClient=WebClient.create(Recoeve.vertx, options);
}

public static void main(String... args) {
	// Do nothing.
}}