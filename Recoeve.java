import io.vertx.core.AbstractVerticle;
import io.vertx.core.Verticle;

// import org.vertx.java.core.Handler;
// import org.vertx.java.core.http.HttpServer; // Interface
import io.vertx.core.buffer.Buffer;
// import io.vertx.core.http.ClientAuth;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.net.JksOptions;
import io.vertx.core.net.TCPSSLOptions;
import io.vertx.ext.web.Router;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.net.URLDecoder;
	// deprecated API?

// import java.io.File;
// import java.io.FileReader;
// import java.io.IOException;
import java.io.UnsupportedEncodingException;

// import java.lang.StringBuffer;
import java.lang.StringBuilder;

import recoeve.http.Cookie;
import recoeve.http.BodyData;
import recoeve.db.RecoeveDB;
import recoeve.db.FileMap;
import recoeve.db.FileMapWithVar;
import recoeve.db.StrArray;



public class Recoeve extends AbstractVerticle {
	public static final String host
		="0.0.0.0";
		// ="192.168.1.4";
		// ="localhost";
	public static final String ENCODING="UTF-8";
	public static final String INVALID_ACCESS="INVALID ACCESS";
	private static long numberOfClients;
	static {
		numberOfClients=0;
	}

	@Override
public void start() {
	RecoeveDB db=new RecoeveDB();

	Router router = Router.router(vertx);

	router.route().handler(ctx -> {
		HttpServerRequest req=ctx.request();
	// vertx.createHttpServer(
		// new HttpServerOptions()
			// .setSsl(true)
			// .setKeyStoreOptions(new JksOptions()
			// 	.setPath("C:/Recoeve/server-keystore.jks")
			// 	.setPassword("wibble")
			// )
			// .setLogActivity(true)
			// .setUseAlpn(true)
			// .setTrustOptions(new JksOptions()
			// 	.setPath("C:/Recoeve/keystore")
			// 	.setPassword("Xs41Kipid$ps15")
			// )
			// .setClientAuthRequired(false)
			// .setClientAuth(ClientAuth.NONE)
			// .addEnabledSecureTransportProtocol(TCPSSLOptions.DEFAULT_ENABLED_SECURE_TRANSPORT_PROTOCOLS.get(1))
			// .addEnabledSecureTransportProtocol("TLSv1.3")
			// .setEnabledSecureTransportProtocols(TCPSSLOptions.DEFAULT_ENABLED_SECURE_TRANSPORT_PROTOCOLS)
	// ).requestHandler( (HttpServerRequest req) -> {
		////////////////////////////////////
		// Console log.
		////////////////////////////////////
		System.out.println("\n\nA client has connected! : "+(++numberOfClients));
		final String now=db.now();
		final String referer=req.headers().get("Referer");
			System.out.println("Time : "+now);
			System.out.println("Referer : "+URLDecoder.decode(referer));
		boolean refererAllowed=false;
		if (referer==null) {
			refererAllowed=true;
		} else if (referer.substring(0,4).toLowerCase().equals("http")) {
			int k=4;
			if (referer.charAt(k)=='s'||referer.charAt(k)=='S') {
				k++;
			}
			if (referer.startsWith("://",k)) {
				k+=3;
				int l=referer.indexOf('/',k);
				String refererHost=null;
				if (l==-1) {
					refererHost=referer.substring(k);
				} else {
					refererHost=referer.substring(k,l);
				}
				refererAllowed=FileMap.refererAllowed(refererHost);
				// System.out.println("Referer Host : "+refererHost);
			}
		}
		// System.out.println("Referer Allowed : "+refererAllowed);

		final HttpMethod method=req.method();
		final String path=req.path();
		final String query=req.query();
			System.out.println("Method : "+method);
			System.out.println("Absolute URI : "+URLDecoder.decode(req.absoluteURI()));

		final String ip=req.remoteAddress().toString();
			System.out.println("IP : "+ip);
			System.out.println("Local Address : "+req.localAddress());

		////////////////////////////////////
		// Session cookie 확인.
		////////////////////////////////////
		final Cookie cookie=new Cookie(req.headers().get("Cookie"));
		final boolean sessionPassed=db.sessionCheck(cookie);
			System.out.println("Cookie : "+cookie);
			System.out.println("Session passed? : "+sessionPassed);

		String tmpLang=req.params().get("lang");
		if (tmpLang==null) {
			tmpLang=cookie.get("lang");
			if (tmpLang==null) { tmpLang="en"; }
		}
		final String lang=tmpLang;
		System.out.println("Lang : "+lang);

		String img=FileMap.getImg(path);
		if (img!=null) {
			req.response().sendFile(img);
			System.out.println("Sended "+img);
		} else if (refererAllowed&&path.equals("/jquery.min.js")) {
			req.response().putHeader("Content-Type","text/javascript");
			req.response().end(FileMap.get("jquery.min.js", "df"), ENCODING);
			System.out.println("Sended jquery.min.js");
		} else if (path.equals("/")) { // e.g. path=/
			req.response().putHeader("Content-Type", "text/html; charset=utf-8");
			if (cookie.get("I")!=null||cookie.get("rmbdI")!=null) {
				req.response().end(FileMapWithVar.get("user-page.html", lang, db.varMapMyPage(cookie)), ENCODING);
				System.out.println("Sended user-page.html");
			} else {
				req.response().end(FileMap.get("to-log-in.html",lang), ENCODING); // window.location.pathname="/account/log-in";
				System.out.println("Sended to-log-in.html"); // redirecting to /account/log-in since rmbd cookie is to be checked too.
			}
		} else if (path.startsWith("/user/")) { // e.g. path=/user/kipid
			String user=path.substring(6);
				// faster than path.replaceFirst("^/user/","");
			String[] userSplit=user.split("/");
			userSplit[0]=URLDecoder.decode(userSplit[0]);
			if (userSplit.length==1) { // e.g. path=/user/kipid
				boolean userExists=db.idExists(userSplit[0]);
				req.response().putHeader("Content-Type","text/html; charset=utf-8");
				if (userExists) {
					req.response().end(FileMapWithVar.get("user-page.html", lang, db.varMapUserPage(cookie, userSplit[0])), ENCODING);
					System.out.println("Sended user-page.html");
				} else {
					req.response().end("User does not exist.", ENCODING);
					System.out.println("Sended 'User does not exist.'");
				}
			} else if (userSplit.length==2&&method==HttpMethod.POST) { // e.g. path=/user/kipid/get-Recos
				req.response().putHeader("Content-Type","text/plain; charset=utf-8");
				switch (userSplit[1]) {
					case "get-Recos": // e.g. path=/user/kipid/get-Recos
						req.bodyHandler( (Buffer data) -> {
							req.response().end(db.getRecos(userSplit[0], new StrArray(data.toString())), ENCODING);
							System.out.println("Sended recos");
						} );
						break;
					case "get-UriList": // e.g. path=/user/kipid/get-UriList
						req.bodyHandler( (Buffer data) -> {
							req.response().end(db.getStringCatUriList(userSplit[0], new StrArray(data.toString())), ENCODING);
							System.out.println("Sended uriLists");
						} );
						break;
					// case "get-Neighbors":
					// 	req.bodyHandler( (Buffer data) -> {
					// 		req.response().end(db.getStrOfNeighbors(userSplit[0], new StrArray(data.toString())), ENCODING);
					// 		System.out.println("Sended neighbors.");
					// 	} );
					// 	break;
					// case "/get-URI-cats-val":
					// 	req.bodyHandler( (Buffer data) -> {
					// 		req.response().end(db.getUriCatsVal(userSplit[0], new StrArray(data.toString())), ENCODING);
					// 		System.out.println("Sended URI-cats-val.");
					// 	} );
					// 	break;
					default:
						req.response().end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS);
				}
			} else {
				req.response().end(INVALID_ACCESS, ENCODING);
				System.out.println(INVALID_ACCESS);
			}
		} else if (refererAllowed&&path.startsWith("/account/")) { // e.g. path=/account/log-in
			String toDo=path.substring(9); // faster than path.replaceFirst("^/account/","");
			req.response().putHeader("Content-Type","text/html; charset=utf-8");
			switch (toDo) {
			case "changePwd": // path=/account/changePwd
				if (db.checkChangePwdToken(req.params(), now)) {
					req.response().end(FileMap.get("changePwd.html", lang), ENCODING);
					System.out.println("Sended changePwd.html");
				} else {
					req.response().end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS);
				}
				break;
			case "getNewSalt": // path=/account/getNewSalt
				if (method==HttpMethod.POST) {
					req.bodyHandler( (Buffer data) -> {
						String dataStr=data.toString();
						int i=dataStr.indexOf("\t");
						if (i>0) {
							String id=dataStr.substring(0,i);
							String token=dataStr.substring(i+1);
							if (db.checkChangePwdToken(id, token, now)) {
								String new_salt = db.getNewPwdSalt("id", id);
								req.response().end(new_salt, ENCODING);
								System.out.println("Sended new password_salt. :: "+new_salt);
							} else {
								req.response().end("Invalid token.", ENCODING);
								System.out.println("Invalid token.");
							}
						}
					});
				} else {
					req.response().end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (method:"+method+")");
				}
				break;
			case "changePwd.do": // path=/account/changePwd.do
				if (method==HttpMethod.POST) {
					req.bodyHandler( (Buffer data) -> {
						BodyData inputs=new BodyData(data.toString());
						System.out.println("data :\n"+inputs);
						if (db.checkChangePwdToken(inputs.get("userId"), inputs.get("token"), now)) {
							System.out.println("Token is verified. "+inputs.get("userId"));
							if (db.changePwd(inputs, ip, now)) {
								// Map<String,String> varMap=new HashMap<String,String>();
								// varMap.put("{--user email--}", inputs.get("userEmail"));
								req.response().end("Your password is changed.", ENCODING);
							} else {
								req.response().end("Error occured during changing password. Please try again.", ENCODING);
							}
						} else {
							System.out.println("Token is invalid.");
							req.response().end("Token is invalid.", ENCODING);
						}
					} );
				} else {
					System.out.println("Change password : invalid method "+method);
					req.response().end(INVALID_ACCESS, ENCODING);
				}
				break;
			case "log-in": // path=/account/log-in
				if (sessionPassed) {
					req.response().end(FileMapWithVar.get("user-page.html", lang, db.varMapMyPage(cookie)), ENCODING);
					System.out.println("Sended user-page.html (already logged-in)");
				} else if (cookie.get("rmbdI")!=null) {
					req.response().end(FileMap.get("remember-me.html",lang), ENCODING);
					System.out.println("Sended remember-me.html");
				} else {
					req.response().end(FileMap.get("log-in.html",lang), ENCODING);
					System.out.println("Sended log-in.html (No rmbd cookie)");
				}
				break;
			case "log-in/remember-me.do": // path=/account/log-in/remember-me.do
				if (method==HttpMethod.POST) {
					req.bodyHandler( (Buffer data) -> {
						StrArray inputs=new StrArray(data.toString());
						List<io.vertx.core.http.Cookie> setCookieRMB=db.authUserFromRmbd(cookie, inputs, ip);
						for (io.vertx.core.http.Cookie singleCookie: setCookieRMB) {
							req.response().addCookie(singleCookie);
							System.out.println(singleCookie.getName()+" : "+singleCookie.getValue());
						}
						if (setCookieRMB.get(0).getName()=="I") {
							// Success: Session cookie and New token.
							req.response().end("Rmbd", ENCODING);
							System.out.println("Sended Rmbd with Set-Cookie of session and new rmbd token. (Succeed in remembering the user.)");
						} else { // if (setCookieRMB.startsWith("rmbdI="))
							// Failed: Delete rmbd cookie.
							req.response().end("Failed", ENCODING);
							System.out.println("Sended 'Failed' with Set-Cookie of deleting rmbd cookie. (Fail in remembering the user.)");
						}
					} );
				} else {
					req.response().end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (method:"+method+")");
				}
				break;
			case "pwd_iteration": // path=/account/pwd_iteration
				req.response().putHeader("Content-Type","text/plain");
				if (sessionPassed) {
					req.response().end("pwd_iteration : You are already logged in Recoeve.", ENCODING);
					System.out.println("Sended 'You are already logged in Recoeve.'");
				} else if (method==HttpMethod.POST) {
					req.bodyHandler( (Buffer data) -> {
						String dataStr=data.toString();
						int i=dataStr.indexOf("\t");
						if (i>0) {
							String idType=dataStr.substring(0,i);
							String id=dataStr.substring(i+1);
							String iter=db.getPwdIteration(idType, id);
							req.response().end(iter, ENCODING);
							System.out.println("Sended pwd_iteration for "+idType+" "+id+" : "+iter);
						} else {
							req.response().end("Not proper data.", ENCODING);
							System.out.println("Not proper data. : "+dataStr);
						}
					});
				} else {
					req.response().end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (method:"+method+")");
				}
				break;
			case "log-in.do": // path=/account/log-in.do
				if (method==HttpMethod.POST) {
					req.bodyHandler( (Buffer data) -> {
						StrArray inputs=new StrArray(data.toString());
						List<io.vertx.core.http.Cookie> setCookieSSN=db.authUser(inputs, ip);
						if (setCookieSSN!=null) {
							// Log-in success!
							for (io.vertx.core.http.Cookie singleCookie: setCookieSSN) {
								req.response().addCookie(singleCookie);
							}
							req.response().end("log-in success", ENCODING);
							System.out.println("Sended log-in success :: "+inputs.get(1, "idType")+" : "+inputs.get(1, "userId"));
						} else {
							// Log-in failed.
							req.response().end("log-in fail", ENCODING);
							System.out.println("log-in fail :: "+inputs.get(1, "idType")+" : "+inputs.get(1, "userId"));
						}
					} );
				} else {
					req.response().end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (method : "+method+")");
				}
				break;
			case "log-out": // path=/account/log-out
				List<io.vertx.core.http.Cookie> setDelCookie=db.logout(cookie);
				for (io.vertx.core.http.Cookie singleCookie: setDelCookie) {
					req.response().addCookie(singleCookie);
				}
				req.response().end(FileMap.get("log-in.html", lang), ENCODING);
				System.out.println("Sended log-in.html with Set-Cookie of deleting all cookies.");
				break;
			case "check": // path=/account/check
				if (method==HttpMethod.POST) {
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
			case "forgotPwd": // path=/account/forgotPwd
				req.response().putHeader("Content-Type","text/plain");
				if (method==HttpMethod.POST) {
					req.bodyHandler( (Buffer data) -> {
						StrArray inputs=new StrArray(data.toString());
						String forgotPwd=db.forgotPwd(inputs, lang);
						req.response().end(forgotPwd, ENCODING);
						System.out.println(forgotPwd);
					} );
				} else {
					System.out.println("forgotPwd : invalid method "+method);
					req.response().end(INVALID_ACCESS, ENCODING);
				}
				break;
			case "sign-up": // path=/account/sign-up
				if (method==HttpMethod.POST) {
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
				if (toDo.startsWith("verify/")) { // path=/account/verify/dislwx.....
					if (sessionPassed) {
						// VeriKey check.
						if (db.verifyUser(cookie.get("I"), URLDecoder.decode(toDo.replaceFirst("verify/","")), ip)) {
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
		} else if (path.equals("/sessionIter")) {
			String iter = db.sessionIter(cookie);
			System.out.println("iter : "+iter);
			req.response().end(iter);
		} else if (path.equals("/reco")) {
			req.response().putHeader("Content-Type", "text/html; charset=utf-8");
			if (sessionPassed) {
				req.response().end(FileMapWithVar.get("user-page.html", lang, db.varMapMyPage(cookie)), ENCODING);
				System.out.println("Sended user-page.html");
			} else {
				req.response().end(FileMap.get("to-log-in.html",lang), ENCODING); // window.location.pathname="/account/log-in";
				System.out.println("Sended to-log-in.html"); // redirecting to /account/log-in since rmbd cookie is to be checked too.
			}
		} else if (path.equals("/multireco")) {
			req.response().putHeader("Content-Type", "text/html; charset=utf-8");
			String[] querySplit=query.split("&");
			Map<String,String> queryMap=new HashMap<String,String>();
			for (int i=0;i<querySplit.length;i++) {
				String[] keyValue=querySplit[i].split("=", 2);
				if (keyValue.length>1) {
					queryMap.put(keyValue[0], keyValue[1]);
				} else {
					queryMap.put(keyValue[0], "");
				}
			}
			req.response().end(FileMapWithVar.get("multireco.html", lang, db.varMapUserPage(cookie, queryMap.get("user"))), ENCODING);
			System.out.println("Sended multireco.html");
		} else if (refererAllowed&&method==HttpMethod.POST&&path.startsWith("/reco/")) { // e.g. path=/reco/do
			// String toDo=path.replaceFirst("^/reco/","");
			String toDo=path.substring(6);
			switch (toDo) {
			case "infos": // path=/reco/infos
				req.response().putHeader("Content-Type","text/plain");
				req.bodyHandler( (Buffer data) -> {
					String res=db.recoInfos(data.toString());
					req.response().end(res);
				} );
				break;
			case "descs": // path=/reco/descs
				req.response().putHeader("Content-Type","text/plain");
				req.bodyHandler( (Buffer data) -> {
					String res=db.recoDescs(data.toString());
					req.response().end(res);
				} );
				break;
			case "do": // path=/reco/do
				if (sessionPassed) {
					req.response().putHeader("Content-Type","text/plain");
					req.bodyHandler( (Buffer data) -> {
						String res=db.recoDo(Long.parseLong(cookie.get("I"),16), data.toString());
						req.response().end(res);
					} );
				} else {
					req.response().end("No session.");
				}
				break;
			case "put": // path=/reco/put
				if (sessionPassed) {
					req.response().putHeader("Content-Type","text/plain");
					req.bodyHandler( (Buffer data) -> {
						String res=db.putReco(Long.parseLong(cookie.get("I"),16), data.toString());
						req.response().end(res);
					} );
				} else {
					req.response().end("No session.");
				}
				break;
			}
		} else if (refererAllowed&&sessionPassed&&path.startsWith("/changeOrders/")) { // e.g. path=/changeOrders/CatList
			String toDo=path.substring(14); // faster than path.replaceFirst("^/changeOrders/","");
			if (toDo.equals("CatList")&&method==HttpMethod.POST) {
				req.bodyHandler( (Buffer data) -> {
					req.response().end(""+db.changeOrdersCatList(Long.parseLong(cookie.get("I"),16), data.toString()));
				} );
			} else {
				req.response().end("Not a proper access.");
			}
		} else {
			System.out.println(INVALID_ACCESS);
			req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			req.response().end(INVALID_ACCESS, ENCODING);
		}
	});

	vertx.createHttpServer().requestHandler(router).listen(80); // RecoeveDB.port
} // public void start()
} // public class Recoeve extends Verticle