package recoeve.http;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.net.JksOptions;
import io.vertx.core.net.TCPSSLOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;

import java.sql.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.net.URLDecoder;
	// deprecated API?

import java.io.UnsupportedEncodingException;

import java.lang.StringBuilder;

import recoeve.http.Cookie;
import recoeve.http.BodyData;
import recoeve.db.RecoeveDB;
import recoeve.db.FileMap;
import recoeve.db.FileMapWithVar;
import recoeve.db.StrArray;



public class Recoeve extends AbstractVerticle {
public static final String HOST
	// ="recoeve.net";
	// ="0.0.0.0";
	="localhost";
public static final String ENCODING="UTF-8";
public static final String INVALID_ACCESS="INVALID ACCESS";

@Override
public void start() {
Router router=Router.router(vertx);

router.get("/CDN/:fileName").handler(ctx -> { // e.g. path=/CDN/icon-Recoeve.png
	PrintLog.printLog(ctx);
	if (PrintLog.refererAllowed) { // referer check.
		String fileName=null;
		try {
			fileName=URLDecoder.decode(ctx.pathParam("fileName"), "UTF-8");
		}
		catch (UnsupportedEncodingException e) {
			System.out.println(e);
			fileName=ctx.pathParam("fileName");
		}
		if (fileName!=null&&!fileName.isEmpty()) {
			String[] fileNameSplit=fileName.split("\\.");
			switch (fileNameSplit[fileNameSplit.length-1]) {
				case "ico":
					PrintLog.req.response().putHeader("Content-Type","image/x-icon");
					break;
				case "png":
					PrintLog.req.response().putHeader("Content-Type","image/png");
					break;
				case "jpeg": case "jpg":
					PrintLog.req.response().putHeader("Content-Type","image/jpeg");
					break;
				case "css":
					PrintLog.req.response().putHeader("Content-Type","text/css; charset=utf-8");
					break;
				case "js":
					PrintLog.req.response().putHeader("Content-Type","text/javascript; charset=utf-8");
					break;
				case "webm":
					PrintLog.req.response().putHeader("Content-Type","video/webm");
					break;
				case "html":
					PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
					break;
				default:
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			}
			// TODO: Check if a file with fileName exists.
			PrintLog.req.response().sendFile(fileName); // TODO: Cache file datas in memory to response faster.
			System.out.println("Sended "+fileName+".");
		}
		else {
			PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (fileName is null or empty.: "+fileName+")");
		}
	}
	else {
		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
		System.out.println(INVALID_ACCESS+" (Referer not allowed.)");
	}
});

// String[] pathSplit=path.split("/");
router.get("/").handler(ctx -> { // path=/
	PrintLog.printLog(ctx);
	if (PrintLog.cookie.get("I")!=null||PrintLog.cookie.get("rmbdI")!=null) {
		PrintLog.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
		PrintLog.req.response().end(FileMapWithVar.get("user-page.html", PrintLog.lang, PrintLog.db.varMapMyPage(PrintLog.cookie)), ENCODING); // to "/user/:userId". (Cookie owner's page)
		System.out.println("Sended user-page.html");
	}
	else {
		PrintLog.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
		PrintLog.req.response().end(FileMap.get("log-in.html", PrintLog.lang), ENCODING); // to "/account/log-in".
		System.out.println("Sended log-in.html"); // redirecting to /account/log-in since rmbd cookie is to be checked too.
	}
});

router.get("/:fileName").handler(ctx -> {
	PrintLog.printLog(ctx);
	if (PrintLog.refererAllowed) { // referer check.
		String fileName=null;
		try {
			fileName=URLDecoder.decode(ctx.pathParam("fileName"), "UTF-8");
		}
		catch (UnsupportedEncodingException e) {
			System.out.println(e);
			fileName=ctx.pathParam("fileName");
		}
		if (fileName!=null&&!fileName.isEmpty()) {
			switch (fileName) {
				case "jquery.js": // e.g. path=/jquery.js
					PrintLog.req.response().putHeader("Content-Type","text/javascript");
					PrintLog.req.response().end(FileMap.get("jquery.js", PrintLog.lang), ENCODING);
					System.out.println("Sended jquery.js.");
					break;
				case "prepare.js": // e.g. path=/prepare.js
					PrintLog.req.response().putHeader("Content-Type","text/javascript");
					PrintLog.req.response().end(FileMap.get("prepare.js", PrintLog.lang), ENCODING);
					System.out.println("Sended prepare.js.");
					break;
				case "sessionIter": // e.g. path=/sessionIter
					String iter=PrintLog.db.sessionIter(PrintLog.cookie);
					PrintLog.req.response().putHeader("Content-Type", "text/plain");
					PrintLog.req.response().end(iter);
					System.out.println("iter: "+iter);
					break;
				case "reco": // e.g. path=/reco
					PrintLog.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
					PrintLog.req.response().end(FileMapWithVar.get("user-page.html", PrintLog.lang, PrintLog.db.varMapMyPage(PrintLog.cookie)), ENCODING);
					System.out.println("Sended user-page.html. URI [?search] will be handled by javascript.");
					break;
				case "robots.txt": // e.g. path=/robots.txt
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().end(FileMap.get("robots.txt", "df"), ENCODING);
					System.out.println("Sended robots.txt.");
					break;
				default:
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS);
			}
		}
		else {
			PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (fileName is null or empty.: "+fileName+")");
		}
	}
	else {
		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
		System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
	}
});

router.get("/user/:userId/*").handler(ctx -> { // e.g. path=/user/kipid[/mode/multireco]?cat=...
	PrintLog.printLog(ctx);
	if (PrintLog.refererAllowed) { // referer check.
		String userId=null;
		try {
			userId=URLDecoder.decode(ctx.pathParam("userId"), "UTF-8");
		}
		catch (UnsupportedEncodingException e) {
			System.out.println(e);
			userId=ctx.pathParam("userId");
		}
		if (userId!=null&&!userId.isEmpty()&&PrintLog.db.idExists(userId)) {
			PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
			PrintLog.req.response().end(FileMapWithVar.get("user-page.html", PrintLog.lang, PrintLog.db.varMapUserPage(PrintLog.cookie, userId)), ENCODING);
			System.out.println("Sended user-page.html");
		}
		else {
			String res=FileMap.replaceStr("<h1>[--User does not exist.--] UserID="+userId+"</h1>", PrintLog.lang);
			PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
			PrintLog.req.response().end(res, ENCODING);
			System.out.println("Sended '"+res+"'");
		}
	}
	else {
		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
		System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
	}
});

router.post("/user/:userId/*").handler(ctx -> { // e.g. path=/user/kipid/get-Recos
	PrintLog.printLog(ctx);
	if (PrintLog.refererAllowed) { // referer check.
		String userId=null;
		try {
			userId=URLDecoder.decode(ctx.pathParam("userId"), "UTF-8");
		}
		catch (UnsupportedEncodingException e) {
			System.out.println(e);
			userId=ctx.pathParam("userId");
		}
		final String finalUserId=userId;
		if (finalUserId!=null&&!finalUserId.isEmpty()&&PrintLog.db.idExists(finalUserId)) {
			String wildcard=PrintLog.req.getParam("param0");
			switch (wildcard) {
				case "get-Recos": // e.g. path=/user/kipid/get-Recos
					PrintLog.req.bodyHandler((Buffer data) -> {
						PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
						PrintLog.req.response().end(PrintLog.db.getRecos(finalUserId, new StrArray(data.toString())), ENCODING);
						System.out.println("Sended recos.");
					});
					break;
				case "get-UriList": // e.g. path=/user/kipid/get-UriList
					PrintLog.req.bodyHandler((Buffer data) -> {
						PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
						PrintLog.req.response().end(PrintLog.db.getStringCatUriList(finalUserId, new StrArray(data.toString())), ENCODING);
						System.out.println("Sended uriLists.");
					});
					break;
				// case "get-Neighbors": // e.g. path=/user/kipid/get-Neighbors
				// 	PrintLog.req.bodyHandler((Buffer data) -> {
				// 		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
				// 		PrintLog.req.response().end(PrintLog.db.getStrOfNeighbors(user, new StrArray(data.toString())), ENCODING);
				// 		System.out.println("Sended neighbors.");
				// 	});
				// 	break;
				// case "/get-URI-cats-val": // e.g. path=/user/kipid/get-URI-cats-val
				// 	PrintLog.req.bodyHandler((Buffer data) -> {
				// 		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
				// 		PrintLog.req.response().end(PrintLog.db.getUriCatsVal(user, new StrArray(data.toString())), ENCODING);
				// 		System.out.println("Sended URI-cats-val.");
				// 	});
				// 	break;
				default:
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS);
			}
		}
		else {
			String res=FileMap.replaceStr("[--User does not exist.--] UserID="+finalUserId, PrintLog.lang);
			PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			PrintLog.req.response().end(res, ENCODING);
			System.out.println("Sended '"+res+"'");
		}
	}
	else {
		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
		System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
	}
});

