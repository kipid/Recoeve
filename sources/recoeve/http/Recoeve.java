package recoeve.http;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.net.JksOptions;
import io.vertx.core.net.TCPSSLOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.handler.CorsHandler;
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
	="recoeve.net";
	// ="0.0.0.0";
	// ="localhost";
public static final String ENCODING="UTF-8";
public static final String INVALID_ACCESS="INVALID ACCESS";
public static final long day31InMs=31*24*60*60*1000;
public static final Vertx vertx=Vertx.vertx();
public static final Router router0=Router.router(vertx);
public static final Router router1=Router.router(vertx);
public static final Router router=Router.router(vertx);

@Override
public void start() {
} // public void start()

public static void main(String... args) {
	CorsHandler corsHandler=CorsHandler.create()
		.addOrigin("https://kipid.tistory.com")
		.addOrigin("https://recoeve.net")
		.addOrigin("https://localhost")
		// .addOrigin("null")
		// .allowedMethod(HttpMethod.GET)
		.allowedMethod(HttpMethod.POST)
		// .allowedMethod(HttpMethod.PUT)
		// .allowedMethod(HttpMethod.DELETE)
		.allowedHeader("Content-Type");

	router0.route().handler(corsHandler);

	router0.post("/BlogStat").handler(ctx -> { // e.g. path=/BlogStat
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.bodyHandler((Buffer data) -> {
			StrArray inputs=new StrArray(data.toString());
			pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
				.end(""+pl.db.putBlogVisitor(pl.tNow, pl.ip, inputs.get(1, "URI"), inputs.get(1, "referer"), inputs.get(1, "REACTION_GUEST")), ENCODING);
			System.out.println("Recorded:\n"+inputs.toStringDecoded());
		});
	});

	router0.post("/BlogStat/Get").handler(ctx -> { // e.g. path=/BlogStat/Get
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.bodyHandler((Buffer data) -> {
			StrArray inputs=new StrArray(data.toString());
			System.out.println(inputs);
			pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
				.end(pl.db.getBlogVisitor(inputs), ENCODING);
			System.out.println("Sended /BlogStat/Get.");
		});
	});

	router0.post("/BlogStat/getFullURI").handler(ctx -> { // e.g. path=/getFullURI
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.bodyHandler((Buffer data) -> {
			String shortURI=data.toString();
			System.out.println(shortURI);
			if (shortURI==null) {
				pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
					.end("No http-URI.", ENCODING);
				System.out.println("Sended \"No http-URI.\".");
			}
			else if (shortURI.substring(0,4).toLowerCase().equals("http")) {
				int k=4;
				if (shortURI.charAt(k)=='s'||shortURI.charAt(k)=='S') {
					k++;
				}
				if (shortURI.startsWith("://",k)) {
					k+=3;
					int l=shortURI.indexOf('/',k);
					String shortURIHost=null;
					if (l==-1) {
						shortURIHost=shortURI.substring(k);
					}
					else {
						shortURIHost=shortURI.substring(k,l);
					}
					System.out.println("shortURIHost: "+shortURIHost);
					RecoeveWebClient recoeveWebClient=new RecoeveWebClient();
					recoeveWebClient.webClient.headAbs(shortURI)
						.send()
						.onSuccess(response -> {
							if (response.statusCode()==200) {
								// The response is a redirect, so get the followedRedirects().
								List<String> followedURIs=response.followedRedirects();
								String fullURI=followedURIs.get(followedURIs.size()-1);
								System.out.println("Full TikTok URL: "+fullURI);
								pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
									.end(fullURI, ENCODING);
							}
							else {
								System.out.println("Sended shortURI.");
								pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
									.end(shortURI, ENCODING);
							}
							recoeveWebClient.webClient.close();
						})
						.onFailure(throwable -> {
							throwable.printStackTrace();
							System.out.println("Sended shortURI.");
							pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
								.end(shortURI, ENCODING);
							recoeveWebClient.webClient.close();
						});
				}
				else {
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
						.end(shortURI, ENCODING);
					System.out.println("Sended \"No http-URI.\".");
				}
			}
			else {
				pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
					.end(shortURI, ENCODING);
				System.out.println("Sended shortURI.");
			}
		});
	});

	StaticHandler staticHandler=StaticHandler.create("/CDN/*")
		.setCachingEnabled(true)
		.setDirectoryListing(true)
		.setDirectoryTemplate("C:/Recoeve/CDN/template.html")
		.setFilesReadOnly(true)
		.setDefaultContentEncoding("UTF-8")
		.setAlwaysAsyncFS(true)
		.setMaxCacheSize(1024*100)
		.setSendVaryHeader(true)
		.setMaxAgeSeconds(60L*60L*24L*365L) // Set value for max age in caching headers in seconds.
		.setCacheEntryTimeout(1000L*60L*60L*24L*365L); // Cache timeout in ms (1 year)

	router1.route().handler(staticHandler);

	router1.get("/CDN/:fileName").handler(ctx -> { // e.g. path=/CDN/icon-Recoeve.png
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		if (pl.refererAllowed) { // referer check.
			String fileName=null;
			try {
				fileName=URLDecoder.decode(ctx.pathParam("fileName"), "UTF-8");
				System.out.println("/CND/:fileName :: fileName="+fileName);
			}
			catch (UnsupportedEncodingException e) {
				System.out.println(e);
				fileName=ctx.pathParam("fileName");
			}
			if (fileName!=null&&!fileName.isEmpty()) {
				pl.req.response().putHeader("Cache-Control", "public, max-age=86400, immutable"); // 1 Day=86400 sec.
				pl.req.response().putHeader("ETag", "1.2.4");
				String[] fileNameSplit=fileName.split("\\.");
				switch (fileNameSplit[fileNameSplit.length-1]) {
					case "ico":
						pl.req.response().putHeader("Content-Type","image/x-icon");
						break;
					case "png":
						pl.req.response().putHeader("Content-Type","image/png");
						break;
					case "jpeg": case "jpg":
						pl.req.response().putHeader("Content-Type","image/jpeg");
						break;
					case "css":
						pl.req.response().putHeader("Content-Type","text/css; charset=utf-8");
						break;
					case "js":
						pl.req.response().putHeader("Content-Type","text/javascript; charset=utf-8");
						break;
					case "webm":
						pl.req.response().putHeader("Content-Type","video/webm");
						break;
					case "html":
						pl.req.response().putHeader("Content-Type","text/html; charset=utf-8");
						break;
					default:
						pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
				}
				// TODO: Check if a file with fileName exists.
				String fullFilePath=FileMap.getCDNFile(fileName);
				pl.req.response().sendFile(fullFilePath); // TODO: Cache file datas in memory to response faster.
				System.out.println("Sended "+fullFilePath+".");
			}
			else {
				pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
					.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				System.out.println(INVALID_ACCESS+" (fileName is null or empty.: "+fileName+")");
			}
		}
		else {
			pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
				.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (Referer not allowed.)");
		}
	});

	// String[] pathSplit=path.split("/");
	router.get("/").handler(ctx -> { // path=/
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
		if (pl.cookie.get("I")!=null||pl.cookie.get("rmbdI")!=null) {
			pl.req.response().end(FileMapWithVar.get("user-page.html", pl.lang, pl.db.varMapMyPage(pl.cookie)), ENCODING); // to "/user/:userId". (Cookie owner's page)
			System.out.println("Sended user-page.html");
		}
		else {
			pl.req.response().end(FileMap.get("log-in.html", pl.lang), ENCODING); // to "/account/log-in".
			System.out.println("Sended log-in.html"); // redirecting to /account/log-in since rmbd cookie is to be checked too.
		}
	});

	router.get("/admin/:query").handler(ctx -> { // path=/admin/...
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		if (pl.cookie.get("I").equals("5f5e100")) {
			String query=ctx.pathParam("query");
			switch (query) {
			case "logs":
				pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8")
					.sendFile(FileMap.getCDNFile("logs.html"));
				break;
			case "printLogs":
				if (pl.sessionPassed) {
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
						.end(pl.db.printLogs());
					System.out.println("Sended printLogs.");
				}
				else {
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
						.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (You are not admin kipid. Invalid session.)");
				}
				break;
			}
		}
		else {
			pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
				.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (You are not admin kipid.)");
		}
	});

	router.get("/:fileName").handler(ctx -> {
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		if (pl.refererAllowed) { // referer check.
			String fileName=null;
			try {
				fileName=URLDecoder.decode(ctx.pathParam("fileName"), "UTF-8");
				System.out.println("/:fileName :: fileName="+fileName);
			}
			catch (UnsupportedEncodingException e) {
				System.out.println(e);
				fileName=ctx.pathParam("fileName");
			}
			if (fileName!=null&&!fileName.isEmpty()) {
				switch (fileName) {
					case "jquery.js": // e.g. path=/jquery.js
						pl.req.response().putHeader("Content-Type","text/javascript")
							.end(FileMap.get("jquery.js", pl.lang), ENCODING);
						System.out.println("Sended jquery.js.");
						break;
					case "prepare.js": // e.g. path=/prepare.js
						pl.req.response().putHeader("Content-Type","text/javascript")
							.end(FileMap.get("prepare.js", pl.lang), ENCODING);
						System.out.println("Sended prepare.js.");
						break;
					case "sessionIter": // e.g. path=/sessionIter
						String iter=pl.db.sessionIter(pl.cookie, pl.tNow);
						pl.req.response().putHeader("Content-Type", "text/plain")
							.end(iter);
						System.out.println("iter: "+iter);
						break;
					case "reco": // e.g. path=/reco
						pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8")
							.end(FileMapWithVar.get("user-page.html", pl.lang, pl.db.varMapMyPage(pl.cookie)), ENCODING);
						System.out.println("Sended user-page.html. URI [?search] will be handled by javascript.");
						break;
					case "recostat": // e.g. path=/recostat?uri=...
						pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8")
							.end(FileMapWithVar.get("recostat.html", pl.lang, pl.db.varMapMyPage(pl.cookie)), ENCODING);
						System.out.println("Sended recostat.html.");
						break;
					case "robots.txt": // e.g. path=/robots.txt
						pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
							.end(FileMap.get("robots.txt", "df"), ENCODING);
						System.out.println("Sended robots.txt.");
						break;
					case "ads.txt": // e.g. path=/ads.txt
						pl.req.response().putHeader("Content-Type", "text/plain")
							.end(FileMap.get("ads.txt", "df"), ENCODING);
						System.out.println("Sended ads.txt.");
						break;
					default:
						pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
							.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS);
				}
			}
			else {
				pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
					.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				System.out.println(INVALID_ACCESS+" (fileName is null or empty.: "+fileName+")");
			}
		}
		else {
			pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8")
				.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
		}
	});

	router.getWithRegex("\\/user\\/([^\\/]+)(?:\\/mode\\/[^\\/]+)?").handler(ctx -> { // e.g. path=/user/kipid[/mode/multireco]?cat=...
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.response().putHeader("Content-Type","text/html; charset=utf-8");
		if (pl.refererAllowed) { // referer check.
			String userId=null;
			try {
				userId=URLDecoder.decode(ctx.pathParam("param0"), "UTF-8");
				System.out.println("/user/:userId :: userId="+userId);
			}
			catch (UnsupportedEncodingException e) {
				System.out.println(e);
				userId=ctx.pathParam("userId");
			}
			if (userId!=null&&!userId.isEmpty()&&pl.db.idExists(userId)) {
				pl.req.response().end(FileMapWithVar.get("user-page.html", pl.lang, pl.db.varMapUserPage(pl.cookie, userId)), ENCODING);
				System.out.println("Sended user-page.html");
			}
			else {
				String res=FileMap.replaceStr("<h1>[--User does not exist.--] UserID="+userId+"</h1>", pl.lang);
				pl.req.response().end(res, ENCODING);
				System.out.println("Sended '"+res+"'");
			}
		}
		else {
			pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
		}
	});

	router.postWithRegex("\\/user\\/([^\\/]+)\\/([a-zA-Z-_.]+)").handler(ctx -> { // e.g. path=/user/kipid/get-Recos
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		if (pl.refererAllowed) { // referer check.
			String userId=null;
			try {
				userId=URLDecoder.decode(ctx.pathParam("param0"), "UTF-8");
				System.out.println("\\/user\\/([^\\/]+)\\/([a-zA-Z-_.]+) :: param0="+userId);
			}
			catch (UnsupportedEncodingException e) {
				System.out.println(e);
				userId=ctx.pathParam("userId");
			}
			final String finalUserId=userId;
			if (finalUserId!=null&&!finalUserId.isEmpty()&&pl.db.idExists(finalUserId)) {
				String wildcard=pl.req.getParam("param1");
				System.out.println("\\/user\\/([^\\/]+)\\/([a-zA-Z-_.]+) :: param1="+wildcard);
				if (wildcard!=null) {
				switch (wildcard) {
					case "get-Recos": // e.g. path=/user/kipid/get-Recos
						pl.req.bodyHandler((Buffer data) -> {
							pl.req.response().end(pl.db.getRecos(finalUserId, new StrArray(data.toString())), ENCODING);
							System.out.println("Sended recos.");
						});
						break;
					case "get-UriList": // e.g. path=/user/kipid/get-UriList
						pl.req.bodyHandler((Buffer data) -> {
							pl.req.response().end(pl.db.getStringCatUriList(finalUserId, new StrArray(data.toString())), ENCODING);
							System.out.println("Sended uriLists.");
						});
						break;
					case "get-Neighbors": // e.g. path=/user/kipid/get-Neighbors
						pl.req.bodyHandler((Buffer data) -> {
							pl.req.response().end(pl.db.getStrOfNeighbors(finalUserId, data.toString(), pl.tNow), ENCODING);
							System.out.println("Sended neighbors.");
						});
						break;
					case "cut-Neighbors": // e.g. path=/user/kipid/cut-Neighbors
						if (pl.sessionPassed) {
							pl.req.bodyHandler((Buffer data) -> {
								pl.req.response().end(pl.db.cutNeighbors(finalUserId, Long.parseLong(pl.cookie.get("I"), 16), data.toString(), pl.tNow), ENCODING);
								System.out.println("Sended neighbors.");
							});
						}
						else {
							pl.req.response().end("No session.");
							System.out.println("No session.");
						}
						break;
					case "get-Recoms": // e.g. path=/user/kipid/get-Recoms
						pl.req.bodyHandler((Buffer data) -> {
							pl.req.response().end(pl.db.getRecoms(finalUserId, data.toString()), ENCODING);
							System.out.println("Sended recoms.");
						});
						break;
					default:
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS);
				}}
				else {
					pl.req.response().end("Wrong method POST.", ENCODING);
					System.out.println("Sended 'Wrong method' POST.");
				}
			}
			else {
				String res=FileMap.replaceStr("[--User does not exist.--] UserID="+finalUserId, pl.lang);
				pl.req.response().end(res, ENCODING);
				System.out.println("Sended '"+res+"'");
			}
		}
		else {
			pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
		}
	});

	router.post("/reco/:toDo").handler(ctx -> {
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		if (pl.refererAllowed) { // referer check.
			String toDo=ctx.pathParam("toDo");
			System.out.println("/reco/:toDo :: toDo="+toDo);
			switch (toDo) {
				case "getH1": // path=/reco/getH1
					pl.req.bodyHandler((Buffer data) -> {
						final String uri=data.toString();
						System.out.println(uri);
						if (uri==null) {
							pl.req.response().end("No http-URI.", ENCODING);
							System.out.println("Sended \"No http-URI.\".");
						}
						else if (uri.length()>4&&uri.substring(0,4).toLowerCase().equals("http")) {
							int k=4;
							if (uri.charAt(k)=='s'||uri.charAt(k)=='S') {
								k++;
							}
							if (uri.startsWith("://",k)) {
								k+=3;
								int l=uri.indexOf('/',k);
								String shortURIHost=null;
								if (l==-1) {
									shortURIHost=uri.substring(k);
								}
								else {
									shortURIHost=uri.substring(k,l);
								}
								System.out.println("shortURIHost: "+shortURIHost);
								RecoeveWebClient recoeveWebClient=new RecoeveWebClient();
								recoeveWebClient.webClient.getAbs(uri)
									.send(ar -> {
										if (ar.succeeded()) {
											recoeveWebClient.doUntilH1IsFound(ar.result(), pl, 256);
										}
										else {
											System.err.println("Failed to retrieve the webpage: "+ar.cause().getMessage());
											pl.req.response().end("Failed to retrieve the webpage.", ENCODING);
											recoeveWebClient.webClient.close();
										}
									});
							}
							else {
								pl.req.response().end("No http-URI.", ENCODING);
								System.out.println("Sended \"No http-URI.\".");
							}
						}
						else {
							pl.req.response().end("No http-URI.", ENCODING);
							System.out.println("Sended \"No http-URI.\".");
						}
					});
					break;
				case "defs": // path=/reco/defs
					pl.req.bodyHandler((Buffer data) -> {
						final String uri=data.toString();
						String res=pl.db.recoDefs(uri);
						pl.req.response().end(res);
						System.out.println("Sended defs of uri="+uri+".");
					});
					break;
				case "multidefs": // path=/reco/multidefs
					pl.req.bodyHandler((Buffer data) -> {
						String res=pl.db.recoDefs(new StrArray(data.toString().trim(), false, false));
						pl.req.response().end(res);
						System.out.println("Sended defs of uris.");
					});
					break;
				case "do": // path=/reco/do
					if (pl.sessionPassed) {
						pl.req.bodyHandler((Buffer data) -> {
							final String recoStr=data.toString();
							String res=pl.db.recoDo(Long.parseLong(pl.cookie.get("I"), 16), recoStr, pl.tNow);
							pl.req.response().end(FileMap.replaceStr(res, pl.lang));
							System.out.println("Do reco:\n"+recoStr);
						});
					}
					else {
						pl.req.response().end("No session.");
						System.out.println("No session.");
					}
					break;
				case "stat": // path=/reco/stat
					pl.req.bodyHandler((Buffer data) -> {
						final String uri=data.toString();
						pl.req.response().end(pl.db.getFullRecoStat(uri));
					});
					break;
				default:
					pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (Invalid URI.)");
			}
		}
		else {
			pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
		}
	});

	router.routeWithRegex("^\\/account\\/([^\\/]+)(?:\\/([^\\/]+)\\/([^\\/]+))?$").handler(ctx -> { // e.g. path=/account/...
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		if (pl.refererAllowed) { // referer check.
			String param0=ctx.pathParam("param0");
			System.out.println("^\\/account\\/([^\\/]+)(?:\\/([^\\/]+)\\/([^\\/]+))?$ :: param0="+param0);
			switch (param0) {
				case "verify": // path=/account/verify/:userId/:token
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					if (pl.sessionPassed&&pl.method==HttpMethod.POST) {
						// VeriKey check.
						String userId=ctx.pathParam("param1");
						String token=ctx.pathParam("param2");
						try {
							userId=URLDecoder.decode(userId, "UTF-8");
							// token=URLDecoder.decode(token, "UTF-8");
							System.out.println("^\\/account\\/verify\\/([^\\/]+)\\/([^\\/]+)$ :: param1="+userId);
							System.out.println("^\\/account\\/verify\\/([^\\/]+)\\/([^\\/]+)$ :: param2="+token);
						}
						catch (UnsupportedEncodingException e) {
							System.out.println(e);
						}
						boolean verified=pl.db.verifyUser(pl.cookie.get("I"), userId, token, pl.ip, pl.tNow);
						System.out.println("Verified:"+verified);
						if (verified) {
							// User is verified.
							pl.req.response().end("You are verified.", ENCODING);
							System.out.println("Sended 'You are verified.'.");
						}
						else {
							// User is NOT verified.
							pl.req.response().end("Wrong verification key. You are not verified.", ENCODING);
							System.out.println("Sended 'Wrong verification key. You are not verified.'.");
						}
					}
					else if (pl.method==HttpMethod.GET) {
						// Log-in 유도.
						pl.req.response().putHeader("Content-Type","text/html; charset=utf-8");
						pl.req.response().end(FileMap.get("verify.html", pl.lang), ENCODING);
						System.out.println("Sended 'Please log in first to verify your account.'.");
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS+" (Wrong method:"+pl.method+")");
					}
					break;
				case "changePwd": // path=/account/changePwd
					pl.req.response().putHeader("Content-Type","text/html; charset=utf-8");
					if (pl.db.checkChangePwdToken(pl.req.params(), pl.tNow)) {
						pl.req.response().end(FileMap.get("changePwd.html", pl.lang), ENCODING);
						System.out.println("Sended changePwd.html.");
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS);
					}
					break;
				case "getNewSalt": // path=/account/getNewSalt
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					if (pl.method==HttpMethod.POST) {
						pl.req.bodyHandler((Buffer data) -> {
							final String dataStr=data.toString();
							int i=dataStr.indexOf("\t");
							if (i>0) {
								String id=dataStr.substring(0,i);
								String token=dataStr.substring(i+1);
								boolean tokenChecked=pl.db.checkChangePwdToken(id, token, pl.tNow);
								System.out.println("tokenChecked: "+tokenChecked);
								if (tokenChecked) {
									String new_salt=pl.db.getNewPwdSalt("id", id);
									pl.req.response().end(new_salt, ENCODING);
									System.out.println("Sended new password_salt: "+new_salt+".");
								}
								else {
									pl.req.response().end("Invalid token.", ENCODING);
									System.out.println("Invalid token.");
								}
							}
							else {
								pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
								System.out.println(INVALID_ACCESS+" (Invalid form: no tab.)");
							}
						});
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS+" (Invalid method: "+pl.method+")");
					}
					break;
				case "changePwd.do": // path=/account/changePwd.do
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					if (pl.method==HttpMethod.POST) {
						pl.req.bodyHandler((Buffer data) -> {
							BodyData inputs=new BodyData(data.toString());
							System.out.println("data:\n"+inputs);
							if (pl.db.checkChangePwdToken(inputs.get("userId"), inputs.get("token"), pl.tNow)) {
								System.out.println("Token is verified. User ID: "+inputs.get("userId"));
								if (pl.db.changePwd(inputs, pl.ip, pl.tNow)) {
									final String res=FileMap.replaceStr("[--Your password is changed.--]", pl.lang);
									pl.req.response().end(res, ENCODING);
									System.out.println("Sended "+res);
								}
								else {
									final String res=FileMap.replaceStr("[--Error occured during changing password. Please try again.--]", pl.lang);
									pl.req.response().end(res, ENCODING);
									System.out.println("Sended "+res);
								}
							}
							else {
								final String res=FileMap.replaceStr("[--Token is invalid.--]", pl.lang);
								pl.req.response().end(res, ENCODING);
								System.out.println("Sended "+res);
							}
						});
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS+" (Invalid method: "+pl.method+")");
					}
					break;
				case "log-in": // path=/account/log-in
					pl.req.response().putHeader("Content-Type","text/html; charset=utf-8");
					if (pl.sessionPassed) {
						pl.req.response().end(FileMapWithVar.get("user-page.html", pl.lang, pl.db.varMapMyPage(pl.cookie)), ENCODING);
						System.out.println("Sended user-page.html. (already logged-in)");
					}
					else if (pl.cookie.get("rmbdI")!=null) {
						pl.req.response().end(FileMap.get("remember-me.html", pl.lang), ENCODING);
						System.out.println("Sended remember-me.html.");
					}
					else {
						pl.req.response().end(FileMap.get("log-in.html", pl.lang), ENCODING);
						System.out.println("Sended log-in.html. (No rmbd cookie)");
					}
					break;
				case "pwd_iteration": // path=/account/pwd_iteration
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					if (pl.method==HttpMethod.POST) {
						pl.req.bodyHandler((Buffer data) -> {
							String dataStr=data.toString();
							int i=dataStr.indexOf("\t");
							if (i>0) {
								String idType=dataStr.substring(0,i);
								String id=dataStr.substring(i+1);
								String iter=pl.db.getPwdIteration(idType, id);
								pl.req.response().end(iter, ENCODING);
								System.out.println("Sended pwd_iteration for "+idType+" "+id+": "+iter);
							}
							else {
								pl.req.response().end("Invalid form of data (no tab).", ENCODING);
								System.out.println("Invalid form of data (no tab). dataStr: "+dataStr);
							}
						});
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS+" (Invalid method: "+pl.method+")");
					}
					break;
				case "log-in.do": // path=/account/log-in.do
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					if (pl.method==HttpMethod.POST) {
						pl.req.bodyHandler((Buffer data) -> {
							StrArray inputs=new StrArray(data.toString());
							List<io.vertx.core.http.Cookie> setCookieSSN=pl.db.authUser(inputs, pl.ip, pl.userAgent, pl.tNow);
							if (setCookieSSN!=null) {
								// Log-in success!
								for (io.vertx.core.http.Cookie singleCookie: setCookieSSN) {
									pl.req.response().addCookie(singleCookie);
								}
								pl.req.response().end("log-in success", ENCODING);
								System.out.println("Sended log-in success: "+inputs.get(1, "idType")+": "+inputs.get(1, "userId"));
							}
							else {
								// Log-in failed.
								pl.req.response().end("log-in fail", ENCODING);
								System.out.println("log-in fail: "+inputs.get(1, "idType")+": "+inputs.get(1, "userId"));
							}
						});
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println(INVALID_ACCESS+" (Invalid method: "+pl.method+")");
					}
					break;
				case "log-out": case "log-out-from-all": // path=/account/log-out or /account/log-out-from-all
					pl.req.response().putHeader("Content-Type","text/html; charset=utf-8");
					pl.req.response().end(FileMap.get("log-out.html", pl.lang), ENCODING);
					System.out.println("Sended log-out.html with Set-Cookie of deleting all cookies.");
					break;
				case "log-out.do": // path=/account/log-out.do
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					List<io.vertx.core.http.Cookie> setDelCookie1=pl.db.logout(pl.cookie, pl.sessionPassed);
					for (io.vertx.core.http.Cookie singleCookie: setDelCookie1) {
						pl.req.response().addCookie(singleCookie);
					}
					pl.req.response().end(FileMap.replaceStr("[--Log-out : All log-in | session in server are deleted.--]", pl.lang), ENCODING);
					System.out.println("Sended log-out msg.");
					break;
				case "log-out-from-all.do": // path=/account/log-out-from-all.do
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					List<io.vertx.core.http.Cookie> setDelCookie2=pl.db.logoutFromAll(pl.cookie, pl.sessionPassed);
					for (io.vertx.core.http.Cookie singleCookie: setDelCookie2) {
						pl.req.response().addCookie(singleCookie);
					}
					pl.req.response().end(FileMap.replaceStr("[--Log-out : All log-in | session in server from all devices are deleted.--]", pl.lang), ENCODING);
					System.out.println("Sended log-out-from-all msg.");
					break;
				case "check": // path=/account/check
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					if (pl.method==HttpMethod.POST) {
						pl.req.bodyHandler((Buffer data) -> {
							String dataStr=data.toString();
							int i=dataStr.indexOf("\t");
							String id=dataStr.substring(0,i);
							String email=dataStr.substring(i+1);
							boolean idAvailable=pl.db.idAvailable(id);
							boolean emailAvailable=pl.db.emailAvailable(email);
							System.out.println("Checking: "+id+" and "+email);
							System.out.println("Availability: "+idAvailable+"\t"+emailAvailable);
							if (idAvailable&&emailAvailable) {
								byte[] token=pl.db.randomBytes(128);
								pl.req.response().end(
									idAvailable+"\t"+emailAvailable+"\t"+(pl.db.createAuthToken(pl.tNow, pl.ip, token)?pl.tNow+"\t"+pl.db.hex(token):"Token is not created.")
								, ENCODING);
								System.out.println("Both ID: "+id+" and email: "+email+" are available. So a token is created.");
								System.out.println("tNow: "+pl.tNow+"\n"+"token: "+pl.db.hex(token));
							}
							else {
								pl.db.logsCommit(1 // `user_i`=1 for anonymous.
									, pl.tNow, pl.ip, "chk", false, "ID: "+id+" ["+idAvailable+"] and E-mail: "+email+" ["+emailAvailable+"] availability check.");
								pl.req.response().end(
									idAvailable+"\t"+emailAvailable
								, ENCODING);
								System.out.println("ID: "+id+" is available? "+idAvailable+", and email: "+email+" is available? "+emailAvailable);
							}
						});
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println("check: invalid method "+pl.method);
					}
					break;
				case "forgotPwd": // path=/account/forgotPwd
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					if (pl.method==HttpMethod.POST) {
						pl.req.bodyHandler((Buffer data) -> {
							StrArray inputs=new StrArray(data.toString());
							String forgotPwd=pl.db.forgotPwd(inputs, pl.lang, pl.tNow);
							pl.req.response().end(forgotPwd, ENCODING);
							System.out.println("Sended forgotPwd: "+forgotPwd);
						});
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println("forgotPwd: invalid method "+pl.method);
					}
					break;
				case "sign-up": // path=/account/sign-up
					pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
					if (pl.method==HttpMethod.POST) {
						pl.req.bodyHandler((Buffer data) -> {
							StrArray inputs=new StrArray(data.toString());
							if (pl.db.checkAuthToken(inputs, pl.ip, pl.tNow)) {
								System.out.println("Token is verified.");
								if (pl.db.createUser(inputs, pl.ip, pl.tNow)) {
									Map<String,String> varMap=new HashMap<String,String>();
									varMap.put("{--user id--}", inputs.get(1, "userId"));
									varMap.put("{--user email--}", inputs.get(1, "userEmail"));
									pl.req.response().end(FileMapWithVar.get("signed-up.html", pl.lang, varMap), ENCODING);
									System.out.println("Sended signed-up.html.");
								}
								else {
									final String res=FileMap.replaceStr("[--Error occured during registration. Please sign-up again.--]", pl.lang);
									pl.req.response().end(res, ENCODING);
									System.out.println("Sended "+res);
								}
							}
							else {
								pl.req.response().end("Token is invalid.", ENCODING);
								System.out.println("Token is invalid.");
							}
						});
					}
					else {
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						System.out.println("sign-up: invalid method "+pl.method);
					}
					break;
				default:
					pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					System.out.println(INVALID_ACCESS+" (Invalid URI.)");
					break;
			}
		}
		else {
			pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
			pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
			System.out.println(INVALID_ACCESS+" (Referer is not allowed.)");
		}
	});

	router.post("/account/log-in/remember-me.do").handler(ctx -> { // path=/account/log-in/remember-me.do
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		pl.req.bodyHandler((Buffer data) -> {
			StrArray inputs=new StrArray(data.toString());
			List<io.vertx.core.http.Cookie> setCookieRMB=pl.db.authUserFromRmbd(pl.cookie, inputs, pl.ip, pl.userAgent, pl.tNow);
			for (io.vertx.core.http.Cookie singleCookie: setCookieRMB) {
				pl.req.response().addCookie(singleCookie);
				System.out.println(singleCookie.getName()+": "+singleCookie.getValue());
			}
			if (setCookieRMB.size()>0&&setCookieRMB.get(0).getName()=="I") {
				// Success: Session cookie and New token.
				pl.req.response().end(FileMap.replaceStr("Rmbd: [--Sended Rmbd with Set-Cookie of session and new rmbd token. (Succeed in remembering the user.)--]", pl.lang), ENCODING);
				System.out.println("Sended Rmbd with Set-Cookie of session and new rmbd token. (Succeed in remembering the user.)");
			}
			else { // if (setCookieRMB.startsWith("rmbdI="))
				// Failed: Delete rmbd cookie.
				pl.req.response().end(FileMap.replaceStr("[--Remembering you failed.--] [--Refresh the page and try again.--]", pl.lang), ENCODING);
				System.out.println("Sended 'Failed' with Set-Cookie of deleting rmbd cookie. (Fail in remembering the user.)");
			}
		});
	});

	router.post("/changeOrders/CatList").handler(ctx -> { // e.g. path=/changeOrders/CatList
		PrintLog pl=new PrintLog();
		pl.printLog(ctx);
		pl.req.response().putHeader("Content-Type","text/plain; charset=utf-8");
		pl.req.bodyHandler((Buffer data) -> {
			final boolean res=pl.db.changeOrdersCatList(Long.parseLong(pl.cookie.get("I"), 16), data.toString());
			pl.req.response().end(""+res);
			System.out.println("Result: "+res);
		});
	});

	vertx.createHttpServer(
		new HttpServerOptions()
			.setUseAlpn(true)
			.setSsl(true)
			.setKeyStoreOptions(new JksOptions()
				.setPath("C:/RecoeveNet/Convert/recoeve.net_202302280263A.jks")
				.setPassword("o8lx6xxp")
			)
	).requestHandler(req -> {
		Router routerK=req.path().startsWith("/BlogStat")?router0:req.path().startsWith("/CDN/")?router1:router;
		try {
			routerK.handle(req);
		}
		catch (NullPointerException e) {
			System.out.println(e);
		}
		catch (IllegalStateException e) {
			RecoeveDB.err(e);
		}
	}).listen(443);
	// UnderConstruction.HOST
	// 탄력적 IP | 할당된 IPv4 주소 | 퍼블릭 IPv4 주소 : "43.200.166.14"
	// 퍼블릭 IPv4 DNS : "ec2-43-200-166-14.ap-northeast-2.compute.amazonaws.com"
	// 프라이빗 IPv4 주소 : "172.31.35.249"
	// 호스트 이름 유형 - IP 이름: "ip-172-31-35-249.ap-northeast-2.compute.internal"
	// 퍼블릭 DNS : "ec2-43-200-166-14.ap-northeast-2.compute.amazonaws.com"
	// 역방향 DNS 레코드 : "recoeve.net."

	// vertx.createHttpServer()
	// 	.requestHandler(router).listen(80);
}
} // public class Recoeve extends AbstractVerticle
