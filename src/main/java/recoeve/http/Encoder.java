package recoeve.http;



import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class Encoder {
public static void main(String... args) {
	// String input="한글"; // Replace with your actual input
	// String encoded=encodeURIComponent(input);
	// System.out.println(encoded);
}

public static String decodeURIComponent(String encodedURI) {
	String decodedURI=null;
	try {
		decodedURI=URLDecoder.decode(encodedURI, StandardCharsets.UTF_8.toString());
	} catch (UnsupportedEncodingException e) {
		e.printStackTrace();
	}
	return decodedURI;
}

public static String encodeURIComponent(String input) {
	try {
		String encoded=URLEncoder.encode(input, "UTF-8");
		encoded=encoded.replace("+", "%20");
		encoded=encoded.replaceAll("\\%([a-fA-F0-9]{2})", "%$1");
		return encoded;
	}
	catch (UnsupportedEncodingException e) {
		// Handle encoding exception
		e.printStackTrace();
		return null;
	}
}
}