router.post("/reco/:toDo").handler(ctx -> {
	PrintLog.printLog(ctx);
	if (PrintLog.refererAllowed) { // referer check.
		String toDo=ctx.pathParam("toDo");
		switch (toDo) {
			case "defs": // path=/reco/defs
				PrintLog.req.bodyHandler((Buffer data) -> {
					final String uri=data.toString();
					String res=PrintLog.db.recoDefs(uri);
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().end(res);
					System.out.println("Sended defs of uri="+uri+".");
				});
				break;
			case "do": // path=/reco/do
				if (PrintLog.sessionPassed) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						final String recoStr=data.toString();
						String res=PrintLog.db.recoDo(Long.parseLong(PrintLog.cookie.get("I"), 16), recoStr);
						PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
						PrintLog.req.response().end(res);
						System.out.println("Do reco:\n"+recoStr);
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().end("No session.");
					System.out.println("No session.");
				}
				break;
			case "put": // path=/reco/put
				if (PrintLog.sessionPassed) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						final String recoStr=data.toString();
						String res=PrintLog.db.putReco(Long.parseLong(PrintLog.cookie.get("I"), 16), recoStr);
						PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
						PrintLog.req.response().end(res);
						System.out.println("Put reco:\n"+recoStr);
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().end("No session.");
					System.out.println("No session.");
				}
				break;
			default:
				PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
				PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				System.out.println(INVALID_ACCESS+" (Invalid URI.)");
		}
	}
	else {
		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
		System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
	}
});

