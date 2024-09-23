package recoeve.http;



import java.sql.SQLException;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;
import io.vertx.core.impl.logging.Logger;
import io.vertx.core.impl.logging.LoggerFactory;
import recoeve.db.FileMap;
import recoeve.db.FileMapWithVar;
import recoeve.db.RecoeveDB;

public class MainVerticle extends AbstractVerticle {
	private static final Logger LOG = LoggerFactory.getLogger(MainVerticle.class);
	public FileMap fileMap;
	public FileMapWithVar fileMapWithVar;
	public RecoeveWebClient recoeveWebClient;
	public RecoeveDB db;
	public Recoeve recoeve;
	public String verticleId0;
	public String verticleId1;

	public MainVerticle() {
		vertx = Vertx.vertx();
		context = vertx.getOrCreateContext();
		fileMap = new FileMap(vertx);
		fileMapWithVar = new FileMapWithVar();
		db = new RecoeveDB(vertx);
		recoeveWebClient = new RecoeveWebClient(vertx, context, db);
		recoeve = new Recoeve(vertx, context, fileMap, fileMapWithVar, recoeveWebClient, db);
		LOG.info("MainVerticle created.");
	}

	@Override
	public void start(Promise<Void> startPromise) {
		LOG.info("Start " + getClass().getName() + " on tread " + Thread.currentThread().getName());
		// JsonObject config = new JsonObject().put("maxDrivers", RecoeveWebClient.DEFAULT_MAX_DRIVERS);
		// Future<String> deploy0 = vertx.deployVerticle(recoeveWebClient, new DeploymentOptions(config).setInstances(1))
		// 	.onComplete(res -> {
		// 		if (res.succeeded()) {
		// 			verticleId0 = res.result();
		// 			System.out.println("Deployment id is: " + verticleId0);
		// 			LOG.info("RecoeveWebClient is deployed.");
		// 		}
		// 		else {
		// 			System.out.println("Deployment failed!");
		// 			LOG.error("RecoeveWebClient is NOT deployed.");
		// 		}
		// 	});
		// Future<String> deploy1 = vertx.deployVerticle(recoeve, new DeploymentOptions().setInstances(1))
		// 	.onComplete(res -> {
		// 		if (res.succeeded()) {
		// 			verticleId1 = res.result();
		// 			System.out.println("Deployment id is: " + verticleId1);
		// 			LOG.info("Recoeve is deployed.");
		// 		}
		// 		else {
		// 			System.out.println("Deployment failed!");
		// 			LOG.error("Recoeve is NOT deployed.");
		// 		}
		// 	});
		// Future.all(deploy0, deploy1).onComplete((res) -> {
		// 	startPromise.complete();
		// });
	}

	@Override
	public void stop(Promise<Void> stopPromise) {
		// Future<Void> undeploy0 = vertx.undeploy(verticleId0)
		// 	.onComplete(res -> {
		// 		if (res.succeeded()) {
		// 			System.out.println("Undeployed ok.");
		// 		}
		// 		else {
		// 			System.out.println("Undeploy failed!");
		// 		}
		// 	});
		// Future<Void> undeploy1 = vertx.undeploy(verticleId1)
		// 	.onComplete(res -> {
		// 		if (res.succeeded()) {
		// 			System.out.println("Undeployed ok.");
		// 		}
		// 		else {
		// 			System.out.println("Undeploy failed!");
		// 		}
		// 	});
		context = null;
		vertx = null;
		fileMap = null;
		fileMapWithVar = null;
		recoeveWebClient.cleanupDrivers();
		recoeveWebClient = null;
		try {
			if (db.con != null) {
				db.con.close();
			}
		} catch (SQLException err) {
			System.out.println("SQLException: " + err.getMessage());
		}
		db = null;
		// Future.all(undeploy0, undeploy1).onComplete(res -> {
			recoeve.httpServer.close(ar -> {
				if (ar.succeeded()) {
					System.out.println("HTTP server closed successfully.");
					stopPromise.complete();
				} else {
					System.err.println("Failed to close HTTP server: " + ar.cause());
					stopPromise.fail(ar.cause());
				}
				stopPromise.complete();
			});
			recoeve = null;
		// });
	}

	public static void main(String... args) {
		MainVerticle verticle = new MainVerticle();
		try {
			verticle.start();
		} catch (Exception err) {
			RecoeveDB.err(err);
		}
	}
}
