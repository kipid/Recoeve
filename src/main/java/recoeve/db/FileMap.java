package recoeve.db;



import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.file.FileSystem;
import io.vertx.core.shareddata.LocalMap;

public class FileMap {
	public static final String VERSION = "1.2.0";
	// private static final Set<String> REFERERS_ALLOWED = new HashSet<>(Arrays.asList(
	// 	"localhost", "recoeve.net", "www.recoeve.net"
	// 	// , "127.0.0.1"
	// 	, "kipid.tistory.com", "tistory1.daumcdn.net"
	// ));
	public static final String PRE_FILEPATH = "C:";
	// static {
	// 	String os = System.getProperty("os.name").toLowerCase();
	// 	if (os.contains("win")) {
	// 		PRE_FILEPATH = "C:";
	// 	}
	// 	else {
	// 		PRE_FILEPATH = "/home/kipid";
	// 	}
	// }
	private static final String FILEPATH = PRE_FILEPATH + "/Recoeve/src/main/java/recoeve/db/CDN/";
	private static final File[] FILENAMES = (new File(FILEPATH)).listFiles((File pathname) -> {
		return pathname.isFile();
	});

	public Vertx vertx;
	public LocalMap<String, Buffer> fileStorage;

	public FileMap(Vertx vertx) {
		this.vertx = vertx;
		fileStorage = vertx.sharedData().getLocalMap("fileStorage"); // Use LocalMap to store files in memory
		FileSystem fileSystem = vertx.fileSystem();

		// Example: Reading a file and storing it in memory
		for (File fileName : FILENAMES) {
			String fileFullPath = FILEPATH + fileName.getName();
			fileSystem.readFile(fileFullPath)
				.onComplete(ar -> {
					if (ar.succeeded()) {
						Buffer fileContent = ar.result();
						fileStorage.put(fileName.getName(), fileContent);
					} else {
						System.err.println("Error reading file: " + ar.cause());
					}
				});
		}
	}

	public Buffer getCDNFileInMemory(String fileName) {
		// Example: Retrieving file content from memory
		Buffer retrievedFile = fileStorage.get(fileName);
		if (retrievedFile != null) {
			System.out.println("Retrieved file content: " + fileName);
		} else {
			System.err.println("File not found in memory!: " + fileName);
		}
		return retrievedFile;
	}

	private static final String TXT_FILEPATH = PRE_FILEPATH + "/Recoeve/src/main/java/recoeve/db/html/";
	private static final File[] TXT_FILENAMES = (new File(TXT_FILEPATH)).listFiles((File pathname) -> {
		return pathname.isFile();
	});
	private static final int TXT_FILEMAP_SIZE = 50;
	private static final int FILE_LANGMAP_SIZE = 15; // # of languages translated to support.

	public static final Map<String, Map<String, String>> TXT_FILEMAP;
	// txtFileMap.get("txtFileName").get("lang")
	public static final StrArray LANGMAP;

	public static final Pattern PTN_REPLACER = Pattern.compile("\\[--[^\\[\\]]+?--\\]");

	static {
		TXT_FILEMAP = new HashMap<>(TXT_FILEMAP_SIZE);
		File file;
		String fileStr = null;

		file = new File(TXT_FILEPATH + "lang.txt");
		if (file.exists()) {
			FileReader reader = null;
			try {
				StringBuilder sb = new StringBuilder();
				int ch;
				reader = new FileReader(file);
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
		LANGMAP = new StrArray(fileStr, true, true);
		// System.out.println(langMap);
		fileStr = null;

		for (File txtFileName : TXT_FILENAMES) {
			file = new File(TXT_FILEPATH + txtFileName.getName());
			if (file.exists()) {
				FileReader reader = null;
				try {
					StringBuilder sb = new StringBuilder();
					int ch;
					reader = new FileReader(file);
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
				TXT_FILEMAP.put(txtFileName.getName(), new HashMap<>(FILE_LANGMAP_SIZE));
				Map<String, String> fileLangMap = TXT_FILEMAP.get(txtFileName.getName());
				fileLangMap.put("df", fileStr); // default.
				ArrayList<String> strList = strToList(fileStr);
				if (strList.size() > 1) {
					int colSize = LANGMAP.getColSizeAtRow(0);
					for (int k = 2; k < colSize; k++) {
						String lang = LANGMAP.get(0, k);
						if (!lang.equals("desc")) {
							fileLangMap.put(lang, replaceStr(strList, lang)); // after replacing langMap.
						}
					}
				}
				fileStr = null;
			}
		}
	}

	public static boolean refererAllowed(String host) {
		// return refererSet.contains(host);
		return true;
	}

	public static ArrayList<String> strToList(String fileStr) {
		if (fileStr == null) {
			return null;
		}
		int start = 0;
		Matcher matchReplacer = PTN_REPLACER.matcher(fileStr);
		ArrayList<String> strList = new ArrayList<>();
		while (start < fileStr.length()) {
			if (matchReplacer.find(start)) {
				strList.add(fileStr.substring(start, matchReplacer.start()));
				strList.add(matchReplacer.group());
				start = matchReplacer.end();
			} else {
				strList.add(fileStr.substring(start));
				start = fileStr.length();
			}
		}
		return strList;
	}

	public static String replaceStr(ArrayList<String> strList, String lang) {
		String strReplaced = "";
		String replaced;
		for (int i = 0; i < strList.size(); i++) {
			if (i % 2 == 0) {
				strReplaced += strList.get(i);
			} else {
				replaced = LANGMAP.get(strList.get(i), lang);
				if (replaced == null || replaced.isEmpty() || replaced.equals("-")) {
					replaced = LANGMAP.get(strList.get(i), "en"); // "en" is default lang.
				}
				if (replaced == null) {
					replaced = strList.get(i);
				}
				strReplaced += replaced;
			}
		}
		return strReplaced;
	}

	public static String replaceStr(String str, String lang) {
		return replaceStr(strToList(str), lang);
	}

	public String getFileWithLang(String txtFileName, String lang) {
		Map<String, String> fileLangMap = TXT_FILEMAP.get(txtFileName);
		if (fileLangMap == null) {
			return null;
		}
		String res = fileLangMap.get(lang);
		if (res == null) {
			res = fileLangMap.get("df");
		}
		return res;
	}

	public static void main(String... args) {
		FileMap fileMap = new FileMap(Vertx.vertx());
		fileMap.vertx.setTimer(2000, timerId -> {
			// System.out.println(fileMap.getCDNFileInMemory("recoeve-style.css"));
			// System.out.println(fileMap.getFileWithLang("log-in.html", "ko"));
			System.out.println(FileMap.replaceStr("[--Reco--] [--Edit--]", "ko"));
			// System.out.println(FileMap.refererAllowed("localhost"));
			// System.out.println(Pattern.quote("[a-d]"));
			// System.out.println(fileMap.getCDNFileInMemory("link.png"));
			// getCDNFileInMemory("docuK-2.3.css");
		});
	}
}
