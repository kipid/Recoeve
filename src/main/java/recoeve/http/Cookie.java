package recoeve.http;

import java.lang.StringBuilder;

import java.util.Map;
import java.util.HashMap;



public class Cookie{
	public String str;
	public Map<String, String> map;
	
	public Cookie(){
		str="";
		map=new HashMap<String, String>(30);
	}
	public Cookie(String cookieStr){
		this();
		if (cookieStr!=null){
			str=cookieStr;
			String[] cookies=str.split("\\s*;\\s*");
			for (String c: cookies){
				int i=c.indexOf("=");
				if (i>0) {
					map.putIfAbsent(c.substring(0,i).trim(), c.substring(i+1).trim());
				}
			}
		}
	}
	
	public String get(String key){
		return map.get(key);
	}
	public boolean put(String key, String value){
		return (map.putIfAbsent(key, value)==null);
	}
	
	public String toString() {
		StringBuilder sb=new StringBuilder();
		for (Map.Entry<String, String> entry: map.entrySet()) {
			sb.append(" "+entry.getKey()+" : "+entry.getValue()+"\n");
		}
		return sb.toString();
	}
	
	public static void main(String... args){
		Cookie cookie=new Cookie("a=b;a=c;a=d;keyvalue");
		System.out.println(cookie);
		System.out.println("a=? "+cookie.get("a"));
		System.out.println("a=? "+cookie.get("a"));
		System.out.println("key=? "+cookie.get("key"));
	}
}