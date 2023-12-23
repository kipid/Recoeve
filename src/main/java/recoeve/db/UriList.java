package recoeve.db;

// import java.lang.StringBuilder;

import java.util.Set;
import java.util.HashSet;
// import java.util.LinkedHashMap;
// import java.util.Iterator;
// import java.util.HashMap;

// import java.util.regex.Pattern;
// import java.util.regex.Matcher;



////////////////////////////////
// Strict rules
////////////////////////////////
// URI must not contain "\n".
// URI must not be empty.
// Each URI must be enclosed by "\n".

public class UriList {
	public static String toFormat(String str) {
		return "\n"+str.trim()+"\n";
	}
	public static final int CUT_SIZE=1024*256;
	
	public String fullURIs;
	
	public UriList() {
		fullURIs="\n"; // for simple putURI().
	}
	public UriList(String strData) { // strData must be well formatted.
		if (strData==null) {
			fullURIs="\n"; // for simple putURI().
		} else {
			fullURIs=strData;
		}
	}
	
	public String[] listOfURIs() {
		return fullURIs.trim().split("\n");
	}
	public Set<String> setOfURIs() {
		Set<String> set=new HashSet<String>();
		String[] list=listOfURIs();
		for (int i=0;i<list.length;i++) {
			set.add(list[i]);
		}
		return set;
	}
	public void putURI(String uri) { // Newest uri to the top.
		fullURIs="\n"+uri+fullURIs;
	}
	public boolean deleteURI(String uri) {
		int i=fullURIs.indexOf("\n"+uri+"\n");
		if (i!=-1) {
			fullURIs=fullURIs.substring(0,i)+fullURIs.substring(i+uri.length()+1);
			return true;
		}
		return false;
	}
	public boolean changeOrders(String newFullURIs) {
		String[] uriList0=fullURIs.trim().split("\n");
		String[] uriList1=newFullURIs.trim().split("\n");
		if (uriList0.length==uriList1.length) {
			Set<String> set0=new HashSet<String>();
			Set<String> set1=new HashSet<String>();
			for (int i=0;i<uriList0.length;i++) {
				set0.add(uriList0[i]);
				set1.add(uriList1[i]);
			}
			if (set0.equals(set1)) {
				System.out.println("Set is equal to each other.");
				fullURIs="\n"+newFullURIs.trim()+"\n";
				return true;
			}
			else {
				System.out.println("Set is not equal to each other.");
			}
		}
		else {
			System.out.println("UriList.length is different.");
		}
		return false;
	}
	
	public boolean isEmpty() {
		return fullURIs.trim().isEmpty();
	}
	public String toString() {
		return fullURIs;
	}
	public String toStringEnclosed(String strFrom, String check) {
		if (fullURIs.trim().isEmpty()) {
			return "\t1,-1\t;empty";
		}
		String err="";
		int from=1;
		if (strFrom!=null) {
			try {
				from=Integer.parseInt(strFrom,16);
			} catch (NumberFormatException e) {
				err+=";from:NumberFormatException";
				from=1; check=null;
			}
		}
		if (check==null) {
			check="\n";
		} else if (check.charAt(check.length()-1)!='\n') {
			check+="\n";
		}
		int checkStart=from-check.length();
		if (checkStart<0||fullURIs.length()<from||!fullURIs.substring(checkStart,from).equals(check)) {
			from=1;
			err+=";check string is not matched";
		}
		int to=-1;
		if (fullURIs.length()-from>CUT_SIZE) {
			to=fullURIs.indexOf("\n", from+CUT_SIZE);
			if (to>=fullURIs.length()-1) {
				to=-1;
			}
		}
		String uris=null;
		if (to==-1) {
			uris=fullURIs.substring(from).trim();
		} else {
			uris=fullURIs.substring(from,to);
		}
		if (!uris.isEmpty()) {
			uris="\""+uris.replaceAll("\"","\"\"")+"\"";
		} // faster than StrArray.enclose(strUriL)
		return uris+"\t"+Integer.toString(from,16)+","+Integer.toString(to,16)+"\t"+err;
	}
	
	public static void main(String... args) {
		// UriList uriL=new UriList();
		// System.out.println(uriL.isEmpty());
		// uriL.putURI("abcde");
		// uriL.putURI("abcde2");
		// uriL.putURI("abcde3");
		// uriL.putURI("abcde4");
		// uriL.putURI("abcde5");
		// uriL.putURI("abcde6");
		// System.out.println(uriL);
		// System.out.println(uriL.isEmpty());
		// uriL.deleteURI("abcde3");
		// System.out.println(uriL);
		// System.out.println(uriL.changeOrders("abcde\nabcde2\nabcde6\nabcde4\nabcde5"));
		// System.out.println(uriL);
	}
}