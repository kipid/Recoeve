package recoeve.db;

import java.lang.StringBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.Map;
import java.util.HashMap;



public class NeighborList {
	public static final Pattern delimiter;
	public static final Pattern lastQuote;
	static {
		delimiter=Pattern.compile("[\\t\\n]");
		lastQuote=Pattern.compile("[^\"](?:\"\")*\"([\\t\\n])");
	}

	public String str;
	public ArrayList<ArrayList<String>> arrayArray;
	public ArrayList<Map<String, String>> arrayMap;
	public Map<String, ArrayList<String>> mapArray;
	public Map<String, Map<String, String>> mapMap;
	private int row; // The last row number will be saved.
	private int col; // The last col number of the last row will be saved.
	
	public int getRowSize() {
		return arrayArray.size();
	}
	public int getColSizeAtRow(int r) {
		return arrayArray.get(r).size();
	}
	
	public NeighborList() {
		this(true, false);
	}
	public NeighborList(boolean colMap) {
		this(colMap, false);
	}
	public NeighborList(boolean colMap, boolean rowMap) {
		str="";
		arrayArray=new ArrayList<ArrayList<String>>();
		if (colMap) {
			arrayMap=new ArrayList<Map<String, String>>();
		}
		else {
			arrayMap=null;
		}
		if (rowMap) {
			mapArray=new HashMap<String, ArrayList<String>>();
		}
		else {
			mapArray=null;
		}
		if (colMap&&rowMap) {
			mapMap=new HashMap<String, Map<String, String>>();
		}
		else {
			mapMap=null;
		}
		row=-1;
		col=-1;
	}
	public NeighborList(String strData) {
		this(strData, true, false);
	}
	public NeighborList(String strData, boolean colMap) {
		this(strData, colMap, false);
	}
	public NeighborList(String strData, boolean colMap, boolean rowMap) {
		this(colMap, rowMap);
		if (strData.isEmpty()) {
			return;
		}
		str=strData.replaceAll("\\r","");
		if (str.charAt(str.length()-1)!='\n') {
			str+="\n";
		}
		this.updateLists(colMap, rowMap);
	}
	
	public boolean increaseRC(String delim) {
		if (delim.equals("\t")) {
			col++;
			return true;
		}
		else if (delim.equals("\n")) {
			row++; col=0;
			arrayArray.add(new ArrayList<String>());
			return true;
		}
		return false;
	}
	
	public void updateLists() {
		updateLists(true, false);
	}
	public void updateLists(boolean colMap) {
		updateLists(colMap, false);
	}
	public void updateLists(boolean colMap, boolean rowMap) {
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
					}
					else {
						strElem=str.substring(start+1);
						delim="";
						start=end=str.length();
					}
					strElem=strElem.replaceAll("\"\"","\"");
				}
				else {
					if (matchDelim.find(start)) {
						delim=matchDelim.group();
						end=matchDelim.end();
						strElem=str.substring(start, end-1);
						start=end;
					}
					else {
						delim="";
						strElem=str.substring(start);
						start=end=str.length();
					}
				}
				arrayArray.get(row).add(strElem);
			}
			if (colMap) {
				int firstColSize=arrayArray.get(0).size();
				for (int i=0;i<arrayArray.size();i++) {
					arrayMap.add(new HashMap<String, String>());
					int jMax=arrayArray.get(i).size();
					if (jMax>firstColSize) { jMax=firstColSize; }
					for (int j=0;j<jMax;j++) {
						String key=arrayArray.get(0).get(j);
						// if (key!=null) {
							arrayMap.get(i).putIfAbsent(key, arrayArray.get(i).get(j));
						// }
					}
				}
			}
			if (rowMap) {
				for (int i=0;i<arrayArray.size();i++) {
					ArrayList<String> aL=arrayArray.get(i);
					mapArray.putIfAbsent(aL.get(0), aL);
				}
			}
			if (colMap&&rowMap) {
				for (int i=0;i<arrayArray.size();i++) {
					String key=arrayArray.get(i).get(0);
					Map<String,String> map=arrayMap.get(i);
					mapMap.putIfAbsent(key, map);
				}
			}
		}
	}

	public List<String> removeRow(int row) {
		if (0<=row&&row<arrayArray.size()) {
			return arrayArray.remove(row);
		}
		return null;
	}
	
	public String toString() {
		StringBuilder sb=new StringBuilder();
		int rowSize=this.getRowSize();
		for (int i=0;i<rowSize;i++) {
			int colSize=this.getColSizeAtRow(i);
			sb.append(enclose(arrayArray.get(i).get(0)));
			for (int j=1;j<colSize;j++) {
				sb.append("\t"+enclose(arrayArray.get(i).get(j)));
			}
			sb.append("\n");
		}
		return sb.toString().trim();
	}

	public String toString(int[] sorted) {
		StringBuilder sb=new StringBuilder();
		int rowSize=this.getRowSize();
		if (sorted.length!=rowSize) {
			return "";
		}
		for (int i=0;i<rowSize;i++) {
			int colSize=this.getColSizeAtRow(sorted[i]);
			sb.append(enclose(arrayArray.get(sorted[i]).get(0)));
			for (int j=1;j<colSize;j++) {
				sb.append("\t"+enclose(arrayArray.get(sorted[i]).get(j)));
			}
			sb.append("\n");
		}
		return sb.toString().trim();
	}

	public String toIndexedString() {
		StringBuilder sb=new StringBuilder();
		int rowSize=this.getRowSize();
		for (int i=0;i<rowSize;i++) {
			int colSize=this.getColSizeAtRow(i);
			for (int j=0;j<colSize;j++) {
				sb.append(" "+i+","+j+" : "+enclose(arrayArray.get(i).get(j))+"\n");
			}
			if (arrayMap!=null) {
				for (Map.Entry<String, String> entry: arrayMap.get(i).entrySet()) {
					sb.append(" "+i+","+enclose(entry.getKey())+" : "+enclose(entry.getValue())+"\n");
				}
			}
			sb.append("\n");
		}
		return sb.toString();
	}
	
	public String get(int row, int col) {
		if (0<=row&&row<arrayArray.size()&&0<=col&&col<arrayArray.get(row).size()) {
			return arrayArray.get(row).get(col);
		}
		return null;
	}
	public String get(int row, String key) {
		if (0<=row&&row<arrayArray.size()) {
			return arrayMap.get(row).get(key); // If no value for a key, this returns null;
		}
		return null;
	}
	public String get(String key, int col) {
		if (0<=col) {
			ArrayList<String> aL=mapArray.get(key); // If no value for a key, this returns null;
			if (aL!=null&&col<aL.size()) {
				return aL.get(col);
			}
		}
		return null;
	}
	public String get(String rowKey, String colKey) {
		Map<String,String> map=mapMap.get(rowKey);
		if (map!=null) {
			return map.get(colKey);
		}
		return null;
	}
	
	public static void main(String... args) {
		// NeighborList sa=new NeighborList("replacer\ten\tkr\tjp\tcn\tkk\r\n[--welcome--]\t\tRecoeve 에 오신걸 환영합니다.\tRecoeve へようこそ\t欢迎来到 Recoeve\t");
		// System.out.println(sa);
		// sa.removeRow(1);
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