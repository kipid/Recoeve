package recoeve.http;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Context;
import io.vertx.core.DeploymentOptions;
// import io.vertx.core.Promise;
import io.vertx.core.Vertx;

import recoeve.db.*;

public class MainVerticle extends AbstractVerticle {
	public Context context;
	public Vertx vertx;
	public FileMap fileMap;
	public FileMapWithVar fileMapWithVar;
	public RecoeveWebClient recoeveWebClient;
	public RecoeveDB db;
	private String verticleId;
	private String verticleId1;

	@Override
	public void start() {
		vertx = getVertx();
		fileMap = new FileMap(vertx);
		fileMapWithVar = new FileMapWithVar();
		recoeveWebClient = new RecoeveWebClient(vertx, db);
		db = new RecoeveDB(vertx);
		vertx.deployVerticle(
				new Recoeve(vertx, fileMap, fileMapWithVar, recoeveWebClient, db),
				new DeploymentOptions(),
				(h) -> {
					if (h.succeeded()) {
						verticleId = h.result();
					}
					else {
						System.out.println("Cause " + h.cause());
					}
				});
		vertx.deployVerticle(
				new Recoeve(vertx, fileMap, fileMapWithVar, recoeveWebClient, db),
				new DeploymentOptions(),
				(h) -> {
					if (h.succeeded()) {
						verticleId1 = h.result();
					}
					else {
						System.out.println("Cause " + h.cause());
					}
				});
		// vertx.deployVerticle(new UnderConstruction(vertx, db));
	}

	@Override
	public void stop() {
		vertx.undeploy(verticleId);
		vertx.undeploy(verticleId1);
		context = null;
		vertx = null;
		fileMap = null;
		fileMapWithVar = null;
		recoeveWebClient = null;
		db = null;
	}

	public static void main(String... args) {
		MainVerticle verticle = new MainVerticle();
		verticle.init(verticle.vertx, verticle.context);
		verticle.start();
	}
}
