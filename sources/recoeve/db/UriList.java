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
	
	public String fullURIs;
	
	public UriList() {
		fullURIs="\n";
	}
	public UriList(String strData) { // strData must be well formatted.
		if (strData==null) {
			fullURIs="\n";
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
	public void putURI(String uri) {
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
				fullURIs="\n"+newFullURIs.trim()+"\n";
				return true;
			}
		}
		return false;
	}
	
	public boolean isEmpty() {
		return fullURIs.trim().isEmpty();
	}
	public String toString() {
		return fullURIs;
	}
	
	public static void main(String... args) {
		UriList uriL=new UriList();
		System.out.println(uriL.isEmpty());
		uriL.putURI("abcde");
		uriL.putURI("abcde2");
		uriL.putURI("abcde3");
		uriL.putURI("abcde4");
		uriL.putURI("abcde5");
		uriL.putURI("abcde6");
		System.out.println(uriL);
		System.out.println(uriL.isEmpty());
		uriL.deleteURI("abcde3");
		System.out.println(uriL);
		System.out.println(uriL.changeOrders("abcde\nabcde2\nabcde6\nabcde4\nabcde5"));
		System.out.println(uriL);
	}
}