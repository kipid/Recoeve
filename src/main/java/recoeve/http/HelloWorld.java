package recoeve.http;

import io.vertx.core.AbstractVerticle;
// import io.vertx.example.util.Runner;
import io.vertx.ext.web.Router;

/*
 * @author <a href="http://tfox.org">Tim Fox</a>
 */
public class HelloWorld extends AbstractVerticle {

  // Convenience method so you can run it in your IDE
  public static void main(String[] args) {
    // Runner.runExample(HelloWorld.class);
  }

  @Override
  public void start() throws Exception {

    Router router = Router.router(vertx);

    router.route().handler(routingContext -> {
      routingContext.response().putHeader("content-type", "text/html").end("Hello World!");
    });

    vertx.createHttpServer().requestHandler(router).listen(80);
  }
}