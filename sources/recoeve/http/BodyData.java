package recoeve.http;

// import org.vertx.java.core.buffer.Buffer;

import java.lang.StringBuilder;

import java.util.Map;
import java.util.HashMap;

import java.net.URLDecoder;



public class BodyData{
	public String str;
	public Map<String, String> map;
	
	public BodyData(){
		str="";
		map=new HashMap<String, String>(50);
	}
	// public BodyData(Buffer body){
	// 	this(body.toString());
	// }
	public BodyData(String bodyStr){
		this();
		if (bodyStr!=null){
			str=bodyStr;
			try {
				String[] bodies=str.split("\\s*&\\s*");
				for (String b: bodies){
					int i=b.indexOf("=");
					map.putIfAbsent(URLDecoder.decode(b.substring(0,i).trim(),"UTF-8"), URLDecoder.decode(b.substring(i+1).trim(),"UTF-8"));
				}
			} catch (Exception e){
				System.out.println(e);
			}
		}
	}
	
	public String get(String key){
		return map.get(key);
	}
	public boolean put(String key, String value){
		return (map.putIfAbsent(key, value)==null);
	}
	
	public String toString(){
		StringBuilder sb=new StringBuilder();
		for (Map.Entry<String, String> input: map.entrySet()) {
			sb.append("  ")
				.append(input.getKey()).append(": ")
				.append(input.getValue()).append("\n");
		}
		return sb.toString();
	}
	
	public static void main(String... args){
		BodyData body=new BodyData("a=b&a=c&a=d&key=value");
		System.out.println("data:\n"+body);
		System.out.println("a=? "+body.get("a"));
		System.out.println("a=? "+body.get("a"));
		System.out.println("key=? "+body.get("key"));
	}
}