router.route("/account/:toDo").handler(ctx -> { // e.g. path=/account/...
	PrintLog.printLog(ctx);
	if (PrintLog.refererAllowed) { // referer check.
		String toDo=ctx.pathParam("toDo");
		switch (toDo) {
			case "changePwd": // path=/account/changePwd
				if (PrintLog.db.checkChangePwdToken(PrintLog.req.params(), PrintLog.now)) {
					PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
					PrintLog.req.response().end(FileMap.get("changePwd.html", PrintLog.lang), ENCODING);
					System.out.println("Sended changePwd.html.");
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS);
				}
				break;
			case "getNewSalt": // path=/account/getNewSalt
				if (PrintLog.method==HttpMethod.POST) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						final String dataStr=data.toString();
						int i=dataStr.indexOf("\t");
						if (i>0) {
							String id=dataStr.substring(0,i);
							String token=dataStr.substring(i+1);
							boolean tokenChecked=PrintLog.db.checkChangePwdToken(id, token, PrintLog.now);
							System.out.println("tokenChecked: "+tokenChecked);
							if (tokenChecked) {
								String new_salt=PrintLog.db.getNewPwdSalt("id", id);
								PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
								PrintLog.req.response().end(new_salt, ENCODING);
								System.out.println("Sended new password_salt: "+new_salt+".");
							}
							else {
								PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
								PrintLog.req.response().end("Invalid token.", ENCODING);
								System.out.println("Invalid token.");
							}
						}
						else {
							PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
							PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							System.out.println(INVALID_ACCESS+" (Invalid form: no tab.)");
						}
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (Invalid method: "+PrintLog.method+")");
				}
				break;
			case "changePwd.do": // path=/account/changePwd.do
				if (PrintLog.method==HttpMethod.POST) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						BodyData inputs=new BodyData(data.toString());
						System.out.println("data:\n"+inputs);
						if (PrintLog.db.checkChangePwdToken(inputs.get("userId"), inputs.get("token"), PrintLog.now)) {
							System.out.println("Token is verified. User ID: "+inputs.get("userId"));
							if (PrintLog.db.changePwd(inputs, PrintLog.ip, PrintLog.now)) {
								final String res=FileMap.replaceStr("[--Your password is changed.--]", PrintLog.lang);
								PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
								PrintLog.req.response().end(res, ENCODING);
								System.out.println("Sended "+res);
							}
							else {
								final String res=FileMap.replaceStr("[--Error occured during changing password. Please try again.--]", PrintLog.lang);
								PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
								PrintLog.req.response().end(res, ENCODING);
								System.out.println("Sended "+res);
							}
						}
						else {
							final String res=FileMap.replaceStr("[--Token is invalid.--]", PrintLog.lang);
							PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
							PrintLog.req.response().end(res, ENCODING);
							System.out.println("Sended "+res);
						}
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (Invalid method: "+PrintLog.method+")");
				}
				break;
			case "log-in": // path=/account/log-in
				if (PrintLog.sessionPassed) {
					PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
					PrintLog.req.response().end(FileMapWithVar.get("user-page.html", PrintLog.lang, PrintLog.db.varMapMyPage(PrintLog.cookie)), ENCODING);
					System.out.println("Sended user-page.html. (already logged-in)");
				}
				else if (PrintLog.cookie.get("rmbdI")!=null) {
					PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
					PrintLog.req.response().end(FileMap.get("remember-me.html", PrintLog.lang), ENCODING);
					System.out.println("Sended remember-me.html.");
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
					PrintLog.req.response().end(FileMap.get("log-in.html", PrintLog.lang), ENCODING);
					System.out.println("Sended log-in.html. (No rmbd cookie)");
				}
				break;
			case "pwd_iteration": // path=/account/pwd_iteration
				if (PrintLog.sessionPassed) {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().end("pwd_iteration: You are already logged in Recoeve.", ENCODING);
					System.out.println("Sended 'You are already logged in Recoeve.'");
				}
				else if (PrintLog.method==HttpMethod.POST) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						String dataStr=data.toString();
						int i=dataStr.indexOf("\t");
						if (i>0) {
							String idType=dataStr.substring(0,i);
							String id=dataStr.substring(i+1);
							String iter=PrintLog.db.getPwdIteration(idType, id);
							PrintLog.req.response().end(iter, ENCODING);
							System.out.println("Sended pwd_iteration for "+idType+" "+id+": "+iter);
						}
						else {
							PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
							PrintLog.req.response().end("Invalid form of data (no tab).", ENCODING);
							System.out.println("Invalid form of data (no tab). dataStr: "+dataStr);
						}
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (Invalid method: "+PrintLog.method+")");
				}
				break;
			case "log-in.do": // path=/account/log-in.do
				if (PrintLog.method==HttpMethod.POST) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						StrArray inputs=new StrArray(data.toString());
						List<io.vertx.core.http.Cookie> setCookieSSN=PrintLog.db.authUser(inputs, PrintLog.ip);
						if (setCookieSSN!=null) {
							// Log-in success!
							for (io.vertx.core.http.Cookie singleCookie: setCookieSSN) {
								PrintLog.req.response().addCookie(singleCookie);
							}
							PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
							PrintLog.req.response().end("log-in success", ENCODING);
							System.out.println("Sended log-in success: "+inputs.get(1, "idType")+": "+inputs.get(1, "userId"));
						}
						else {
							// Log-in failed.
							PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
							PrintLog.req.response().end("log-in fail", ENCODING);
							System.out.println("log-in fail: "+inputs.get(1, "idType")+": "+inputs.get(1, "userId"));
						}
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (Invalid method: "+PrintLog.method+")");
				}
				break;
			case "log-out": // path=/account/log-out
				List<io.vertx.core.http.Cookie> setDelCookie=PrintLog.db.logout(PrintLog.cookie);
				for (io.vertx.core.http.Cookie singleCookie: setDelCookie) {
					PrintLog.req.response().addCookie(singleCookie);
				}
				PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
				PrintLog.req.response().end(FileMap.get("log-in.html", PrintLog.lang), ENCODING);
				System.out.println("Sended log-in.html with Set-Cookie of deleting all cookies.");
				break;
			case "check": // path=/account/check
				if (PrintLog.method==HttpMethod.POST) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						String dataStr=data.toString();
						int i=dataStr.indexOf("\t");
						String id=dataStr.substring(0,i);
						String email=dataStr.substring(i+1);
						boolean idAvailable=PrintLog.db.idAvailable(id);
						boolean emailAvailable=PrintLog.db.emailAvailable(email);
						System.out.println("Checking: "+id+" and "+email);
						System.out.println("Availability: "+idAvailable+"\t"+emailAvailable);
						if (idAvailable&&emailAvailable) {
							byte[] token=PrintLog.db.randomBytes(128);
							PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
							PrintLog.req.response().end(
								idAvailable+"\t"+emailAvailable+"\t"+(PrintLog.db.createAuthToken(PrintLog.now, PrintLog.ip, token)?PrintLog.now+"\t"+PrintLog.db.hex(token):"Token is not created.")
							, ENCODING);
							System.out.println("Both ID: "+id+" and email: "+email+" are available. So a token is created.");
						}
						else {
							PrintLog.db.logsCommit(1 // `user_i`=1 for anonymous.
								, PrintLog.now, PrintLog.ip, "chk", false, "ID: "+id+" ["+idAvailable+"] and E-mail: "+email+" ["+emailAvailable+"] availability check.");
							PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
							PrintLog.req.response().end(
								idAvailable+"\t"+emailAvailable
							, ENCODING);
							System.out.println("ID: "+id+" is available? "+idAvailable+", and email: "+email+" is available? "+emailAvailable);
						}
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println("check: invalid method "+PrintLog.method);
				}
				break;
			case "forgotPwd": // path=/account/forgotPwd
				if (PrintLog.method==HttpMethod.POST) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						StrArray inputs=new StrArray(data.toString());
						String forgotPwd=PrintLog.db.forgotPwd(inputs, PrintLog.lang);
						PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
						PrintLog.req.response().end(forgotPwd, ENCODING);
						System.out.println("Sended forgotPwd: "+forgotPwd);
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println("forgotPwd: invalid method "+PrintLog.method);
				}
				break;
			case "sign-up": // path=/account/sign-up
				if (PrintLog.method==HttpMethod.POST) {
					PrintLog.req.bodyHandler((Buffer data) -> {
						StrArray inputs=new StrArray(data.toString());
						if (PrintLog.db.checkAuthToken(inputs, PrintLog.ip, PrintLog.now)) {
							System.out.println("Token is verified.");
							if (PrintLog.db.createUser(inputs, PrintLog.ip, PrintLog.now)) {
								Map<String,String> varMap=new HashMap<String,String>();
								varMap.put("{--user id--}", inputs.get(1, "userId"));
								varMap.put("{--user email--}", inputs.get(1, "userEmail"));
								PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
								PrintLog.req.response().end(FileMapWithVar.get("signed-up.html", PrintLog.lang, varMap), ENCODING);
								System.out.println("Sended signed-up.html.");
							}
							else {
								final String res=FileMap.replaceStr("[--Error occured during registration. Please sign-up again.--]", PrintLog.lang);
								PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
								PrintLog.req.response().end(res, ENCODING);
								System.out.println("Sended "+res);
							}
						}
						else {
							PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
							PrintLog.req.response().end("Token is invalid.", ENCODING);
							System.out.println("Token is invalid.");
						}
					});
				}
				else {
					PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println("sign-up: invalid method "+PrintLog.method);
				}
				break;
			default:
				PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
				PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				System.out.println(INVALID_ACCESS+" (Invalid URI.)");
				break;
		}
	}
	else {
		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		PrintLog.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
		System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
	}
});

