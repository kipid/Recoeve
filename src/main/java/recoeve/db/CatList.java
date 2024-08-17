package recoeve.db;

// import java.lang.StringBuilder;

import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
// import java.util.LinkedHashMap;
// import java.util.Iterator;
// import java.util.HashMap;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

/////////////////////////
// Strict rules
/////////////////////////
// fullCats must start and end with "\n".
// fullCats="\n"+strData.trim()+"\n";

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

public class CatList {
	public static final String DEF_LIST_NAME = "upToDate";

	public static int getDepthOfTabs(String str) {
		int i = -1;
		if (str != null) {
			i++;
			while (i < str.length() && str.charAt(i) == '\t') {
				i++;
			}
		}
		return i;
	}

	public static String toFormat(String str) {
		// "\nA\n\t\tB\n" 이런것도 error 이긴한데... 잡아내는 함수 하나 만들긴 해야할듯.
		return "\n" + str.trim() + "\n";
	}

	public String fullCats;

	public CatList() {
		fullCats = "\n";
	}

	public CatList(String strData) {
		fullCats = strData;
	}

	public boolean putCat(String cat) {
		boolean res = false;
		if (cat == null || cat.isEmpty()) {
			return res;
		}
		String[] levels = cat.split("--");
		String pre = "\n";
		int start = 0;
		int end = fullCats.length();
		for (int j = 0; j < levels.length; j++) {
			String subStr = fullCats.substring(start, end);
			String toFind = pre + levels[j] + "\n";
			int i = subStr.indexOf(toFind);
			if (i != -1) {
				Pattern ptnEnd = Pattern.compile(Pattern.quote(pre) + "[^\\t\\n]");
				Matcher matchEnd = ptnEnd.matcher(subStr);
				if (matchEnd.find(i + toFind.length() - 1)) {
					end = start + matchEnd.start() + 1;
				}
				start += i + toFind.length() - 1;
				pre += "\t";
			} else {
				String toPut = "";
				for (; j < levels.length; j++) {
					toPut += pre + levels[j];
					pre += "\t";
				}
				fullCats = fullCats.substring(0, end - 1) + toPut + "\n" + fullCats.substring(end);
				res = true;
			}
		}
		return res;
	}

	public boolean deleteCat(String cat) { // delete a cat if there is no subCat.
		boolean res = false;
		if (cat == null || cat.isEmpty()) {
			return res;
		}
		String[] levels = cat.split("--");
		String pre = "\n";
		int start0 = 0;
		int start = 0;
		int end = fullCats.length();
		String subStr = "";
		for (int j = 0; j < levels.length; j++) {
			subStr = fullCats.substring(start, end);
			String toFind = pre + levels[j] + "\n";
			int i = subStr.indexOf(toFind);
			if (i == -1) {
				return res;
			} else {
				Pattern ptnEnd = Pattern.compile(Pattern.quote(pre) + "[^\\t\\n]");
				Matcher matchEnd = ptnEnd.matcher(subStr);
				if (matchEnd.find(i + toFind.length() - 1)) {
					end = start + matchEnd.start() + 1;
				}
				start0 = start + i;
				start += i + toFind.length() - 1;
				pre += "\t";
			}
		}
		subStr = fullCats.substring(start + 1, end);
		// subStr=subCats+"\n"
		// if no subCats, this is empty.
		if (subStr.isEmpty()) {
			fullCats = fullCats.substring(0, start0 + 1) + fullCats.substring(end); // delete a cat if there is no
																					// subCat.
			res = true;
		}
		return res;
	}

	public ArrayList<String> subCats(String cat) { // including itself, only if matched.
		ArrayList<String> aL = new ArrayList<String>();
		String subStr = null;
		ArrayList<String> superCats = new ArrayList<String>();
		if (cat == null) { // return full cat list.
			subStr = fullCats;
		} else if (cat.isEmpty()) {
			aL.add("");
			return aL;
		} else {
			String[] levels = cat.split("--");
			String pre = "\n";
			int start = 0;
			int end = fullCats.length();
			boolean found = true;
			for (int j = 0; j < levels.length; j++) {
				superCats.add(levels[j]);
				subStr = fullCats.substring(start, end);
				String toFind = pre + levels[j] + "\n";
				int i = subStr.indexOf(toFind);
				if (i == -1) {
					found = false;
					break;
				} else {
					Pattern ptnEnd = Pattern.compile(Pattern.quote(pre) + "[^\\t\\n]");
					Matcher matchEnd = ptnEnd.matcher(subStr);
					if (matchEnd.find(i + toFind.length() - 1)) {
						end = start + matchEnd.start() + 1;
					}
					start += i + toFind.length() - 1;
					pre += "\t";
				}
			}
			if (found) {
				aL.add(cat);
				subStr = fullCats.substring(start + 1, end);
				// subStr=subCats+"\n"
				// if no subCats, this is empty.
			} else {
				return aL;
			}
		}
		if (subStr.isEmpty()) {
			return aL;
		}
		String[] list = subStr.split("\n");
		if (list.length == 0) {
			list = new String[1];
			list[0] = "";
		}
		for (int i = 0; i < list.length; i++) {
			int depth = getDepthOfTabs(list[i]);
			String catTrimmed = list[i].trim();
			if (depth == superCats.size()) {
				superCats.add(catTrimmed);
			} else if (depth < superCats.size()) {
				superCats.set(depth, catTrimmed);
				for (int j = superCats.size() - 1; j > depth; j--) {
					superCats.remove(j);
				}
			} // else error;
			String superCatStr = superCats.get(0);
			for (int j = 1; j <= depth; j++) {
				superCatStr += "--" + superCats.get(j);
			}
			aL.add(superCatStr);
		}
		return aL;
	}

