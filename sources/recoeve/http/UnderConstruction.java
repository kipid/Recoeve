package recoeve.http;

import io.vertx.core.AbstractVerticle;
// import io.vertx.core.Verticle;

import io.vertx.core.Handler;;
import io.vertx.core.buffer.Buffer;
// import io.vertx.core.http.ClientAuth;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.net.JksOptions;
import io.vertx.core.net.TCPSSLOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

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
	private static final RecoeveDB db=PrintLog.db;

@Override
public void start() {
	Router router=Router.router(vertx);
	// PrintLog printLog=new PrintLog();

	// router.route().handler(printLog);

	router.route().handler(ctx -> {
		PrintLog.printLog(ctx);
		HttpServerRequest req=ctx.request();
		req.response().putHeader("Content-Type", "text/html; charset=utf-8");
		String res=FileMap.replaceStr("<h1>Recoeve.net is Under Construction.</h1>", PrintLog.lang);
		req.response().setStatusCode(404).end(res, ENCODING);
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

public static void main(String... args) {
	// Do nothing.
}} // public class UnderConstruction extends AbstractVerticle
