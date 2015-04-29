package recoeve.db;

// import java.lang.StringBuilder;

// import java.util.Set;
// import java.util.HashSet;
// import java.util.LinkedHashMap;
// import java.util.Iterator;
// import java.util.HashMap;

import java.util.regex.Pattern;
import java.util.regex.Matcher;



/////////////////////////
// 계층 구조로 짰던거 back-up 용. (쓸 일이 없을듯?)
/////////////////////////
// 매번 computational cost 가 너무 많이 들거 같아서 진행 안했음.
// Reco 가 될때마다 계산하고 한번쓰고 버려지는 경우가 많아서.

public class CatListTreeMap {
	public class Cat {
		public String name;
		public Cat superCat;
		public LinkedHashMap<String,Cat> subCats;
		
		public Cat(String str) {
			name=str;
			superCat=null;
			subCats=new LinkedHashMap<String,Cat>();
		}
		private Cat(String str, Cat superCat) {
			name=str;
			this.superCat=superCat;
			subCats=new LinkedHashMap<String,Cat>();
		}
		public Cat putSubCat(String str) {
			Cat subCat=new Cat(str, this);
			subCats.put(str, subCat);
			return subCat;
		}
	}
	
	
	
	public String fullStr;
	public String[] strArray;
	public LinkedHashMap<String,Cat> listSuperCats;
	
	public CatList() {
		fullStr="\n";
	}
	public CatList(String strData) {
		fullStr="\n"+strData.trim()+"\n";
		strArray=fullStr.split("\n");
		listSuperCats=new LinkedHashMap<String,Cat>();
		HashMap<Integer,Cat> lastCats=new HashMap<Integer,Cat>();
		int lastCatDepth=0;
		String lastCatStr=strArray[0].trim();
		lastCats.put(lastCatDepth, new Cat(lastCatStr));
		// lastCats.remove(...);
		listSuperCats.put(lastCatStr, lastCats.get(lastCatDepth));
		for (int i=1;i<strArray.length;i++) {
			lastCatDepth=getDepthOfTabs(strArray[i]);
			lastCatStr=strArray[i].trim();
			System.out.println(strArray[i]+" : "+lastCatDepth);
		}
	}
	public Cat getSuperCat(int i) {
		Cat cat=null;
		if (i<listSuperCats.size()) {
			Iterator<Cat> iterSuperCats=listSuperCats.iterator();
			int k=0;
			while (k<=i&&iterSuperCats.hasNext()) {
				cat=iterSuperCats.next();
				k++;
			}
		}
		return cat;
	}
	public boolean putCat(String cat) {
		boolean res=false;
		if (cat==null||cat.isEmpty()) { return res; }
		String[] levels=cat.split("--");
		String pre="\n";
		int start=0;
		int end=fullStr.length();
		for (int j=0;j<levels.length;j++) {
			String subStr=fullStr.substring(start,end);
			Pattern ptn=Pattern.compile(Pattern.quote(pre+levels[j]+"\n"));
			Matcher match=ptn.matcher(subStr);
			if (match.find()) {
				Pattern ptnEnd=Pattern.compile(Pattern.quote(pre)+"[^\\t\\n]");
				Matcher matchEnd=ptnEnd.matcher(subStr);
				if (matchEnd.find(match.end()-1)) {
					end=start+matchEnd.start()+1;
				}
				start+=match.end()-1;
				pre+="\t";
			} else {
				String toPut="";
				for (;j<levels.length;j++) {
					toPut+=pre+levels[j];
					pre+="\t";
				}
				fullStr=fullStr.substring(0,end-1)+toPut+"\n"+fullStr.substring(end);
				res=true;
			}
		}
		return res;
	}
	
	public static void main(String... args) {}
}