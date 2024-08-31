package recoeve.http;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.CompositeFuture;
import io.vertx.core.Context;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Future;
// import io.vertx.core.DeploymentOptions;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;

import java.util.List;

import recoeve.db.*;

public class MainVerticle extends AbstractVerticle {
	public Context context;
	public Vertx vertx;
	public FileMap fileMap;
	public FileMapWithVar fileMapWithVar;
	public RecoeveWebClient recoeveWebClient;
	public RecoeveDB db;
	private String verticleId;
	// private String verticleId1;

	@Override
	public void start(Promise<Void> startPromise) {
		vertx = getVertx();
		context = vertx.getOrCreateContext();
		fileMap = new FileMap(vertx);
		fileMapWithVar = new FileMapWithVar();
		db = new RecoeveDB(vertx);
		recoeveWebClient = new RecoeveWebClient(vertx, db);
		JsonObject config = new JsonObject().put("maxDrivers", RecoeveWebClient.DEFAULT_MAX_DRIVERS);
		Future<String> deploy1 = vertx.deployVerticle(recoeveWebClient, new DeploymentOptions(config))
			.onComplete(res -> {
				if (res.succeeded()) {
					verticleId = res.result();
					System.out.println("Deployment id is: " + verticleId);
				}
				else {
					System.out.println("Deployment failed!");
				}
			});
		Future<String> deploy2 = vertx.deployVerticle(new Recoeve(vertx, fileMap, fileMapWithVar, recoeveWebClient, db)
			// 	, new DeploymentOptions()
			// 	, (h) -> {
			// 		if (h.succeeded()) {
			// 			verticleId = h.result();
			// 		}
			// 		else {
			// 			System.out.println("Cause " + h.cause());
			// 		}
			// 	}
			)
			.onComplete(res -> {
				if (res.succeeded()) {
					verticleId = res.result();
					System.out.println("Deployment id is: " + verticleId);
				}
				else {
					System.out.println("Deployment failed!");
				}
			});

		CompositeFuture.all(List.of(deploy1, deploy2))
			.onSuccess(results -> {
				System.out.println("Result 1:" + results.resultAt(0));
				System.out.println("Result 2:" + results.resultAt(1));
				startPromise.complete();
			})
			.onFailure(throwable -> {
				startPromise.fail(throwable);
			});
	}

	@Override
	public void stop(Promise<Void> stopPromise) {
		vertx.undeploy(verticleId)
			.onComplete(res -> {
				if (res.succeeded()) {
					System.out.println("Undeployed ok.");
					stopPromise.complete();
				}
				else {
					System.out.println("Undeploy failed!");
					stopPromise.fail("Undeploy failed!");
				}
			});
		// context = null;
		// vertx = null;
		// fileMap = null;
		// fileMapWithVar = null;
		// recoeveWebClient = null;
		// db = null;
	}

	public static void main(String... args) {
		MainVerticle verticle = new MainVerticle();
		verticle.init(verticle.vertx, verticle.context);
		try {
			verticle.start();
		} catch (Exception err) {
			RecoeveDB.err(err);
		}
	}
}