router.post("/account/log-in/remember-me.do").handler(ctx -> { // path=/account/log-in/remember-me.do
	PrintLog.printLog(ctx);
	PrintLog.req.bodyHandler((Buffer data) -> {
		StrArray inputs=new StrArray(data.toString());
		List<io.vertx.core.http.Cookie> setCookieRMB=PrintLog.db.authUserFromRmbd(PrintLog.cookie, inputs, PrintLog.ip);
		for (io.vertx.core.http.Cookie singleCookie: setCookieRMB) {
			PrintLog.req.response().addCookie(singleCookie);
			System.out.println(singleCookie.getName()+": "+singleCookie.getValue());
		}
		if (setCookieRMB.get(0).getName()=="I") {
			// Success: Session cookie and New token.
			PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			PrintLog.req.response().end("Rmbd", ENCODING);
			System.out.println("Sended Rmbd with Set-Cookie of session and new rmbd token. (Succeed in remembering the user.)");
		}
		else { // if (setCookieRMB.startsWith("rmbdI="))
			// Failed: Delete rmbd cookie.
			PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			PrintLog.req.response().end("Remembering you failed.", ENCODING);
			System.out.println("Sended 'Failed' with Set-Cookie of deleting rmbd cookie. (Fail in remembering the user.)");
		}
	});
});

