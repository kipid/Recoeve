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
public RecoeveDB db;

@Override
public void start() {
	vertx=getVertx();
	fileMap=new FileMap(vertx);
	fileMapWithVar=new FileMapWithVar();
	recoeveWebClient=new RecoeveWebClient(vertx);
	db=new RecoeveDB(vertx);
	vertx.deployVerticle(new Recoeve(vertx, fileMap, fileMapWithVar, recoeveWebClient, db));
	// vertx.deployVerticle(new UnderConstruction(vertx, db));
}

public static void main(String... args) {
	MainVerticle verticle=new MainVerticle();
	verticle.init(verticle.vertx, verticle.context);
	verticle.start();
}
}
