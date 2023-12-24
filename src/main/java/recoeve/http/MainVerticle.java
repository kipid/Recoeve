package recoeve.http;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;

import recoeve.db.*;

public class MainVerticle extends AbstractVerticle {
public Vertx vertx;
public FileMap fileMap;
public FileMapWithVar fileMapWithVar;
public RecoeveWebClient recoeveWebClient;

@Override
public void start() {
	vertx=getVertx();
	fileMap=new FileMap(vertx);
	fileMapWithVar=new FileMapWithVar();
	recoeveWebClient=new RecoeveWebClient(vertx);
	vertx.deployVerticle(new Recoeve(vertx, fileMap, fileMapWithVar, recoeveWebClient));
}

public static void main(String... args) {
	MainVerticle verticle=new MainVerticle();
	verticle.start();
}
}
