package recoeve.http;

public class SString {
private String value;

public SString(String value) {
	this.value=value;
}

public int length() {
	return value.length();
}

public String getValue() {
	return value;
}

public int hashCode() { // Refered recoeve.db.Encrypt.java
	if (value.isEmpty()) {
		return 0;
	}
	int h=-17-value.length();
	for (int i=0;i<value.length();i++) {
		h+=value.codePointAt(i);
		h+=(h<<10);
		h^=(h>>>6);
	}
	h+=( ((int)((h&0xffff_ffffL)%1318489))<<7 );
	h+=(h<<3);
	h^=(h>>>11);
	h+=(h<<15);
	h=h>>>0;
	return h;
}

public static void main(String... args) {} // Do nothing.
}
