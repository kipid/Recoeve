package recoeve.http;



import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.function.BiConsumer;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.ElementHandle;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.LoadState;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Context;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;
import recoeve.db.RecoeveDB;
import recoeve.db.StrArray;

public class RecoeveWebClient extends AbstractVerticle {
	public static final WebClientOptions WEB_CLIENT_OPTIONS = new WebClientOptions()
			.setMaxHeaderSize(20000)
			.setFollowRedirects(true);
	public static final int MIN_PORT = 50000;
	public static final int MAX_PORT = 51000;
	public static final int DEFAULT_MAX_DRIVERS = 2;
	public static final long EXPIRES_IN_MS = 210L * 24L * 60L * 60L * 1000L; // 210 days in milliseconds
	public static final long TIMEOUT_MS = 7200L;
	public static final long FIND_PER_MS = 500L;
	public static final long TIMEOUT_DRIVER = 600000; // 10 minutes in milliseconds
	public static final int RECURSE_MAX = 10;
	public static final String EMPTY_URL = "https://tistory1.daumcdn.net/tistory/1468360/skin/images/empty.html";
	public static final Map<String, String> HOST_TO_CSS;

	static {
		HOST_TO_CSS = new HashMap<>(20);
		HOST_TO_CSS.put("www.youtube.com", "title,h1,h2");
		HOST_TO_CSS.put("blog.naver.com", ".se-fs-,.se-ff-,.htitle");
		HOST_TO_CSS.put("m.blog.naver.com", ".se-fs-,.se-ff-,h3.tit_h3");
		HOST_TO_CSS.put("apod.nasa.gov", "center>b:first-child");
		HOST_TO_CSS.put("www.codeit.kr", "title,#header p:first-child");
		HOST_TO_CSS.put("codeit.kr", "title,#header p:first-child");
		HOST_TO_CSS.put("www.instagram.com", "h1");
		HOST_TO_CSS.put("instagram.com", "h1");
		HOST_TO_CSS.put("www.tiktok.com", "h1[data-e2e]");
		HOST_TO_CSS.put("tiktok.com", "h1[data-e2e]");
	}

	public RecoeveDB db;
	public WebClient[] webClient;
	public int curWebClientI;
	public long[] pID = {0, 0};
	public int maxDrivers;
	private final ConcurrentLinkedQueue<Page> pagePool;
	private BrowserContext browserContext; // 필드로 유지
	public int recurseCount;
	public int curPort;

	public RecoeveWebClient(Vertx vertx, Context vertxContext, RecoeveDB db) {
		this.vertx = vertx;
		this.context = vertxContext;
		this.db = db;
		webClient = new WebClient[]{WebClient.create(vertx, WEB_CLIENT_OPTIONS), WebClient.create(vertx, WEB_CLIENT_OPTIONS)};
		curWebClientI = -1;
		maxDrivers = vertxContext.config().getInteger("maxDrivers", DEFAULT_MAX_DRIVERS);
		pagePool = new ConcurrentLinkedQueue<>();
		recurseCount = 0;
		curPort = MIN_PORT + (int) ((MAX_PORT - MIN_PORT) * Math.random());
	}

