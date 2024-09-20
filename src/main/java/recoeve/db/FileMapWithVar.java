package recoeve.db;



import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileMapWithVar {
	public static final String VERSION = "1.2.0";
	private static final String FILEPATH = FileMap.PRE_FILEPATH + "/Recoeve/src/main/java/recoeve/db/html/";
	private static final File[] fileNames = (new File(FILEPATH)).listFiles((File pathname) -> {
		return pathname.isFile();
	});
	private static final int FILEMAP_SIZE = 50;
	private static final int FILE_LANGMAP_SIZE = 15;

	public static final Map<String, Map<String, ArrayList<String>>> FILEMAP;
	// FILEMAP.get("fileName").get("lang")

	public static final Pattern PTN_LANGUAGE = Pattern.compile("\\[--[^\\[\\]]+?--\\]");
	public static final Pattern PTN_VARIABLE = Pattern.compile("\\{--[^\\{\\}]+?--\\}");

	static {
		FILEMAP = new HashMap<>(FILEMAP_SIZE);
		File file;
		String fileStr = null;

		file = new File(FILEPATH + "lang.txt");
		if (file.exists()) {
			FileReader reader = null;
			try {
				reader = new FileReader(file);
				StringBuilder sb = new StringBuilder();
				int ch;
				while ((ch = reader.read()) != -1) {
					sb.append((char) ch);
				}
				fileStr = sb.toString();
			} catch (IOException e) {
				System.out.println(e);
			} finally {
				if (reader != null) {
					try {
						reader.close();
					} catch (IOException err) {
						System.out.println("IOException: " + err.getMessage());
					}
				}
			}
		}
		StrArray langMap = new StrArray(fileStr, true, true);
		fileStr = null;

		for (File fileName : fileNames) {
			file = new File(FILEPATH + fileName.getName());
			if (file.exists()) {
				FileReader reader = null;
				try {
					reader = new FileReader(file);
					StringBuilder sb = new StringBuilder();
					int ch;
					while ((ch = reader.read()) != -1) {
						sb.append((char) ch);
					}
					fileStr = sb.toString();
				} catch (IOException e) {
					System.out.println(e);
				} finally {
					if (reader != null) {
						try {
							reader.close();
						} catch (IOException err) {
							System.out.println("IOException: " + err.getMessage());
						}
					}
				}
			}

			if (fileStr != null) {
				FILEMAP.put(fileName.getName(), new HashMap<>(FILE_LANGMAP_SIZE));
				Map<String, ArrayList<String>> fileLangMap = FILEMAP.get(fileName.getName());

				ArrayList<String> strListVars = new ArrayList<>();
				Matcher matchVariable = PTN_VARIABLE.matcher(fileStr); // default
				int start = 0;
				while (start < fileStr.length()) {
					if (matchVariable.find(start)) {
						strListVars.add(fileStr.substring(start, matchVariable.start()));
						strListVars.add(matchVariable.group());
						start = matchVariable.end();
					}
					else {
						strListVars.add(fileStr.substring(start));
						start = fileStr.length();
					}
				}
				fileLangMap.put("df", strListVars); // default.

				ArrayList<String> strList = new ArrayList<>();
				Matcher matchReplacer = PTN_LANGUAGE.matcher(fileStr);
				start = 0;
				while (start < fileStr.length()) {
					if (matchReplacer.find(start)) {
						strList.add(fileStr.substring(start, matchReplacer.start()));
						strList.add(matchReplacer.group());
						start = matchReplacer.end();
					}
					else {
						strList.add(fileStr.substring(start));
						start = fileStr.length();
					}
				}

				if (strList.size() > 1) {
					int colSize = langMap.getColSizeAtRow(0);
					for (int k = 2; k < colSize; k++) {
						String lang = langMap.get(0, k);
						if (!lang.equals("desc")) {
							String strReplaced = "";
							String replaced;
							for (int i = 0; i < strList.size(); i++) {
								if (i % 2 == 0) {
									strReplaced += strList.get(i);
								}
								else {
									replaced = langMap.get(strList.get(i), lang);
									if (replaced == null || replaced.isEmpty() || replaced.equals("-")) {
										replaced = langMap.get(strList.get(i), "en"); // "en" is default lang.
									}
									if (replaced == null) {
										replaced = strList.get(i); // If there is no default "en" lang, use literal [--Var--].
									}
									strReplaced += replaced;
								}
							}
							strListVars = new ArrayList<>();
							matchVariable = PTN_VARIABLE.matcher(strReplaced); // [--lang--] replaced
							start = 0;
							while (start < strReplaced.length()) {
								if (matchVariable.find(start)) {
									strListVars.add(strReplaced.substring(start, matchVariable.start()));
									strListVars.add(matchVariable.group());
									start = matchVariable.end();
								}
								else {
									strListVars.add(strReplaced.substring(start));
									start = strReplaced.length();
								}
							}
							fileLangMap.put(lang, strListVars); // after replacing langMap.
						}
					}
				}
				fileStr = null;
			}
		}
	}

	public FileMapWithVar() {
	}

	public static String getFileWithLangAndVars(String fileName, String lang, Map<String, String> varMap) {
		Map<String, ArrayList<String>> fileLangMap = FILEMAP.get(fileName);
		if (fileLangMap == null) {
			return null;
		}
		ArrayList<String> strList = fileLangMap.get(lang);
		if (strList == null) {
			strList = fileLangMap.get("df");
		}
		String res = "";
		String replaced;
		for (int i = 0; i < strList.size(); i++) {
			if (i % 2 == 0) {
				res += strList.get(i);
			}
			else {
				replaced = varMap.get(strList.get(i));
				if (replaced == null) {
					replaced = strList.get(i);
				}
				res += replaced;
			}
		}
		return res;
	}

	public static void main(String... args) {
		Map<String, String> varMap = new HashMap<>();
		varMap.put("{--myIndex--}", "11111");
		varMap.put("{--myId--}", "kipid");
		varMap.put("{--userIndex--}", "10000");
		varMap.put("{--userId--}", "id");
		varMap.put("{--user email--}", "id@gmail.com");
		varMap.put("{--myCatList--}", """

[Recoeve]
	static
	multiline
[Music/Break]""");
		varMap.put("{--catList--}", """

[IT/Programming]
	HTML
	CSS
	JavaScript""");
		varMap.put("{--kipid-catList--}", """

[Poop]
[Ding Dong]""");
		System.out.println(FileMapWithVar.getFileWithLangAndVars("user-page.html", "ko", varMap));
		for (File fileName : fileNames) {
			System.out.println(fileName.getName());
		}
	}
}
