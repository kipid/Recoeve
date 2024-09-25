package recoeve.http;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.ext.web.RoutingContext;
import recoeve.db.FileMap;
import recoeve.db.RecoeveDB;
// import recoeve.db.HTMLString;

public class PrintLog implements Handler<RoutingContext> {
	public static String[] decomposeURI(String uri) {
		uri = uri.split("[\\s\\t\\n]")[0];
		String[] res = new String[4]; // uriHost, pathname, search, hash
		res[0] = null;
		res[1] = null;
		res[2] = null;
		res[3] = null;
		if (uri.length() > 4 && uri.substring(0, 4).toLowerCase().equals("http")) {
			int k = 4;
			if (uri.charAt(k) == 's' || uri.charAt(k) == 'S') {
				k++;
			}
			if (uri.startsWith("://", k)) {
				k += 3;
				int l = uri.indexOf("/", k);
				if (l > 0) {
					res[0] = uri.substring(k, l);
					int m = uri.indexOf("?", l);
					if (m > 0) {
						res[1] = uri.substring(l, m);
						int n = uri.indexOf("#", m);
						if (n > 0) {
							res[2] = uri.substring(m, n);
							res[3] = uri.substring(n);
						}
						else {
							res[2] = uri.substring(m);
							res[3] = "";
						}
					}
					else {
						res[2] = "";
						int n = uri.indexOf("#", l);
						if (n > 0) {
							res[1] = uri.substring(l, n);
							res[3] = uri.substring(n);
						}
						else {
							res[1] = uri.substring(l);
							res[3] = "";
						}
					}
				}
				else {
					res[1] = "";
					int m = uri.indexOf("?", k);
					if (m > 0) {
						res[0] = uri.substring(k, m);
						int n = uri.indexOf("#", m);
						if (n > 0) {
							res[2] = uri.substring(m, n);
							res[3] = uri.substring(n);
						}
						else {
							res[2] = uri.substring(m);
							res[3] = "";
						}
					}
					else {
						res[2] = "";
						int n = uri.indexOf("#", k);
						if (n > 0) {
							res[0] = uri.substring(k, n);
							res[3] = uri.substring(n);
						}
						else {
							res[0] = uri.substring(k);
							res[3] = "";
						}
					}
				}
			}
		}
		res[0] = res[0].toLowerCase();
		return res;
	}

	private static long numberOfClients = 0;
	public RecoeveDB db;
	public HttpServerRequest req;
	public String lang = "df";
	public boolean refererAllowed = false;
	public String path = "/";
	public Cookie cookie;
	public boolean sessionPassed = false;
	public String user_i_str;
	public long user_i = 1;
	public HttpMethod method;
	public Timestamp tNow;
	public String now;
	public String referer;
	public String ip;
	public String userAgent;
	public String absoluteURI;
	public String userId = null;
	// public StringBuilder html = new StringBuilder();

	public PrintLog(RecoeveDB db) {
		this.db = db;
	}

