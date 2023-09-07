package recoeve.db;

// import java.lang.StringBuilder;

// import java.util.ArrayList;
// import java.util.regex.Pattern;
// import java.util.regex.Matcher;
import java.util.Iterator;
import java.util.Set;
import java.util.HashSet;



/////////////////////////
// Strict rules
/////////////////////////
// No "\n", "\t", "\r" inside. To "\s".
// No empty "" cat-folder : e.g. "--B", "A--", "A----C"
	// The only exception is the uncategorized super cat "".
// Cat-folder must be trimmed, and not starting or ending with "-".
	// Therefore no /^[\s-]+/ and /[\s-]+$/ in cat-folder. : e.g. "-A-yo --B"
// Case-sensitive cat-folder : "a"=!="A"

/////////////////////////
// Category Tree Ex
/////////////////////////
// null
// 	"" // The only possible empty cat-folder.
// 	"Later"
//		"some"
// 	"Indiff"
// 	"[Physics/Math]"
// 		"Ideas"
// 		"News"

public class Categories {
	public static final String indif="Indifferent";
	public static final String later="Later";
	
	public static String toFormat(String cats) {
		if (cats==null||cats.isEmpty()) { return ""; }
		cats=cats.replaceAll("[\\t\\r\\n]", " ");
		String[] listCats=cats.split(";");
		for (int i=0;i<listCats.length;i++) {
			String[] levels=listCats[i].split("--");
			for (int j=0;j<levels.length;j++) {
				levels[j]=levels[j].replaceFirst("^[\\s-]+", "").replaceFirst("[\\s-]+$", "");
			}
			listCats[i]="";
			int k=0;
			for (;k<levels.length;k++) {
				if (!levels[k].isEmpty()) {
					listCats[i]=levels[k];
					break;
				}
			}
			for (k++;k<levels.length;k++) {
				if (!levels[k].isEmpty()) {
					listCats[i]+="--"+levels[k];
				}
			}
		}
		cats=listCats[0];
		for (int i=1;i<listCats.length;i++) {
			cats+=";"+listCats[i];
		}
		return cats;
	}
	public static String toFormatNoDuplicateCat(String cats) {
		if (cats==null||cats.isEmpty()) { return cats; }
		cats=toFormat(cats);
		String[] listCats=cats.split(";");
		cats=listCats[0];
		Set<String> set=new HashSet<String>();
		set.add(listCats[0]);
		for (int i=1;i<listCats.length;i++) {
			if (set.add(listCats[i])) {
				// if (listCats[i].isEmpty()) {
				// 	cats=";"+cats;
				// } else {
					cats+=";"+listCats[i];
				// }
			}
		}
		return cats;
	}
	public static String getSuperCat(String cat) {
		// When cat==null, this return null.
		// When cat does not contain "--", this return null.
		if (cat!=null) {
			int i=cat.lastIndexOf("--");
			if (i!=-1) {
				return cat.substring(0,i);
			}
		}
		return null;
	}
	public static int depthOfCat(String cat) {
		if (cat==null) {
			return -1;
		} else if (cat.isEmpty()) {
			return 0;
		} else {
			return cat.split("--").length;
		}
	}
	// public static boolean isSuperCat(String superCat, String strCats) {
	// 	strCats=";"+strCats;
	// 	if (strCats.indexOf(";"+superCat)!=-1) {
	// 		Categories cats=new Categories(strCats);
	// 		return cats.hasSuperCat(superCat);
	// 	}
	// 	return false;
	// }
	
	
	
	public String cats;
	public Set<String> setOfCats;
	// public Set<String> setOfSuperCats;
	
	public Categories(String strCats) { // strCats must be well-formatted. (user-side handling)
		if (strCats==null) {
			cats="";
		} else {
			cats=strCats; // toFormatNoDuplicateCat(strCats)? in javascript (user-side handling)
		}
		setOfCats=new HashSet<String>();
		String[] catsSplit=cats.split(";");
		for (String cat: catsSplit) {
			setOfCats.add(cat);
		}
		// setOfSuperCats=new HashSet<String>();
		// for (String cat: setOfCats) {
		// 	while (cat!=null) {
		// 		setOfSuperCats.add(cat);
		// 		cat=getSuperCat(cat);
		// 	}
		// }
	}
	public Categories(Set<String> setCats) {
		Iterator<String> iterator=setCats.iterator();
		if (iterator.hasNext()) {
			cats=iterator.next();
			while (iterator.hasNext()) {
				cats+=";"+iterator.next();
			}
		} else {
			cats=null;
		}
		setOfCats=setCats;
		// setOfSuperCats=new HashSet<String>();
		// for (String cat: setOfCats) {
		// 	while (cat!=null) {
		// 		setOfSuperCats.add(cat);
		// 		cat=getSuperCat(cat);
		// 	}
		// }
	}
	
