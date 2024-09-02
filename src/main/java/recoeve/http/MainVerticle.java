package recoeve.http;



import io.vertx.core.AbstractVerticle;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import recoeve.db.FileMap;
import recoeve.db.FileMapWithVar;
import recoeve.db.RecoeveDB;

public class MainVerticle extends AbstractVerticle {
	public FileMap fileMap;
	public FileMapWithVar fileMapWithVar;
	public RecoeveWebClient recoeveWebClient;
	public RecoeveDB db;
	public String verticleId0;
	public String verticleId1;

	public MainVerticle() {
		vertx = Vertx.vertx();
		context = vertx.getOrCreateContext();
		fileMap = new FileMap(vertx);
		fileMapWithVar = new FileMapWithVar();
		db = new RecoeveDB(vertx);
		recoeveWebClient = new RecoeveWebClient(vertx, context, db);
	}

	@Override
	public void start(Promise<Void> startPromise) {
		JsonObject config = new JsonObject().put("maxDrivers", RecoeveWebClient.DEFAULT_MAX_DRIVERS);
		vertx.deployVerticle(recoeveWebClient, new DeploymentOptions(config))
			.onComplete(res -> {
				if (res.succeeded()) {
					verticleId0 = res.result();
					System.out.println("Deployment id is: " + verticleId0);
				}
				else {
					System.out.println("Deployment failed!");
				}
			});
		vertx.deployVerticle(new Recoeve(vertx, context, fileMap, fileMapWithVar, recoeveWebClient, db))
			.onComplete(res -> {
				if (res.succeeded()) {
					verticleId1 = res.result();
					System.out.println("Deployment id is: " + verticleId1);
				}
				else {
					System.out.println("Deployment failed!");
				}
			});
	}

	@Override
	public void stop(Promise<Void> stopPromise) {
		vertx.undeploy(verticleId0)
			.onComplete(res -> {
				if (res.succeeded()) {
					System.out.println("Undeployed ok.");
				}
				else {
					System.out.println("Undeploy failed!");
				}
			});
		vertx.undeploy(verticleId1)
			.onComplete(res -> {
				if (res.succeeded()) {
					System.out.println("Undeployed ok.");
				}
				else {
					System.out.println("Undeploy failed!");
				}
			});
		context = null;
		vertx = null;
		fileMap = null;
		fileMapWithVar = null;
		recoeveWebClient = null;
		db = null;
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
