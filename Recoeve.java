import org.vertx.java.platform.Verticle;

// import org.vertx.java.core.Handler;
// import org.vertx.java.core.http.HttpServer; // Interface
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.buffer.Buffer;

import java.util.Map;
import java.util.HashMap;

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
	public static final String ENCODING="UTF-8";
	public static final String INVALID_ACCESS="INVALID ACCESS";
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
		////////////////////////////////////
		// Console log.
		////////////////////////////////////
		System.out.println("\n\nA client has connected! : "+(++numberOfClients));
		final String now=db.now();
			System.out.println("Time : "+now);		
			System.out.println("Referer : "+req.headers().get("Referer"));
		
		final String method=req.method();
		final String path=req.path();
		final String query=req.query();
			System.out.println("Method : "+method);
			System.out.println("Absolute URI : "+req.absoluteURI());
		
		final String ip=req.remoteAddress().toString();
			System.out.println("IP : "+ip);
			System.out.println("Local Address : "+req.localAddress());
		
		////////////////////////////////////
		// Session cookie 확인.
		////////////////////////////////////
		final Cookie cookie=new Cookie(req.headers().get("Cookie"));
		final boolean sessionPassed=db.sessionCheck(cookie);
		System.out.println("Session passed? : "+sessionPassed);
		
		String tmpLang=req.params().get("lang");
		if (tmpLang==null) {
			tmpLang=cookie.get("lang");
			if (tmpLang==null) { tmpLang="en"; }
		}
		final String lang=tmpLang;
		System.out.println("Lang : "+lang);
		
		if (path.equals("/favicon.ico")) {
			System.out.println("Sending favicon.ico");
			req.response().sendFile("favicon.ico");
		} else if (path.equals("/jquery.min.js")) {
			System.out.println("Sending jquery.min.js");
			req.response().putHeader("Content-Type","text/javascript");
			req.response().end(FileMap.get("jquery.min.js", "df"), ENCODING);
		} else if (path.equals("/")) {
			req.response().putHeader("Content-Type", "text/html; charset=utf-8");
			if (sessionPassed) {
				req.response().end(FileMapWithVar.get("user-page.html", lang, db.varMapMyPage(cookie)), ENCODING);
			} else {
				req.response().end(FileMap.get("log-in.html", lang), ENCODING);
			}
		} else if (path.startsWith("/user/")) {
			String user=path.substring(6);
				// faster than path.replaceFirst("^/user/","");
			String[] userSplit=user.split("/");
			if (userSplit.length==1) {
				boolean userExists=!db.idAvailable(userSplit[0]);
				System.out.println("Sending a user-page (user exists:"+userExists+") : "+userSplit[0]);
				req.response().putHeader("Content-Type","text/html; charset=utf-8");
				if (userExists) {
					req.response().end(FileMapWithVar.get("user-page.html", lang, db.varMapUserPage(cookie, userSplit[0])), ENCODING);
				} else {
					req.response().end("User does not exist.", ENCODING);
				}
			} else if (userSplit.length==2&&method.equals("POST")) {
				req.response().putHeader("Content-Type","text/plain; charset=utf-8");
				switch (userSplit[1]) {
					case "get-Recos":
						req.bodyHandler( (Buffer data) -> {
							req.response().end(db.getRecos(userSplit[0], new StrArray(data.toString())), ENCODING);
						} );
						break;
					case "get-UriList":
						req.bodyHandler( (Buffer data) -> {
							req.response().end(db.getStringCatUriList(userSplit[0], new StrArray(data.toString())), ENCODING);
						} );
					default:
						req.response().end(INVALID_ACCESS, ENCODING);
				}
			} else {
				req.response().end(INVALID_ACCESS, ENCODING);
			}
		} else if (path.startsWith("/account/")) {
			String toDo=path.substring(9);
				// faster than path.replaceFirst("^/account/","");
			req.response().putHeader("Content-Type","text/html; charset=utf-8");
			switch (toDo) {
			case "log-in":
				if (sessionPassed) {
					System.out.println("Redirecting to path=/");
					req.response().end(FileMap.get("to-user-page.html", lang), ENCODING);
				} else if (cookie.get("rmbdI")==null) {
					System.out.println("Sending log-in.html");
					req.response().end(FileMap.get("log-in.html",lang), ENCODING);
				} else if (method.equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						BodyData inputs=new BodyData(data.toString());
						String setCookieRMB=db.authUserFromRmbd(cookie, inputs, ip);
						// System.out.println(setCookieRMB);
						req.response().putHeader("Set-Cookie", setCookieRMB);
						if (setCookieRMB.startsWith("I=")) {
							// Success: Session cookie and New token.
							System.out.println("log-in : Remembered user.");
							req.response().end(FileMap.get("to-user-page.html","df"), ENCODING);
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
			case "pwd_iteration":
				req.response().putHeader("Content-Type","text/plain");
				if (sessionPassed) {
					req.response().end("pwd_iteration : You are already logged in Recoeve.", ENCODING);
				} else if (method.equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						String dataStr=data.toString();
						int i=dataStr.indexOf("\t");
						String idType=dataStr.substring(0,i);
						String id=dataStr.substring(i+1);
						String iter=db.getPwdIteration(idType, id);
						System.out.println("pwd_iteration for "+idType+" "+id+" : "+iter);
						req.response().end(iter, ENCODING);
					});
				} else {
					req.response().end(INVALID_ACCESS, ENCODING);
				}
				break;
			case "log-in.do":
				if (sessionPassed) {
					// You are already logged in.
					System.out.println("log-in.do : Sending You are already logged in...");
					req.response().end(FileMap.get("to-user-page.html",lang), ENCODING);
				} else if (method.equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						BodyData inputs=new BodyData(data.toString());
						System.out.println("data:\n"+inputs.toString());
						String setCookieSSN=db.authUser(inputs, ip);
						if (setCookieSSN!=null) {
							// Log-in success!
							req.response().putHeader("Set-Cookie", setCookieSSN);
							System.out.println("log-in.do : Log-in success! ID or E-mail: "+inputs.get("userId"));
							req.response().end(FileMap.get("to-user-page.html","df"), ENCODING);
						} else {
							// Log-in failed.
							System.out.println("log-in.do : Log-in failed.");
							req.response().end("Log-in failed.", ENCODING);
						}
					} );
				} else {
					System.out.println("log-in.do : invalid method "+method);
					req.response().end(INVALID_ACCESS, ENCODING);
				}
				break;
			case "log-out":
				req.response().putHeader("Set-Cookie", db.logout());
					// Delete UserSession if exists. (cookie check.)
					// Delete UserRemember if exists. (cookie check.)
					// Erase all cookies
				req.response().end(FileMap.get("log-out.html", lang), ENCODING);
				break;
			case "check":
				if (method.equals("POST")) {
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
					System.out.println("check : invalid method "+method);
					req.response().end(INVALID_ACCESS, ENCODING);
				}
				break;
			case "sign-up":
				if (method.equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						System.out.println(data.toString());
						BodyData inputs=new BodyData(data.toString());
						System.out.println("data :\n"+inputs);
						if (db.checkAuthToken(inputs, ip, now)) {
							System.out.println("Token is verified.");
							if (db.createUser(inputs, ip, now)) {
								Map<String,String> varMap=new HashMap<String,String>();
								varMap.put("{--user email--}", inputs.get("userEmail"));
								req.response().end(FileMapWithVar.get("signed-up.html", lang, varMap), ENCODING);
							} else {
								req.response().end("Error occured during registration. Please sign-up again.", ENCODING);
							}
						} else {
							System.out.println("Token is invalid.");
							req.response().end("Token is invalid.", ENCODING);
						}
					} );
				} else {
					System.out.println("sign-up : invalid method "+method);
					req.response().end(INVALID_ACCESS, ENCODING);
				}
				break;
			default:
				if (toDo.startsWith("verify/")) {
					if (sessionPassed) {
						// VeriKey check.
						if (db.verifyUser(cookie.get("I"), toDo.replaceFirst("verify/",""), ip)) {
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
					req.response().end(INVALID_ACCESS);
				}
			}
		} else if (path.startsWith("/reco/")) {
			String toDo=path.replaceFirst("^/reco/","");
			switch (toDo) {
			case "infos":
				req.response().putHeader("Content-Type","text/plain");
				if (sessionPassed&&method.equals("POST")) {
					req.bodyHandler( (Buffer data) -> {
						String res=db.recoInfos(Long.parseLong(cookie.get("I")), data.toString());
						req.response().end(res);
					} );
				}
				break;
			case "do":
				req.response().putHeader("Content-Type","text/plain");
				if (sessionPassed&&method.equals("POST")) {
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
				if (sessionPassed&&method.equals("POST")) {
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
			String toDo=path.replaceFirst("^/changeOrders/","");
			if (sessionPassed&&toDo.equals("CatList")&&method.equals("POST")) {
				req.bodyHandler( (Buffer data) -> {
					req.response().end(""+db.changeOrdersCatList(Long.parseLong(cookie.get("I")), data.toString()));
				} );
			} else {
				req.response().end("Not a proper access.");
			}
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
	}).listen(80); // RecoeveDB.port
} // public void start()
} // public class Recoeve extends Verticle