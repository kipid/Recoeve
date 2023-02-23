package kipid.test;

import java.net.HttpCookie;


public class HttpCookieTest {
	public static void main(String... args){
		HttpCookie hc=new HttpCookie("name", "value");
		hc.setMaxAge((long)1000);
		hc.setPath("/");
		hc.setDomain("tistory.com");
		hc.setSecure(true);
		hc.setHttpOnly(true);
		System.out.println(hc.toString());
		System.out.println("max-age="+hc.getMaxAge());
		System.out.println("path="+hc.getPath());
		System.out.println("domain="+hc.getDomain());
		System.out.println("secure="+hc.getSecure());
		System.out.println("HttpOnly="+hc.isHttpOnly());
	}
}