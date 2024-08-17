package recoeve.db;

// import java.lang.StringBuilder;

// import java.util.ArrayList;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
// import java.util.Set;
// import java.util.HashSet;

public class Points {
	public static final Pattern patternVal;
	static {
		// var regexVal=/^([0-9]+(?:\.[0-9]+)?)\/([0-9]+(?:\.[0-9]+)?)$/;
		patternVal = Pattern.compile("^([0-9]+(?:\\.[0-9]+)?)\\/([0-9]+(?:\\.[0-9]+)?)$");
	}

	private String pointStr;
	private double val;
	private boolean valid;

	public Points() {
		pointStr = null;
		val = -1;
		valid = false;
	}

	public Points(String valStr) {
		pointStr = valStr;
		val = val(valStr);
		valid = (val >= 0.0 && val <= 1.0);
	}

	public String toString() {
		return "str:" + pointStr + "\tval:" + val + "\tvalid:" + valid;
	}

	public String str() {
		return pointStr;
	}

	public double val() {
		return val;
	}

	public long val100() {
		return Math.round(val * 100);
	}

	public boolean valid() {
		return valid;
	}

	public boolean equals(Points pts2) {
		return (pointStr == null && pts2.pointStr == null) || (pointStr != null && pointStr.equals(pts2.pointStr));
	}

	public boolean equalValue(Points pts2) {
		return val == pts2.val;
	}

	public static boolean validVal(String val) {
		if (val != null && !val.isEmpty()) {
			Matcher match = patternVal.matcher(val);
			if (match.find()) {
				return Double.parseDouble(match.group(1)) <= Double.parseDouble(match.group(2));
			}
		}
		return false;
	}

	public static double val(String val) {
		if (val != null && !val.isEmpty()) {
			Matcher match = patternVal.matcher(val);
			if (match.find()) {
				double v1 = Double.parseDouble(match.group(1));
				double v2 = Double.parseDouble(match.group(2));
				if (v1 <= v2) {
					return v1 / v2;
				}
			}
		}
		return -1;
	}

	public static void main(String... args) {
		Points p = new Points("");
		Points p2 = new Points("2.1/10");
		System.out.println(p);
		System.out.println(p2);
		System.out.println(p.equals(p2));
		System.out.println(p.equalValue(p2));
	}
}