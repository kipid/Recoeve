import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.platform.Verticle;
 
public class HelloWorldServer extends Verticle {
	private static long numberOfClients;
	static {
		numberOfClients=0;
	}
	
	@Override
public void start() {
	// Using lambda expression of JAVA,
	// ```
	// vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
	//	public void handle(HttpServerRequest req) { req: doing something }
	// }
	// ```
	// can become simple like this.
	vertx.createHttpServer().requestHandler( (HttpServerRequest req) -> {
		System.out.println("\n\nA client has connected! : "+(++numberOfClients));
			// Why sometimes double counting? (favicon.ico request.)
		
		System.out.println("req.method(): "+req.method());
			// GET, PUT, POST, DELETE, HEAD, OPTIONS, CONNECT, TRACE, PATCH
		// System.out.println("req.version(): "+req.version()); // HTTP_1_1
		
		// System.out.println("req.absoluteURI(): "+req.absoluteURI()); // (Uniform Resource Indicator/Locator)
		// System.out.println("req.uri(): "+req.uri()); // /path/and?query=a&some=data
		System.out.println("req.path(): "+req.path()); // /path/and
		// System.out.println("req.query(): "+req.query()); // query=a&some=data
		// req.uri(), req.path(), req.query()
		
		// StringBuilder sbConsole = new StringBuilder(); // to be printed in console.
		
		// System.out.println("req.params(): "+req.params().toString().trim()); // org.vertx.java.core.http.CaseInsensitiveMultiMap@4ecce4
		// System.out.println("    number of params: "+req.params().size());
		// // params() return Interface MultiMap (org.vertx.java.core.MultiMap).
		// if (!req.params().isEmpty()) {
		// 	for (Map.Entry<String, String> param: req.params().entries()) {
		// 		sbConsole.append("  ")
		// 			.append(param.getKey()).append(": ")
		// 			.append(param.getValue()).append("\n");
		// 	}
		// 	System.out.println(sbConsole.toString().replaceFirst("\\n$", ""));
		// 	sbConsole.delete(0, sbConsole.length());
		// 	// System.out.println("  req.params().get(\"lang\"): "+req.params().get("lang"));
		// }
		
		// System.out.println("req.headers(): "+req.headers()); // org.vertx.java.core.http.impl.HttpHeadersAdapter@43ab9bdc
		// headers() return Interface MultiMap (org.vertx.java.core.MultiMap).
		// for (Map.Entry<String, String> header: req.headers().entries()) {
		// 	sbConsole.append("  ")
		// 		.append(header.getKey()).append(": ")
		// 		.append(header.getValue()).append("\n");
		// }
		// sbConsole.append("  Cookie : "+req.headers().get("Cookie")+"\n");
		// System.out.println(sbConsole);
		// sbConsole.delete(0, sbConsole.length());
		
		System.out.println("req.remoteAddress(): "+req.remoteAddress()); // java.net.InetSocketAddress
			// /0:0:0:0:0:0:0:1:10221 (What is this? Request/User ip.)
		System.out.println("req.localAddress(): "+req.localAddress()); // java.net.InetSocketAddress
			// /0:0:0:0:0:0:0:1:1000 (Server ip)
		
		// System.out.println("\nreq.response().headers(): "+req.response().headers());
		// for (Map.Entry<String, String> header: req.response().headers().entries()) {
		// 	sbConsole.append("  ")
		// 		.append(header.getKey()).append(": ")
		// 		.append(header.getValue()).append("\n");
		// }
		// System.out.println(sbConsole);
		// sbConsole.delete(0, sbConsole.length());
		
		req.response().headers().set("Content-Type","text/html");
		req.response().end("<h1>Hello World. This is testing from recoeve.</h1>");
	}).listen(80, "172.31.13.32");
} // public void start()
}