	public void printLog(RoutingContext ctx) {
		req = ctx.request();
		////////////////////////////////////
		// Console log.
		////////////////////////////////////
		String msg = "\n\nA client has connected!: " + (++numberOfClients);
		System.out.println(msg);
		// html.append("<div class=\"access\">" + msg.trim() + "<br/>");
		tNow = db.now();
		now = tNow.toString();
		userAgent = req.getHeader("User-Agent");
		referer = req.headers().get("Referer");
		msg = "Time: " + now;
		System.out.println(msg);
		// html.append(msg + "<br/>");
		msg = "User-Agent: " + userAgent;
		System.out.println(msg);
		// html.append(msg + "<br/>");
		if (userAgent != null) {
			msg = "User-Agent.length: " + userAgent.length();
			System.out.println(msg);
			// html.append(msg + "<br/>");
		}
		if (referer != null) {
			try {
				msg = "Referer: " + URLDecoder.decode(referer, "UTF-8");
				System.out.println(msg);
				// html.append(msg + "<br/>");
			} catch (UnsupportedEncodingException e) {
				System.out.println(e);
			}
		}
		else {
			msg = "Referer: null";
			System.out.println(msg);
			// html.append(msg + "<br/>");
		}

		if (referer == null) {
			refererAllowed = true;
		}
		else {
			String[] decomposedReferer = PrintLog.decomposeURI(referer);
			String refererHost = decomposedReferer[0];
			String[] pathnames = decomposedReferer[1].split("/");
			if (pathnames.length >= 3 && pathnames[1].equals("user")) {
				userId = pathnames[2];
				msg = "userId: " + userId;
				System.out.println(msg);
				// html.append(msg + "<br/>");
			}
			if (refererHost.equals("www.recoeve.net")) {
				refererHost = "recoeve.net";
			}
			refererAllowed = FileMap.refererAllowed(refererHost);
			msg = "Referer Host: " + refererHost;
			System.out.println(msg);
			// html.append(msg + "<br/>");
		}
		msg = "Referer Allowed: " + refererAllowed;
		System.out.println(msg);
		// html.append(msg + "<br/>");

		method = req.method();
		path = req.path();
		final String query = req.query();
		msg = "query: " + query;
		System.out.println(msg);
		// html.append(msg + "<br/>");
		msg = "Method: " + method;
		System.out.println(msg);
		// html.append(msg + "<br/>");
		absoluteURI = req.absoluteURI();
		try {
			msg = "Absolute URI: " + URLDecoder.decode(absoluteURI, "UTF-8");
			System.out.println(msg);
			// html.append("Absolute URI: <a target=\"_blank\" href=\"absoluteURI\">" + HTMLString.escapeOnlyTag(URLDecoder.decode(absoluteURI, "UTF-8")) + "</a><br/>");
		} catch (UnsupportedEncodingException e) {
			RecoeveDB.err(e);
		}

		ip = req.remoteAddress().toString();
		msg = "User IP: " + ip;
		System.out.println(msg);
		// html.append(msg + "<br/>");
		msg = "Local Address: " + req.localAddress();
		System.out.println(msg);
		// html.append(msg + "<br/>");

		////////////////////////////////////
		// Session cookie 확인.
		////////////////////////////////////
		cookie = new Cookie(req.headers().get("Cookie"));
		sessionPassed = db.sessionCheck(cookie, tNow);
		// System.out.println("Cookie: "+cookie);
		msg = "Session passed?: " + sessionPassed;
		System.out.println(msg);
		// html.append(msg + "<br/>");
		user_i_str = cookie.get("rmbdI");
		if (user_i_str == null) {
			user_i = 1; // Anonymous
		}
		else {
			try {
				user_i = Long.parseLong(user_i_str, 16);
				ResultSet user = db.findUserByIndex(user_i);
				if (user.next()) {
					msg = "User ID: " + user.getString("id");
					System.out.println(msg);
					// html.append("User ID: <a target=\"_blank\" href=\"/user/" + user.getString("id") + "\">" + user.getString("id") + "</a><br/>");
				}
				else {
					user_i = 1;
				}
			} catch (SQLException e) {
				RecoeveDB.err(e);
			}
		}

		String acceptLang = req.headers().get("Accept-Language");
		msg = "Accept-Language:" + acceptLang;
		System.out.println(msg);
		// html.append(msg + "<br/>");
		String tempLang = req.params().get("lang");
		if (tempLang == null) {
			tempLang = cookie.get("lang");
			if (tempLang == null) {
				if (acceptLang != null && acceptLang.length() >= 2) {
					tempLang = acceptLang.substring(0, 2);
				}
				else {
					tempLang = "en";
				}
			}
		}
		lang = tempLang;
		msg = "Lang: " + lang;
		System.out.println(msg);
		// html.append(msg + "<br/>");
		System.out.flush();
		// return html;
	}

	@Override
	public void handle(RoutingContext ctx) {
		printLog(ctx);
	}

	public static void main(String... args) {
		String[] decomposedURI = PrintLog.decomposeURI("https://www.instagram.com/p/C7lynXUxUhW/");
		for (String d : decomposedURI) {
			System.out.println(d);
		}
	}
}
