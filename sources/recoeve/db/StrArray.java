package recoeve.db;

import java.lang.StringBuilder;

import java.util.ArrayList;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.Map;
import java.util.HashMap;



public class StrArray {
	public static final Pattern delimiter;
	public static final Pattern lastQuote;
	static {
		delimiter=Pattern.compile("[\\t\\n]");
		lastQuote=Pattern.compile("[^\"](?:\"\")*\"([\\t\\n])");
	}
	
	public static String enclose(String str) {
		if (str==null) { return ""; }
		if (str.startsWith("\"")||str.indexOf("\n")!=-1||str.indexOf("\t")!=-1) {
			return "\""+str.replaceAll("\"","\"\"")+"\"";
		} else {
			return str;
		}
	}
	
	public String str;
	public ArrayList<ArrayList<String>> arrayList;
	public ArrayList<Map<String, String>> mapList;
	private int row; // The last row number will be saved.
	private int col; // The last col number of the last row will be saved.
	
	public int getRowSize() {
		return arrayList.size();
	}
	public int getColSizeAtRow(int r) {
		return arrayList.get(r).size();
	}
	
	public StrArray() {
		str="";
		arrayList=new ArrayList<ArrayList<String>>();
		mapList=new ArrayList<Map<String, String>>();
		row=-1;
		col=-1;
	}
	public StrArray(String strData) {
		this();
		str=strData.replaceAll("\\r","");
		if (str.charAt(str.length()-1)!='\n') {
			str+="\n";
		}
		this.updateLists();
	}
	
	public boolean increaseRC(String delim) {
		if (delim.equals("\t")) {
			col++;
			return true;
		} else if (delim.equals("\n")) {
			row++; col=0;
			arrayList.add(new ArrayList<String>());
			return true;
		}
		return false;
	}
	
	public void updateLists() {
		if (str!=null&&!str.isEmpty()) {
			String delim="\n";
			String strElem="";
			int start=0;
			int end=0;
			Matcher matchDelim=delimiter.matcher(str);
			Matcher matchLastQuote=lastQuote.matcher(str);
			while (start<str.length()&&this.increaseRC(delim)) {
				if (str.substring(start,start+1).equals("\"")) {
					if (matchLastQuote.find(start+1)) {
						end=matchLastQuote.end();
						strElem=str.substring(start+1, end-2);
						delim=matchLastQuote.group(1);
						start=end;
					} else {
						strElem=str.substring(start+1);
						delim="";
						start=end=str.length();
					}
					strElem=strElem.replaceAll("\"\"","\"");
				} else {
					if (matchDelim.find(start)) {
						delim=matchDelim.group();
						end=matchDelim.end();
						strElem=str.substring(start, end-1);
						start=end;
					} else {
						delim="";
						strElem=str.substring(start);
						start=end=str.length();
					}
				}
				arrayList.get(row).add(strElem);
			}
			for (int i=1;i<arrayList.size();i++) {
				mapList.add(new HashMap<String, String>());
				for (int j=0;j<arrayList.get(i).size();j++) {
					String key=this.get(0,j);
					if (key!=null) {
						mapList.get(i-1).put(key, arrayList.get(i).get(j));
					}
				}
			}
		}
	}
	
	public String toString() {
		StringBuilder sb=new StringBuilder();
		for (int j=0;j<arrayList.get(0).size();j++) {
			sb.append(" 0,"+j+" : "+arrayList.get(0).get(j)+"\n");
		}
		sb.append("\n");
		for (int i=1;i<arrayList.size();i++) {
			for (int j=0;j<arrayList.get(i).size();j++) {
				sb.append(" "+i+","+j+" : "+arrayList.get(i).get(j)+"\n");
			}
			for (Map.Entry<String, String> entry: mapList.get(i-1).entrySet()) {
				sb.append(" "+i+","+entry.getKey()+" : "+entry.getValue()+"\n");
			}
			sb.append("\n");
		}
		/* int i=0, j=0;
		for (ArrayList<String> row: arrayList) {
			j=0;
			for (String s: row) {
				sb.append(" "+i+","+j+" : "+s+"\n");
				j++;
			}
			sb.append("\n");
			i++;
		} */
		return sb.toString();
	}
	
	public String get(int row, int col) {
		if (row<arrayList.size()&&col<arrayList.get(row).size()) {
			return arrayList.get(row).get(col);
		}
		return null;
	}
	public String get(int row, String key) {
		if (0<row&&row<arrayList.size()) {
			return mapList.get(row-1).get(key); // If no value for a key, this returns null;
		}
		return null;
	}
	
	public static void main(String... args) {
		// StrArray sa=new StrArray("replacer\ten\tkr\tjp\tcn\tkk\r\n[--welcome--]\t\tRecoeve 에 오신걸 환영합니다.\tRecoeve へようこそ\t欢迎来到 Recoeve\t");
		// System.out.println(sa);
		
		// System.out.println(sa.get(0,5));
		// System.out.println(sa.get(2,"abc"));
		
		// Pattern pattern = Pattern.compile("[\\t\\n]");
		// Matcher matcher = pattern.matcher("abc\tdef\n1\t2");
		// while (matcher.find()) {
		// 	System.out.println("\nFound: "+matcher.group()+"."
		// 		+"\nstart: "+matcher.start()
		// 		+"\nend: "+matcher.end()
		// 	);
		// }
	}
}