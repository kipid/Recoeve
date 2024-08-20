package recoeve.http;



import io.vertx.core.AbstractVerticle;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.net.JksOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.StaticHandler;

// import java.lang.StringBuilder;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.concurrent.CompletableFuture;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import recoeve.db.FileMap;
import recoeve.db.FileMapWithVar;
// import recoeve.db.HTMLString;
import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class Recoeve extends AbstractVerticle {
	public static final String HOST = "recoeve.net";
	// ="0.0.0.0";
	// ="localhost";
	public static final String ENCODING = "UTF-8";
	public static final String INVALID_ACCESS = "INVALID ACCESS";
	public static final long day31InMs = 31 * 24 * 60 * 60 * 1000;

	public Vertx vertx;
	public FileMap fileMap;
	public FileMapWithVar fileMapWithVar;
	public RecoeveWebClient recoeveWebClient;
	public RecoeveDB db;

	public Recoeve(Vertx vertx, FileMap fileMap, FileMapWithVar fileMapWithVar, RecoeveWebClient recoeveWebClient,
			RecoeveDB db) {
		this.vertx = vertx;
		this.fileMap = fileMap;
		this.fileMapWithVar = fileMapWithVar;
		this.recoeveWebClient = recoeveWebClient;
		this.db = db;
	}

	@Override
	public void start() {
		final Router router0 = Router.router(vertx);
		final Router router1 = Router.router(vertx);
		final Router router2 = Router.router(vertx);
		final Router router = Router.router(vertx);

		CorsHandler corsHandler2 = CorsHandler.create()
				.addOrigin("https://www.youtube.com")
				// .addOrigin("https://g.doubleclick.net")
				// .addOrigin("https://tpc.googlesyndication.com")
				.addOrigin("https://www.googleapis.com")
				.addOrigin("https://accounts.google.com")
				.addOrigin("https://www.google.com")
				.addOrigin("https://recoeve.net")
				.addOrigin("https://www.recoeve.net")
				.addOrigin("https://localhost")
				.allowedMethod(io.vertx.core.http.HttpMethod.GET)
				.allowedMethod(io.vertx.core.http.HttpMethod.POST).allowedHeader("Content-Type")
				.allowCredentials(false);

		router2.route().handler(corsHandler2);

		router2.route("/account/log-in/with/:authenticater").handler((RoutingContext ctx) -> {
			String msg = "";
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
			if (pl.sessionPassed) {
				pl.req.response()
						.end(FileMapWithVar.getFileWithLangAndVars("user-page.html", pl.lang, db.varMapMyPage(pl.cookie)), ENCODING);
				msg = "Sended user-page.html. (already logged-in)";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
			else if (pl.cookie.get("rmbdI") != null) {
				pl.req.response()
						.end(fileMap.getFileWithLang("remember-me.html", pl.lang), ENCODING);
				msg = "Sended remember-me.html.";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
			else {
				String authenticater = ctx.pathParam("authenticater");
				switch (authenticater) {
					case "pre-google": // e.g. path=/account/log-in/with/pre-google
						pl.req.bodyHandler((Buffer data) -> {
							pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
									.end(db.putPreGoogle(data.toString(), pl.ip, pl.tNow), ENCODING);
							String msg1 = "Sended pre-google saved or not. state and goto:\n" + data.toString();
							System.out.println(msg1);
							// pLHtml.append(msg1.replaceAll("\\n", "<br/>") + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						});
						break;
					case "google": // e.g. path=/account/log-in/with/google
						pl.req.response()
								.end(fileMap.getFileWithLang("log-in.html", pl.lang), ENCODING);
						// To send #hash data with POST method.
						msg = "Sended log-in.html";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						break;
					case "google.do": // e.g. path=/account/log-in/with/google.do
						pl.req.bodyHandler((Buffer data) -> {
							StrArray inputs = new StrArray(data.toString());
							if (db.getPreGoogle(inputs.get(1, "state"), pl.ip, pl.tNow)) {
								String gotoStr = db.getDataPreGoogle(inputs.get(1, "state"), pl.ip);
								List<io.vertx.core.http.Cookie> setCookieSSN = db.authUserWithGoogle(inputs, pl.ip,
										pl.userAgent, pl.tNow, pl.lang);
								if (setCookieSSN != null) {
									// Log-in success!
									for (io.vertx.core.http.Cookie singleCookie : setCookieSSN) {
										pl.req.response().addCookie(singleCookie);
									}
									pl.req.response()
											.end("log-in success\n" + gotoStr, ENCODING);
									System.out.println("Sended log-in success: " + inputs.get(1, "email"));
									// pLHtml.append("Sended log-in success: <a target=\"_blank\" href=\"mailto:" + inputs.get(1, "email") + "\">" + inputs.get(1, "email") + "</a></div>");
									// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
								}
								else {
									// Log-in failed.
									pl.req.response()
											.end(FileMap.replaceStr("[--Log-in failed.--] [--User of email--]:" + inputs.get(1, "email") + " [--does not exist.--]", pl.lang), ENCODING);
									System.out.println("log-in fail: " + inputs.get(1, "email"));
									// pLHtml.append("log-in fail: <a target=\"_blank\" href=\"mailto:" + inputs.get(1, "email") + "\">" + inputs.get(1, "email") + "</a></div>");
									// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
								}
							}
						});
						break;
					default:
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
								.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						msg = INVALID_ACCESS;
						System.out.println(msg);
						break;
				}
			}
		});

		CorsHandler corsHandler0 = CorsHandler.create()
				.addOrigin("https://kipid.tistory.com")
				.addOrigin("https://recoeve.net")
				.addOrigin("https://www.recoeve.net")
				.addOrigin("https://localhost")
				// .addOrigin("null")
				// .allowedMethod(HttpMethod.GET)
				.allowedMethod(HttpMethod.POST)
				// .allowedMethod(HttpMethod.PUT)
				// .allowedMethod(HttpMethod.DELETE)
				.allowedHeader("Content-Type");

		router0.route().handler(corsHandler0);

		router0.post("/BlogStat").handler((RoutingContext ctx) -> { // e.g. path=/BlogStat
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			pl.req.bodyHandler((Buffer data) -> {
				StrArray inputs = new StrArray(data.toString());
				pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
						.end(db.putBlogStat1(pl.tNow, pl.ip, inputs.get(1, "URI"), inputs.get(1, "referer"),
								inputs.get(1, "REACTION_GUEST"), pl.referer), ENCODING);
				String msg = "Recorded:\n" + inputs.toStringDecoded();
				System.out.println(msg);
				// pLHtml.append(msg.replaceAll("\\n", "<br/>") + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			});
		});

		router0.post("/BlogStat/Get").handler((RoutingContext ctx) -> { // e.g. path=/BlogStat/Get
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			pl.req.bodyHandler((Buffer data) -> {
				StrArray inputs = new StrArray(data.toString());
				String msg1 = inputs.toString();
				System.out.println(msg1);
				// pLHtml.append(msg1.replaceAll("\\n", "<br/>"));
				pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
						.end(db.getBlogStat1(inputs), ENCODING);
				String msg = "Sended /BlogStat/Get.";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			});
		});

		router0.post("/BlogStat/getFullURI").handler((RoutingContext ctx) -> { // e.g. path=/BlogStat/getFullURI
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			pl.req.bodyHandler((Buffer data) -> {
				final String shortURI = data.toString();
				String msg1 = shortURI;
				System.out.println(msg1);
				// pLHtml.append(msg1 + "<br/>");
				if (shortURI == null) {
					pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
							.end("No http-URI.", ENCODING);
					msg1 = "Sended \"No http-URI.\".";
					System.out.println(msg1);
					// pLHtml.append(msg1 + "</div>");
					// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
				}
				else if (shortURI.substring(0, 4).toLowerCase().equals("http")) {
					int k = 4;
					if (shortURI.charAt(k) == 's' || shortURI.charAt(k) == 'S') {
						k++;
					}
					if (shortURI.startsWith("://", k)) {
						k += 3;
						try {
							URI uriAnalysed = new URI(shortURI);
							String shortURIHost = uriAnalysed.getHost();
							msg1 = "shortURIHost: " + shortURIHost;
							System.out.println(msg1);
							// pLHtml.append(msg1 + "<br/>");
							recoeveWebClient.webClient.headAbs(shortURI)
									.send()
									.onSuccess(response -> {
										if (response.statusCode() == 200) {
											// If the response is a redirect, so get the followedRedirects().
											List<String> followedURIs = response.followedRedirects();
											String fullURI = followedURIs.get(followedURIs.size() - 1);
											if (fullURI != null && RecoeveDB.getutf8mb4Length(fullURI) > 255) {
												fullURI = db.getConciseURI(fullURI);
											}
											String msg2 = "Full redirected or concise URL: " + fullURI;
											System.out.println(msg2);
											// pLHtml.append(msg2 + "</div>");
											// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
											pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
													.end(fullURI, ENCODING);
										}
										else {
											String conciseURI = shortURI;
											if (shortURI != null && RecoeveDB.getutf8mb4Length(shortURI) > 255) {
												conciseURI = db.getConciseURI(shortURI);
											}
											String msg2 = "Sended shortURI or conciseURI.";
											System.out.println(msg2);
											// pLHtml.append(msg2 + "</div>");
											// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
											pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
													.end(conciseURI, ENCODING);
										}
									})
									.onFailure(throwable -> {
										throwable.printStackTrace();
										String conciseURI = shortURI;
										if (shortURI != null && RecoeveDB.getutf8mb4Length(shortURI) > 255) {
											conciseURI = db.getConciseURI(shortURI);
										}
										String msg2 = "Sended shortURI or conciseURI.";
										System.out.println(msg2);
										// pLHtml.append(msg2 + "</div>");
										// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
										pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
												.end(conciseURI, ENCODING);
									});
						} catch (URISyntaxException err) {
							RecoeveDB.err(err);
						}
					}
					else {
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
								.end(shortURI, ENCODING);
						msg1 = "Sended shortURI. No http-URI.";
						System.out.println(msg1);
						// pLHtml.append(msg1 + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
					}
				}
				else {
					pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
							.end(shortURI, ENCODING);
					msg1 = "Sended shortURI.";
					System.out.println(msg1);
					// pLHtml.append(msg1 + "</div>");
					// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
				}
			});
		});

		StaticHandler staticHandler = StaticHandler.create("/CDN/*")
				.setCachingEnabled(true)
				.setDirectoryListing(true)
				// .setDirectoryTemplate(FileMap.preFilePath + "/Recoeve/src/main/java/recoeve/db/CDN/template.html")
				.setFilesReadOnly(true)
				.setDefaultContentEncoding("UTF-8")
				.setAlwaysAsyncFS(true)
				.setMaxCacheSize(1024 * 100)
				.setSendVaryHeader(true)
				.setMaxAgeSeconds(60L * 60L * 24L) // Set value for max age in caching headers in seconds.
				.setCacheEntryTimeout(1000L * 60L * 60L * 24L); // Cache timeout in ms (1 day)

		router1.route().handler(staticHandler);

		router1.get("/CDN/:fileName").handler((RoutingContext ctx) -> { // e.g. path=/CDN/icon-Recoeve.png
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			if (pl.refererAllowed) { // referer check.
				String fileName = null;
				fileName = Encoder.decodeURIComponent(ctx.pathParam("fileName"));
				String msg = "/CDN/:fileName :: fileName=" + fileName;
				System.out.println(msg);
				// pLHtml.append(msg + "<br/>");
				if (fileName != null && !fileName.isEmpty()) {
					pl.req.response().putHeader("Cache-Control", "public, max-age=86400, immutable"); // 1 Day=86400 sec.
					pl.req.response().putHeader("ETag", "1.8.4");
					String[] fileNameSplit = fileName.split("\\.");
					switch (fileNameSplit[fileNameSplit.length - 1]) {
						case "ico":
							pl.req.response().putHeader("Content-Type", "image/x-icon");
							break;
						case "png":
							pl.req.response().putHeader("Content-Type", "image/png");
							break;
						case "jpeg":
						case "jpg":
							pl.req.response().putHeader("Content-Type", "image/jpeg");
							break;
						case "css":
							pl.req.response().putHeader("Content-Type", "text/css; charset=utf-8");
							break;
						case "js":
							pl.req.response().putHeader("Content-Type", "text/javascript; charset=utf-8");
							break;
						case "webm":
							pl.req.response().putHeader("Content-Type", "video/webm");
							break;
						case "html":
							pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
							break;
						default:
							pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
					}
					Buffer fileInMemory = fileMap.getCDNFileInMemory(fileName);
					if (fileInMemory != null) {
						pl.req.response()
								.end(fileInMemory);
						msg = "Sended file in memory: " + fileName;
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
					}
					else {
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
								.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						msg = "No file in memory: " + fileName + ".";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
					}
				}
				else {
					pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
							.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					msg = INVALID_ACCESS + " (fileName is null or empty.: " + fileName + ")";
					System.out.println(msg);
					// pLHtml.append(msg + "</div>");
					// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
				}
			}
			else {
				pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
						.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				String msg = INVALID_ACCESS + " (Referer not allowed.)";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
		});

		CorsHandler corsHandler = CorsHandler.create()
				.addOrigin("https://youtube.com")
				.addOrigin("https://www.youtube.com")
				.addOrigin("https://youtube-nocookie.com")
				.addOrigin("https://www.youtube-nocookie.com")
				// .addOrigin("https://g.doubleclick.net")
				// .addOrigin("https://tpc.googlesyndication.com")
				// .addOrigin("https://www.googleapis.com")
				.addOrigin("https://recoeve.net")
				.addOrigin("https://www.recoeve.net")
				.addOrigin("https://localhost")
				.allowedMethod(io.vertx.core.http.HttpMethod.GET)
				.allowedMethod(io.vertx.core.http.HttpMethod.POST)
				.allowedMethod(io.vertx.core.http.HttpMethod.PUT)
				.allowedMethod(io.vertx.core.http.HttpMethod.DELETE)
				.allowedHeader("Content-Type");

		router.route().handler(corsHandler);

		// String[] pathSplit=path.split("/");
		router.get("/").handler((RoutingContext ctx) -> { // path=/
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
			if (pl.cookie.get("I") != null || pl.cookie.get("rmbdI") != null) {
				pl.req.response()
						.end(FileMapWithVar.getFileWithLangAndVars("user-page.html", pl.lang, db.varMapMyPage(pl.cookie)), ENCODING); // to "/user/:userId". (Cookie owner's page)
				String msg = "Sended user-page.html";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
			else {
				pl.req.response()
						.end(fileMap.getFileWithLang("log-in.html", pl.lang), ENCODING); // to "/account/log-in".
				String msg = "Sended log-in.html";
				System.out.println(msg); // redirecting to /account/log-in since rmbd cookie is to be checked too.
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
		});

		router.get("/redirect/:hashpath").handler((RoutingContext ctx) -> {
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			String hashpath = ctx.pathParam("hashpath");
			String originalURI = db.getRedirectURI(RecoeveDB.hexStringToLong(hashpath));
			String msg = "originalURI: " + Encoder.decodeURIComponent(originalURI);
			System.out.println(msg);
			// pLHtml.append(msg + "</div>");
			// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			pl.req.response().setStatusCode(302) // Set the HTTP status code for redirection
					.putHeader("Location", originalURI) // Set the new location
					.end();
		});
		router.post("/get-redirect-hashpath").handler((RoutingContext ctx) -> {
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			pl.req.bodyHandler((Buffer data) -> {
				pl.req.response()
						.end("https://" + HOST + "/redirect/" + db.getRedirectHashpath(data.toString()),
						ENCODING);
				String msg = "Sended recos.";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			});
		});

		router.get("/admin/:query").handler((RoutingContext ctx) -> { // path=/admin/...
			PrintLog pl = new PrintLog(db);
			String msg = "";
			pl.printLog(ctx);
			if (pl.cookie.get("I") != null && pl.cookie.get("I").equals("5f5e100")) {
				String query = ctx.pathParam("query");
				switch (query) {
					case "logs":
						pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8")
								.end(fileMap.getCDNFileInMemory("logs.html"));
						msg = "Sended \"logs.html\" file in memory.";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						break;
					case "printLogs":
						if (pl.sessionPassed) {
							pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
									.end(db.printLogs());
							msg = "Sended printLogs.";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						else {
							pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
									.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = INVALID_ACCESS + " (You are not admin kipid. Invalid session.)";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					// case "access-logs":
					// 	msg = "Sended access-logs.html";
					// 	System.out.println(msg);
					// 	// pLHtml.append(msg + "</div>");
					// 	// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));

					// 	pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8")
					// 			.end(fileMap.getFileWithLang("access-logs.html", pl.lang), ENCODING);
					// 	break;
					// case "access-logs.do":
					// 	if (pl.sessionPassed) {
					// 		pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8")
					// 				.end(db.getLogAccessInSEEForm(pl.tNow));
					// 		msg = "Sended recent access logs in docuK SEE form.";
					// 		System.out.println(msg);
					// 	}
					// 	else {
					// 		pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
					// 				.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					// 		msg = INVALID_ACCESS + " (You are not admin kipid. Invalid session.)";
					// 		System.out.println(msg);
					// 		// pLHtml.append(msg + "</div>");
					// 		// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
					// 	}
					// 	break;
					default:
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
								.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						msg = INVALID_ACCESS;
						System.out.println(msg);
						break;
				}
			}
			else {
				pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
						.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				msg = INVALID_ACCESS + " (You are not admin kipid.)";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
		});

		router.get("/:fileName").handler((RoutingContext ctx) -> {
			PrintLog pl = new PrintLog(db);
			String msg = "";
			pl.printLog(ctx);
			if (pl.refererAllowed) { // referer check.
				String fileName = null;
				fileName = Encoder.decodeURIComponent(ctx.pathParam("fileName"));
				msg = "/:fileName :: fileName=" + fileName;
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
				if (fileName != null && !fileName.isEmpty()) {
					switch (fileName) {
						case "personal-info-handle": // e.g. path=/personal-info-handle
							pl.req.response().putHeader("Content-Type", "text/html")
									.end(fileMap.getFileWithLang("personal-info-handle.html", pl.lang), ENCODING);
							break;
						case "service-summary": // e.g. path=/service-summary
							pl.req.response().putHeader("Content-Type", "text/html")
									.end(fileMap.getFileWithLang("service-summary.html", pl.lang), ENCODING);
							break;
						case "multireco": // e.g. path=/multireco
							pl.req.response().putHeader("Content-Type", "text/html")
									.end(FileMapWithVar.getFileWithLangAndVars("multireco.html", pl.lang,
											db.varMapMyPage(pl.cookie)), ENCODING);
							break;
						case "bundle-tsx-log-out.js": // e.g. path=/service-summary
							pl.req.response().putHeader("Content-Type", "text/html")
									.end(fileMap.getFileWithLang("bundle-tsx-log-out.js", pl.lang), ENCODING);
							break;
						case "esb-user-page.js": // e.g. path=/esb-user-page.js
							pl.req.response().putHeader("Content-Type", "text/javascript")
									.end(fileMap.getFileWithLang("esb-user-page.js", pl.lang), ENCODING);
							break;
						case "bundle-log-in.js": // e.g. path=/bundle-log-in.js
							pl.req.response().putHeader("Content-Type", "text/javascript")
									.end(fileMap.getFileWithLang("bundle-log-in.js", pl.lang), ENCODING);
							break;
						case "bundle-changePwd.js": // e.g. path=/bundle-changePwd.js
							pl.req.response().putHeader("Content-Type", "text/javascript")
									.end(fileMap.getFileWithLang("bundle-changePwd.js", pl.lang), ENCODING);
							break;
						case "jquery.js": // e.g. path=/jquery.js
							pl.req.response().putHeader("Content-Type", "text/javascript")
									.end(fileMap.getFileWithLang("jquery.js", pl.lang), ENCODING);
							break;
						case "prepare.js": // e.g. path=/prepare.js
							pl.req.response().putHeader("Content-Type", "text/javascript")
									.end(fileMap.getFileWithLang("prepare.js", pl.lang), ENCODING);
							break;
						case "sessionIter": // e.g. path=/sessionIter
							String iter = db.sessionIter(pl.cookie, pl.tNow);
							pl.req.response().putHeader("Content-Type", "text/plain")
									.end(iter);
							msg = "iter: " + iter;
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
							break;
						case "reco": // e.g. path=/reco
							pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8")
									.end(FileMapWithVar.getFileWithLangAndVars("user-page.html", pl.lang, db.varMapMyPage(pl.cookie)), ENCODING);
							msg = "Sended user-page.html. URI [?search] will be handled by javascript.";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
							break;
						case "recostat": // e.g. path=/recostat?uri=...
							pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8")
									.end(FileMapWithVar.getFileWithLangAndVars("recostat.html", pl.lang,
											db.varMapMyPage(pl.cookie)), ENCODING);
							break;
						case "robots.txt": // e.g. path=/robots.txt
							pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
									.end(fileMap.getFileWithLang("robots.txt", "df"), ENCODING);
							break;
						case "ads.txt": // e.g. path=/ads.txt
							pl.req.response().putHeader("Content-Type", "text/plain")
									.end(fileMap.getFileWithLang("ads.txt", "df"), ENCODING);
							break;
						default:
							pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
									.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = INVALID_ACCESS;
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
					}
				}
				else {
					pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
							.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
					msg = INVALID_ACCESS + " (fileName is null or empty.: " + fileName + ")";
					System.out.println(msg);
					// pLHtml.append(msg + "</div>");
					// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
				}
			}
			else {
				pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8")
						.setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				msg = INVALID_ACCESS + " (Referer is not allowed.)";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
		});

		router.getWithRegex("\\/user\\/([^\\/]+)(?:\\/mode\\/[^\\/]+)?").handler((RoutingContext ctx) -> { // e.g.
			// path=/user/kipid[/mode/multireco]?cat=...
			PrintLog pl = new PrintLog(db);
			String msg = "";
			pl.printLog(ctx);
			pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
			if (pl.refererAllowed) { // referer check.
				String userId = null;
				userId = Encoder.decodeURIComponent(ctx.pathParam("param0"));
				msg = "/user/:userId :: userId=" + userId;
				System.out.println(msg);
				// pLHtml.append(msg + "<br/>");
				if (userId != null && !userId.isEmpty() && db.idExists(userId)) {
					pl.req.response()
							.end(FileMapWithVar.getFileWithLangAndVars("user-page.html", pl.lang, db.varMapUserPage(pl.cookie, userId)), ENCODING);
				}
				else {
					String res = FileMap.replaceStr("<h1>[--User does not exist.--] UserID=" + userId + "</h1>",
							pl.lang);
					pl.req.response()
							.end(res, ENCODING);
					msg = "Sended '" + res + "'";
					System.out.println(msg);
					// pLHtml.append(msg + "</div>");
					// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
				}
			}
			else {
				pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				msg = INVALID_ACCESS + " (Referer is not allowed.)";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
		});

		router.postWithRegex("\\/user\\/([^\\/]+)\\/([a-zA-Z-_.]+)").handler((RoutingContext ctx) -> { // e.g. path=/user/kipid/get-Recos
			PrintLog pl = new PrintLog(db);
			String msg = "";
			pl.printLog(ctx);
			pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
			if (pl.refererAllowed) { // referer check.
				String userId = null;
				userId = Encoder.decodeURIComponent(ctx.pathParam("param0"));
				msg = "\\/user\\/([^\\/]+)\\/([a-zA-Z-_.]+) :: param0=" + userId;
				System.out.println(msg);
				// pLHtml.append(msg + "<br/>");
				final String finalUserId = userId;
				if (finalUserId != null && !finalUserId.isEmpty() && db.idExists(finalUserId)) {
					String wildcard = pl.req.getParam("param1");
					msg = "\\/user\\/([^\\/]+)\\/([a-zA-Z-_.]+) :: param1=" + wildcard;
					System.out.println(msg);
					// pLHtml.append(msg + "<br/>");
					if (wildcard != null) {
						switch (wildcard) {
							case "get-Recos": // e.g. path=/user/kipid/get-Recos
								pl.req.bodyHandler((Buffer data) -> {
									pl.req.response()
											.end(db.getRecos(finalUserId, new StrArray(data.toString())).replaceAll("%20", "%2520"),
											ENCODING);
									String msg1 = "Sended recos.";
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								});
								break;
							case "get-UriList": // e.g. path=/user/kipid/get-UriList
								pl.req.bodyHandler((Buffer data) -> {
									pl.req.response()
											.end(db.getStringCatUriList(finalUserId, new StrArray(data.toString())).replaceAll("%20", "%2520"), ENCODING);
									String msg1 = "Sended uriLists.\n" + data.toString();
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								});
								break;
							case "change-order-of-UriList": // e.g. path=/user/kipid/change-order-of-UriList?cat=......
								if (pl.sessionPassed) {
									final String cat = Encoder.decodeURIComponent(pl.req.getParam("cat"));
									msg = "cat: " + cat;
									System.out.println(msg);
									// pLHtml.append(msg + "<br/>");
									pl.req.bodyHandler((Buffer data) -> {
										boolean result = db.changeOrderOfUriList(pl.cookie.get("I"), finalUserId, cat,
												("\n" + data.toString().trim() + "\n"));
										pl.req.response()
												.end("" + result, ENCODING);
										String msg1 = "Sended result: " + result + " of change-order-of-UriList.";
										System.out.println(msg1);
										// pLHtml.append(msg1 + "</div>");
									});
								}
								else {
									pl.req.response()
											.end(INVALID_ACCESS, ENCODING);
									msg = "Session is not passed.";
									System.out.println(msg);
									// pLHtml.append(msg + "</div>");
									// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
								}
								break;
							case "get-Neighbors": // e.g. path=/user/kipid/get-Neighbors
								pl.req.bodyHandler((Buffer data) -> {
									pl.req.response()
											.end(db.getStrOfNeighbors(finalUserId, data.toString(), pl.tNow),
											ENCODING);
									String msg1 = "Sended neighbors.";
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								});
								break;
							case "cut-Neighbors": // e.g. path=/user/kipid/cut-Neighbors
								if (pl.sessionPassed) {
									pl.req.bodyHandler((Buffer data) -> {
										pl.req.response()
												.end(db.cutNeighbors(finalUserId,
												Long.parseLong(pl.cookie.get("I"), 16), data.toString(), pl.tNow),
												ENCODING);
										String msg1 = "Sended neighbors.";
										System.out.println(msg1);
										// pLHtml.append(msg1 + "</div>");
									});
								}
								else {
									pl.req.response()
											.end("No session.");
									msg = "No session.";
									System.out.println(msg);
									// pLHtml.append(msg + "</div>");
									// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
								}
								break;
							case "get-Recoms": // e.g. path=/user/kipid/get-Recoms
								pl.req.bodyHandler((Buffer data) -> {
									pl.req.response()
											.end(db.getRecoms(finalUserId, data.toString()), ENCODING);
									String msg1 = "Sended recoms.";
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								});
								break;
							default:
								pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
								msg = INVALID_ACCESS;
								System.out.println(msg);
								// pLHtml.append(msg + "</div>");
								// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
					}
					else {
						pl.req.response()
								.end("Wrong method POST.", ENCODING);
						msg = "Sended 'Wrong method' POST.";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
					}
				}
				else {
					String res = FileMap.replaceStr("[--User does not exist.--] UserID=" + finalUserId, pl.lang);
					pl.req.response()
							.end(res, ENCODING);
					msg = "Sended '" + res + "'";
					System.out.println(msg);
					// pLHtml.append(msg + "</div>");
					// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
				}
			}
			else {
				pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				msg = INVALID_ACCESS + " (Referer is not allowed.)";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
		});

		router.post("/reco/:toDo").handler((RoutingContext ctx) -> {
			PrintLog pl = new PrintLog(db);
			String msg = "";
			pl.printLog(ctx);
			pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
			if (pl.refererAllowed) { // referer check.
				String toDo = ctx.pathParam("toDo");
				msg = "/reco/:toDo :: toDo=" + toDo;
				System.out.println(msg);
				// pLHtml.append(msg + "<br/>");
				switch (toDo) {
					case "getConciseURI": // path=/reco/getConciseURI
						pl.req.bodyHandler((Buffer data) -> {
							final String uri = data.toString();
							System.out.println(uri);
							// pLHtml.append(uri + "<br/>");
							if (uri == null) {
								pl.req.response()
										.end("", ENCODING);
								String msg1 = "uri is null.";
								System.out.println(msg1);
								// pLHtml.append(msg1 + "</div>");
							}
							else {
								String conciseURI = db.getConciseURI(uri);
								pl.req.response()
										.end(conciseURI, ENCODING);
								String msg1 = "uri: " + uri + "conciseURI: " + conciseURI;
								System.out.println(msg1);
								// pLHtml.append("uri: <a target=\"_blank\" href=\"" + uri + "\">" + HTMLString.escapeOnlyTag(Encoder.decodeURIComponent(uri)) + "</a><br/>conciseURI: <a target=\"_blank\" href=\"" + conciseURI + "\">" + conciseURI + "</a></div>");
							}
						});
						break;
					case "getH1": // path=/reco/getH1
						pl.req.bodyHandler((Buffer data) -> {
							final String uri = data.toString();
							String msg1 = uri;
							System.out.println(uri);
							// pLHtml.append(msg1 + "<br/>");
							if (uri == null) {
								pl.req.response()
										.end("No http-URI.", ENCODING);
								msg1 = "Sended \"No http-URI.\".";
								System.out.println(msg1);
								// pLHtml.append(msg1 + "</div>");
							}
							else if (uri.length() > 4 && uri.substring(0, 4).toLowerCase().equals("http")) {
								int k = 4;
								if (uri.charAt(k) == 's' || uri.charAt(k) == 'S') {
									k++;
								}
								if (uri.startsWith("://", k)) {
									k += 3;
									CompletableFuture<String> completableFuture = recoeveWebClient.findTitles(uri, pl);
									completableFuture.thenAccept((result) -> {
										pl.req.response()
												.putHeader("Content-Type", "text/plain; charset=utf-8")
												.end(result, Recoeve.ENCODING);
										String msg2 = "Find Titles: \n" + result;
										System.out.println(msg2);
										// pLHtml.append(msg2 + "</div>");
									});
								}
								else {
									pl.req.response()
											.end("No http-URI.", ENCODING);
									String msg2 = "Sended \"No http-URI.\".";
									System.out.println(msg2);
									// pLHtml.append(msg2 + "</div>");
								}
							}
							else {
								pl.req.response()
										.end("No http-URI.", ENCODING);
								String msg2 = "Sended \"No http-URI.\".";
								System.out.println(msg2);
								// pLHtml.append(msg2 + "</div>");
							}
						});
						break;
					case "defs": // path=/reco/defs
						pl.req.bodyHandler((Buffer data) -> {
							final String uri = data.toString();
							String res = db.recoDefs(uri);
							pl.req.response()
									.end(res);
							String msg1 = "Sended defs of uri=" + uri + ".";
							System.out.println(msg1);
							// pLHtml.append(msg1 + "</div>");
						});
						break;
					case "multidefs": // path=/reco/multidefs
						pl.req.bodyHandler((Buffer data) -> {
							String res = db.recoDefs(new StrArray(data.toString().trim(), false, false));
							pl.req.response()
									.end(res);
							String msg1 = "Sended defs of uris.";
							System.out.println(msg1);
							// pLHtml.append(msg1 + "</div>");
						});
						break;
					case "do": // path=/reco/do
						if (pl.sessionPassed) {
							pl.req.bodyHandler((Buffer data) -> {
								final String recoStr = data.toString();
								String res = db.recoDo(Long.parseLong(pl.cookie.get("I"), 16), recoStr, pl.tNow);
								pl.req.response()
										.end(FileMap.replaceStr(res.replaceAll("%2520", "%20"), pl.lang));
								String msg1 = "Do reco:\n" + recoStr;
								System.out.println(msg1);
								// pLHtml.append(msg1 + "</div>");
							});
						}
						else {
							pl.req.response()
									.end("No session.");
							msg = "No session.";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "stat": // path=/reco/stat
						pl.req.bodyHandler((Buffer data) -> {
							final String uri = data.toString();
							pl.req.response()
									.end(db.getFullRecoStat(uri));
						});
						msg = "Sended stat.";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						break;
					default:
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						msg = INVALID_ACCESS + " (Invalid URI.)";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
				}
			}
			else {
				pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				msg = INVALID_ACCESS + " (Referer is not allowed.)";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
		});

		router.routeWithRegex("^\\/account\\/([^\\/]+)(?:\\/([^\\/]+)\\/([^\\/]+))?$").handler((RoutingContext ctx) -> { // e.g.
			// path=/account/...
			PrintLog pl = new PrintLog(db);
			String msg = "";
			pl.printLog(ctx);
			if (pl.refererAllowed) { // referer check.
				String param0 = ctx.pathParam("param0");
				msg = "^\\/account\\/([^\\/]+)(?:\\/([^\\/]+)\\/([^\\/]+))?$ :: param0=" + param0;
				System.out.println(msg);
				// pLHtml.append(msg + "<br/>");
				switch (param0) {
					case "verify": // path=/account/verify/:userId/:token
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						if (pl.sessionPassed && pl.method == HttpMethod.POST) {
							// VeriKey check.
							String userId = ctx.pathParam("param1");
							String token = ctx.pathParam("param2");
							userId = Encoder.decodeURIComponent(userId);
							// token=Encoder.decodeURIComponent(token);
							msg = "^\\/account\\/verify\\/([^\\/]+)\\/([^\\/]+)$ :: param1=" + userId;
							System.out.println(msg);
							// pLHtml.append(msg + "<br/>");
							msg = "^\\/account\\/verify\\/([^\\/]+)\\/([^\\/]+)$ :: param2=" + token;
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
							boolean verified = db.verifyUser(pl.cookie.get("I"), userId, token, pl.ip, pl.tNow);
							msg = "Verified: " + verified;
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
							if (verified) {
								// User is verified.
								pl.req.response()
										.end("You are verified.", ENCODING);
								msg = "Sended 'You are verified.'.";
								System.out.println(msg);
								// pLHtml.append(msg + "</div>");
								// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
							}
							else {
								// User is NOT verified.
								pl.req.response()
										.end("Wrong verification key. You are not verified.", ENCODING);
								msg = "Sended 'Wrong verification key. You are not verified.'.";
								System.out.println(msg);
								// pLHtml.append(msg + "</div>");
								// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
							}
						}
						else if (pl.method == HttpMethod.GET) {
							// Log-in 유도.
							pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
							pl.req.response()
									.end(fileMap.getFileWithLang("verify.html", pl.lang), ENCODING);
							msg = "Sended 'Please log in first to verify your account.'.";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = INVALID_ACCESS + " (Wrong method:" + pl.method + ")";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "changePwd": // path=/account/changePwd
						pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
						if (db.checkChangePwdToken(pl.req.params(), pl.tNow)) {
							pl.req.response()
									.end(fileMap.getFileWithLang("changePwd.html", pl.lang), ENCODING);
							msg = "Sended changePwd.html.";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = INVALID_ACCESS;
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "getNewSalt": // path=/account/getNewSalt
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						if (pl.method == HttpMethod.POST) {
							pl.req.bodyHandler((Buffer data) -> {
								final String dataStr = data.toString();
								int i = dataStr.indexOf("\t");
								if (i > 0) {
									String id = dataStr.substring(0, i);
									String token = dataStr.substring(i + 1);
									boolean tokenChecked = db.checkChangePwdToken(id, token, pl.tNow);
									String msg1 = "tokenChecked: " + tokenChecked;
									System.out.println(msg1);
									// pLHtml.append(msg1 + "<br/>");
									if (tokenChecked) {
										String new_salt = db.getNewPwdSalt("id", id);
										pl.req.response()
												.end(new_salt, ENCODING);
										msg1 = "Sended new password_salt: " + new_salt + ".";
										System.out.println(msg1);
										// pLHtml.append(msg1 + "</div>");
									}
									else {
										pl.req.response()
												.end("Invalid token.", ENCODING);
										msg1 = "Invalid token.";
										System.out.println(msg1);
										// pLHtml.append(msg1 + "</div>");
									}
								}
								else {
									pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
									String msg1 = INVALID_ACCESS + " (Invalid form: no tab.)";
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
							});
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = INVALID_ACCESS + " (Invalid method: " + pl.method + ")";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "changePwd.do": // path=/account/changePwd.do
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						if (pl.method == HttpMethod.POST) {
							pl.req.bodyHandler((Buffer data) -> {
								StrArray inputs = new StrArray(data.toString());
								String msg1 = "data:\n" + inputs;
								System.out.println(msg1);
								// pLHtml.append(msg1 + "<br/>");
								if (db.checkChangePwdToken(inputs.get(1, "userId"), inputs.get(1, "token"), pl.tNow)) {
									msg1 = "Token is verified. User ID: " + inputs.get("userId");
									System.out.println(msg1);
									// pLHtml.append(msg1 + "<br/>");
									if (db.changePwd(inputs, pl.ip, pl.tNow)) {
										final String res = FileMap.replaceStr("[--Your password is changed.--]",
												pl.lang);
										pl.req.response()
												.end(res, ENCODING);
										msg1 = "Sended " + res;
										System.out.println(msg1);
										// pLHtml.append(msg1 + "</div>");
									}
									else {
										final String res = FileMap.replaceStr(
												"[--Error occured during changing password. Please try again.--]",
												pl.lang);
										pl.req.response()
												.end(res, ENCODING);
										msg1 = "Sended " + res;
										System.out.println(msg1);
										// pLHtml.append(msg1 + "</div>");
									}
								}
								else {
									final String res = FileMap.replaceStr("[--Token is invalid.--]", pl.lang);
									pl.req.response()
											.end(res, ENCODING);
									msg1 = "Sended " + res;
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
							});
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = INVALID_ACCESS + " (Invalid method: " + pl.method + ")";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "log-in": // path=/account/log-in
						pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
						if (pl.sessionPassed) {
							pl.req.response()
									.end(FileMapWithVar.getFileWithLangAndVars("user-page.html", pl.lang, db.varMapMyPage(pl.cookie)), ENCODING);
							msg = "Sended user-page.html. (already logged-in)";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						else if (pl.cookie.get("rmbdI") != null) {
							pl.req.response()
									.end(fileMap.getFileWithLang("remember-me.html", pl.lang), ENCODING);
							msg = "Sended remember-me.html.";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						else {
							pl.req.response()
									.end(fileMap.getFileWithLang("log-in.html", pl.lang), ENCODING);
							msg = "Sended log-in.html. (No rmbd cookie)";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "pwd_iteration": // path=/account/pwd_iteration
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						if (pl.method == HttpMethod.POST) {
							pl.req.bodyHandler((Buffer data) -> {
								String dataStr = data.toString();
								int i = dataStr.indexOf("\t");
								if (i > 0) {
									String idType = dataStr.substring(0, i);
									String id = dataStr.substring(i + 1);
									String iter = db.getPwdIteration(idType, id);
									pl.req.response()
											.end(iter, ENCODING);
									String msg1 = "Sended pwd_iteration for " + idType + " " + id + ": " + iter;
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
								else {
									pl.req.response()
											.end("Invalid form of data (no tab).", ENCODING);
									String msg1 = "Invalid form of data (no tab). dataStr: " + dataStr;
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
							});
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = INVALID_ACCESS + " (Invalid method: " + pl.method + ")";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "log-in.do": // path=/account/log-in.do
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						if (pl.method == HttpMethod.POST) {
							pl.req.bodyHandler((Buffer data) -> {
								StrArray inputs = new StrArray(data.toString());
								List<io.vertx.core.http.Cookie> setCookieSSN = db.authUser(inputs, pl.ip, pl.userAgent,
										pl.tNow);
								if (setCookieSSN != null) {
									// Log-in success!
									for (io.vertx.core.http.Cookie singleCookie : setCookieSSN) {
										pl.req.response().addCookie(singleCookie);
									}
									pl.req.response()
											.end("log-in success", ENCODING);
									String msg1 = "Sended log-in success: " + inputs.get(1, "idType") + ": " + inputs.get(1, "userId");
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
								else {
									// Log-in failed.
									pl.req.response()
											.end("log-in fail", ENCODING);
									String msg1 = "log-in fail: " + inputs.get(1, "idType") + ": " + inputs.get(1, "userId");
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
							});
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = INVALID_ACCESS + " (Invalid method: " + pl.method + ")";
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "log-out":
					case "log-out-from-all": // path=/account/log-out or /account/log-out-from-all
						pl.req.response().putHeader("Content-Type", "text/html; charset=utf-8");
						List<io.vertx.core.http.Cookie> setDelCookie0 = db.logout(pl.cookie, pl.sessionPassed);
						for (io.vertx.core.http.Cookie singleCookie : setDelCookie0) {
							pl.req.response().addCookie(singleCookie);
						}
						pl.req.response()
								.end(fileMap.getFileWithLang("log-out.html", pl.lang), ENCODING);
						msg = "Sended log-out.html with Set-Cookie of deleting all cookies.";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						break;
					case "log-out.do": // path=/account/log-out.do
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						List<io.vertx.core.http.Cookie> setDelCookie1 = db.logout(pl.cookie, pl.sessionPassed);
						for (io.vertx.core.http.Cookie singleCookie : setDelCookie1) {
							pl.req.response().addCookie(singleCookie);
						}
						pl.req.response()
								.end(FileMap.replaceStr(
								"[--Log-out : All log-in | session in server are deleted.--]", pl.lang), ENCODING);
						msg = "Sended log-out msg.";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						break;
					case "log-out-from-all.do": // path=/account/log-out-from-all.do
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						List<io.vertx.core.http.Cookie> setDelCookie2 = db.logoutFromAll(pl.cookie, pl.sessionPassed);
						for (io.vertx.core.http.Cookie singleCookie : setDelCookie2) {
							pl.req.response().addCookie(singleCookie);
						}
						pl.req.response()
								.end(FileMap.replaceStr(
										"[--Log-out : All log-in | session in server from all devices are deleted.--]",
										pl.lang), ENCODING);
						msg = "Sended log-out-from-all msg.";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						break;
					case "check": // path=/account/check
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						if (pl.method == HttpMethod.POST) {
							pl.req.bodyHandler((Buffer data) -> {
								String dataStr = data.toString();
								int i = dataStr.indexOf("\t");
								String id = dataStr.substring(0, i);
								String email = dataStr.substring(i + 1);
								boolean idAvailable = db.idAvailable(id);
								boolean emailAvailable = db.emailAvailable(email);
								String msg1 = "Checking: " + id + " and " + email;
								System.out.println(msg1);
								// pLHtml.append(msg1 + "<br/>");
								msg1 = "Availability: " + idAvailable + "\t" + emailAvailable;
								System.out.println(msg1);
								// pLHtml.append(msg1 + "<br/>");
								if (idAvailable && emailAvailable) {
									byte[] token = RecoeveDB.randomBytes(128);
									pl.req.response()
											.end(idAvailable + "\t" + emailAvailable + "\t" + (db.createAuthToken(pl.tNow, pl.ip, token) ? pl.tNow + "\t" + RecoeveDB.bytesToHexString(token) : "Token is not created."), ENCODING);
									msg1 = "Both ID: " + id + " and email: " + email + " are available. So a token is created.";
									System.out.println(msg1);
									// pLHtml.append(msg1 + "<br/>");
									msg1 = "tNow: " + pl.tNow + "\n" + "token: " + RecoeveDB.bytesToHexString(token);
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
								else {
									db.logsCommit(1 // `user_i`=1 for anonymous.
											, pl.tNow, pl.ip, "chk", false,
											"ID: " + id + " [" + idAvailable + "] and E-mail: " + email + " ["
													+ emailAvailable + "] availability check.");
									pl.req.response()
											.end(idAvailable + "\t" + emailAvailable, ENCODING);
									msg1 = "ID: " + id + " is available? " + idAvailable + ", and email: " + email + " is available? " + emailAvailable;
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
							});
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = "check: invalid method " + pl.method;
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "forgotPwd": // path=/account/forgotPwd
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						if (pl.method == HttpMethod.POST) {
							pl.req.bodyHandler((Buffer data) -> {
								StrArray inputs = new StrArray(data.toString());
								String forgotPwd = db.forgotPwd(inputs, pl.lang, pl.tNow);
								pl.req.response()
										.end(forgotPwd, ENCODING);
								String msg1 = "Sended forgotPwd: " + forgotPwd;
								System.out.println(msg1);
								// pLHtml.append(msg1 + "</div>");
							});
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = "forgotPwd: invalid method " + pl.method;
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					case "sign-up": // path=/account/sign-up
						pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
						if (pl.method == HttpMethod.POST) {
							pl.req.bodyHandler((Buffer data) -> {
								StrArray inputs = new StrArray(data.toString());
								if (db.checkAuthToken(inputs, pl.ip, pl.tNow)) {
									String msg1 = "Token is verified.";
									System.out.println(msg1);
									// pLHtml.append(msg1 + "<br/>");
									if (db.createUser(inputs, pl.ip, pl.tNow, pl.lang)) {
										Map<String, String> varMap = new HashMap<String, String>();
										varMap.put("{--user id--}", inputs.get(1, "userId"));
										varMap.put("{--user email--}", inputs.get(1, "userEmail"));
										pl.req.response()
												.end(FileMapWithVar.getFileWithLangAndVars("signed-up.html",
												pl.lang, varMap), ENCODING);
										msg1 = "Sended signed-up.html.";
										System.out.println(msg1);
										// pLHtml.append(msg1 + "</div>");
									}
									else {
										final String res = FileMap.replaceStr(
												"[--Error occured during registration. Please sign-up again.--]",
												pl.lang);
										pl.req.response()
												.end(res, ENCODING);
										msg1 = "Sended " + res;
										System.out.println(msg1);
										// pLHtml.append(msg1 + "</div>");
									}
								}
								else {
									pl.req.response()
											.end("Token is invalid.", ENCODING);
									String msg1 = "Token is invalid.";
									System.out.println(msg1);
									// pLHtml.append(msg1 + "</div>");
								}
							});
						}
						else {
							pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
							msg = "sign-up: invalid method " + pl.method;
							System.out.println(msg);
							// pLHtml.append(msg + "</div>");
							// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						}
						break;
					default:
						pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
						msg = INVALID_ACCESS + " (Invalid URI.)";
						System.out.println(msg);
						// pLHtml.append(msg + "</div>");
						// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
						break;
				}
			}
			else {
				pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
				pl.req.response().setStatusCode(404).end(INVALID_ACCESS, ENCODING);
				msg = INVALID_ACCESS + " (Referer is not allowed.)";
				System.out.println(msg);
				// pLHtml.append(msg + "</div>");
				// db.putLogAccess(pl.tNow, pl.user_i, pLHtml.toString(), db.getLogAccess(pl.tNow));
			}
		});

		router.post("/account/log-in/remember-me.do").handler((RoutingContext ctx) -> { // path=/account/log-in/remember-me.do
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
			pl.req.bodyHandler((Buffer data) -> {
				StrArray inputs = new StrArray(data.toString());
				List<io.vertx.core.http.Cookie> setCookieRMB = db.authUserFromRmbd(pl.cookie, inputs, pl.ip, pl.userAgent,
						pl.tNow);
				for (io.vertx.core.http.Cookie singleCookie : setCookieRMB) {
					pl.req.response().addCookie(singleCookie);
					String msg1 = singleCookie.getName() + ": " + singleCookie.getValue();
					System.out.println(msg1);
					// pLHtml.append(msg1 + "</div>");
				}
				if (setCookieRMB.size() > 0 && setCookieRMB.get(0).getName() == "I") {
					// Success: Session cookie and New token.
					pl.req.response()
							.end(FileMap.replaceStr(
							"Rmbd: [--Sended Rmbd with Set-Cookie of session and new rmbd token. (Succeed in remembering the user.)--]",
							pl.lang), ENCODING);
					String msg1 = "Sended Rmbd with Set-Cookie of session and new rmbd token. (Succeed in remembering the user.)";
					System.out.println(msg1);
					// pLHtml.append(msg1 + "</div>");
				}
				else { // if (setCookieRMB.startsWith("rmbdI="))
								 // Failed: Delete rmbd cookie.
					pl.req.response()
							.end(FileMap.replaceStr(
									"[--Remembering you failed.--] [--Refresh the page and try again.--]", pl.lang),
									ENCODING);
					String msg1 = "Sended 'Failed' with Set-Cookie of deleting rmbd cookie. (Fail in remembering the user.)";
					System.out.println(msg1);
					// pLHtml.append(msg1 + "</div>");
				}
			});
		});

		router.post("/changeOrders/CatList").handler((RoutingContext ctx) -> { // e.g. path=/changeOrders/CatList
			PrintLog pl = new PrintLog(db);
			pl.printLog(ctx);
			pl.req.response().putHeader("Content-Type", "text/plain; charset=utf-8");
			pl.req.bodyHandler((Buffer data) -> {
				final boolean res = db.changeOrdersCatList(Long.parseLong(pl.cookie.get("I"), 16), data.toString());
				pl.req.response()
						.end("" + res);
				String msg1 = "Result: " + res;
				System.out.println(msg1);
				// pLHtml.append(msg1 + "</div>");
			});
		});

		vertx.createHttpServer(
				new HttpServerOptions()
						.setUseAlpn(true)
						.setSsl(true)
						.setKeyCertOptions(new JksOptions()
								.setPath(FileMap.preFilePath + "/RecoeveNet/Convert/recoeve.net_202402252CEF2.jks")
								.setPassword("q63kewmf")))
				.requestHandler(req -> {
					Router routerK = req.path().startsWith("/BlogStat") ? router0
							: req.path().startsWith("/CDN/") ? router1
									: req.path().startsWith("/account/log-in/with/") ? router2 : router;
					try {
						routerK.handle(req);
					} catch (NullPointerException err) {
						System.out.println(err);
					} catch (IllegalStateException err) {
						RecoeveDB.err(err);
					}
				}).listen(RecoeveDB.port);

		// vertx.createHttpServer()
		// .requestHandler(router).listen(80);
	} // public void start()

	public static void main(String... args) {
		// Do nothing.
	}
} // public class Recoeve extends AbstractVerticle
