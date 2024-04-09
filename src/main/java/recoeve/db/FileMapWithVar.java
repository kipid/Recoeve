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

public class FileMapWithVar {
  public static final String version = "1.0.4";
  private static String filePath = "C:/Recoeve/src/main/java/recoeve/db/html/";
  private static final String[] fileNames = {
      "user-page.html", "bundle-user-page.js",
      "recostat.html", "log-in.html", "signed-up.html", "reco.html", "multireco.html"
      // , "redirect.html", "remember-me.html"
  };
  private static final int fileMapSize = 15;
  private static final int fileLangMapSize = 20;

  public static Map<String, Map<String, ArrayList<String>>> fileMap;
  // fileMap.get("fileName").get("lang")

  public static final Pattern ptnReplacer = Pattern.compile("\\[--[\\s\\S]+?--\\]");
  public static final Pattern ptnVariable = Pattern.compile("\\{--[\\s\\S]+?--\\}");

  static {
    fileMap = new HashMap<String, Map<String, ArrayList<String>>>(fileMapSize);
    File file = null;
    String fileStr = null;

    file = new File(filePath + "lang.txt");
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
    StrArray langMap = new StrArray(fileStr, true, true);
    // System.out.println(langMap);
    fileStr = null;

    for (String fileName : fileNames) {
      file = new File(filePath + fileName);
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
        // System.out.println("\nfileName : "+fileName);
        fileMap.put(fileName, new HashMap<String, ArrayList<String>>(fileLangMapSize));
        Map<String, ArrayList<String>> fileLangMap = fileMap.get(fileName);

        ArrayList<String> strListVars = new ArrayList<String>();
        Matcher matchVariable = ptnVariable.matcher(fileStr); // default
        int start = 0;
        while (start < fileStr.length()) {
          if (matchVariable.find(start)) {
            strListVars.add(fileStr.substring(start, matchVariable.start()));
            strListVars.add(matchVariable.group());
            start = matchVariable.end();
          } else {
            strListVars.add(fileStr.substring(start));
            start = fileStr.length();
          }
        }
        fileLangMap.put("df", strListVars); // default.

        ArrayList<String> strList = new ArrayList<String>();
        Matcher matchReplacer = ptnReplacer.matcher(fileStr);
        start = 0;
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

        if (strList.size() > 1) {
          int colSize = langMap.getColSizeAtRow(0);
          for (int k = 2; k < colSize; k++) {
            String lang = langMap.get(0, k);
            if (!lang.equals("desc")) {
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
              strListVars = new ArrayList<String>();
              matchVariable = ptnVariable.matcher(strReplaced); // [--lang--] replaced
              start = 0;
              while (start < strReplaced.length()) {
                if (matchVariable.find(start)) {
                  strListVars.add(strReplaced.substring(start, matchVariable.start()));
                  strListVars.add(matchVariable.group());
                  start = matchVariable.end();
                } else {
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
    Map<String, ArrayList<String>> fileLangMap = fileMap.get(fileName);
    if (fileLangMap == null) {
      return null;
    }
    ArrayList<String> strList = fileLangMap.get(lang);
    if (strList == null) {
      strList = fileLangMap.get("df");
    }
    String res = "";
    String replaced = null;
    for (int i = 0; i < strList.size(); i++) {
      if (i % 2 == 0) {
        res += strList.get(i);
      } else {
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
    Map<String, String> varMap = new HashMap<String, String>();
    varMap.put("{--userIndex--}", "10000");
    varMap.put("{--userId--}", "id");
    varMap.put("{--user email--}", "id@email.com");
    System.out.println(FileMapWithVar.getFileWithLangAndVars("multireco.html", "en", varMap));
  }
}