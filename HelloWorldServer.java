import org.vertx.java.platform.Verticle; // Every Java verticle must extend the class org.vertx.java.platform.Verticle. You must override the start method - this is called by Vert.x when the verticle is started.

// import org.vertx.java.core.Handler;
import org.vertx.java.core.buffer.Buffer;

// import org.vertx.java.core.http.HttpServer; // Interface
import org.vertx.java.core.http.HttpServerRequest;

import java.util.Map;
import java.lang.StringBuilder;


public class HelloWorldServer extends Verticle {
public static int numberOfClients;
static {
	numberOfClients=0;
}

///////////////////////////////////////////////
// Called when the verticle is deployed.
///////////////////////////////////////////////
@Override
public void start() {
	/////////////////////////////////////////////
	// Full exp.
	/////////////////////////////////////////////
	// vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
	// 	public void handle(HttpServerRequest req) {
	// 		// Handle the request (HttpServerRequest) such as responsing it.
	// 	}
	// }).listen(1001);
	
	/////////////////////////////////////////////
	// Lambda exp with chaining.
	/////////////////////////////////////////////
	vertx.createHttpServer().requestHandler( (HttpServerRequest req) -> {
		System.out.println("\n\nA client has connected! : "+(++numberOfClients)); // Why sometimes double counting? (favicon.ico request.)
		
		System.out.println("req.method(): "+req.method()); // GET, PUT, POST, DELETE, HEAD, OPTIONS, CONNECT, TRACE, PATCH
		System.out.println("req.version(): "+req.version()); // HTTP_1_1
		
		System.out.println("req.absoluteURI(): "+req.absoluteURI()); // (Uniform Resource Locator)
		System.out.println("req.uri(): "+req.uri());
		System.out.println("req.path(): "+req.path());
		System.out.println("req.query(): "+req.query());
			// http://localhost:1001/a/b/c/page.html?param1=abc&param2=xyz
			// => req.absoluteURI(): http://0.0.0.0:1001/a/b/c/page.html?param1=abc&param2=xyz&class=what
			// => req.uri(): /a/b/c/page.html?param1=abc&param2=xyz
			// => req.path(): /a/b/c/page.html
			// => req.query(): param1=abc&param2=xyz
		
		StringBuilder sb = new StringBuilder(); // to be printed in client side.
		StringBuilder sbConsole = new StringBuilder(); // to be printed in console.
		
		System.out.println("req.params(): "+req.params()); // org.vertx.java.core.http.CaseInsensitiveMultiMap@4ecce4
			// req.params() return Interface MultiMap (org.vertx.java.core.MultiMap).
		System.out.println("req.params().toString().trim(): "+req.params().toString().trim());
		System.out.println("    number of params: "+req.params().size());
		if (!req.params().isEmpty()) {
			sb.append("<h2>request.params()</h2>\n");
			for (Map.Entry<String, String> param: req.params().entries()) {
				sb.append("<b>")
					.append(param.getKey()).append("</b>: ")
					.append(param.getValue()).append("<br>\n");
				sbConsole.append("  ")
					.append(param.getKey()).append(": ")
					.append(param.getValue()).append("\n");
			}
			sb.append("<br>\n");
			System.out.println(sbConsole);
			// System.out.println(sbConsole.toString().replaceFirst("\\n$", ""));
			// System.out.println("  req.params().get(\"lang\"): "+req.params().get("lang"));
			sbConsole.delete(0, sbConsole.length());
		}
		
		System.out.println("req.headers(): "+req.headers()); // org.vertx.java.core.http.impl.HttpHeadersAdapter@43ab9bdc
			// headers() return Interface MultiMap (org.vertx.java.core.MultiMap).
		sb.append("<h2>request.headers()</h2>\n");
		for (Map.Entry<String, String> header: req.headers().entries()) {
			sb.append("<b>")
				.append(header.getKey()).append("</b>: ")
				.append(header.getValue()).append("<br>\n");
			sbConsole.append("  ")
				.append(header.getKey()).append(": ")
				.append(header.getValue()).append("\n");
		}
		sb.append("<br>\n");
		System.out.println(sbConsole);
		sbConsole.delete(0, sbConsole.length());
		// System.out.println("req.headers().get(\"Referer\"): "+req.headers().get("Referer"));
		
		System.out.println("req.remoteAddress(): "+req.remoteAddress());
			// java.net.InetSocketAddress
			// /0:0:0:0:0:0:0:1:10221 (What is this? Request/User ip.)
			// /127.0.0.1:11943 when accesed from vert.x client.
		System.out.println("req.localAddress(): "+req.localAddress());
			// java.net.InetSocketAddress
			// /0:0:0:0:0:0:0:1:1000 (Server ip)
		
		/////////////////////////////////////////////
		// Reading Data from the Request Body (Request Header is firstly handled, and Body is handled later.)
		/////////////////////////////////////////////
		final Buffer body = new Buffer(0);
		req.dataHandler( (Buffer data) -> {
			System.out.println("\nI received "+data.length()+" bytes.");
			System.out.println("data: "+data);
			body.appendBuffer(data);
		}); // receive each HTTP chunk of the request body.
		req.endHandler( (event) -> {
			System.out.println("\nHttpServerRequest including the total body is ended with body.length(): "+body.length()+" .");
			System.out.println("event: "+event);
			System.out.println("data: "+body);
		});
		
		//////////////////////////////////////////
		// response
		//////////////////////////////////////////
		// System.out.println("\nreq.response().headers(): "+req.response().headers());
		// for (Map.Entry<String, String> header: req.response().headers().entries()) {
		// 	sbConsole.append("  ")
		// 		.append(header.getKey()).append(": ")
		// 		.append(header.getValue()).append("\n");
		// }
		// System.out.println(sbConsole);
		// sbConsole.delete(0, sbConsole.length());
		
		req.response().setChunked(true); // To resolve HTTP chunked error (instead of setting Content-Length).
		
		req.response().headers().set("Content-Type","text/html");
		req.response().headers().set("Something","Anything");
		req.response()
			.putHeader("Some-Header", "elephants")
			.putHeader("Pants", "Absent");
		
		// I can't see the trailers in Client side.
		req.response().trailers().add("Philosophy", "Solipsism");
		req.response().trailers().add("Favourite-Shakin-Stevens-Song", "Behind the Green Door");
		req.response()
			.putTrailer("Cat-Food", "Whiskas")
			.putTrailer("Eye-Wear", "Monocle");
		
		// req.response().write("hello"); // error: java.lang.IllegalStateException: You must set the Content-Length header to be the total size of the message body BEFORE sending any data if you are not using HTTP chunked encoding.
		req.response().write("hello");
		req.response().write("This is testing!");
		// req.response().write(myBuffer);
		req.response().end("<h1>Hello World</h1>\n"+sb.toString());
		
		// req.response().close();
	}).listen(80); // or (80, "ip or hostname")
} // public void start()

///////////////////////////////////////////////
// Called when the verticle is undeployed.
///////////////////////////////////////////////
@Override
public void stop(){
	// do something.
} // public void stop()
}