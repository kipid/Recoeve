package recoeve.http;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.ext.web.RoutingContext;

import java.sql.*;
import java.net.URLDecoder;
// import java.net.URI;
// import java.net.URISyntaxException;
// import java.util.Map;
// import java.util.HashMap;

import java.io.UnsupportedEncodingException;

import recoeve.db.RecoeveDB;
import recoeve.db.FileMap;

public class PrintLog implements Handler<RoutingContext> {
	private static long numberOfClients = 0;
	public RecoeveDB db;
	public HttpServerRequest req;
	public String lang = "df";
	public boolean refererAllowed = false;
	public String path = "/";
	public Cookie cookie;
	public boolean sessionPassed = false;
	public String user_i;
	public HttpMethod method;
	public String now;
	public Timestamp tNow;
	public String referer;
	public String ip;
	public String userAgent;
	public String absoluteURI;

	public PrintLog(RecoeveDB db) {
		this.db = db;
	}

	public void printLog(RoutingContext ctx) {
		req = ctx.request();
		////////////////////////////////////
		// Console log.
		////////////////////////////////////
		System.out.println("\n\nA client has connected!: " + (++numberOfClients));
		now = db.now();
		tNow = Timestamp.valueOf(now);
		userAgent = req.getHeader("User-Agent");
		referer = req.headers().get("Referer");
		System.out.println("Time: " + now);
		System.out.println("User-Agent: " + userAgent);
		if (userAgent != null) {
			System.out.println("User-Agent.length: " + userAgent.length());
		}
		if (referer != null) {
			try {
				System.out.println("Referer: " + URLDecoder.decode(referer, "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				System.out.println(e);
			}
		} else {
			System.out.println("Referer: null");
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
				} else {
					refererHost = referer.substring(k);
				}
				if (refererHost.equals("www.recoeve.net")) {
					refererHost = "recoeve.net";
				}
				refererAllowed = FileMap.refererAllowed(refererHost);
				System.out.println("Referer Host: " + refererHost);
			}
		}
		System.out.println("Referer Allowed: " + refererAllowed);

		method = req.method();
		path = req.path();
		final String query = req.query();
		System.out.println("query: " + query);
		System.out.println("Method: " + method);
		absoluteURI = req.absoluteURI();
		try {
			System.out.println("Absolute URI: " + URLDecoder.decode(absoluteURI, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			RecoeveDB.err(e);
		}

		ip = req.remoteAddress().toString();
		System.out.println("User IP: " + ip);
		System.out.println("Local Address: " + req.localAddress());

		////////////////////////////////////
		// Session cookie 확인.
		////////////////////////////////////
		cookie = new Cookie(req.headers().get("Cookie"));
		sessionPassed = db.sessionCheck(cookie, tNow);
		// System.out.println("Cookie: "+cookie);
		System.out.println("Session passed?: " + sessionPassed);
		user_i = cookie.get("rmbdI");
		if (user_i != null) {
			try {
				ResultSet user = db.findUserByIndex(Long.parseLong(user_i, 16));
				if (user.next()) {
					System.out.println("User ID: " + user.getString("id"));
				}
			} catch (SQLException e) {
				RecoeveDB.err(e);
			}
		}

		String acceptLang = req.headers().get("Accept-Language");
		System.out.println("Accept-Language:"+acceptLang);
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
		System.out.println("Lang: " + lang);
		System.out.flush();
	}

	@Override
	public void handle(RoutingContext ctx) {
		printLog(ctx);
	}

	public static void main(String... args) {
		// Do nothing.
	}
}