router.get("/account/verify/:token").handler(ctx -> { // path=/account/verify/:token
	if (PrintLog.sessionPassed) {
		// VeriKey check.
		String token=ctx.pathParam("token");;
		try {
			token=URLDecoder.decode(token, "UTF-8");
		}
		catch (UnsupportedEncodingException e) {
			System.out.println(e);
		}
		if (PrintLog.db.verifyUser(PrintLog.cookie.get("I"), token, PrintLog.ip)) {
			// User is verified.
			PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			PrintLog.req.response().end("You are verified.", ENCODING);
			System.out.println("Sended 'You are verified.'.");
		}
		else {
			// User is NOT verified.
			PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			PrintLog.req.response().end("Wrong verification key.", ENCODING);
			System.out.println("Sended 'Wrong verification key.'.");
		}
	}
	else {
		// Log-in 유도.
		PrintLog.req.response().putHeader("Content-Type","text/html; charset=utf-8");
		PrintLog.req.response().end("<h1>Please log in first to verify your account.</h1>", ENCODING);
		System.out.println("Sended 'Please log in first to verify your account.'.");
	}
});

router.post("/changeOrders/CatList").handler(ctx -> { // e.g. path=/changeOrders/CatList
	PrintLog.printLog(ctx);
	PrintLog.req.bodyHandler((Buffer data) -> {
		final boolean res=PrintLog.db.changeOrdersCatList(Long.parseLong(PrintLog.cookie.get("I"), 16), data.toString());
		PrintLog.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		PrintLog.req.response().end(""+res);
		System.out.println("Result: "+res);
	});
});



vertx.createHttpServer(
	new HttpServerOptions()
		.setUseAlpn(true)
		.setSsl(true)
		.setKeyStoreOptions(new JksOptions()
			.setPath("C:/Recoeve/recoeve.jks")
			.setPassword("Kd8#j$LL0@OM1")
		)
).requestHandler(router).listen(443);
// UnderConstruction.HOST
// 탄력적 IP | 할당된 IPv4 주소 | 퍼블릭 IPv4 주소 : "43.200.166.14"
// 퍼블릭 IPv4 DNS : "ec2-43-200-166-14.ap-northeast-2.compute.amazonaws.com"
// 프라이빗 IPv4 주소 : "172.31.35.249"
// 호스트 이름 유형 - IP 이름: "ip-172-31-35-249.ap-northeast-2.compute.internal"
// 퍼블릭 DNS : "ec2-43-200-166-14.ap-northeast-2.compute.amazonaws.com"
// 역방향 DNS 레코드 : "recoeve.net."

// vertx.createHttpServer()
// 	.requestHandler(router).listen(80);
} // public void start()

public static void main(String... args) {} // Do nothing.
} // public class Recoeve extends AbstractVerticle