	public boolean changeOrders(String newFullCats) {
		Set<String> setCats = new HashSet<String>();
		Set<String> newSetCats = new HashSet<String>();
		ArrayList<String> superCats = new ArrayList<String>();
		String[] list = fullCats.split("\n");
		for (int i = 0; i < list.length; i++) {
			int depth = getDepthOfTabs(list[i]);
			String catTrimmed = list[i].trim();
			if (depth == superCats.size()) {
				superCats.add(catTrimmed);
			} else if (depth < superCats.size()) {
				superCats.set(depth, catTrimmed);
				for (int j = superCats.size() - 1; j > depth; j--) {
					superCats.remove(j);
				}
			} // else error;
			String superCatStr = superCats.get(0);
			for (int j = 1; j <= depth; j++) {
				superCatStr += "--" + superCats.get(j);
			}
			setCats.add(superCatStr);
		}

		boolean noDup = true;
		for (int j = superCats.size() - 1; j >= 0; j--) {
			superCats.remove(j);
		}
		list = newFullCats.split("\n");
		for (int i = 0; i < list.length; i++) {
			int depth = getDepthOfTabs(list[i]);
			String catTrimmed = list[i].trim();
			if (depth == superCats.size()) {
				superCats.add(catTrimmed);
			} else if (depth < superCats.size()) {
				superCats.set(depth, catTrimmed);
				for (int j = superCats.size() - 1; j > depth; j--) {
					superCats.remove(j);
				}
			} // else error;
			String superCatStr = superCats.get(0);
			for (int j = 1; j <= depth; j++) {
				superCatStr += "--" + superCats.get(j);
			}
			if (!newSetCats.add(superCatStr)) {
				noDup = false;
				break;
			}
		}

		if (noDup && setCats.equals(newSetCats)) {
			fullCats = newFullCats;
			return true;
		} else {
			return false;
		}
	}

	public String toString() {
		return fullCats;
	}

	public static void main(String... args) {
		CatList cl = new CatList();
		cl.putCat("[Physics/Math]");
		cl.putCat("[Physics/Math]--Physics");
		cl.putCat("[Physics/Math]--Physics--Classical");
		cl.putCat("[Physics/Math]--Physics--Quantum");
		cl.putCat("[Physics/Math]--Physics--Relativity");
		cl.putCat("[Physics/Math]--Math");
		cl.putCat("[Physics/Math]--New Ideas in Physics");
		cl.putCat("[Physics/Math]--News");
		cl.putCat("[Physics/Math]--Etc.");
		cl.putCat("[IT/Programming]");
		cl.putCat("[IT/Programming]--HTML related");
		cl.putCat("[IT/Programming]--Algorithm and Database");
		cl.putCat("[IT/Programming]--Etc.");
		cl.putCat("[Music/Break]--music--2014--best--best of best");
		cl.putCat("[Music/Break]--music--2015");
		cl.putCat("[Music/Break]--music--IU");
		cl.putCat("[Music/Break]--music--KARA");

		cl.putCat("ABC--DEF");
		cl.putCat("ABC--AAA");
		cl.putCat("ABC--AAA");
		cl.putCat("ABC--AAA");
		cl.putCat("[Physics/Math]--AAA--BBB--CCC");
		cl.putCat("[Physics/Math]--Physics--Relativity--Tensor");
		cl.putCat("[Physics/Math]--Physics--Quantum--Many-body");
		System.out.println(cl.deleteCat("[Physics/Math]--Physics--Quantum--Many-body"));
		System.out.println(cl);

		System.out.println(cl.changeOrders(
				"\n[IT/Programming]\n\tEtc.\n\tAlgorithm and Database\n\tHTML related\n[Physics/Math]\n\tPhysics\n\t\tRelativity\n\t\t\tTensor\n\t\tQuantum\n\t\t\tMany-body\n\t\tClassical\n\tAAA\n\t\tBBB\n\t\t\tCCC\n\tEtc.\n\tNews\n\tMath\n\tNew Ideas in Physics\nABC\n\tDEF\n\tAAA\n[Music/Break]\n\tmusic\n\t\t2015\n\t\t2014\n\t\t\tbest\n\t\t\t\tbest of best\n\t\tIU\n\t\tKARA\n"));
		System.out.println(cl);

		// cl=new CatList();
		String str = "[Physics/Math]--Physics--Classical";
		System.out.println("cl.subCats(\"" + str + "\")");
		ArrayList<String> subCats = cl.subCats(str);
		for (int i = 0; i < subCats.size(); i++) {
			System.out.println(subCats.get(i));
		}

		String path = "/user/kipid/get////";
		String[] pathSplit = path.split("/");
		for (int i = 0; i < pathSplit.length; i++) {
			System.out.println(i + " : " + pathSplit[i]);
		}

		// System.out.println(cl.deleteCat("ABC--DEF"));
		// System.out.println(cl.deleteCat("[Music/Break]--music"));
		// System.out.println(cl);
	}
}