	@Override
	public void start(Promise<Void> startPromise) {
		try (Playwright playwright = Playwright.create();
			 Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true))) {
			this.browserContext = browser.newContext(getBrowserContextOptions());
			startPromise.complete();
		} catch (Exception e) {
			startPromise.fail(e);
		}
	}

	@Override
	public void stop(Promise<Void> stopPromise) {
		cleanupPages();
		if (browserContext != null) {
			browserContext.close();
		}
		stopPromise.complete();
	}

	private synchronized void releaseOrOfferPage(Page page) {
		try {
			if (page != null) {
				if (pagePool.size() < maxDrivers) {
					page.navigate(EMPTY_URL);
					page.waitForLoadState(LoadState.DOMCONTENTLOADED); // 로드 대기 추가
					page.title(); // 페이지가 살아있는지 확인
					pagePool.offer(page);
					System.out.println("\npagePool.offer(page);");
				} else {
					page.close();
					System.out.println("\npage.close();");
				}
			} else if (pagePool.size() < maxDrivers) {
				page = browserContext.newPage(); // BrowserContext에서 새 페이지 생성
				pagePool.offer(page);
				System.out.println("\npagePool.offer(page);");
			}
		} catch (Exception err) {
			System.out.println("\nThe Page is dead.");
			if (page != null) {
				page.close();
			}
			page = browserContext.newPage();
			pagePool.offer(page);
			System.out.println("\npagePool.offer(page);");
		}
	}

	private synchronized void closePage(Page page) {
		if (page != null && !page.isClosed()) {
			try (Page p = page) { // try-with-resources로 안전하게 종료
				p.navigate(EMPTY_URL);
				p.title(); // 페이지 상태 확인
				p.close();
			} catch (Exception e) {
				System.out.println("\nError closing Page: " + e.getMessage());
			}
		}
	}

	public synchronized void cleanupPages() {
		Page page;
		while ((page = pagePool.poll()) != null) {
			closePage(page);
		}
	}

	private Page getPage() throws Exception {
		recurseCount++;
		if (recurseCount >= RECURSE_MAX) {
			recurseCount = 0;
			throw new RuntimeException("\nError: Too many recursive!");
		}
		Page page;
		while ((page = pagePool.poll()) != null) {
			recurseCount = 0;
			page.navigate(EMPTY_URL);
			page.waitForLoadState(LoadState.DOMCONTENTLOADED); // 로드 대기 추가
			page.title(); // 페이지가 살아있는지 확인
			return page;
		}

		if (pagePool.size() < maxDrivers) {
			try {
				page = browserContext.newPage(); // BrowserContext에서 새 페이지 생성
				pagePool.add(page);
			} catch (Exception err) {
				System.out.println("\nError: Failed to create new Page: " + err.getMessage());
			}
		} else {
			cleanupPages();
			page = browserContext.newPage();
			pagePool.add(page);
		}

		while ((page = pagePool.poll()) != null) {
			recurseCount = 0;
			page.navigate(EMPTY_URL);
			page.waitForLoadState(LoadState.DOMCONTENTLOADED); // 로드 대기 추가
			page.title(); // 페이지가 살아있는지 확인
			return page;
		}
		return null;
	}

	private Browser.NewContextOptions getBrowserContextOptions() {
		return new Browser.NewContextOptions()
				.setViewportSize(600, 600)
				.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36")
				.setIgnoreHTTPSErrors(false);
	}

	public CompletableFuture<String> redirected(String originalURI) {
		CompletableFuture<String> cf = new CompletableFuture<>();
		try {
			curWebClientI++;
			curWebClientI %= DEFAULT_MAX_DRIVERS;
			webClient[curWebClientI].headAbs(originalURI)
					.send()
					.onSuccess(response -> {
						if (response.statusCode() < 400) {
							List<String> followedURIs = response.followedRedirects();
							if (!followedURIs.isEmpty()) {
								String fullURI = followedURIs.get(followedURIs.size() - 1);
								cf.complete(fullURI);
							} else {
								System.out.println("Sended originalURI because of No followedURIs.");
								cf.complete(originalURI);
							}
						}
					})
					.onFailure(throwable -> {
						System.out.println("Sended originalURI on Failure: " + throwable.getMessage());
						cf.complete(originalURI);
					});
		} catch (Exception err) {
			RecoeveDB.err(err);
			cf.completeExceptionally(err);
		}
		return cf;
	}

	public CompletableFuture<String> asyncFindTitle(Page page, String cssSelector) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();
		if (cssSelector == null) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is null."));
			return cfElements;
		}
		if (cssSelector.equals("NO")) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is NO."));
			return cfElements;
		}

		pID[0] = vertx.setPeriodic(FIND_PER_MS, id -> {
			try {
				page.waitForLoadState(LoadState.DOMCONTENTLOADED); // DOM 로드 완료 대기
				page.evaluate("document.querySelectorAll('video').forEach(video => video.pause())");
				List<ElementHandle> elements = page.querySelectorAll(cssSelector);
				if (!elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					boolean someIsNotEmpty = false;
					for (int i = 0; i < elements.size(); i++) {
						String text = elements.get(i).textContent().replaceAll("\\s", " ").trim();
						if (!text.isEmpty()) {
							someIsNotEmpty = true;
							sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
						}
					}
					if (someIsNotEmpty) {
						vertx.cancelTimer(pID[0]);
						cfElements.complete(sb.toString());
					}
				}
			} catch (Exception err) {
				System.out.println(err.getMessage());
				cfElements.completeExceptionally(new Exception("\nError: Failed to query elements: " + err.getMessage()));
			}
		});

		vertx.setTimer(TIMEOUT_MS, id -> {
			try {
				vertx.cancelTimer(pID[0]);
				page.waitForLoadState(LoadState.DOMCONTENTLOADED); // DOM 로드 완료 대기
				page.evaluate("document.querySelectorAll('video').forEach(video => video.pause())");
				List<ElementHandle> elements = page.querySelectorAll(cssSelector);
				if (!elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < elements.size(); i++) {
						String text = elements.get(i).textContent().replaceAll("\\s", " ").trim();
						if (!text.isEmpty()) {
							sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
						}
					}
					cfElements.complete(sb.toString());
				} else {
					cfElements.complete("\nError: timeout " + TIMEOUT_MS + "ms.");
				}
			} catch (Exception err) {
				cfElements.completeExceptionally(err);
			}
		});

		return cfElements;
	}

	public CompletableFuture<String> asyncFindTitleUntilEveryFound(Page page, String cssSelector, ResultSet uriHeads, Timestamp tNow, String keyUri) throws Exception {
		CompletableFuture<String> cfElements = new CompletableFuture<>();
		if (cssSelector == null) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is null."));
			return cfElements;
		}
		if (cssSelector.equals("NO")) {
			cfElements.completeExceptionally(new Exception("\nError: cssSelector is NO."));
			return cfElements;
		}

		pID[1] = vertx.setPeriodic(FIND_PER_MS, id -> {
			try {
				page.waitForLoadState(LoadState.DOMCONTENTLOADED); // DOM 로드 완료 대기
				page.evaluate("document.querySelectorAll('video').forEach(video => video.pause())");
				List<ElementHandle> elements = page.querySelectorAll(cssSelector);
				if (!elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < elements.size(); i++) {
						String text = elements.get(i).textContent().replaceAll("\\s", " ").trim();
						if (text.isEmpty()) {
							return;
						}
						sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
					}
					vertx.cancelTimer(pID[1]);
					cfElements.complete(sb.toString());
					if (uriHeads != null) {
						uriHeads.updateString("heads", sb.toString().trim());
						uriHeads.updateTimestamp("tUpdate", tNow);
						uriHeads.updateRow();
					} else {
						db.putUriHeads(keyUri, sb.toString().trim(), tNow);
					}
				}
			} catch (SQLException err) {
				RecoeveDB.err(err);
			} catch (Exception err) {
				System.out.println(err.getMessage());
			}
		});

		vertx.setTimer(TIMEOUT_MS, id -> {
			try {
				vertx.cancelTimer(pID[1]);
				page.waitForLoadState(LoadState.DOMCONTENTLOADED); // DOM 로드 완료 대기
				page.evaluate("document.querySelectorAll('video').forEach(video => video.pause())");
				List<ElementHandle> elements = page.querySelectorAll(cssSelector);
				if (!elements.isEmpty()) {
					StringBuilder sb = new StringBuilder();
					for (int i = 0; i < elements.size(); i++) {
						String text = elements.get(i).textContent().replaceAll("\\s", " ").trim();
						if (!text.isEmpty()) {
							sb.append("\n").append(cssSelector).append("-").append(i).append("\t").append(StrArray.enclose(text));
						}
					}
					cfElements.complete(sb.toString());
					if (uriHeads != null) {
						uriHeads.updateString("heads", sb.toString().trim());
						uriHeads.updateTimestamp("tUpdate", tNow);
						uriHeads.updateRow();
					} else {
						db.putUriHeads(keyUri, sb.toString().trim(), tNow);
					}
				} else {
					cfElements.complete("\nError: timeout " + TIMEOUT_MS + "ms.");
				}
			} catch (SQLException err) {
				RecoeveDB.err(err);
			} catch (Exception err) {
				cfElements.completeExceptionally(err);
			}
		});

		return cfElements;
	}

	public void findTitles(String uri, PrintLog pl) {
		final String[] keyUri = new String[]{uri};
		HttpServerResponse resp = pl.req.response();
		resp.putHeader("Content-Type", "text/plain; charset=utf-8").setChunked(true);
		resp.write("\nuri\t" + StrArray.enclose(uri));

		String conciseURI = null;
		if (RecoeveDB.getutf8mb4Length(uri) > 255) {
			keyUri[0] = conciseURI = db.getConciseURI(uri);
		}
		if (conciseURI != null) {
			resp.write("\nconciseURI\t" + StrArray.enclose(conciseURI));
		}
		ResultSet uriHeads = db.getUriHeads(keyUri[0]);

		try {
			if (uriHeads != null && uriHeads.getTimestamp("tUpdate").after(new Timestamp(pl.tNow.getTime() - EXPIRES_IN_MS))) {
				resp.end("\n" + uriHeads.getString("heads"));
			} else {
				final Page[] page = new Page[1];
				try {
					page[0] = getPage();
				} catch (Exception err) {
					System.out.println(err.getMessage());
				}
				try {
					if (page[0] == null) {
						if (!resp.ended()) {
							resp.end("\nError: null Page.");
						}
						releaseOrOfferPage(page[0]);
						return;
					}

					BiConsumer<String, Throwable> writeChunk = (result, error) -> {
						if (error == null) {
							try {
								result = "\n" + result.trim();
								if (result.isEmpty()) {
									result = "\nError: Empty result.";
								}
								resp.write(result, Recoeve.ENCODING);
								System.out.println(result);
							} catch (Exception e) {
								result = "\nError: writing chunk: " + e.getMessage();
								resp.write(result, Recoeve.ENCODING);
								System.err.println(result);
							}
						} else {
							result = "\nError: in future: " + error.getMessage();
							resp.write(result, Recoeve.ENCODING);
							System.err.println(result);
						}
					};

					redirected(uri).whenComplete((redirectedURI, err) -> {
						try {
							System.out.println("\nredirectedURI: " + URLDecoder.decode(redirectedURI, "UTF-8"));
						} catch (UnsupportedEncodingException e) {
							RecoeveDB.err(e);
						}
						CompletableFuture<Void> allOf = CompletableFuture.runAsync(() -> {});
						if (err == null) {
							try {
								page[0].navigate(redirectedURI);
								String[] decomposedURI = PrintLog.decomposeURI(redirectedURI);
								CompletableFuture<String> findTitle;
								CompletableFuture<String> findTitleUntilEveryFound;
								if (HOST_TO_CSS.get(decomposedURI[0]) == null) {
									findTitle = asyncFindTitle(page[0], "title,meta[name='title'],meta[name='og:title'],h1,h2");
									findTitleUntilEveryFound = asyncFindTitleUntilEveryFound(page[0], "title,meta[name='title'],meta[name='og:title'],h1,h2", uriHeads, pl.tNow, keyUri[0]);
								} else {
									findTitle = asyncFindTitle(page[0], HOST_TO_CSS.get(decomposedURI[0]));
									findTitleUntilEveryFound = asyncFindTitleUntilEveryFound(page[0], HOST_TO_CSS.get(decomposedURI[0]), uriHeads, pl.tNow, keyUri[0]);
								}

								allOf = CompletableFuture.allOf(findTitle, findTitleUntilEveryFound);

								findTitle.whenComplete(writeChunk);
								findTitleUntilEveryFound.whenComplete(writeChunk);

								allOf.whenComplete((v, error) -> {
									String errorMsg = "\nComplete with no error. " + v;
									if (error != null) {
										errorMsg = "\nError in futures: " + error.getMessage();
									}
									System.err.println(errorMsg);
									if (!resp.ended()) {
										resp.end(errorMsg);
									}
									releaseOrOfferPage(page[0]);
								});
							} catch (Exception e) {
								resp.end("\nError: " + e.getMessage());
								allOf.completeExceptionally(e);
							}
						} else {
							System.out.println("\nError: redirected(uri).whenComplete((redirectedURI, err) -> : " + err.getMessage());
						}
					});
				} catch (Exception e) {
					releaseOrOfferPage(page[0]);
					System.out.println("Release or Offer page\nException: " + e.getMessage());
					resp.end("\nError: Exception: " + e.getMessage());
				}
			}
		} catch (SQLException err) {
			RecoeveDB.err(err);
		}
	}

	public static void main(String... args) {
		try {
			Vertx vertx = Vertx.vertx();
			RecoeveWebClient recoeveWebClient = new RecoeveWebClient(vertx, vertx.getOrCreateContext(), new RecoeveDB(vertx));

			vertx.setTimer(500L, id -> {
				String uri = "https://kipid.tistory.com/entry/Lists";

				final String[] keyUri = new String[]{uri};
				if (RecoeveDB.getutf8mb4Length(uri) > 255) {
					keyUri[0] = recoeveWebClient.db.getConciseURI(uri);
				}
				ResultSet uriHeads = recoeveWebClient.db.getUriHeads(keyUri[0]);

				try {
					Timestamp tNow = recoeveWebClient.db.now();
					if (uriHeads != null && uriHeads.getTimestamp("tUpdate").after(new Timestamp(tNow.getTime() - EXPIRES_IN_MS))) {
						System.out.println("\nFrom DB\n" + uriHeads.getString("heads"));
					} else {
						final Page[] page = new Page[1];
						try {
							page[0] = recoeveWebClient.getPage();
						} catch (Exception err) {
							System.out.println(err.getMessage());
						}
						try {
							if (page[0] == null) {
								System.out.println("\nError: null Page.");
								recoeveWebClient.releaseOrOfferPage(page[0]);
								return;
							}

							BiConsumer<String, Throwable> writeChunk = (result, error) -> {
								if (error == null) {
									try {
										result = "\n" + result.trim();
										if (result.isEmpty()) {
											result = "\nError: Empty result.";
										}
										System.out.println(result);
									} catch (Exception e) {
										result = "\nError: writing chunk: " + e.getMessage();
										System.err.println(result);
									}
								} else {
									result = "\nError: in future: " + result + "\n" + error.getMessage();
									System.err.println(result);
								}
							};

							recoeveWebClient.redirected(uri).whenComplete((redirectedURI, err) -> {
								System.out.println("\nredirectedURI: " + redirectedURI);
								CompletableFuture<Void> allOf = CompletableFuture.runAsync(() -> {});
								if (err == null) {
									try {
										page[0].navigate(redirectedURI);
										String[] decomposedURI = PrintLog.decomposeURI(redirectedURI);
										CompletableFuture<String> findTitle;
										CompletableFuture<String> findTitleUntilEveryFound;
										if (HOST_TO_CSS.get(decomposedURI[0]) == null) {
											findTitle = recoeveWebClient.asyncFindTitle(page[0], "title, meta[name='title'], meta[name='og:title'], h1, h2");
											findTitleUntilEveryFound = recoeveWebClient.asyncFindTitleUntilEveryFound(page[0], "title, meta[name='title'], meta[name='og:title'], h1, h2", uriHeads, tNow, keyUri[0]);
										} else {
											findTitle = recoeveWebClient.asyncFindTitle(page[0], HOST_TO_CSS.get(decomposedURI[0]));
											findTitleUntilEveryFound = recoeveWebClient.asyncFindTitleUntilEveryFound(page[0], HOST_TO_CSS.get(decomposedURI[0]), uriHeads, tNow, keyUri[0]);
										}

										allOf = CompletableFuture.allOf(findTitle, findTitleUntilEveryFound);

										findTitle.whenComplete(writeChunk);
										findTitleUntilEveryFound.whenComplete(writeChunk);

										allOf.whenComplete((v, error) -> {
											String errorMsg = "\nComplete with no error. " + v;
											if (error != null) {
												errorMsg = "\nError in futures: " + error.getMessage();
											}
											System.err.println(errorMsg);
											recoeveWebClient.releaseOrOfferPage(page[0]);
										});
									} catch (Exception e) {
										System.out.println("\nError: " + e.getMessage());
										allOf.completeExceptionally(e);
									}
								}
							});
						} catch (Exception e) {
							recoeveWebClient.releaseOrOfferPage(page[0]);
							System.out.println("Release or Offer page\nException: " + e.getMessage());
						}
					}
				} catch (SQLException err) {
					RecoeveDB.err(err);
				}
			});
		} catch (Exception err) {
			System.out.println("Error: " + err.getMessage());
		}
	}
}