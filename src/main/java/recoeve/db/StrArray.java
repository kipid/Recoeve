package recoeve.db;



import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StrArray {
	public static final Pattern DELIMITER;
	public static final Pattern LAST_QUOTE;
	static {
		DELIMITER = Pattern.compile("[\\t\\n]");
		LAST_QUOTE = Pattern.compile("[^\"](?:\"\")*\"([\\t\\n])");
	}

	public static String enclose(String str) {
		if (str == null) {
			return "";
		}
		if (str.startsWith("\"") || str.contains("\n") || str.contains("\t")) {
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

	public StrArray() {
		this(true, false);
	}

	public StrArray(boolean colMap) {
		this(colMap, false);
	}

	public StrArray(boolean colMap, boolean rowMap) {
		this.colMap = colMap;
		this.rowMap = rowMap;
		str = "";
		arrayArray = new ArrayList<>();
		if (colMap) {
			arrayMap = new ArrayList<>();
		} else {
			arrayMap = null;
		}
		if (rowMap) {
			mapArray = new HashMap<>();
		} else {
			mapArray = null;
		}
		if (colMap && rowMap) {
			mapMap = new HashMap<>();
		} else {
			mapMap = null;
		}
		row = -1;
	}

	public StrArray(String strData) {
		this(strData, true, false);
	}

	public StrArray(String strData, boolean colMap) {
		this(strData, colMap, false);
	}

	public StrArray(String strData, boolean colMap, boolean rowMap) {
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
			arrayArray.add(new ArrayList<>());
			return true;
		}
		return false;
	}

	// public void updateLists() {
	// 	updateLists(true, false);
	// }

	// public void updateLists(boolean colMap) {
	// 	updateLists(colMap, false);
	// }

	private void updateLists(boolean colMap, boolean rowMap) {
		if (str != null && !str.isEmpty()) {
			String delim = "\n";
			String strElem;
			int start = 0;
			int end;
			Matcher matchDelim = DELIMITER.matcher(str);
			Matcher matchLastQuote = LAST_QUOTE.matcher(str);
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
					}
				}
				arrayArray.get(row).add(strElem);
			}
			if (colMap) {
				int firstColSize = arrayArray.get(0).size();
				for (int i = 0; i < arrayArray.size(); i++) {
					arrayMap.add(new HashMap<>());
					int jMax = arrayArray.get(i).size();
					for (int j = 0; j < firstColSize; j++) {
						String key = arrayArray.get(0).get(j);
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
					mapArray.putIfAbsent(aL.get(0), aL);
				}
			}
			if (colMap && rowMap) {
				for (int i = 0; i < arrayArray.size(); i++) {
					String key = arrayArray.get(i).get(0);
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

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		for (int i = 0; i < rowSize; i++) {
			int colSize = this.getColSizeAtRow(i);
			sb.append(enclose(arrayArray.get(i).get(0)));
			for (int j = 1; j < colSize; j++) {
				sb.append("\t").append(enclose(arrayArray.get(i).get(j)));
			}
			sb.append("\n");
		}
		return sb.toString();
	}

	public String toStringSet() {
		if (mapArray == null) {
			return "";
		}
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		for (int i = 0; i < rowSize; i++) {
			if (mapArray.remove(arrayArray.get(i).get(0)) != null) {
				int colSize = this.getColSizeAtRow(i);
				sb.append(enclose(arrayArray.get(i).get(0)));
				for (int j = 1; j < colSize; j++) {
					sb.append("\t").append(enclose(arrayArray.get(i).get(j)));
				}
				sb.append("\n");
			}
		}
		return sb.toString();
	}

	public String toStringBeingCut(long[] counts) {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		if (rowSize != counts.length || mapArray == null) {
			return "";
		}
		for (int i = 0; i < rowSize; i++) {
			if (counts[i] != 0L && mapArray.remove(arrayArray.get(i).get(0)) != null) {
				int colSize = this.getColSizeAtRow(i);
				sb.append(enclose(arrayArray.get(i).get(0)));
				for (int j = 1; j < colSize; j++) {
					sb.append("\t").append(enclose(arrayArray.get(i).get(j)));
				}
				sb.append("\n");
			}
		}
		return sb.toString();
	}

	public String toStringDecoded() {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		for (int i = 0; i < rowSize; i++) {
			int colSize = this.getColSizeAtRow(i);
			sb.append(enclose(arrayArray.get(i).get(0)));
			for (int j = 1; j < colSize; j++) {
				sb.append("\t").append(enclose(arrayArray.get(i).get(j)));
			}
			sb.append("\n");
		}
		String res = sb.toString();
		try {
			return URLDecoder.decode(res, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			RecoeveDB.err(e);
		}
		return res;
	}

	public String toString(int[] sorted) {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		if (sorted.length != rowSize) {
			return "";
		}
		for (int i = 0; i < rowSize; i++) {
			int colSize = this.getColSizeAtRow(sorted[i]);
			sb.append(enclose(arrayArray.get(sorted[i]).get(0)));
			for (int j = 1; j < colSize; j++) {
				sb.append("\t").append(enclose(arrayArray.get(sorted[i]).get(j)));
			}
			sb.append("\n");
		}
		return sb.toString();
	}

	public String toStringBeingCut(int[] sorted, long[] counts) {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		if (sorted.length != rowSize || counts.length != rowSize || mapArray == null) {
			return "";
		}
		for (int i = 0; i < rowSize; i++) {
			int colSize = this.getColSizeAtRow(sorted[i]);
			if (counts[sorted[i]] != 0L && mapArray.remove(arrayArray.get(i).get(0)) != null) {
				sb.append(enclose(arrayArray.get(sorted[i]).get(0)));
				for (int j = 1; j < colSize; j++) {
					sb.append("\t").append(enclose(arrayArray.get(sorted[i]).get(j)));
				}
				sb.append("\n");
			}
		}
		return sb.toString();
	}

	public String toIndexedString() {
		StringBuilder sb = new StringBuilder();
		int rowSize = this.getRowSize();
		for (int i = 0; i < rowSize; i++) {
			int colSize = this.getColSizeAtRow(i);
			for (int j = 0; j < colSize; j++) {
				sb.append(" ").append(i).append(",").append(j).append(" : ").append(enclose(arrayArray.get(i).get(j))).append("\n");
			}
			if (arrayMap != null) {
				for (Map.Entry<String, String> entry : arrayMap.get(i).entrySet()) {
					sb.append(" ").append(i).append(",").append(enclose(entry.getKey())).append(" : ").append(enclose(entry.getValue())).append("\n");
				}
			}
			sb.append("\n");
		}
		return sb.toString();
	}

	public String get(int row, int col) {
		if (0 <= row && row < arrayArray.size() && 0 <= col && col < arrayArray.get(row).size()) {
			return arrayArray.get(row).get(col);
		}
		return null;
	}

	public String get(int row, String key) {
		if (0 <= row && row < arrayArray.size()) {
			return arrayMap.get(row).get(key); // If no value for a key, this returns null;
		}
		return null;
	}

	public String get(String key, int col) {
		if (0 <= col) {
			ArrayList<String> aL = mapArray.get(key); // If no value for a key, this returns null;
			if (aL != null && col < aL.size()) {
				return aL.get(col);
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

	public ArrayList<String> get(String rowKey) {
		if (mapArray != null) {
			return mapArray.get(rowKey);
		}
		return null;
	}

	public static void main(String... args) {
		// StrArray sa=new
		// StrArray("replacer\ten\tkr\tjp\tcn\tkk\r\n[--welcome--]\t\tRecoeve 에 오신걸
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