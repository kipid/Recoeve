import org.vertx.java.platform.Verticle;

// import org.vertx.java.core.Handler;
// import org.vertx.java.core.http.HttpServer; // Interface
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.buffer.Buffer;

import java.util.Map;
// import java.util.HashMap;

// import java.net.URLDecoder;

// import java.io.File;
// import java.io.FileReader;
// import java.io.IOException;

// import java.lang.StringBuffer;
import java.lang.StringBuilder;

import recoeve.http.Cookie;
import recoeve.http.BodyData;
import recoeve.db.RecoeveDB;
import recoeve.db.FileMap;
import recoeve.db.FileMapWithVar;
import recoeve.db.StrArray;



public class Recoeve extends Verticle {
	public static final String FILEPATH="html/";
	public static final String ENCODING="UTF-8";
	private static long numberOfClients;
	static {
		numberOfClients=0;
	}
	
	@Override
public void start() {
	RecoeveDB db=new RecoeveDB();
	/////////////////////////////////////////////
	// Lambda exp with chaining.
	/////////////////////////////////////////////
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
		
		String path=req.path();
		if (path.contains("..")) {
			path="invalid.html";
		}
		
		////////////////////////////////////
		// Session cookie 확인.
		////////////////////////////////////
		String ip=req.remoteAddress().toString();
		// String log="web";
		Cookie cookie=new Cookie(req.headers().get("Cookie"));
		boolean sessionPassed=db.sessionCheck(cookie);
			System.out.println("Session passed? : "+sessionPassed);
		String lang=req.params().get("lang");
		if (lang==null) {
			lang=cookie.get("lang");
			if (lang==null) { lang="en"; }
		}
		
		if (path.equals("/")) {
			req.response().putHeader("Content-Type","text/html; charset=utf-8");
			if (sessionPassed) {
				req.response().end(FileMapWithVar.get("my-page.html", lang, db.varMapMyPage(cookie)), ENCODING);
			} else {
				req.response().end(FileMap.get("log-in-first.html",lang), ENCODING);
			}
		} else if (path.startsWith("/user/")) {
			path=path.replaceFirst("^/user/","");
			String[] pathSplit=path.split("/");
			if (pathSplit.length==1) {
				boolean userExists=!db.idAvailable(pathSplit[0]);
				System.out.println("Sending a user-page ("+userExists+") : "+pathSplit[0]);
				req.response().putHeader("Content-Type","text/html; charset=utf-8");
				if (userExists) {
					req.response().end(FileMapWithVar.get("my-page.html", lang, db.varMapUserPage(cookie, pathSplit[0])), ENCODING);
				} else {
					req.response().end("User doesn't exist.", ENCODING);
				}
			} else {
				req.response().putHeader("Content-Type","text/plain; charset=utf-8");
				if (pathSplit[1].equals("get-Recoes")&&pathSplit.length==2&&req.method().equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						String res=db.getRecoes(pathSplit[0], new StrArray(data.toString()));
						req.response().end(res);
					} );
				}
				//  else if (pathSplit[1].equals("get-CatList")&&pathSplit.length==2) {
				// 	String res=db.getStringCatList(pathSplit[0]);
				// 	req.response().end(res, ENCODING);
				// } else if (pathSplit[1].equals("get-UriList")&&pathSplit.length==2&&req.method().equals("POST")) {
				// 	req.bodyHandler( (Buffer data) -> {
				// 		String res=db.getStringCatUriList(pathSplit[0], new StrArray(data.toString()));
				// 		req.response().end(res);
				// 	} );
				// }
			}
		} else if (path.startsWith("/account/")) {
			path=path.replaceFirst("^/account/","");
			req.response().putHeader("Content-Type","text/html; charset=utf-8");
		switch (path) {
			case "pwd_iteration":
				if (sessionPassed) {
					// You are already logged in.
					System.out.println("pwd_iteration : Sending You are already logged in...");
					req.response().end("pwd_iteration : You are already logged in Recoeve.", ENCODING);
				} else if (req.method().equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						String dataStr=data.toString();
						int i=dataStr.indexOf("\t");
						String idType=dataStr.substring(0,i);
						String id=dataStr.substring(i+1);
						String iter=db.getPwdIteration(idType, id);
						System.out.println("pwd_iteration : iter "+iter);
						req.response().end(iter, ENCODING);
					});
				} else {
					System.out.println("pwd_iteration : invalid method "+req.method());
					req.response().end("invalid access", ENCODING);
				}
				break;
			// case "log-in.css":
			// 	System.out.println("log-in.css");
			// 	req.response().putHeader("Content-Type","text/css; charset=utf-8");
			// 	req.response().end(FileMap.get("log-in.css",lang), ENCODING);
			// 	break;
			// case "log-in.js":
			// 	System.out.println("log-in.js");
			// 	req.response().putHeader("Content-Type","text/javascript; charset=utf-8");
			// 	req.response().end(FileMap.get("log-in.js",lang), ENCODING);
			// 	break;
			case "log-in":
				if (sessionPassed) {
					// You are already logged in.
					System.out.println("log-in : Sending You are already logged in...");
					req.response().end("log-in : You are already logged in Recoeve.", ENCODING);
				} else if (cookie.get("rmbdI")==null) {
					System.out.println("log-in : Sending log-in.html");
					// if (lang!=null){
					// 	req.response().putHeader("Set-Cookie", "lang="+lang+";expires=...");
					// }
					req.response().end(FileMap.get("log-in.html",lang), ENCODING);
				} else if (req.method().equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						BodyData inputs=new BodyData(data.toString());
						String setCookieRMB=db.authUserFromRmbd(cookie, inputs, ip);
						// System.out.println(setCookieRMB);
						req.response().putHeader("Set-Cookie", setCookieRMB);
						if (setCookieRMB.startsWith("I=")) {
							// Success: Session cookie and New token.
							System.out.println("log-in : Remembered user.");
							req.response().end(FileMap.get("to-my-page.html","df"), ENCODING);
						} else { // if (setCookieRMB.startsWith("rmbdI=")) 
							// Failed: Delete rmbd cookie.
							System.out.println("log-in : Failed Remembering user.");
							req.response().end("You have failed to log in with remembered http-only cookie.", ENCODING);
						}
					} );
				} else {
					System.out.println("log-in : Sending remember-me.html");
					req.response().end(FileMap.get("remember-me.html",lang), ENCODING);
				}
				break;
			case "log-in.do":
				if (sessionPassed) {
					// You are already logged in.
					System.out.println("log-in.do : Sending You are already logged in...");
					req.response().end(FileMap.get("to-my-page.html",lang), ENCODING);
				} else if (req.method().equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						BodyData inputs=new BodyData(data.toString());
						System.out.println("data:\n"+inputs.toString());
						String now=db.now();
						String setCookieSSN=db.authUser(inputs, ip);
						if (setCookieSSN!=null) {
							// Log-in success!
							req.response().putHeader("Set-Cookie", setCookieSSN);
							System.out.println("log-in.do : Log-in success! ID or E-mail: "+inputs.get("userId"));
							req.response().end(FileMap.get("to-my-page.html","df"), ENCODING);
						} else {
							// Log-in failed.
							System.out.println("log-in.do : Log-in failed.");
							req.response().end("Log-in failed.", ENCODING);
						}
					} );
				} else {
					System.out.println("log-in.do : invalid method "+req.method());
					req.response().end("invalid access", ENCODING);
				}
				break;
			case "log-out":
				// Delete UserSession if exists. (cookie check.)
				// Delete UserRemember if exists. (cookie check.)
				// Erase all cookies
				req.response().putHeader("Set-Cookie", db.logout());
				req.response().end(FileMap.get("log-out.html","df"), ENCODING);
				break;
			case "check":
				if (req.method().equals("POST")) {
					// req.response().putHeader("Content-Type","text/plain");
					req.bodyHandler( (Buffer data) -> {
						String dataStr=data.toString();
						int i=dataStr.indexOf("\t");
						String id=dataStr.substring(0,i);
						String email=dataStr.substring(i+1);
						boolean idAvailable=db.idAvailable(id);
						boolean emailAvailable=db.emailAvailable(email);
						System.out.println("Checking: "+id+" and "+email);
						System.out.println("Availability: "+idAvailable+"\t"+emailAvailable);
						String now=db.now();
						if (idAvailable&&emailAvailable) {
							byte[] token=db.randomBytes(128);
							req.response().end(
								idAvailable+"\t"+emailAvailable+"\t"+(db.createAuthToken(now, ip, token) ? now+"\t"+db.hex(token):"Token is not created.")
							, ENCODING);
						} else {
							db.logsCommit(1, now, ip, "chk", false, "ID: "+id+" ["+idAvailable+"] and E-mail: "+email+" ["+emailAvailable+"] availability check.");
								// `user_i`=1 for anonymous.
							req.response().end(
								idAvailable+"\t"+emailAvailable
							, ENCODING);
						}
					} );
				} else {
					System.out.println("check : invalid method "+req.method());
					req.response().end("invalid access", ENCODING);
				}
				break;
			case "sign-up":
				if (req.method().equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						System.out.println(data.toString());
						BodyData inputs=new BodyData(data.toString());
						System.out.println("data :\n"+inputs);
						String now=db.now();
						if (db.checkAuthToken(inputs, ip, now)) {
							System.out.println("Token is verified.");
							if (db.createUser(inputs, ip, now)) {
								// req.response().sendFile("signed-up.html");
								req.response().end("Your account is created. Log in first, and check your e-mail and verify your account within a day.", ENCODING);
							} else {
								req.response().end("Error occured during registration. Please sign-up again.", ENCODING);
							}
						} else {
							System.out.println("Token is invalid.");
							req.response().end("Token is invalid.", ENCODING);
						}
					} );
				} else {
					System.out.println("sign-up : invalid method "+req.method());
					req.response().end("invalid access", ENCODING);
				}
				break;
			default:
				if (path.startsWith("verify/")) {
					if (sessionPassed) {
						// VeriKey check.
						if (db.verifyUser(cookie.get("I"), path.replaceFirst("verify/",""), ip)) {
							// User is verified.
							req.response().end("You are verified.", ENCODING);
						} else {
							// User is NOT verified.
							req.response().end("Wrong verification key.", ENCODING);
						}
					} else {
						// Log-in 유도.
						req.response().end("Please log in first to verify your account.", ENCODING);
					}
				} else {
					// invalid.html?
					req.response().end("invalid access");
				}
		}} else if (path.startsWith("/reco/")) {
			path=path.replaceFirst("^/reco/","");
			switch (path) {
			case "infos":
				req.response().putHeader("Content-Type","text/plain");
				if (sessionPassed&&req.method().equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						String res=db.recoInfos(Long.parseLong(cookie.get("I")), data.toString());
						req.response().end(res);
					} );
				}
				break;
			case "do":
				req.response().putHeader("Content-Type","text/plain");
				if (sessionPassed&&req.method().equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						String res=db.recoDo(Long.parseLong(cookie.get("I")), data.toString());
						req.response().end(res);
					} );
				}
				break;
			case "reco-test":
				System.out.println("Reco-musics-test.html");
				req.response().putHeader("Content-Type","text/html; charset=utf-8");
				req.response().end(FileMap.get("Reco-musics-test.html",lang), ENCODING);
				break;
			case "put":
				req.response().putHeader("Content-Type","text/plain");
				if (sessionPassed&&req.method().equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						String res=db.putReco(Long.parseLong(cookie.get("I")), data.toString());
						req.response().end(res);
						// StrArray sa=new StrArray(data.toString());
						// System.out.println(sa);
						// req.response().end("Hello! This is response.");
					} );
				} else {
					req.response().end("You are not logged in, or request is not POST.");
				}
				break;
			}
		} else if (path.startsWith("/changeOrders/")) {
			path=path.replaceFirst("^/changeOrders/","");
			if (sessionPassed&&path.equals("CatList")&&req.method().equals("POST")) {
				req.bodyHandler( (Buffer data) -> {
					req.response().end(""+db.changeOrdersCatList(Long.parseLong(cookie.get("I")), data.toString()));
				} );
			} else {
				req.response().end("Not a proper access.");
			}
		} else if (path.equals("/favicon.ico")) {
			System.out.println("Sending a file : "+path);
			req.response().sendFile("wrong/favicon.ico");
		} else if (path.equals("/jquery.min.js")) {
			System.out.println("Sending a jquery.min.js");
			req.response().putHeader("Content-Type","text/javascript");
			req.response().end(FileMap.get("jquery.min.js","df"), ENCODING);
		} else {
			req.response().putHeader("Content-Type","text/html; charset=utf-8");
			if (sessionPassed) {
				// Give some datas???
				System.out.println("Sending ");
				req.response().end("You are being logged in Recoeve, but accessed the wrong address.", ENCODING);
			} else {
				// Redirecting to "/account/log-in" with back path???
				System.out.println("Sending log-in-first.html...");
				req.response().end("Log in first", ENCODING);
			}
		}
	}).listen(RecoeveDB.port);
} // public void start()
} // public class Recoeve extends Verticle