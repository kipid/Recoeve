package recoeve.db;

// import java.util.regex.Pattern;
// import java.util.regex.Matcher;



public class HTMLString {
// eve.escapeHTML=function(str) {
// 	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// };
// eve.unescapeHTML=function(str) {
// 	return str.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&');
// };
public static String escapeOnlyTag(String str) {
	return str.replaceAll("<","&lt;").replaceAll(">","&gt;");
}
public static String escapeHTML(String str) {
	return str.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}
public static String unescapeHTML(String str) {
	return str.replaceAll("&gt;",">").replaceAll("&lt;","<").replaceAll("&amp;","&");
}

public HTMLString() {}

public static void main(String... args) {
	String str=escapeOnlyTag("<>&<script></script>");
	System.out.println(str);
	System.out.println(unescapeHTML(str));
}
}