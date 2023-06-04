package recoeve.db;

import java.lang.StringBuilder;

import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;



public class FileMap {
	private static final String[] referersAllowed={
			"localhost"
			, "recoeve.net"
			// , "www.recoeve.net"
			// , "127.0.0.1"
			// , "172.30.1.18"
			, "kipid.tistory.com", "tistory1.daumcdn.net"
		};
	
	private static final String filePath="C:/Recoeve/CDN/";
	private static final String[] fileNames={
			"favicon.ico"
			, "link.png", "icon-Twitter.png", "icon-Facebook.png", "icon-Kakao.png", "icon-Recoeve.png"
			, "cc.png", "by.png", "nc.png", "nd.png"
			, "docuK-2.3.css", "docuK-prepare-2.3.js", "docuK-postProcess-2.3.js"
			, "right-to-commit-suicide.html"
		};
		
	private static final String txtFilePath="C:/Recoeve/sources/recoeve/db/html/";
	private static final String[] txtFileNames={
			"jquery.js", "prepare.js"
			, "robots.txt"
			, "log-in.html"
			, "changePwd.html"
			, "log-out.html"
			, "user-page.html"
			, "remember-me.html"
		};
	private static final int txtFileMapSize=100;
	private static final int fileLangMapSize=100; // # of languages translated to support.
	
	public static Set<String> refererSet;
	public static Map<String, String> fileMap;
		// fileMap.get("fileName")
	public static Map<String, Map<String, String>> txtFileMap;
		// txtFileMap.get("txtFileName").get("lang")
	public static StrArray langMap;
	
	public static final Pattern ptnReplacer=Pattern.compile("\\[--[\\s\\S]+?--\\]");
	
	static {
		refererSet=new HashSet<String>();
		for (String referer: referersAllowed) {
			refererSet.add(referer);
		}
		
		fileMap=new HashMap<String, String>();
		for (String fileName: fileNames) {
			fileMap.put(fileName, filePath+fileName);
		}
		
		txtFileMap=new HashMap<String, Map<String, String>>(txtFileMapSize);
		File file=null;
		String fileStr=null;
		
		file=new File(txtFilePath+"lang.txt");
		if (file.exists()) { try {
			StringBuilder sb=new StringBuilder();
			int ch;
			FileReader reader=new FileReader(file);
			while((ch=reader.read())!=-1) {
				sb.append((char)ch);
			}
			reader.close();
			fileStr=sb.toString();
		} catch (IOException e) {
			System.out.println(e);
		} finally {
			file=null;
		} }
		langMap=new StrArray(fileStr, true, true);
		// System.out.println(langMap);
		fileStr=null;
		
		for (String txtFileName: txtFileNames) {
			file=new File(txtFilePath+txtFileName);
			if (file.exists()) { try {
				StringBuilder sb=new StringBuilder();
				int ch;
				FileReader reader=new FileReader(file);
				while((ch=reader.read())!=-1) {
					sb.append((char)ch);
				}
				reader.close();
				fileStr=sb.toString();
			} catch (IOException e) {
				System.out.println(e);
			} finally {
				file=null;
			} }
			
			if (fileStr!=null) {
				txtFileMap.put(txtFileName, new HashMap<String, String>(fileLangMapSize));
				Map<String, String> fileLangMap=txtFileMap.get(txtFileName);
				fileLangMap.put("df", fileStr); // default.
				ArrayList<String> strList=strToList(fileStr);
				if (strList.size()>1) {
					int colSize=langMap.getColSizeAtRow(0);
					for (int k=2;k<colSize;k++) {
						String lang=langMap.get(0,k);
						if (!lang.equals("desc")) {
							fileLangMap.put(lang, replaceStr(strList, lang)); // after replacing langMap.
						}
					}
				}
				fileStr=null;
			}
		}
	}
	
	public FileMap() {}
	
	public static boolean refererAllowed(String host) {
		return refererSet.contains(host);
	}
	
	public static String getCDNFile(String fileName) {
		return fileMap.get(fileName);
	}

	public static ArrayList<String> strToList(String fileStr) {
		if (fileStr==null) {
			return null;
		}
		int start=0;
		Matcher matchReplacer=ptnReplacer.matcher(fileStr);
		ArrayList<String> strList=new ArrayList<String>();
		while (start<fileStr.length()) {
			if (matchReplacer.find(start)) {
				strList.add(fileStr.substring(start, matchReplacer.start()));
				strList.add(matchReplacer.group());
				start=matchReplacer.end();
			} else {
				strList.add(fileStr.substring(start));
				start=fileStr.length();
			}
		}
		return strList;
	}

	public static String replaceStr(ArrayList<String> strList, String lang) {
		String strReplaced="";
		String replaced=null;
		for (int i=0;i<strList.size();i++) {
			if (i%2==0) {
				strReplaced+=strList.get(i);
			} else {
				replaced=langMap.get(strList.get(i), lang);
				if (replaced==null||replaced.isEmpty()||replaced.equals("-")) {
					replaced=langMap.get(strList.get(i), "en"); // "en" is default lang.
				}
				if (replaced==null) {
					replaced=strList.get(i);
				}
				strReplaced+=replaced;
			}
		}
		return strReplaced;
	}

	public static String replaceStr(String str, String lang) {
		return replaceStr(strToList(str), lang);
	}
	
	public static String get(String txtFileName, String lang) {
		Map<String, String> fileLangMap=txtFileMap.get(txtFileName);
		if (fileLangMap==null) {return null;}
		String res=fileLangMap.get(lang);
		if (res==null) {
			res=fileLangMap.get("df");
		}
		return res;
	}
	
	public static void main(String... args) {
		System.out.println(FileMap.replaceStr("[--Reco--] [--Edit--]", "ko"));
		// System.out.println(FileMap.refererAllowed("localhost"));
		// System.out.println(Pattern.quote("[a-d]"));
	}
}