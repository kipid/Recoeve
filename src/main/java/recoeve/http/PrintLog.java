package recoeve.http;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.ext.web.RoutingContext;

import java.lang.StringBuilder;

import java.sql.*;

import java.net.URLDecoder;

import java.io.UnsupportedEncodingException;

import recoeve.db.RecoeveDB;
import recoeve.db.FileMap;
import recoeve.db.HTMLString;

public class PrintLog implements Handler<RoutingContext> {
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
	public String now;
	public Timestamp tNow;
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
		now = db.now();
		tNow = Timestamp.valueOf(now);
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
		} else {
			msg = "Referer: null";
			System.out.println(msg);
			// html.append(msg + "<br/>");
		}

		if (referer == null) {
			refererAllowed = true;
		} else if (referer.substring(0, 4).toLowerCase().equals("http")) {
			int k = 4;
			if (referer.charAt(k) == 's' || referer.charAt(k) == 'S') {
				k++;
			}
			if (referer.startsWith("://", k)) {
				k += 3;
				int l = referer.indexOf("/", k);
				String refererHost = null;
				if (l > 0) {
					refererHost = referer.substring(k, l);
					String[] pathnames = referer.substring(l).split("/");
					if (pathnames.length >= 3 && pathnames[1].equals("user")) {
						pathnames = pathnames[2].split("\\?");
						userId = pathnames[0];
						msg = "userId: " + userId;
						System.out.println(msg);
						// html.append(msg + "<br/>");
					}
				} else {
					refererHost = referer.substring(k);
				}
				if (refererHost.equals("www.recoeve.net")) {
					refererHost = "recoeve.net";
				}
				refererAllowed = FileMap.refererAllowed(refererHost);
				msg = "Referer Host: " + refererHost;
				System.out.println(msg);
				// html.append(msg + "<br/>");
			}
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
				} else {
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
		// Do nothing.
	}
}
