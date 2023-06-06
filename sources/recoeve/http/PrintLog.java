package recoeve.http;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.ext.web.RoutingContext;

import java.sql.*;

import java.net.URLDecoder;

import java.io.UnsupportedEncodingException;

import recoeve.db.RecoeveDB;
import recoeve.db.FileMap;



public class PrintLog implements Handler<RoutingContext> {
private static long numberOfClients=0;
public static final RecoeveDB db=new RecoeveDB();
public static String lang="df";
public static boolean refererAllowed=false;
public static String path="/";
public static Cookie cookie=null;
public static boolean sessionPassed=false;
public static String user_i=null;

public PrintLog() {}

public static void printLog(RoutingContext ctx) {
	HttpServerRequest req=ctx.request();
	////////////////////////////////////
	// Console log.
	////////////////////////////////////
	System.out.println("\n\nA client has connected!: "+(++numberOfClients));
	final String now=db.now();
	final String referer=req.headers().get("Referer");
		System.out.println("Time: "+now);
		if (referer!=null) {
			try {
				System.out.println("Referer: "+URLDecoder.decode(referer, "UTF-8"));
			}
			catch (UnsupportedEncodingException e) {
				System.out.println(e);
			}
		}
		else {
			System.out.println("Referer: null");
		}

	if (referer==null) {
		refererAllowed=true;
	}
	else if (referer.substring(0,4).toLowerCase().equals("http")) {
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
			}
			else {
				refererHost=referer.substring(k,l);
			}
			refererAllowed=FileMap.refererAllowed(refererHost);
			System.out.println("Referer Host: "+refererHost);
		}
	}
	System.out.println("Referer Allowed: "+refererAllowed);

	final HttpMethod method=req.method();
	path=req.path();
	final String query=req.query();
	System.out.println("Method: "+method);
	try {
		System.out.println("Absolute URI: "+URLDecoder.decode(req.absoluteURI(), "UTF-8"));
	}
	catch (UnsupportedEncodingException e) {
		System.out.println(e);
	}

	final String ip=req.remoteAddress().toString();
	System.out.println("User IP: "+ip);
	System.out.println("Local Address: "+req.localAddress());

	////////////////////////////////////
	// Session cookie 확인.
	////////////////////////////////////
	cookie=new Cookie(req.headers().get("Cookie"));
	sessionPassed=db.sessionCheck(cookie);
	System.out.println("Cookie: "+cookie);
	System.out.println("Session passed?: "+sessionPassed);
	user_i=cookie.get("rmbdI");
	if (user_i!=null) {
		try {
			ResultSet user=db.findUserByIndex(Long.parseLong(user_i, 16));
			if (user.next()) {
				System.out.println("User ID: "+user.getString("id"));
			}
		}
		catch (SQLException e) {
			db.err(e);
		}
	}

	String tmpLang=req.params().get("lang");
	if (tmpLang==null) {
		tmpLang=cookie.get("lang");
		if (tmpLang==null) { tmpLang="en"; }
	}
	lang=tmpLang;
	System.out.println("Lang: "+lang);
}

@Override
public void handle(RoutingContext ctx) {
	printLog(ctx);
}

public static void main(String... args) {
	// Do nothing.
}}
