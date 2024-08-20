package recoeve.db;



import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.file.FileSystem;
import io.vertx.core.shareddata.LocalMap;

import java.lang.StringBuilder;

import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.io.File;
import java.io.FileFilter;
import java.io.FileReader;
import java.io.IOException;

public class FileMap {
	public static final String version = "1.2.0";
	private static final String[] referersAllowed = {
			"localhost", "recoeve.net", "www.recoeve.net"
			// , "127.0.0.1"
			// , "172.30.1.18"
			, "kipid.tistory.com", "tistory1.daumcdn.net"
	};
	public static String preFilePath = "";
	static {
		String os = System.getProperty("os.name").toLowerCase();
		if (os.contains("win")) {
			preFilePath = "C:";
		}
		else {
			preFilePath = "/home/kipid";
		}
	}
	private static final String filePath = preFilePath + "/Recoeve/src/main/java/recoeve/db/CDN/";
	private static final File[] fileNames = (new File(filePath)).listFiles(new FileFilter() {
		@Override
		public boolean accept(File pathname) {
			return pathname.isFile();
		}
	});

	public Vertx vertx;
	public LocalMap<String, Buffer> fileStorage;

	public FileMap(Vertx vertx) {
		this.vertx = vertx;
		fileStorage = vertx.sharedData().getLocalMap("fileStorage"); // Use LocalMap to store files in memory
		FileSystem fileSystem = vertx.fileSystem();

		// Example: Reading a file and storing it in memory
		for (File fileName : fileNames) {
			String fileFullPath = filePath + fileName.getName();
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

	private static final String txtFilePath = preFilePath + "/Recoeve/src/main/java/recoeve/db/html/";
	private static final File[] txtFileNames = (new File(txtFilePath)).listFiles(new FileFilter() {
		@Override
		public boolean accept(File pathname) {
			return pathname.isFile();
		}
	});
	private static final int txtFileMapSize = 30;
	private static final int fileLangMapSize = 20; // # of languages translated to support.

	public static Set<String> refererSet;
	public static Map<String, Map<String, String>> txtFileMap;
	// txtFileMap.get("txtFileName").get("lang")
	public static StrArray langMap;

	public static final Pattern ptnReplacer = Pattern.compile("\\[--[^\\[\\]]+--\\]");

	static {
		refererSet = new HashSet<String>();
		for (String referer : referersAllowed) {
			refererSet.add(referer);
		}

		txtFileMap = new HashMap<String, Map<String, String>>(txtFileMapSize);
		File file = null;
		String fileStr = null;

		file = new File(txtFilePath + "lang.txt");
		if (file.exists()) {
			try {
				StringBuilder sb = new StringBuilder();
				int ch;
				FileReader reader = new FileReader(file);
				while ((ch = reader.read()) != -1) {
					sb.append((char) ch);
				}
				reader.close();
				fileStr = sb.toString();
			} catch (IOException e) {
				System.out.println(e);
			} finally {
				file = null;
			}
		}
		langMap = new StrArray(fileStr, true, true);
		// System.out.println(langMap);
		fileStr = null;

		for (File txtFileName : txtFileNames) {
			file = new File(txtFilePath + txtFileName.getName());
			if (file.exists()) {
				try {
					StringBuilder sb = new StringBuilder();
					int ch;
					FileReader reader = new FileReader(file);
					while ((ch = reader.read()) != -1) {
						sb.append((char) ch);
					}
					reader.close();
					fileStr = sb.toString();
				} catch (IOException e) {
					System.out.println(e);
				} finally {
					file = null;
				}
			}

			if (fileStr != null) {
				txtFileMap.put(txtFileName.getName(), new HashMap<String, String>(fileLangMapSize));
				Map<String, String> fileLangMap = txtFileMap.get(txtFileName.getName());
				fileLangMap.put("df", fileStr); // default.
				ArrayList<String> strList = strToList(fileStr);
				if (strList.size() > 1) {
					int colSize = langMap.getColSizeAtRow(0);
					for (int k = 2; k < colSize; k++) {
						String lang = langMap.get(0, k);
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
		Matcher matchReplacer = ptnReplacer.matcher(fileStr);
		ArrayList<String> strList = new ArrayList<String>();
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
		String replaced = null;
		for (int i = 0; i < strList.size(); i++) {
			if (i % 2 == 0) {
				strReplaced += strList.get(i);
			} else {
				replaced = langMap.get(strList.get(i), lang);
				if (replaced == null || replaced.isEmpty() || replaced.equals("-")) {
					replaced = langMap.get(strList.get(i), "en"); // "en" is default lang.
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
		Map<String, String> fileLangMap = txtFileMap.get(txtFileName);
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
