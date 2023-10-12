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
public HttpServerRequest req=null;
public String lang="df";
public boolean refererAllowed=false;
public String path="/";
public Cookie cookie=null;
public boolean sessionPassed=false;
public String user_i=null;
public HttpMethod method=null;
public String now=null;
public Timestamp tNow=null;
public String referer=null;
public String ip=null;
public String userAgent=null;

public PrintLog() {}

public void printLog(RoutingContext ctx) {
	req=ctx.request();
	req.response().putHeader("Access-Control-Allow-Origin", "*")
		.putHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		.putHeader("Access-Control-Allow-Headers", "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");
	////////////////////////////////////
	// Console log.
	////////////////////////////////////
	System.out.println("\n\nA client has connected!: "+(++numberOfClients));
	now=db.now();
	tNow=Timestamp.valueOf(now);
	userAgent=req.getHeader("User-Agent");
	referer=req.headers().get("Referer");
		System.out.println("Time: "+now);
		System.out.println("User-Agent: "+userAgent);
		if (userAgent!=null) {
			System.out.println("User-Agent.length: "+userAgent.length());
		}
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

	method=req.method();
	path=req.path();
	final String query=req.query();
	System.out.println("Method: "+method);
	try {
		System.out.println("Absolute URI: "+URLDecoder.decode(req.absoluteURI(), "UTF-8"));
	}
	catch (UnsupportedEncodingException e) {
		System.out.println(e);
	}

	ip=req.remoteAddress().toString();
	System.out.println("User IP: "+ip);
	System.out.println("Local Address: "+req.localAddress());

	////////////////////////////////////
	// Session cookie 확인.
	////////////////////////////////////
	cookie=new Cookie(req.headers().get("Cookie"));
	sessionPassed=db.sessionCheck(cookie, tNow);
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
	System.out.flush();
}

@Override
public void handle(RoutingContext ctx) {
	printLog(ctx);
}

public static void main(String... args) {
	// Do nothing.
}}
