import io.vertx.core.AbstractVerticle;
// import io.vertx.core.Verticle;

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

import java.sql.*;

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



public class UnderConstruction extends AbstractVerticle {
	public static final String HOST
		// ="recoeve.net";
		// ="0.0.0.0";
		="localhost";
	public static final String ENCODING="UTF-8";
	public static final String INVALID_ACCESS="INVALID ACCESS";
	private static long numberOfClients;
	static {
		numberOfClients=0;
	}

	@Override
public void start() {
	RecoeveDB db=new RecoeveDB();

	Router router=Router.router(vertx);

	router.route().handler(ctx -> {
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

		boolean refererAllowed=false;
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
		final String path=req.path();
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
		final Cookie cookie=new Cookie(req.headers().get("Cookie"));
		final boolean sessionPassed=db.sessionCheck(cookie);
		System.out.println("Cookie: "+cookie);
		System.out.println("Session passed?: "+sessionPassed);
		final String user_i=cookie.get("rmbdI");
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
		final String lang=tmpLang;
		System.out.println("Lang: "+lang);

		req.response().putHeader("Content-Type", "text/html; charset=utf-8");
		String res=FileMap.replaceStr("<h1>Recoeve.net is Under Construction.</h1>", lang);
		req.response().end(res, ENCODING);
		System.out.println("Sended '"+res+"'");
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
} // public class UnderConstruction extends AbstractVerticle
