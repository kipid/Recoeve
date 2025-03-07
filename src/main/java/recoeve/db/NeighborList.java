package recoeve.db;

import java.lang.StringBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.HashSet;

public class NeighborList {
	public static final Pattern delimiter;
	public static final Pattern lastQuote;
	static {
		delimiter = Pattern.compile("[\\t\\n]");
		lastQuote = Pattern.compile("[^\"](?:\"\")*\"([\\t\\n])");
	}

	public static String enclose(String str) {
		if (str == null) {
			return "";
		}
		if (str.startsWith("\"") || str.indexOf("\n") != -1 || str.indexOf("\t") != -1) {
			return "\"" + str.replaceAll("\"", "\"\"") + "\"";
		} else {
			return str;
		}
	}

	public String str;
	public ArrayList<ArrayList<String>> arrayArray;
	public ArrayList<Map<String, String>> arrayMap;
	public Map<String, ArrayList<String>> mapArray;
	public Map<String, Map<String, String>> mapMap;
	public boolean colMap;
	public boolean rowMap;
	private int row; // The last row number will be saved.

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
		this.colMap = colMap;
		this.rowMap = rowMap;
		this.row = -1;
		str = "";
		arrayArray = new ArrayList<ArrayList<String>>();
		if (colMap) {
			arrayMap = new ArrayList<Map<String, String>>();
		} else {
			arrayMap = null;
		}
		if (rowMap) {
			mapArray = new HashMap<String, ArrayList<String>>();
		} else {
			mapArray = null;
		}
		if (colMap && rowMap) {
			mapMap = new HashMap<String, Map<String, String>>();
		} else {
			mapMap = null;
		}
	}

	public NeighborList(String strData) {
		this(strData, true, false);
	}

	public NeighborList(String strData, boolean colMap) {
		this(strData, colMap, false);
	}

	public NeighborList(String strData, boolean colMap, boolean rowMap) {
		this(colMap, rowMap);
		if (strData == null) {
			return;
		}
		str = strData.replaceAll("\\r", "");
		// str=str.trim();
		if (str.isEmpty()) {
			return;
		}
		if (str.charAt(str.length() - 1) != '\n') {
			str += "\n";
		}
		this.updateLists(colMap, rowMap);
	}

	public boolean increaseRC(String delim) {
		if (delim.equals("\t")) {
			return true;
		} else if (delim.equals("\n")) {
			row++;
			arrayArray.add(new ArrayList<String>());
			return true;
		}
		return false;
	}

	public static final String[] COLNAMES = { "user", "cat" };

	public void updateLists() {
		updateLists(true, false);
	}

	public void updateLists(boolean colMap) {
		updateLists(colMap, false);
	}

	public void updateLists(boolean colMap, boolean rowMap) {
		if (str != null && !str.isEmpty()) {
			String delim = "\n";
			String strElem = "";
			int start = 0;
			int end = 0;
			Matcher matchDelim = delimiter.matcher(str);
			Matcher matchLastQuote = lastQuote.matcher(str);
			while (start < str.length() && this.increaseRC(delim)) {
				if (str.substring(start, start + 1).equals("\"")) {
					if (matchLastQuote.find(start + 1)) {
						end = matchLastQuote.end();
						strElem = str.substring(start + 1, end - 2);
						delim = matchLastQuote.group(1);
						start = end;
					} else {
						strElem = str.substring(start + 1);
						delim = "";
						start = end = str.length();
					}
					strElem = strElem.replaceAll("\"\"", "\"");
				} else {
					if (matchDelim.find(start)) {
						delim = matchDelim.group();
						end = matchDelim.end();
						strElem = str.substring(start, end - 1);
						start = end;
					} else {
						delim = "";
						strElem = str.substring(start);
						start = end = str.length();
					}
				}
				arrayArray.get(row).add(strElem);
			}
			if (colMap) {
				int firstColSize = arrayArray.get(0).size();
				for (int i = 0; i < arrayArray.size(); i++) {
					arrayMap.add(new HashMap<String, String>());
					int jMax = arrayArray.get(i).size();
					for (int j = 0; j < firstColSize; j++) {
						String key = COLNAMES[j];
						if (j >= jMax) {
							arrayMap.get(i).putIfAbsent(key, "");
						} else {
							arrayMap.get(i).putIfAbsent(key, arrayArray.get(i).get(j));
						}
					}
				}
			}
			if (rowMap) {
				for (int i = 0; i < arrayArray.size(); i++) {
					ArrayList<String> aL = arrayArray.get(i);
					if (aL != null) {
						if (aL.size() >= 2) {
							mapArray.putIfAbsent(aL.get(0) + "\t" + aL.get(1), aL);
						} else if (aL.size() >= 1 && !aL.get(0).isEmpty()) {
							aL.add("");
							mapArray.putIfAbsent(aL.get(0) + "\t", aL);
						}
					}
				}
			}
			if (colMap && rowMap) {
				for (int i = 0; i < arrayArray.size(); i++) {
					String key = arrayArray.get(i).get(0) + "\t" + arrayArray.get(i).get(1);
					Map<String, String> map = arrayMap.get(i);
					mapMap.putIfAbsent(key, map);
				}
			}
		}
	}

	public List<String> removeRow(int row) {
		if (0 <= row && row < arrayArray.size()) {
			return arrayArray.remove(row);
		}
		return null;
	}

	public String toString() {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		Set<String> setOfUserCat = new HashSet<String>(rowSize > 0 ? 2 * rowSize : 1);
		for (int i = 0; i < rowSize; i++) {
			int colSize = this.getColSizeAtRow(i);
			if (colSize >= 2 && setOfUserCat.add(arrayArray.get(i).get(0) + "\t" + arrayArray.get(i).get(1))) {
				sb.append(enclose(arrayArray.get(i).get(0)));
				for (int j = 1; j < colSize; j++) {
					sb.append("\t" + enclose(arrayArray.get(i).get(j)));
				}
				sb.append("\n");
			}
		}
		return sb.toString();
	}

	public String toStringRowMap() {
		StringBuilder sb = new StringBuilder();
		mapArray.forEach((k, aL) -> {
			int colSize = aL.size();
			sb.append(enclose(aL.get(0)));
			for (int i = 1; i < colSize; i++) {
				sb.append("\t" + enclose(aL.get(i)));
			}
			sb.append("\n");
		});
		return sb.toString();
	}

	public String toString(int[] sorted) {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		if (sorted.length != rowSize) {
			return "";
		}
		for (int i = 0; i < rowSize; i++) {
			int colSize = this.getColSizeAtRow(sorted[i]);
			sb.append(arrayArray.get(sorted[i]).get(0));
			for (int j = 1; j < colSize; j++) {
				sb.append("\t" + arrayArray.get(sorted[i]).get(j));
			}
			sb.append("\n");
		}
		return sb.toString();
	}

	public String toIndexedString() {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		for (int i = 0; i < rowSize; i++) {
			int colSize = this.getColSizeAtRow(i);
			for (int j = 0; j < colSize; j++) {
				sb.append(" " + i + "," + j + " : " + arrayArray.get(i).get(j) + "\n");
			}
			if (arrayMap != null) {
				for (Map.Entry<String, String> entry : arrayMap.get(i).entrySet()) {
					sb.append(" " + i + "," + entry.getKey() + " : " + entry.getValue() + "\n");
				}
			}
			sb.append("\n");
		}
		return sb.toString();
	}

	public String get(int rowN, int colN) {
		if (0 <= rowN && rowN < arrayArray.size() && 0 <= colN && colN < arrayArray.get(rowN).size()) {
			return arrayArray.get(rowN).get(colN);
		}
		return null;
	}

	public String get(int rowN, String key) {
		if (0 <= rowN && rowN < arrayArray.size()) {
			return arrayMap.get(rowN).get(key); // If no value for a key, this returns null;
		}
		return null;
	}

	public String get(String key, int colN) {
		if (0 <= colN) {
			ArrayList<String> aL = mapArray.get(key); // If no value for a key, this returns null;
			if (aL != null && colN < aL.size()) {
				return aL.get(colN);
			}
		}
		return null;
	}

	public String get(String rowKey, String colKey) {
		Map<String, String> map = mapMap.get(rowKey);
		if (map != null) {
			return map.get(colKey);
		}
		return null;
	}

	public static void main(String... args) {
		// NeighborList sa=new
		// NeighborList("replacer\ten\tkr\tjp\tcn\tkk\r\n[--welcome--]\t\tRecoeve 에 오신걸
		// 환영합니다.\tRecoeve へようこそ\t欢迎来到 Recoeve\t");
		// System.out.println(sa);
		// sa.removeRow(1);
		// System.out.println(sa);

		// System.out.println(sa.get(0,5));
		// System.out.println(sa.get(2,"abc"));

		// Pattern pattern = Pattern.compile("[\\t\\n]");
		// Matcher matcher = pattern.matcher("abc\tdef\n1\t2");
		// while (matcher.find()) {
		// System.out.println("\nFound: "+matcher.group()+"."
		// +"\nstart: "+matcher.start()
		// +"\nend: "+matcher.end()
		// );
		// }
	}
}