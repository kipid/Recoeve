package recoeve.db;

import java.lang.StringBuilder;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;



public class FileMap {
	private static final String imgPath="C:/Recoeve/img";
	private static final String[] imgNames={
			"/favicon.ico"
			, "/icon-Twitter.png", "/icon-Facebook.png"
		};
	private static final String filePath="C:/Recoeve/sources/recoeve/db/html/";
	private static final String[] fileNames={
			"jquery.min.js"
			, "log-in.html", "to-log-in.html" //, "log-in.css", "log-in.js"
			, "log-out.html"
			, "user-page.html", "to-user-page.html"
			, "redirect.html", "remember-me.html"
			, "AJAX post test (Cross orgin policy) and Reco test.html", "Reco-musics-test.html"
		};
	private static final int fileMapSize=50;
	private static final int fileLangMapSize=10;
	
	public static Map<String, String> imgMap;
		// imgMap.get("imgName")
	public static Map<String, Map<String, String>> fileMap;
		// fileMap.get("fileName").get("lang")
	
	public static final Pattern ptnReplacer=Pattern.compile("\\[--[\\s\\S]+?--\\]");
	
	static {
		imgMap=new HashMap<String, String>();
		for (String imgName: imgNames) {
			imgMap.put(imgName, imgPath+imgName);
		}
		
		fileMap=new HashMap<String, Map<String, String>>(fileMapSize);
		File file=null;
		String fileStr=null;
		
		file=new File(filePath+"lang.txt");
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
		StrArray langMap=new StrArray(fileStr, true, true);
		// System.out.println(langMap);
		fileStr=null;
		
		for (String fileName: fileNames) {
			file=new File(filePath+fileName);
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
				// System.out.println("\nfileName : "+fileName);
				fileMap.put(fileName, new HashMap<String, String>(fileLangMapSize));
				Map<String, String> fileLangMap=fileMap.get(fileName);
				fileLangMap.put("df", fileStr); // default.
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
				
				if (strList.size()>1) {
					int colSize=langMap.getColSizeAtRow(0);
					for (int k=2;k<colSize;k++) {
						String lang=langMap.get(0,k);
						if (!lang.equals("desc")) {
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
							fileLangMap.put(lang, strReplaced); // after replacing langMap.
						}
					}
				}
				fileStr=null;
			}
		}
	}
	
	public FileMap() {}
	
	public static String getImg(String imgName) {
		return imgMap.get(imgName);
	}
	
	public static String get(String fileName, String lang) {
		Map<String, String> fileLangMap=fileMap.get(fileName);
		if (fileLangMap==null) {return null;}
		String res=fileLangMap.get(lang);
		if (res==null) {
			res=fileLangMap.get("df");
		}
		return res;
	}
	
	public static void main(String... args) {
		// System.out.println(FileMap.get("AJAX post test (Cross orgin policy) and Reco test.html", "en"));
		// System.out.println(Pattern.quote("[a-d]"));
	}
}