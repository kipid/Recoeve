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
// Each recoer must be enclosed by "\n".

public class RecentRecoers {
	public static final int maxNRecentRecoers=1000;
	public static String toFormat(String str) {
		return "\n"+str.trim()+"\n";
	}
	
	public String fullRecoers;
	
	public RecentRecoers() {
		fullRecoers="\n";
	}
	public RecentRecoers(String strData) { // strData must be well formatted.
		if (strData==null) {
			fullRecoers="\n";
		} else {
			fullRecoers=strData;
		}
	}
	
	public String[] listOfRecoers() {
		return fullRecoers.trim().split("\n");
	}
	public Set<Long> setOfRecoers() {
		Set<Long> set=new HashSet<Long>();
		String[] list=listOfRecoers();
		if (list.length==1&&list[0].isEmpty()) { return set; }
		for (int i=0;i<list.length;i++) {
			set.add(Long.parseLong(list[i], 16));
		}
		return set;
	}
	public void putRecoer(long user_i) {
		String recoer=Long.toString(user_i,16);
		fullRecoers="\n"+recoer+fullRecoers;
	}
	public boolean deleteRecoer(long user_i) {
		String recoer=Long.toString(user_i,16);
		int i=fullRecoers.indexOf("\n"+recoer+"\n");
		if (i!=-1) {
			fullRecoers=fullRecoers.substring(0,i)+fullRecoers.substring(i+recoer.length()+1);
			return true;
		}
		return false;
	}
	public boolean cutRecoers() {
		String[] list=listOfRecoers();
		if (list.length>maxNRecentRecoers) {
			int cutLength=0;
			for (int i=list.length-1;i>=maxNRecentRecoers;i--) {
				cutLength+=list[i].length()+1;
			}
			int toCut=fullRecoers.length()-cutLength;
			if (fullRecoers.startsWith(list[maxNRecentRecoers], toCut)) {
				fullRecoers=fullRecoers.substring(0, toCut);
				return true;
			}
		}
		return false;
	}
	public String toString() {
		return fullRecoers;
	}
	
	public static void main(String... args) {
		RecentRecoers rr=new RecentRecoers();
		rr.putRecoer(1300000000);
		rr.putRecoer(1200000000);
		rr.putRecoer(1100000000);
		rr.putRecoer(1000000000);
		rr.putRecoer(900000000);
		rr.putRecoer(800000000);
		rr.putRecoer(700000000);
		rr.putRecoer(600000000);
		rr.putRecoer(500000000);
		rr.putRecoer(400000000);
		rr.putRecoer(300000000);
		rr.putRecoer(200000000);
		rr.putRecoer(100000000);
		System.out.println(rr);
		
		rr.cutRecoers();
		System.out.println(rr);
	}
}