	public boolean contains(String cat) {
		return setOfCats.contains(cat);
	}
	public boolean equals(Categories cat2) {
		// Equality of set.
		return setOfCats.equals(cat2.setOfCats);
	}
	// public boolean hasSuperCat(String superCat) {
	// 	// When superCat==null, this return false.
	// 	return setOfSuperCats.contains(superCat);
	// }
	// public boolean hasCatIndif() {
	// 	return hasSuperCat(Categories.indif);
	// }
	// public boolean hasCatLater() {
	// 	return hasSuperCat(Categories.later);
	// }
	// public Set<String> setOfSuperCatsUnderDepth(int depth) {
	// 	Set<String> set=new HashSet<String>();
	// 	for (String cat: setOfSuperCats) {
	// 		if (Categories.depthOfCat(cat)<=depth) {
	// 			set.add(cat);
	// 		}
	// 	}
	// 	return set;
	// }
	// public boolean isInTheSameTree(String strCats2) {
	// 	Categories cats2=new Categories(strCats2);
	// 	return this.isInTheSameTree(cats2);
	// }
	// public boolean isInTheSameTree(Categories cats2) {
	// 	for (String superCat: setOfSuperCats) {
	// 		if (cats2.setOfSuperCats.contains(superCat)) {
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }
	public String toString() {
		return cats;
	}
	
	public static void main(String... args) {
		// String str=null;
		// Categories newCats=new Categories(str);
		// Categories oldCats=new Categories(";[Music]");
		// for (String newCat: newCats.setOfCats) {
		// 	System.out.println(newCat);
		// 	newCats.setOfCats.remove(newCat);
		// }
		// // oldCats.setOfCats.add("");
		// System.out.println(oldCats.setOfCats);
		// Iterator<String> iterator=newCats.setOfCats.iterator();
		// while (iterator.hasNext()) {
		// 	String newCat=iterator.next();
		// 	System.out.println("newCat:"+newCat);
		// 	if (oldCats.setOfCats.remove(newCat)) {
		// 		// iterator.remove();
		// 		System.out.println("removed.");
		// 		newCats.setOfCats.remove(newCat);
		// 	}
		// }
		// System.out.println(newCats.setOfCats);
		// System.out.println(oldCats.setOfCats);

		// String catsStr="; --A; B--F-- ; C--D--F  ";
		// System.out.println("toFormat(\""+catsStr+"\") : "+toFormat(catsStr));
		// catsStr=" ; --A; B---------F-- ; C---D--F  ;   -----";
		// System.out.println("toFormat(\""+catsStr+"\") : "+toFormat(catsStr));
		// catsStr="  ;  ----- ; -----  - - - ---- - ---- - ---- ;     ";
		// System.out.println("toFormat(\""+catsStr+"\") : "+toFormat(catsStr));
		// catsStr=null;
		// System.out.println("toFormat(\""+catsStr+"\") : "+toFormat(catsStr));
		// catsStr="음악--2014;음악--IU;;;;;;;;;;;음악--K-pop--ABC;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;";
		// System.out.println("toFormat(\""+catsStr+"\") : "+toFormat(catsStr));
		// System.out.println("split.length : "+catsStr.split(";").length);
		// System.out.println("toFormatNoDuplicateCat(\""+catsStr+"\") : "+toFormatNoDuplicateCat(catsStr));
		// System.out.println("");
		
		// String singleCat=toFormat("A--B--C");
		// System.out.println("getSuperCat(\""+singleCat+"\" / "+depthOfCat(singleCat)+") : "+getSuperCat(singleCat));
		// singleCat=toFormat("A something---asd");
		// System.out.println("getSuperCat(\""+singleCat+"\" / "+depthOfCat(singleCat)+") : "+getSuperCat(singleCat));
		// singleCat=toFormat("");
		// System.out.println("getSuperCat(\""+singleCat+"\" / "+depthOfCat(singleCat)+") : "+getSuperCat(singleCat));
		// singleCat=null;
		// System.out.println("getSuperCat(\""+singleCat+"\" / "+depthOfCat(singleCat)+") : "+getSuperCat(singleCat));
		// System.out.println("");
		
		// Categories cats=new Categories(toFormatNoDuplicateCat("음악--2014;음악--2014;음악--2014;음악--IU;음악--K-pop--ABC;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;"));
		// // Categories cats=new Categories("");
		// System.out.println(cats);
		// Categories cats2=new Categories(toFormatNoDuplicateCat("음악--IU;음악--K-pop--ABC;음악--2014"));
		// System.out.println(cats2);
		// System.out.println("Equality : "+cats.equals(cats2));
		
		// System.out.println("\nSet of cats:");
		// for (String cat: cats.setOfCats) {
		// 	System.out.println(cat);
		// }
		
		// // cats.setOfSuperCats.add(null);
		// // cats.setOfSuperCats.remove("");
		// System.out.println("\nSet of super cats:");
		// for (String superCat: cats.setOfSuperCats) {
		// 	System.out.println(superCat);
		// }
		// System.out.println("");
		
		// String str=null;
		// System.out.println("cats.hasSuperCat(\""+str+"\") : "+cats.hasSuperCat(str));
		// str="음악";
		// System.out.println("cats.hasSuperCat(\""+str+"\") : "+cats.hasSuperCat(str));
		// str=";음악2;ABC--DEF";
		// System.out.println("cats.isInTheSameTree(\""+str+"\") : "+cats.isInTheSameTree(str)); // 뭐 때문에 만들었지?
		// str="AA--BB--CC";
		// System.out.println("Categories.depthOfCat(\""+str+"\") : "+Categories.depthOfCat(str));
		// str="C--AA--BB;CDE--FDD";
		// singleCat="AA--BB";
		// System.out.println("Categories.isSuperCat(\""+singleCat+"\", \""+str+"\") : "+Categories.isSuperCat(singleCat, str));
	}
}