package recoeve.db;


// import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
	// http://www.docjar.com/docs/api/com/mysql/jdbc/jdbc2/optional/MysqlDataSource.html
import com.mysql.cj.jdbc.MysqlConnectionPoolDataSource;
	// http://www.docjar.com/docs/api/com/mysql/jdbc/jdbc2/optional/MysqlConnectionPoolDataSource.html

import io.vertx.core.MultiMap;

import java.lang.StringBuilder;

import java.nio.ByteBuffer;

// import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.sql.*;
	// java.sql.Timestamp;
	// java.sql.PreparedStatement
import javax.sql.DataSource; // http://docs.oracle.com/javase/8/docs/api/index.html

import java.math.BigInteger;

// import java.net.URLDecoder;

import java.text.Normalizer;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.Set;
import java.util.HashSet;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Random;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import recoeve.http.Gmail;
import recoeve.http.Cookie;
import recoeve.http.BodyData;



public class RecoeveDB {
public static final String encoding="UTF-8";
public static final int port=80;
public static final String domain="recoeve.net";
	// "localhost:"+port;

	// domain="localhost" does not works in cookie.
public static final int hoursSSN=24*7;
public static final long secondsSSN=hoursSSN*60*60L;

public static final int daysRMB=30;
public static final long secondsRMB=daysRMB*24*60*60L;

public static final int daysRMBtoken=10;
public static final long secondsRMBtoken=daysRMBtoken*24*60*60L;

public static final Timestamp OLD=Timestamp.valueOf("2000-01-01 00:00:00");

public static byte[] randomBytes(int length) {
	byte[] rb=new byte[length];
	new Random().nextBytes(rb);
	return rb;
}

// The below is from http://stackoverflow.com/questions/8890174/in-java-how-do-i-convert-a-hex-string-to-a-byte
final protected static char[] hexArray="0123456789abcdef".toCharArray();
public static String bytesToHexString(byte[] bytes) {
	char[] hexChars=new char[bytes.length*2];
	for (int j=0; j<bytes.length; j++) {
		int v=bytes[j]&0xFF;
		hexChars[j*2]=hexArray[v>>>4];
		hexChars[j*2+1]=hexArray[v&0x0F];
	}
	return new String(hexChars);
}

public static byte[] hexStrToBytes(String s) {
	int len=s.length();
	byte[] data=new byte[len/2];
	for (int i=0; i<len; i+=2) {
		data[i/2]=(byte) ((Character.digit(s.charAt(i), 16)<<4)
								+ Character.digit(s.charAt(i+1), 16));
	}
	return data;
}

public static String longToHexString(long user_me) {
	return String.format("%016X", user_me).toLowerCase();
}
public static long hexStringToLong(String hexStr) {
	return (new BigInteger(hexStr, 16)).longValue();
}

public static int getutf8mb4Length(String uri) {
	String normalizedString=Normalizer.normalize(uri, Normalizer.Form.NFKC);
	int utf8mb4Length=normalizedString.codePointCount(0, normalizedString.length());
	System.out.println("Length of string in utf8mb4 encoding: "+utf8mb4Length);
	return utf8mb4Length;
}

private static final MysqlConnectionPoolDataSource ds;
static {
	ds=new MysqlConnectionPoolDataSource();
	ds.setServerName("localhost");
	ds.setPort(3306);
	ds.setDatabaseName("recoeve0.1");
	// ds.setURL("localhost:3306/recoeve0.1?serverTimezone=UTC");
	ds.setUser("eve");
	ds.setPassword("$repakeoco#eve");
}

private Connection con;

private PreparedStatement pstmtNow;
private PreparedStatement pstmtTimeDiff;
private PreparedStatement pstmtCheckTimeDiff;
private PreparedStatement pstmtCheckDayDiffLessThan1;
private PreparedStatement pstmtCheckDateDiff;
	// java.sql.Timestamp class, and java.sql.Date class
	// java.util.Date dt=new java.util.Date();
	// java.text.SimpleDateFormat sdf=new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	// String currentTime=sdf.format(dt);

private PreparedStatement pstmtGetRedirect;
private PreparedStatement pstmtGetRedirectHashpath;
private PreparedStatement pstmtPutRedirect;

private PreparedStatement pstmtPutBlogVisitor;
private PreparedStatement pstmtGetBlogVisitor;
private PreparedStatement pstmtDelBlogVisitor;

private PreparedStatement pstmtPutPreGoogle;
private PreparedStatement pstmtGetPreGoogle;

private PreparedStatement pstmtSession;
private PreparedStatement pstmtCreateAuthToken;
private PreparedStatement pstmtCheckAuthToken;
private PreparedStatement pstmtUpdateAuthToken;

private PreparedStatement pstmtCreateUser;
private PreparedStatement pstmtDeleteUser;
private PreparedStatement pstmtDeleteUserCatList;
private PreparedStatement pstmtCreateEmailStat;
private PreparedStatement pstmtFindEmailStat;
private PreparedStatement pstmtCreateUserSession;
private PreparedStatement pstmtCreateUserRemember;
private PreparedStatement pstmtCheckUserRemember;

private PreparedStatement pstmtDelUserSession1;
private PreparedStatement pstmtDelUserRemember;

private PreparedStatement pstmtFindUserByIndex;
private PreparedStatement pstmtFindUserById;
private PreparedStatement pstmtFindUserByEmail;

private PreparedStatement pstmtGetUserIndexToPut;
private PreparedStatement pstmtUpdateUserClass;
private PreparedStatement pstmtLog;

private PreparedStatement pstmtGetWholeRecos;
private PreparedStatement pstmtGetReco;
private PreparedStatement pstmtPutReco;

private PreparedStatement pstmtGetCatList;
private PreparedStatement pstmtPutCatList;
private PreparedStatement pstmtGetUriList;
private PreparedStatement pstmtPutUriList;

private PreparedStatement pstmtPutRecentests;
private PreparedStatement pstmtCutAndPutRecentests;

private PreparedStatement pstmtPutNeighbor;
private PreparedStatement pstmtGetNeighbor;
private PreparedStatement pstmtDelNeighbor;
private PreparedStatement pstmtPutNeighborListFrom;
private PreparedStatement pstmtUpdateNeighborListFrom0;
private PreparedStatement pstmtUpdateNeighborListFrom;
private PreparedStatement pstmtGetNeighborListFrom;
private PreparedStatement pstmtPutNeighborListTo;
private PreparedStatement pstmtUpdateNeighborListTo;
private PreparedStatement pstmtGetNeighborListTo;
private PreparedStatement pstmtDelNeighborListTo;

private PreparedStatement pstmtPutRecoStat;
private PreparedStatement pstmtGetRecoStat;

private PreparedStatement pstmtPutRecoStatDefCat;
private PreparedStatement pstmtGetRecoStatDefCat;
private PreparedStatement pstmtPutRecoStatDefTitle;
private PreparedStatement pstmtGetRecoStatDefTitle;
private PreparedStatement pstmtPutRecoStatDefDesc;
private PreparedStatement pstmtGetRecoStatDefDesc;

private PreparedStatement pstmtPutRecoStatDefCatSet;
private PreparedStatement pstmtGetRecoStatDefCatSet;
private PreparedStatement pstmtPutRecoStatDefTitleSet;
private PreparedStatement pstmtGetRecoStatDefTitleSet;
private PreparedStatement pstmtPutRecoStatDefDescSet;
private PreparedStatement pstmtGetRecoStatDefDescSet;

public RecoeveDB() {
	try {
		ds.setServerTimezone("UTC");
		con=ds.getConnection();
		pstmtNow=con.prepareStatement("SELECT utc_timestamp();");
		pstmtTimeDiff=con.prepareStatement("SELECT TIMEDIFF(?, ?)>0;");
		pstmtCheckTimeDiff=con.prepareStatement("SELECT TIMESTAMPDIFF(SECOND, ?, ?) < ?;");
		pstmtCheckDayDiffLessThan1=con.prepareStatement("SELECT TIMESTAMPDIFF(DAY, ?, ?) < 1;");
		pstmtCheckDateDiff=con.prepareStatement("SELECT datediff(?, ?)<?;");

		pstmtGetRedirect=con.prepareStatement("SELECT `originalURI` FROM `redirect` WHERE `hashpath`=?;");
		pstmtGetRedirectHashpath=con.prepareStatement("SELECT `hashpath` FROM `redirect` WHERE `originalURI`=?;");
		pstmtPutRedirect=con.prepareStatement("INSERT INTO `redirect` (`hashpath`, `originalURI`) VALUES (?, ?);");

		pstmtPutBlogVisitor=con.prepareStatement("INSERT INTO `BlogStat` (`t`, `ip`, `URI`, `referer`, `REACTION_GUEST`) VALUES (?, ?, ?, ?, ?);");
		pstmtGetBlogVisitor=con.prepareStatement("SELECT * FROM `BlogStat` WHERE `t`>=? AND `t`<?;");
		pstmtDelBlogVisitor=con.prepareStatement("DELETE FROM `BlogStat` WHERE `t`<?;");

		pstmtPutPreGoogle=con.prepareStatement("INSERT INTO `PreGoogle` (`t`, `ip`, `state`, `data`) VALUES (?, ?, ?, ?);");
		pstmtGetPreGoogle=con.prepareStatement("SELECT * FROM `PreGoogle` WHERE `ip`=? and `state`=?;");

		pstmtSession=con.prepareStatement("SELECT * FROM `UserSession1` WHERE `user_i`=? and `tCreate`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtCreateAuthToken=con.prepareStatement("INSERT INTO `AuthToken` (`t`, `ip`, `token`) VALUES (?, ?, ?);");
		pstmtCheckAuthToken=con.prepareStatement("SELECT * FROM `AuthToken` WHERE `t`=? and `ip`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtUpdateAuthToken=con.prepareStatement("UPDATE `AuthToken` SET `new`=false WHERE `t`=? and `ip`=?;");
		pstmtCreateUser=con.prepareStatement("INSERT INTO `Users` (`i`, `id`, `email`, `pwd_salt`, `pwd`, `veriKey`, `ipReg`, `tReg`, `tLastVisit`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
		pstmtDeleteUser=con.prepareStatement("DELETE FROM `Users` WHERE `email`=?;");
		pstmtDeleteUserCatList=con.prepareStatement("DELETE FROM `CatList` WHERE `user_i`=?");
		pstmtCreateEmailStat=con.prepareStatement("INSERT INTO `EmailStat` (`emailHost`) VALUES (?);");
		pstmtFindEmailStat=con.prepareStatement("SELECT * FROM `EmailStat` WHERE `emailHost`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtCreateUserSession=con.prepareStatement("INSERT INTO `UserSession1` (`user_i`, `tCreate`, `encryptedSSN`, `salt`, `ip`, `userAgent`) VALUES (?, ?, ?, ?, ?, ?);");
		pstmtCreateUserRemember=con.prepareStatement("INSERT INTO `UserRemember` (`user_i`, `tCreate`, `auth`, `token`, `log`, `sW`, `sH`, `ip`, `userAgent`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
		pstmtCheckUserRemember=con.prepareStatement("SELECT * FROM `UserRemember` WHERE `user_i`=? and `tCreate`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);

		pstmtDelUserSession1=con.prepareStatement("DELETE FROM `UserSession1` WHERE `user_i`=?;");
		pstmtDelUserRemember=con.prepareStatement("DELETE FROM `UserRemember` WHERE `user_i`=?;");

		pstmtFindUserByIndex=con.prepareStatement("SELECT * FROM `Users` WHERE `i`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtFindUserById=con.prepareStatement("SELECT * FROM `Users` WHERE `id`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtFindUserByEmail=con.prepareStatement("SELECT * FROM `Users` WHERE `email`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		
		pstmtGetUserIndexToPut=con.prepareStatement("SELECT * FROM `UserClass` WHERE `class`=-1;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtUpdateUserClass=con.prepareStatement("UPDATE `UserClass` SET `count`=`count`+? WHERE `class`=?;");
		pstmtLog=con.prepareStatement("INSERT INTO `LogInLogs` (`user_i`, `t`, `ip`, `log`, `success`, `desc`) VALUES (?, ?, ?, ?, ?, ?);");
		
		pstmtGetWholeRecos=con.prepareStatement("SELECT * FROM `Recos1` WHERE `user_i`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtGetReco=con.prepareStatement("SELECT * FROM `Recos1` WHERE `user_i`=? and `uri`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutReco=con.prepareStatement("INSERT INTO `Recos1` (`user_i`, `uri`, `tFirst`, `tLast`, `cats`, `title`, `desc`, `cmt`, `val`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
		
		pstmtGetCatList=con.prepareStatement("SELECT * FROM `CatList` WHERE `user_i`=? and `listName`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutCatList=con.prepareStatement("INSERT INTO `CatList` (`user_i`, `listName`, `catList`) VALUES (?, ?, ?);");
		pstmtGetUriList=con.prepareStatement("SELECT * FROM `UriList` WHERE `user_i`=? and `cat`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutUriList=con.prepareStatement("INSERT INTO `UriList` (`user_i`, `cat`, `uriList`) VALUES (?, ?, ?);");

		pstmtPutRecentests=con.prepareStatement("INSERT INTO `RecoStat` (`uri`, `recentests`, `tFirst`, `tUpdate`) VALUES (?, ?, ?, ?);");
		pstmtCutAndPutRecentests=con.prepareStatement("UPDATE `RecoStat` SET `recentests`=CONCAT(SUBSTRING(`recentests` FROM ?), ?), `N`=? WHERE `uri`=?;");

		pstmtPutNeighbor=con.prepareStatement("INSERT INTO `Neighbors` (`user_i`, `cat_i`, `user_from`, `cat_from`, `sumSim`, `nSim`, `tUpdate`, `tScanAll`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);");
		pstmtGetNeighbor=con.prepareStatement("SELECT * FROM `Neighbors` WHERE `user_i`=? and `cat_i`=? and `user_from`=? and `cat_from`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtDelNeighbor=con.prepareStatement("DELETE FROM `Neighbors` WHERE `user_i`=? and `cat_i`=? and `user_from`=? and `cat_from`=?;");
		pstmtPutNeighborListFrom=con.prepareStatement("INSERT INTO `NeighborListFrom` (`user_from`, `cat_from`, `userCatList`, `tUpdate`) VALUES (?, ?, ?, ?);");
		pstmtUpdateNeighborListFrom0=con.prepareStatement("UPDATE `NeighborListFrom` SET `userCatList`=?, `nUpdate`=`nUpdate`+1 WHERE `user_from`=? and `cat_from`=?;");
		pstmtUpdateNeighborListFrom=con.prepareStatement("UPDATE `NeighborListFrom` SET `userCatList`=?, `tUpdate`=?, `nUpdate`=`nUpdate`+1 WHERE `user_from`=? and `cat_from`=?;");
		pstmtGetNeighborListFrom=con.prepareStatement("SELECT * FROM `NeighborListFrom` WHERE `user_from`=? and `cat_from`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutNeighborListTo=con.prepareStatement("INSERT INTO `NeighborListTo` (`user_to`, `cat_to`, `userCatList`, `tUpdate`) VALUES (?, ?, ?, ?);");
		pstmtUpdateNeighborListTo=con.prepareStatement("UPDATE `NeighborListTo` SET `userCatList`=?, `tUpdate`=?, `nUpdate`=`nUpdate`+1 WHERE `user_to`=? and `cat_to`=?;");
		pstmtGetNeighborListTo=con.prepareStatement("SELECT * FROM `NeighborListTo` WHERE `user_to`=? and `cat_to`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtDelNeighborListTo=con.prepareStatement("DELETE FROM `NeighborListTo` WHERE `user_to`=? and `cat_to`=?;");

		pstmtPutRecoStat=con.prepareStatement("INSERT INTO `RecoStat` (`uri`, `recentests`, `tUpdate`, `N`) VALUES (?, ?, ?, 1);");
		pstmtGetRecoStat=con.prepareStatement("SELECT * FROM `RecoStat` WHERE `uri`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);

		pstmtPutRecoStatDefCat=con.prepareStatement("INSERT INTO `RecoStatDefCat` (`uri`, `cat`) VALUES (?, ?);");
		pstmtGetRecoStatDefCat=con.prepareStatement("SELECT * FROM `RecoStatDefCat` WHERE `uri`=? and `cat`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutRecoStatDefTitle=con.prepareStatement("INSERT INTO `RecoStatDefTitle` (`uri`, `title`) VALUES (?, ?);");
		pstmtGetRecoStatDefTitle=con.prepareStatement("SELECT * FROM `RecoStatDefTitle` WHERE `uri`=? and `title`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutRecoStatDefDesc=con.prepareStatement("INSERT INTO `RecoStatDefDesc` (`uri`, `descHash`, `desc`) VALUES (?, ?, ?);");
		pstmtGetRecoStatDefDesc=con.prepareStatement("SELECT * FROM `RecoStatDefDesc` WHERE `uri`=? and `descHash`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);

		pstmtPutRecoStatDefCatSet=con.prepareStatement("INSERT INTO `RecoStatDefCatSet` (`uri`, `catSet`) VALUES (?, ?);");
		pstmtGetRecoStatDefCatSet=con.prepareStatement("SELECT * FROM `RecoStatDefCatSet` WHERE `uri`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutRecoStatDefTitleSet=con.prepareStatement("INSERT INTO `RecoStatDefTitleSet` (`uri`, `titleSet`) VALUES (?, ?);");
		pstmtGetRecoStatDefTitleSet=con.prepareStatement("SELECT * FROM `RecoStatDefTitleSet` WHERE `uri`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutRecoStatDefDescSet=con.prepareStatement("INSERT INTO `RecoStatDefDescSet` (`uri`, `descSet`) VALUES (?, ?);");
		pstmtGetRecoStatDefDescSet=con.prepareStatement("SELECT * FROM `RecoStatDefDescSet` WHERE `uri`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
	}
	catch (SQLException e) {
		err(e);
	}
}

public static void err(Exception ex) {
	System.out.println("Exception: "+ex);
	if (ex instanceof SQLException) {
		for (Throwable e : (SQLException)ex) {
			e.printStackTrace(System.err);
			String strSQLState=((SQLException)e).getSQLState();
			System.err.println("SQLState: "+strSQLState);
			if (strSQLState.equalsIgnoreCase("X0Y32"))
				System.err.println("Jar file already exists in schema");
			if (strSQLState.equalsIgnoreCase("42Y55"))
				System.err.println("Table already exists in schema");
			System.err.println("Error Code: "+((SQLException)e).getErrorCode());
			System.err.println("Message: "+e.getMessage());
			Throwable t=ex.getCause();
			while(t!=null) {
				System.out.println("Cause: "+t);
				t=t.getCause();
			}
		}
	}
}

// ResultSet rs; rs.getWarnings();
// Statement stmt; stmt.getWarnings();
public static void printWarnings(SQLWarning warning)
	throws SQLException {
	if (warning!=null) {
		System.out.println("\n---Warning---\n");
		while (warning!=null) {
			System.out.println("Message: "+warning.getMessage());
			System.out.println("SQLState: "+warning.getSQLState());
			System.out.print("Vendor error code: ");
			System.out.println(warning.getErrorCode());
			System.out.println("");
			warning=warning.getNextWarning();
		}
	}
}

public String now() {
	String now="";
	try {
		ResultSet rs=pstmtNow.executeQuery();
		if (rs.next()) {
			now=rs.getString(1);
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return now; // utc_timestamp()
}
public boolean timeDiff(Timestamp tNow, Timestamp tFrom) { // SELECT TIMEDIFF(?, ?)>0;
	try {
		pstmtTimeDiff.setTimestamp(1, tNow);
		pstmtTimeDiff.setTimestamp(2, tFrom);
		ResultSet rs=pstmtTimeDiff.executeQuery(); // tNow-tFrom>0?
		if (rs.next()) {
			return rs.getBoolean(1);
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return true;
}
public boolean checkTimeDiff(Timestamp tNow, String from, int lessThanInSeconds) {
	try {
		System.out.println("tNow:"+tNow);
		System.out.println("from:"+from);
		System.out.println("lessThanInSeconds:"+lessThanInSeconds);

		pstmtCheckDayDiffLessThan1.setTimestamp(1, Timestamp.valueOf(from));
		pstmtCheckDayDiffLessThan1.setTimestamp(2, tNow);
		ResultSet rs0=pstmtCheckDayDiffLessThan1.executeQuery();

		pstmtCheckTimeDiff.setTimestamp(1, Timestamp.valueOf(from));
		pstmtCheckTimeDiff.setTimestamp(2, tNow);
		pstmtCheckTimeDiff.setInt(3, lessThanInSeconds); // in seconds.
		ResultSet rs=pstmtCheckTimeDiff.executeQuery();

		if (rs0.next()&&rs.next()) {
			boolean res0=rs0.getBoolean(1);
			boolean res=rs.getBoolean(1);
			System.out.println("result0:"+res0);
			System.out.println("result:"+res);
			return res0&&res;
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}
public boolean checkDateDiff(Timestamp tNow, String from, int lessThanInDays) {
	try {
		pstmtCheckDateDiff.setDate(1, Date.valueOf(tNow.toString().substring(0,10)));
		pstmtCheckDateDiff.setDate(2, Date.valueOf(from.substring(0,10)));
		pstmtCheckDateDiff.setInt(3, lessThanInDays); // In days
		ResultSet rs=pstmtCheckDateDiff.executeQuery();
		if (rs.next()) {
			return rs.getBoolean(1);
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}

public String getRedirectURI(long hashpath) {
	try {
		pstmtGetRedirect.setLong(1, hashpath);
		ResultSet rs=pstmtGetRedirect.executeQuery();
		if (rs.next()) {
			return rs.getString("originalURI");
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return null;
}
public String getRedirectHashpath(String uri) {
	try {
		pstmtGetRedirectHashpath.setString(1, uri);
		ResultSet rs=pstmtGetRedirectHashpath.executeQuery();
		if (rs.next()) {
			return longToHexString(rs.getLong("hashpath"));
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return null;
}

public boolean changeOrderOfUriList(String cookieI, String user_id, String cat, String changedUriList) {
	try {
		long user_me=Long.parseLong(cookieI, 16);
		ResultSet user=findUserByIndex(user_me);
		if (user.next()&&user.getString("id").equals(user_id)) {
			ResultSet rSUriList=getRSUriList(user_me, cat);
			if (rSUriList!=null) {
				UriList uriList=new UriList(rSUriList.getString("uriList"));
				if (uriList.changeOrders(changedUriList)) {
					rSUriList.updateString("uriList", uriList.toString());
					rSUriList.updateRow();
					return true;
				}
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}

public boolean putBlogVisitor(Timestamp tNow, String ip, String URI, String referer, String REACTION_GUEST) {
	try {
		con.setAutoCommit(true);
		pstmtPutBlogVisitor.setTimestamp(1, tNow);
		pstmtPutBlogVisitor.setString(2, ip);
		pstmtPutBlogVisitor.setString(3, URI);
		pstmtPutBlogVisitor.setString(4, referer);
		pstmtPutBlogVisitor.setString(5, REACTION_GUEST);
		return pstmtPutBlogVisitor.executeUpdate()==1;
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}
public String getBlogVisitor(StrArray fromTo) {
	String heads="from\tto\tstats";
	String contents="";
	try {
		int iMax=fromTo.getRowSize();
		for (int i=1;i<iMax;i++) {
			String from=fromTo.get(i, "from");
			String to=fromTo.get(i, "to");
			contents+="\n"+from+"\t"+to;
			String stats="t\tip\tURI\treferer\tREACTION_GUEST";
			pstmtGetBlogVisitor.setTimestamp(1, Timestamp.valueOf(from));
			pstmtGetBlogVisitor.setTimestamp(2, Timestamp.valueOf(to));
			ResultSet rs=pstmtGetBlogVisitor.executeQuery();
			while (rs.next()) {
				stats+="\n"+rs.getString("t")+"\t"+rs.getString("ip")+"\t"+rs.getString("URI")+"\t"+rs.getString("referer")+"\t"+rs.getString("REACTION_GUEST");
			}
			contents+="\t"+StrArray.enclose(stats.trim());
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return heads+contents;
}
public boolean delBlogVisitor() {
	try {
		con.setAutoCommit(true);
		Calendar calendar=Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, -32); // Subtract 32 days from the current date
		pstmtDelBlogVisitor.setTimestamp(1, new Timestamp(calendar.getTimeInMillis()));
		return pstmtDelBlogVisitor.executeUpdate()>0;
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}

public boolean idExists(String id) {
	try {
		return findUserById(id).next();
	}
	catch (SQLException e) {
		err(e);
	}
	return false; // if error occurs.
}
public boolean idAvailable(String id) {
	try {
		return !(findUserById(id).next());
	}
	catch (SQLException e) {
		err(e);
	}
	return false; // if error occurs.
}
public boolean emailAvailable(String email) {
	try {
		return !(findUserByEmail(email).next());
	}
	catch (SQLException e) {
		err(e);
	}
	return false; // if error occurs.
}
public boolean createAuthToken(Timestamp tNow, String ip, byte[] token) {
	boolean done=false;
	try {
		con.setAutoCommit(true);
		pstmtCreateAuthToken.setTimestamp(1, tNow);
		pstmtCreateAuthToken.setString(2, ip);
		pstmtCreateAuthToken.setBytes(3, token);
		done=(pstmtCreateAuthToken.executeUpdate()>0);
	}
	catch (SQLException e) {
		err(e);
	}
	return done;
}
public boolean checkAuthToken(StrArray inputs, String ip, Timestamp tNow) {
	boolean done=false;
	String tToken=inputs.get(1, "tToken");
	System.out.println("tToken:"+tToken);
	String token=inputs.get(1, "authToken");
	System.out.println("token:"+token);
	String id=inputs.get(1, "userId");
	System.out.println("id:"+id);
	String email=inputs.get(1, "userEmail");
	System.out.println("email:"+email);
	try {
		con.setAutoCommit(false);
		pstmtCheckAuthToken.setTimestamp(1, Timestamp.valueOf(tToken));
		pstmtCheckAuthToken.setString(2, ip);
		ResultSet rs=pstmtCheckAuthToken.executeQuery();
		String errMsg="Sign-up error: ";
		if (rs.next()) {
			boolean newC=rs.getBoolean("new");
			boolean tokenC=Arrays.equals(rs.getBytes("token"), hexStrToBytes(token));
			boolean timeC=checkTimeDiff(tNow, tToken, 30);
			System.out.println("newC:"+newC+", tokenC:"+tokenC+", timeC:"+timeC);
			if (newC&&tokenC&&timeC) {
				pstmtUpdateAuthToken.setTimestamp(1, Timestamp.valueOf(tToken));
				pstmtUpdateAuthToken.setString(2, ip);
				logsCommit(1, tNow, ip, "tkn", true, "tToken: "+tToken);
				done=(pstmtUpdateAuthToken.executeUpdate()>0);
				con.commit();
				return done;
			}
			else {
				if (!newC) {
					errMsg+="used token";
				}
				errMsg+=", ";
				if (!tokenC) {
					errMsg+="wrong token";
				}
				errMsg+=", ";
				if (!timeC) {
					errMsg+="expired token";
				}
				errMsg+=".";
			}
		}
		else {
			errMsg+="no token.";
		}
		errMsg+=" ID: "+id+", E-mail: "+email+". tToken: "+tToken;
		System.out.println(errMsg);
		logsCommit(1, tNow, ip, "tkn", false, errMsg);
		con.commit();
	}
	catch (SQLException e) {
		err(e);
		try {
			con.rollback();
		}
		catch (SQLException e1) {
			err(e1);
		}
	}
	return done;
}

public boolean checkChangePwdToken(MultiMap params, Timestamp tNow) {
	try {
		ResultSet user=findUserById(params.get("id"));
		if (user.next()) {
			String from=user.getString("tChangePwd");
			System.out.println(tNow+"\t"+from);
			return from!=null
				&& checkTimeDiff(tNow, from, 10*60)
				&& Arrays.equals(hexStrToBytes(params.get("token")), user.getBytes("tokenChangePwd"));
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}
public boolean checkChangePwdToken(String id, String token, Timestamp tNow) {
	try {
		ResultSet user=findUserById(id);
		if (user.next()) {
			String from=user.getString("tChangePwd");
			System.out.println(tNow+"\t"+from);
			return from!=null
				&& checkTimeDiff(tNow, from, 10*60)
				&& Arrays.equals(hexStrToBytes(token), user.getBytes("tokenChangePwd"));
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}

private static MessageDigest sha512;
static {
	try {
		sha512=MessageDigest.getInstance("SHA-512");
	}
	catch (Exception e) {
		err(e);
	}
}
public static byte[] pwdEncrypt(byte[] salt, String pwd)
	throws Exception {
		// NoSuchAlgorithmException, UnsupportedEncodingException
	return sha512.digest((new String(salt, "UTF-8")+pwd).getBytes("UTF-8"));
}
public static byte[] sha512(String str)
	throws Exception {
	return sha512.digest(str.getBytes("UTF-8"));
}
public void updateEmailStat(String emailHost, int increment)
	throws SQLException {
	pstmtFindEmailStat.setString(1, emailHost);
	ResultSet rs=pstmtFindEmailStat.executeQuery();
	if (rs.next()) {
		long count=rs.getLong("count");
		rs.updateLong("count", count+increment);
		rs.updateRow();
	}
	else {
		pstmtCreateEmailStat.setString(1, emailHost);
		pstmtCreateEmailStat.executeUpdate();
	}
}
public String putPreGoogle(String dataStr, String ip, Timestamp tNow) {
	StrArray sa=new StrArray(dataStr);
	try {
		pstmtPutPreGoogle.setTimestamp(1, tNow);
		pstmtPutPreGoogle.setString(2, ip.split(":")[0]);
		pstmtPutPreGoogle.setString(3, sa.get(1, "state"));
		pstmtPutPreGoogle.setString(4, dataStr);
		pstmtPutPreGoogle.executeUpdate();
		return "IP and state are saved.";
	}
	catch (SQLException e) {
		err(e);
	}
	return "Not saved.";
}
public String getDataPreGoogle(String state, String ip) {
	try {
		pstmtGetPreGoogle.setString(1, ip.split(":")[0]);
		pstmtGetPreGoogle.setString(2, state);
		ResultSet rs=pstmtGetPreGoogle.executeQuery();
		if (rs.next()) {
			return rs.getString("data");
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return "/";
}
public boolean getPreGoogle(String state, String ip, Timestamp tNow) {
	try {
		pstmtGetPreGoogle.setString(1, ip.split(":")[0]);
		pstmtGetPreGoogle.setString(2, state);
		ResultSet rs=pstmtGetPreGoogle.executeQuery();
		if (rs.next()) {
			return tNow.before(new Timestamp(rs.getTimestamp("t").getTime()+300000L));
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}
public boolean createUserWithGoogle(StrArray preInputs, StrArray inputs, String ip, Timestamp tNow) {
	boolean done=false;
	String id=preInputs.get(1, "id");
	String email=inputs.get(1, "email");
	ResultSet user=null;
	String veriKey=bytesToHexString(randomBytes(32));
	try {
		con.setAutoCommit(false);
		pstmtCreateUser.setLong(1, getUserIndexToPut());
		pstmtCreateUser.setString(2, id);
		pstmtCreateUser.setString(3, email);
		pstmtCreateUser.setBytes(4, randomBytes(128));
		pstmtCreateUser.setBytes(5, randomBytes(64));
		pstmtCreateUser.setString(6, veriKey);
		pstmtCreateUser.setString(7, ip);
		pstmtCreateUser.setTimestamp(8, tNow);
		pstmtCreateUser.setTimestamp(9, tNow);
		if (pstmtCreateUser.executeUpdate()>0) {
			user=findUserById(id);
			if (user.next()) {
				Gmail.sendVeriKey(email, id, veriKey);
				updateUserClass(0, 1); // 0: Not verified yet
				updateEmailStat(email.substring(email.indexOf("@")+1), 1);
				logsCommit(user.getLong("i"), tNow, ip, "snu", true, "With Google :: ID: "+id+", E-mail: "+email); // sign-up
				done=true;
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	catch (Exception e) {
		System.out.println(e);
	}
	try {
		System.out.println("createUser done : "+done);
		if (done) {
			con.commit();
		}
		else {
			con.rollback();
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return done;
}
public boolean createUser(StrArray inputs, String ip, Timestamp tNow) {
	boolean done=false;
	String id=inputs.get(1, "userId");
	byte[] pwd_salt=hexStrToBytes( inputs.get(1, "authToken") );
	String pwd=inputs.get(1, "userPwd");
	String email=inputs.get(1, "userEmail");
	String veriKey=bytesToHexString(randomBytes(32));
	ResultSet user=null;
	try {
		con.setAutoCommit(false);
		pstmtCreateUser.setLong(1, getUserIndexToPut());
		pstmtCreateUser.setString(2, id);
		pstmtCreateUser.setString(3, email);
		pstmtCreateUser.setBytes(4, pwd_salt);
		pstmtCreateUser.setBytes(5, pwdEncrypt(pwd_salt, pwd));
		pstmtCreateUser.setString(6, veriKey);
		pstmtCreateUser.setString(7, ip);
		pstmtCreateUser.setTimestamp(8, tNow);
		pstmtCreateUser.setTimestamp(9, tNow);
		if (pstmtCreateUser.executeUpdate()>0) {
			user=findUserById(id);
			if (user.next()) {
				Gmail.sendVeriKey(email, id, veriKey);
				updateUserClass(0, 1); // 0: Not verified yet
				updateEmailStat(email.substring(email.indexOf("@")+1), 1);
				logsCommit(user.getLong("i"), tNow, ip, "snu", true, "ID: "+id+", E-mail: "+email); // sign-up
				done=true;
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	catch (Exception e) {
		System.out.println(e);
	}
	try {
		System.out.println("createUser done : "+done);
		if (done) {
			con.commit();
		}
		else {
			con.rollback();
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return done;
}
private boolean deleteUser(String userEmail) { // TODO: DELETE `User` after DELETE TABLES which references `User`.
	Timestamp tNow=Timestamp.valueOf(this.now());
	boolean done=false;
	ResultSet user=null;
	try {
		con.setAutoCommit(false);
		ResultSet rsUser=findUserByEmail(userEmail);
		if (rsUser.next()) {
			long user_me=rsUser.getLong("i");
			updateUserClass(rsUser.getInt("class"), -1);
			updateEmailStat(userEmail.substring(userEmail.indexOf("@")+1), -1);
			pstmtDeleteUserCatList.setLong(1, rsUser.getLong("i"));
			pstmtDeleteUserCatList.executeUpdate();
			PreparedStatement pstmtGetAllRecosUser=con.prepareStatement("SELECT * FROM `Recos1` WHERE `user_i`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			pstmtGetAllRecosUser.setLong(1, user_me);
			ResultSet rs=pstmtGetAllRecosUser.executeQuery();
			while (rs.next()) {
				String uri=rs.getString("uri");
				String title=rs.getString("title");
				String catsStr=rs.getString("cats");
				Categories cats=new Categories(catsStr);
				String desc=rs.getString("desc");
				Points pts=new Points(rs.getString("val"));
				updateDefCat(uri, cats, -1);
				updateDefTitle(uri, title, -1);
				updateDefDesc(uri, desc, -1);
				updateRecoStat(user_me, uri, pts, tNow, -1);
			}
			pstmtDelUserRemember.setLong(1, user_me);
			pstmtDelUserRemember.executeUpdate();
			pstmtDelUserSession1.setLong(1, user_me);
			pstmtDelUserSession1.executeUpdate();
			PreparedStatement pstmtDelLogInLogs=con.prepareStatement("DELETE FROM `LogInLogs` WHERE `user_i`=?;");
			pstmtDelLogInLogs.setLong(1, user_me);
			pstmtDelLogInLogs.executeUpdate();
			pstmtDeleteUser.setString(1, userEmail);
			done=pstmtDeleteUser.executeUpdate()>0;
		}
	}
	catch (SQLException e) {
		err(e);
	}
	catch (Exception e) {
		System.out.println(e);
	}
	try {
		System.out.println("User with email:"+userEmail+" is deleted successfully. : "+done);
		if (done) {
			con.commit();
		}
		else {
			con.rollback();
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return done;
}
public boolean changePwd(BodyData inputs, String ip, Timestamp tNow) {
	boolean done=false;
	String id=inputs.get("userId");
	String pwd=inputs.get("userPwd");
	ResultSet user=null;
	try {
		con.setAutoCommit(false);
		user=findUserById(id);
		if (user.next()) {
			byte[] pwd_salt=user.getBytes("pwd_salt");
			user.updateBytes("pwd", pwdEncrypt(pwd_salt, pwd));
			logsCommit(user.getLong("i"), tNow, ip, "cpw", true); // change password
			user.updateRow();
			done=true;
		}
	}
	catch (SQLException e) {
		err(e);
	}
	catch (Exception e) {
		System.out.println(e);
	}
	try {
		System.out.println("Change password done : "+done);
		if (done) {
			con.commit();
		}
		else {
			con.rollback();
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return done;
}
public boolean verifyUser(String cookieI, String id, String veriKey, String ip, Timestamp tNow) {
	boolean done=false;
	long user_me=Long.parseLong(cookieI, 16);
	try {
		con.setAutoCommit(false);
		ResultSet user=findUserByIndex(user_me);
		if ( user.next()
			&&user.getString("id").equals(id)
			&&user.getString("veriKey").equals(veriKey)
			&&user.getInt("class")==0
			&&checkTimeDiff(tNow, user.getString("tReg"), 24*60*60) ) {
			// IP check is needed???
			updateUserClass(0, -1); // 0: Not verified yet
			user.updateInt("class", 6);
			updateUserClass(6, 1); // 6: Initial
			updateUserClass(-2, 1); // -2: Total number of accounts
			String email=user.getString("email");
			user.updateString("veriKey", null);
			user.updateRow();
			logsCommit(user_me, tNow, ip, "vrf", true); // verified.
			done=true;
		}
	}
	catch (SQLException e) {
		err(e);
	}
	try {
		if (!done) {
			con.rollback();
			logsCommit(user_me, tNow, ip, "vrf", false); // not verified.
		}
		con.commit();
	}
	catch (SQLException e) {
		err(e);
	}
	return done;
}
public ResultSet findUserByIndex(long i) throws SQLException {
	pstmtFindUserByIndex.setLong(1, i);
	return pstmtFindUserByIndex.executeQuery();
}
public ResultSet findUserById(String id) throws SQLException {
	pstmtFindUserById.setString(1, id);
	return pstmtFindUserById.executeQuery();
}
public ResultSet findUserByEmail(String email) throws SQLException {
	pstmtFindUserByEmail.setString(1, email);
	return pstmtFindUserByEmail.executeQuery();
}
public String getPwdIteration(String idType, String id) { // idType	"id or email"
	boolean done=false;
	String result="";
	try {
		ResultSet user=null;
		if (idType.equals("id")) {
			user=findUserById(id);
		}
		else if (idType.equals("email")) {
			user=findUserByEmail(id);
		}
		if ( user!=null&&user.next() ) {
			result=Integer.toString( user.getInt("pwd_iteration") )
				+"\t"+bytesToHexString( user.getBytes("pwd_salt") );
			done=true;
			return result;
		}
		else {
			result="Cannot find a user from id/email.";
			return result;
		}
	}
	catch (SQLException e) {
		err(e);
	}
	result="SQL Exception.";
	return result;
}
public String getNewPwdSalt(String idType, String id) { // idType	"id or email"
	boolean done=false;
	String result="Wrong";
	try {
		con.setAutoCommit(false);
		ResultSet user=null;
		if (idType.equals("id")) {
			user=findUserById(id);
		}
		else if (idType.equals("email")) {
			user=findUserByEmail(id);
		}
		if ( user!=null&&user.next() ) {
			user.updateInt("pwd_iteration", Encrypt.iterFull-1);
			byte[] new_salt=randomBytes(128);
			user.updateBytes("pwd_salt", new_salt);
			System.out.println("pwd_salt is renewed. :: "+bytesToHexString(new_salt));
			user.updateRow();
			result=bytesToHexString(new_salt);
			con.commit();
			done=true;
			return result;
		}
		else {
			result="Cannot find a user from id/email.";
			con.rollback();
			return result;
		}
	}
	catch (SQLException e) {
		err(e);
		try {
			if (!done) {
				con.rollback();
			}
			else {
				con.commit();
			}
		}
		catch (SQLException e1) {
			err(e1);
			try {
				con.rollback();
			}
			catch (SQLException e2) {
				err(e2);
			}
		}
	}
	result="SQL Exception.";
	return result;
}
public static String encryptEmail(String email) {
	int i=email.indexOf("@");
	if (i!=-1) {
		return email.substring(0,(i>2?2:i))+"****"+email.substring(i);
	}
	return email;
}
public String forgotPwd(StrArray inputs, String lang, Timestamp tNow) {
	String idType=inputs.get(1, "idType");
	String id=inputs.get(1, "userId");
	try {
		ResultSet user=null;
		if (idType.equals("email")) {
			user=findUserByEmail(id);
		}
		else if (idType.equals("id")) {
			user=findUserById(id);
		}
		else {
			return "Invalid idType.";
		}
		if (user.next()) {
			id=user.getString("id");
			String email=user.getString("email");
			String from=user.getString("tChangePwd");
			if (from!=null&&checkTimeDiff(tNow, from, 10*60)) {
				return FileMap.replaceStr("[--pre already sended email to--] "+encryptEmail(email)+"[--post already sended email to--]", lang);
			}
			System.out.println("from=null or checkTimeDiff(tNow, from, 10*60)=false.");
			System.out.println("tNow:"+tNow);
			if (from!=null) {
				System.out.println("from:"+from);
				System.out.println("checkTimeDiff(tNow, from, 10*60):"+checkTimeDiff(tNow, from, 10*60));
			}
			user.updateTimestamp("tChangePwd", tNow);
			byte[] token=randomBytes(32);
			user.updateBytes("tokenChangePwd", token);
			Gmail.sendChangePwd(id, email, bytesToHexString(token), lang);
			user.updateRow();
			return FileMap.replaceStr("[--pre sended email to--] "+encryptEmail(email)+"[--post sended email to--]", lang);
		}
	}
	catch (SQLException e) {
		err(e);
	}
	catch (Exception e) {
		System.out.println(e);
	}
	return "Error occurred.";
}
public long getUserIndexToPut() throws SQLException {
	ResultSet rs=pstmtGetUserIndexToPut.executeQuery();
	if (rs.next()) {
		long indexToPut=rs.getLong("count");
		rs.updateLong("count", indexToPut+1);
		rs.updateRow();
		return indexToPut;
	}
	else {
		throw new SQLException("User index to put (class=-1) is not found.");
	}
}
public boolean updateUserClass(int classI, int increment) throws SQLException {
	pstmtUpdateUserClass.setInt(1, increment);
	pstmtUpdateUserClass.setInt(2, classI);
	return (pstmtUpdateUserClass.executeUpdate()>0);
}

public Map<String, String> varMapUserPage(Cookie cookie, String userId) {
	Map<String, String> varMap=new HashMap<String, String>();
	long my_i=-1;
	String myIndex="";
	if (cookie.get("rmbdI")!=null) {
		myIndex=cookie.get("rmbdI");
	}
	else if (cookie.get("I")!=null) {
		myIndex=cookie.get("I");
	}
	if (!myIndex.isEmpty()) {
		varMap.put("{--myIndex--}", myIndex);
		my_i=Long.parseLong(myIndex, 16);
		try {
			ResultSet user=findUserByIndex(my_i);
			if (user.next()) {
				varMap.put("{--myId--}", HTMLString.escapeOnlyTag(user.getString("id")));
				varMap.put("{--myCatList--}", HTMLString.escapeOnlyTag(getCatList(my_i).toString()));
			}
		}
		catch (SQLException e) {
			err(e);
		}
	}
	try {
		ResultSet user=findUserById(userId);
		if (user.next()) {
			long user_i=user.getLong("i");
			varMap.put("{--userIndex--}", Long.toString(user_i, 16));
			varMap.put("{--userId--}", HTMLString.escapeOnlyTag(user.getString("id")));
			varMap.put("{--catList--}", HTMLString.escapeOnlyTag(getCatList(user_i).toString()));
		}
	}
	catch (SQLException e) {
		err(e);
	}
	varMap.putIfAbsent("{--userIndex--}", "");
	varMap.putIfAbsent("{--userId--}", "");
	varMap.putIfAbsent("{--myIndex--}", "");
	varMap.putIfAbsent("{--myId--}", "");
	varMap.putIfAbsent("{--myCatList--}", "");
	varMap.putIfAbsent("{--catList--}", "");
	return varMap;
}
public Map<String, String> varMapMyPage(Cookie cookie) {
	Map<String, String> varMap=new HashMap<String, String>();
	String myIndex="";
	if (cookie.get("I")!=null) {
		myIndex=cookie.get("I");
	}
	else if (cookie.get("rmbdI")!=null) {
		myIndex=cookie.get("rmbdI");
	}
	if (!myIndex.isEmpty()) {
		varMap.put("{--myIndex--}", myIndex);
		varMap.put("{--userIndex--}", myIndex);
		long my_i=Long.parseLong(myIndex, 16);
		try {
			ResultSet user=findUserByIndex(my_i);
			if (user.next()) {
				varMap.put("{--myId--}", user.getString("id"));
				varMap.put("{--myCatList--}", HTMLString.escapeOnlyTag(getCatList(my_i).toString()));
				varMap.put("{--userId--}", varMap.get("{--myId--}"));
				varMap.put("{--catList--}", varMap.get("{--myCatList--}"));
			}
		}
		catch (SQLException e) {
			err(e);
		}
	}
	varMap.putIfAbsent("{--userIndex--}", "");
	varMap.putIfAbsent("{--userId--}", "");
	varMap.putIfAbsent("{--myIndex--}", "");
	varMap.putIfAbsent("{--myId--}", "");
	varMap.putIfAbsent("{--myCatList--}", "");
	varMap.putIfAbsent("{--catList--}", "");
	return varMap;
}
public String sessionIter(Cookie cookie, Timestamp tNow) {
	if (cookie.get("I")!=null) {
		long user_me=Long.parseLong(cookie.get("I"), 16);
		String tCreate=cookie.get("tCreate").replaceAll("_", " ");
		if (tCreate!=null) {
			if (checkTimeDiff(tNow, tCreate, hoursSSN*60*60)) {
				try {
					pstmtSession.setLong(1, user_me);
					pstmtSession.setTimestamp(2, Timestamp.valueOf(tCreate));
					ResultSet rs=pstmtSession.executeQuery();
					if (rs.next()) {
						return Integer.toString(rs.getInt("iter"));
					}
					return "No session.";
				}
				catch (SQLException e) {
					err(e);
				}
			}
			return "Expired.";
		}
		return "No tCreate.";
	}
	return "No user_i.";
}
public boolean sessionCheck(Cookie cookie, Timestamp tNow) {
	if (cookie.get("I")!=null) {
		long user_me=Long.parseLong(cookie.get("I"), 16);
		String tCreate=cookie.get("tCreate");
		if (tCreate!=null) {
			tCreate=tCreate.replaceAll("_", " ");
		}
		String session=cookie.get("SSN");
		if (tCreate!=null&&session!=null) {
			if (checkTimeDiff(tNow, tCreate, hoursSSN*60*60)) {
				try {
					con.setAutoCommit(true);
					pstmtSession.setLong(1, user_me);
					pstmtSession.setTimestamp(2, Timestamp.valueOf(tCreate));
					ResultSet rs=pstmtSession.executeQuery();
					if ( rs.next()
						&&Arrays.equals(rs.getBytes("encryptedSSN"), pwdEncrypt(rs.getBytes("salt"), Encrypt.encryptSSNRest(bytesToHexString(rs.getBytes("salt")), session, rs.getInt("iter")))) ) {
						rs.updateInt("iter", rs.getInt("iter")-1);
						rs.updateRow();
						return true;
					}
					// No log for sessionCheck. Too much.
				}
				catch (Exception e) {
					err(e);
				}
			}
		}
	}
	return false;
}
public List<io.vertx.core.http.Cookie> authUserWithGoogle(StrArray inputs, String ip, String userAgent, Timestamp tNow) {
	boolean done=false;
	long user_me=1; // anonymous
	List<io.vertx.core.http.Cookie> setCookie=null;
	try {
		con.setAutoCommit(false);
		ResultSet user=findUserByEmail(inputs.get(1, "email"));
		if (user!=null&&user.next()) {
			user_me=user.getLong("i");
			byte[] session=randomBytes(32);
			byte[] saltSSN=randomBytes(32);
			setCookie=createUserSession(user_me, tNow, session, saltSSN, ip, userAgent);
			byte[] rmbdAuth=randomBytes(32);
			byte[] rmbdToken=randomBytes(32);
			setCookie.addAll(createUserRemember(user_me, tNow, rmbdAuth, rmbdToken, inputs, ip, userAgent));
			logsCommit(user_me, tNow, ip, "lgi", true, "Remembered with Google"); // log-in success
			done=true;
		}
		else {
			StrArray data=new StrArray(getDataPreGoogle(inputs.get(1, "state"), ip));
			if (!data.get(1, "id").isEmpty()) {
				if (createUserWithGoogle(data, inputs, ip, tNow)) {
					user=findUserByEmail(inputs.get(1, "email"));
					if (user!=null&&user.next()) {
						user_me=user.getLong("i");
						byte[] session=randomBytes(32);
						byte[] saltSSN=randomBytes(32);
						setCookie=createUserSession(user_me, tNow, session, saltSSN, ip, userAgent);
						byte[] rmbdAuth=randomBytes(32);
						byte[] rmbdToken=randomBytes(32);
						setCookie.addAll(createUserRemember(user_me, tNow, rmbdAuth, rmbdToken, inputs, ip, userAgent));
						logsCommit(user_me, tNow, ip, "lgi", true, "Remembered with Google"); // log-in success
						done=true;
					}
					else {
						logsCommit(user_me, tNow, ip, "lgi", false, "User does not exist. Email:"+inputs.get(1, "email")); // log-in fail
						done=true;
					}
				}
			}
			else {
				done=false;
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	try {
		if (done) {
			con.commit();
		}
		else {
			con.rollback();
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return setCookie;
}
public List<io.vertx.core.http.Cookie> authUser(StrArray inputs, String ip, String userAgent, Timestamp tNow) {
	boolean done=false;
	long user_me=1; // anonymous
	List<io.vertx.core.http.Cookie> setCookie=null;
	try {
		con.setAutoCommit(false);
		ResultSet user=null;
		switch(inputs.get(1, "idType")) {
			case "id":
				user=findUserById(inputs.get(1, "userId"));
				break;
			case "email":
				user=findUserByEmail(inputs.get(1, "userId"));
				break;
		}
		if (user!=null&&user.next()) {
			user_me=user.getLong("i");
			byte[] salt=user.getBytes("pwd_salt");
			int iter=user.getInt("pwd_iteration");
			if ( Arrays.equals(
					pwdEncrypt(salt, Encrypt.encryptRest(bytesToHexString(salt), inputs.get(1, "userPwd"), iter))
					, user.getBytes("pwd")
				) ) {
				user.updateInt("pwd_iteration", iter-1);
				byte[] session=randomBytes(32);
				byte[] saltSSN=randomBytes(32);
				// int ssnC=user.getInt("ssnC");
				setCookie=createUserSession(user_me, tNow, session, saltSSN, ip, userAgent);
				// user.updateInt("ssnC", ssnC+1);
				String logDesc="Not remembered";
				String rmb=inputs.get(1, "rememberMe");
				if ( rmb!=null && rmb.equals("yes") ) {
					byte[] rmbdAuth=randomBytes(32);
					byte[] rmbdToken=randomBytes(32);
					// int rmbdC=user.getInt("rmbdC");
					setCookie.addAll(createUserRemember(user_me, tNow, rmbdAuth, rmbdToken, inputs, ip, userAgent));
					// user.updateInt("rmbdC", rmbdC+1);
					logDesc="Remembered";
				}
				user.updateRow();
				logsCommit(user_me, tNow, ip, "lgi", true, logDesc); // log-in success
			}
			else {
				System.out.println(bytesToHexString(pwdEncrypt(salt, Encrypt.encryptRest(bytesToHexString(salt), inputs.get(1, "userPwd"), iter))));
				System.out.println(bytesToHexString(user.getBytes("pwd")));
				logsCommit(user_me, tNow, ip, "lgi", false); // log-in fail
			}
		}
		else {
			logsCommit(user_me, tNow, ip, "lgi", false); // user_me=1: anonymous (no id/email) log-in try. This must not happen, because of "account/pwd_iteration" check before log-in request.
		}
		done=true;
	}
	catch (SQLException e) {
		err(e);
	}
	catch (Exception e) {
		System.out.println(e);
	}
	try {
		if (done) {
			con.commit();
		}
		else {
			con.rollback();
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return setCookie;
}
public List<io.vertx.core.http.Cookie> authUserFromRmbd(Cookie cookie, StrArray inputs, String ip, String userAgent, Timestamp tNow) {
	List<io.vertx.core.http.Cookie> setCookie=new ArrayList<>();
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdI", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdT", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdAuth", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	if (cookie.get("rmbdI")!=null) {
	long user_me=Long.parseLong(cookie.get("rmbdI"), 16);
	String rmbdT=cookie.get("rmbdT").replaceAll("_", " ");
	String rmbdAuth=cookie.get("rmbdAuth");
	String rmbdToken=cookie.get("rmbdToken");
	String log=inputs.get(1, "log");
	String sW=inputs.get(1, "sW");
	String sH=inputs.get(1, "sH");
	if( rmbdT!=null && rmbdAuth!=null && rmbdToken!=null && log!=null && sW!=null && sH!=null ) {
	try {
		con.setAutoCommit(false);
		pstmtCheckUserRemember.setLong(1, user_me);
		pstmtCheckUserRemember.setTimestamp(2, Timestamp.valueOf(rmbdT));
		ResultSet rs=pstmtCheckUserRemember.executeQuery();
		String errMsg="Error: ";
		if (rs.next()) {
			// TODO: ip check.
			if ( /*ip.startsWith(rs.getString("ip").split(":")[0])
				&&*/checkDateDiff(tNow, rmbdT, daysRMB)
				&&Arrays.equals(rs.getBytes("auth"), hexStrToBytes(rmbdAuth))
				&&Arrays.equals(rs.getBytes("token"), hexStrToBytes(rmbdToken))
				&&rs.getString("log").equals(log)
				&&rs.getInt("sW")==Integer.parseInt(sW)
				&&rs.getInt("sH")==Integer.parseInt(sH)
				&&rs.getString("userAgent").equals(userAgent) ) {
				byte[] session=randomBytes(32);
				byte[] token=randomBytes(32);
				ResultSet user=findUserByIndex(user_me);
				if (user!=null&&user.next()) {
					setCookie=createUserSession(user.getLong("i"), tNow, session, token, ip, userAgent);
					byte[] newToken=randomBytes(32);
					rs.updateTimestamp("tLast", tNow);
					rs.updateBytes("token", newToken);
					setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", bytesToHexString(newToken)).setSecure(true)
							.setPath("/account").setHttpOnly(true).setMaxAge(secondsRMBtoken));
					System.out.println("Remembered.");
					logsCommit(user_me, tNow, ip, "rmb", true);
					rs.updateRow();
					con.commit();
					return setCookie;
				}
			}
			else {
				// Failed: Delete rmbd cookie.
				if (!ip.startsWith(rs.getString("ip").split(":")[0])) {
					errMsg+="diff ip. "+rs.getString("ip")+" ";
				}
				if (!checkDateDiff(tNow, rmbdT, daysRMB)) {
					errMsg+="expired. ";
				}
				if (!Arrays.equals(rs.getBytes("auth"), hexStrToBytes(rmbdAuth))) {
					errMsg+="auth. ";
				}
				if (!Arrays.equals(rs.getBytes("token"), hexStrToBytes(rmbdToken))) {
					errMsg+="token. ";
				}
				if (!rs.getString("log").equals(log)) {
					errMsg+="log. ";
				}
				if ((rs.getInt("sW")!=Integer.parseInt(sW))) {
					errMsg+="sW. ";
				}
				if ((rs.getInt("sH")!=Integer.parseInt(sH))) {
					errMsg+="sH. ";
				}
				if (!rs.getString("userAgent").equals(userAgent)) {
					errMsg+="userAgent. ";
				}
			}
		}
		else {
			errMsg+="Not remembered.";
		}
		System.out.println(errMsg);
		logsCommit(user_me, tNow, ip, "rmb", false, errMsg);
		con.commit();
	}
	catch (SQLException e) {
		err(e);
		try {
			con.rollback();
		}
		catch (SQLException e2) {
			err(e2);
		}
	}}}
	return setCookie;
}
public List<io.vertx.core.http.Cookie> createUserSession(long user_me, Timestamp tNow, byte[] session, byte[] salt, String ip, String userAgent)
	throws SQLException {
	List<io.vertx.core.http.Cookie> setCookie=new ArrayList<>();
	try {
		pstmtCreateUserSession.setLong(1, user_me);
		pstmtCreateUserSession.setTimestamp(2, tNow);
		pstmtCreateUserSession.setBytes(3, pwdEncrypt(salt, Encrypt.encrypt(bytesToHexString(salt), bytesToHexString(session).substring(3, 11), Encrypt.iterSSNFull)));
		pstmtCreateUserSession.setBytes(4, salt);
		pstmtCreateUserSession.setString(5, ip);
		pstmtCreateUserSession.setString(6, userAgent);
		String now_=tNow.toString().replaceAll("\\s", "_");
		if (pstmtCreateUserSession.executeUpdate()>0) {
			setCookie.add(io.vertx.core.http.Cookie.cookie("I", Long.toString(user_me, 16)).setSecure(true)
					.setPath("/").setHttpOnly(true).setMaxAge(secondsSSN));
			setCookie.add(io.vertx.core.http.Cookie.cookie("tCreate", now_).setSecure(true)
					.setPath("/").setMaxAge(secondsSSN-30));
			// setCookie.add(io.vertx.core.http.Cookie.cookie("tCjs", now_).setSecure(true)
			// 		.setPath("/").setMaxAge(secondsSSN));
			setCookie.add(io.vertx.core.http.Cookie.cookie("session", bytesToHexString(session)).setSecure(true)
					.setPath("/").setMaxAge(secondsSSN));
			setCookie.add(io.vertx.core.http.Cookie.cookie("salt", bytesToHexString(salt)).setSecure(true)
					.setPath("/").setMaxAge(secondsSSN));
		}
	}
	catch (Exception e) {
		err(e);
	}
	return setCookie;
}
public List<io.vertx.core.http.Cookie> createUserRemember(long user_me, Timestamp tNow, byte[] rmbdAuth, byte[] rmbdToken, StrArray inputs, String ip, String userAgent)
	throws SQLException {
	pstmtCreateUserRemember.setLong(1, user_me);
	pstmtCreateUserRemember.setTimestamp(2, tNow);
	pstmtCreateUserRemember.setBytes(3, rmbdAuth);
	pstmtCreateUserRemember.setBytes(4, rmbdToken);
	pstmtCreateUserRemember.setString(5, inputs.get(1, "log"));
	pstmtCreateUserRemember.setInt(6, Integer.parseInt(inputs.get(1, "screenWidth")));
	pstmtCreateUserRemember.setInt(7, Integer.parseInt(inputs.get(1, "screenHeight")));
	pstmtCreateUserRemember.setString(8, ip);
	pstmtCreateUserRemember.setString(9, userAgent);
	String now_=tNow.toString().replaceAll("\\s", "_");
	List<io.vertx.core.http.Cookie> setCookie=new ArrayList<>();
	if (pstmtCreateUserRemember.executeUpdate()>0) {
		// user.updateInt("rmbdC", user.getInt("rmbdC")+1);
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdI", Long.toString(user_me, 16)).setSecure(true)
				.setPath("/").setMaxAge(secondsRMB));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdT", now_).setSecure(true)
				.setPath("/account").setHttpOnly(true).setMaxAge(secondsRMB));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdAuth", bytesToHexString(rmbdAuth)).setSecure(true)
				.setPath("/account").setHttpOnly(true).setMaxAge(secondsRMB));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", bytesToHexString(rmbdToken)).setSecure(true)
				.setPath("/account").setHttpOnly(true).setMaxAge(secondsRMBtoken));
	}
	else {
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdI", "").setSecure(true)
				.setPath("/").setMaxAge(-100L));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdT", "").setSecure(true)
				.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdAuth", "").setSecure(true)
				.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", "").setSecure(true)
				.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	}
	return setCookie;
}
public List<io.vertx.core.http.Cookie> logout(Cookie cookie, boolean sessionPassed) {
	if (cookie.get("I")!=null) {
		long user_me=Long.parseLong(cookie.get("I"), 16);
		String tCreate=cookie.get("tCreate").replaceAll("_", " ");
		if (tCreate!=null&&sessionPassed) {
			try {
				con.setAutoCommit(true);
				pstmtSession.setLong(1, user_me);
				pstmtSession.setTimestamp(2, Timestamp.valueOf(tCreate));
				ResultSet rs=pstmtSession.executeQuery();
				if (rs.next()) {
					rs.deleteRow();
				}
			}
			catch (SQLException e) {
				err(e);
			}
		}
	}
	if (cookie.get("rmbdI")!=null) {
		long user_me=Long.parseLong(cookie.get("rmbdI"), 16);
		String rmbdT=cookie.get("rmbdT").replaceAll("_", " ");
		if(rmbdT!=null&&sessionPassed) {
			try {
				con.setAutoCommit(true);
				pstmtCheckUserRemember.setLong(1, user_me);
				pstmtCheckUserRemember.setTimestamp(2, Timestamp.valueOf(rmbdT));
				ResultSet rs=pstmtCheckUserRemember.executeQuery();
				if (rs.next()) {
					rs.deleteRow();
				}
			}
			catch (SQLException e) {
				err(e);
			}
		}
	}
	List<io.vertx.core.http.Cookie> setCookie=new ArrayList<>();
	setCookie.add(io.vertx.core.http.Cookie.cookie("I", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("tCreate", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("SSN", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("salt", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("session", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdI", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdT", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdAuth", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	return setCookie;
}
public List<io.vertx.core.http.Cookie> logoutFromAll(Cookie cookie, boolean sessionPassed) {
	if (cookie.get("I")!=null) {
		long user_me=Long.parseLong(cookie.get("I"), 16);
		if (sessionPassed) {
			try {
				con.setAutoCommit(true);
				pstmtDelUserSession1.setLong(1, user_me);
				pstmtDelUserRemember.setLong(1, user_me);
				System.out.println("Session deleted: "+pstmtDelUserSession1.executeUpdate());
				System.out.println("Remember deleted: "+pstmtDelUserRemember.executeUpdate());
			}
			catch (SQLException e) {
				err(e);
			}
		}
	}
	List<io.vertx.core.http.Cookie> setCookie=new ArrayList<>();
	setCookie.add(io.vertx.core.http.Cookie.cookie("I", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("tCreate", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("SSN", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("salt", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("session", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdI", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdT", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdAuth", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	return setCookie;
}

public boolean logs(long user_me, Timestamp tNow, String ip, String log, boolean success) throws SQLException {
	return this.logs(user_me, tNow, ip, log, success, null);
}
public boolean logs(long user_me, Timestamp tNow, String ip, String log, boolean success, String desc)
	throws SQLException {
	pstmtLog.setLong(1, user_me);
	pstmtLog.setTimestamp(2, tNow);
	pstmtLog.setString(3, ip);
	pstmtLog.setString(4, log);
	pstmtLog.setBoolean(5, success);
	pstmtLog.setString(6, desc);
	return (pstmtLog.executeUpdate()>0);
}
public boolean logsCommit(long user_me, Timestamp tNow, String ip, String log, boolean success) {
	try {
		return logs(user_me, tNow, ip, log, success, null);
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}
public boolean logsCommit(long user_me, Timestamp tNow, String ip, String log, boolean success, String desc) {
	try {
		return logs(user_me, tNow, ip, log, success, desc);
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}

public String cutNeighbors(String user_id_from, long user_me, String toBeCut, Timestamp tNow) {
	try {
		con.setAutoCommit(false);
		ResultSet user=findUserById(user_id_from);
		if (user.next()&&user.getLong("i")==user_me) {
			StrArray sAToBeCut=new StrArray(toBeCut, false, true);
			String cat_from=sAToBeCut.get("cat_from", 1);
			List<String> user_tos=sAToBeCut.get("user_to");
			List<String> cat_tos=sAToBeCut.get("cat_to");
			int size=user_tos.size();
			if (size!=cat_tos.size()) {
				return "Size is different.";
			}
			StringBuilder sb=new StringBuilder(30*200);
			for (int i=1;i<size;i++) {
				sb.append(user_tos.get(i));
				sb.append("\t");
				sb.append(cat_tos.get(i));
				sb.append("\n");
			}
			ResultSet rSneighborListFrom=getRSNeighborListFrom(user_me, cat_from);
			if (rSneighborListFrom!=null) {
				rSneighborListFrom.updateString("userCatList", sb.toString());
				rSneighborListFrom.updateTimestamp("tUpdate", tNow);
				rSneighborListFrom.updateRow();
			}
			else {
				putNeighborListFrom(user_me, cat_from, new NeighborList(sb.toString()), tNow);
			}
			ResultSet rSneighborListTo=getRSNeighborListTo(user_me, cat_from);
			if (rSneighborListTo!=null) {
				rSneighborListTo.deleteRow();
			}
			con.commit();
			return "cut";
		}
	}
	catch (SQLException e) {
		err(e);
		try {
			con.rollback();
		}
		catch (SQLException e2) {
			err(e2);
		}
	}
	return "not";
}
public static final long DAY_IN_MS=1000L*60L*60L*24L;
public String getStrOfNeighbors(String user_id_from, String cat_from, Timestamp tNow) {
	String res="";
	try {
		con.setAutoCommit(false);
		ResultSet user=findUserById(user_id_from);
		if (user.next()) {
			long user_from=user.getLong("i");
			res="user_id\tuser_to\tcat_to\tsumSim\tnSim\ttUpdate\ttScanAll";
			NeighborList neighborListFrom=getNeighborListFrom(user_from, cat_from, true);
			System.out.println("neighborListFrom:\n"+neighborListFrom.toStringRowMap());
			NeighborList neighborListTo=getNeighborListTo(user_from, cat_from, true);
			System.out.println("neighborListTo:\n"+neighborListTo.toStringRowMap());
			NeighborList neighborList=new NeighborList(neighborListFrom.toStringRowMap()+neighborListTo.toStringRowMap(), false, true);
			int jSize=neighborList.getRowSize();
			for (int j=0;j<jSize;j++) {
				String user_to_str=neighborList.get(j, 0);
				String cat_to=neighborList.get(j, 1);
				if (!user_to_str.isEmpty()) {
					long user_to=Long.parseLong(user_to_str, 16);
					ResultSet neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
					boolean nbExists=false;
					if (neighbor.next()) {
						ResultSet rS_user_to=findUserByIndex(user_to);
						if (rS_user_to.next()&&neighbor.getLong("sumSim")!=0L) {
							res+="\n"+rS_user_to.getString("id")
								+"\t"+user_to_str
								+"\t"+cat_to
								+"\t"+Long.toString(neighbor.getLong("sumSim"), 16)
								+"\t"+Integer.toString(neighbor.getInt("nSim"), 16)
								+"\t"+neighbor.getString("tUpdate")
								+"\t"+neighbor.getString("tScanAll");
							nbExists=true;
						}
					}
					neighbor=getNeighbor(user_from, cat_from, user_to, cat_to);
					if (neighbor.next()) {
						ResultSet rS_user_to=findUserByIndex(user_to);
						if (rS_user_to.next()&&neighbor.getLong("sumSim")!=0L) {
							res+="\n"+rS_user_to.getString("id")
								+"\t"+Long.toString(user_to, 16)
								+"\t"+cat_to
								+"\t"+Long.toString(neighbor.getLong("sumSim"), 16)
								+"\t"+Integer.toString(neighbor.getInt("nSim"), 16)
								+"\t"+neighbor.getString("tUpdate")
								+"\t"+neighbor.getString("tScanAll");
							nbExists=true;
						}
					}
					if (!nbExists) {
						neighborList.mapArray.remove(user_to_str+"\t"+cat_to);
					}
				}
				else {
					neighborList.mapArray.remove(user_to_str+"\t"+cat_to);
				}
			}
			ResultSet rSneighborListFrom=getRSNeighborListFrom(user_from, cat_from);
			if (neighborList.mapArray.size()>0) {
				if (rSneighborListFrom==null) {
					putNeighborListFrom(user_from, cat_from, neighborList, tNow);
				}
				else {
					Timestamp tUpdate=rSneighborListFrom.getTimestamp("tUpdate");
					if (tNow.getTime()-tUpdate.getTime()>DAY_IN_MS) {
						neighborList.mapArray.forEach((k, aL) -> {
							try {
								ResultSet revRSneighborListFrom=getRSNeighborListFrom(Long.parseLong(aL.get(0), 16), aL.get(1));
								NeighborList revNeighborListFrom=null;
								if (revRSneighborListFrom!=null) {
									revNeighborListFrom=new NeighborList(revRSneighborListFrom.getString("userCatList"), false, true);
								}
								else {
									revNeighborListFrom=new NeighborList("", false, true);
								}
								if (revNeighborListFrom.mapArray.putIfAbsent(Long.toString(user_from, 16)+"\t"+cat_from, new ArrayList<String>(Arrays.asList(Long.toString(user_from, 16), cat_from)))==null) {
									if (revRSneighborListFrom!=null) {
										revRSneighborListFrom.updateString("userCatList", revNeighborListFrom.toStringRowMap());
										revRSneighborListFrom.updateTimestamp("tUpdate", tNow);
										revRSneighborListFrom.updateRow();
									}
									else {
										putNeighborListFrom(Long.parseLong(aL.get(0), 16), aL.get(1), revNeighborListFrom, tNow);
									}
								}
							}
							catch (SQLException e) {
								err(e);
							}
						});
						updateNeighborListFrom(user_from, cat_from, neighborList, tNow);
					}
					else {
						updateNeighborListFrom(user_from, cat_from, neighborList);
					}
				}
			}
			else {
				if (rSneighborListFrom!=null) {
					rSneighborListFrom.deleteRow();
				}
			}
			delNeighborListTo(user_from, cat_from);
		}
		con.commit();
	}
	catch (SQLException e) {
		err(e);
		try {
			con.rollback();
		}
		catch (SQLException e2) {
			err(e2);
		}
	}
	return res;
}
public String getRecoms(String user_id_from, String userCatList) {
	String res="";
	try {
		ResultSet user=findUserById(user_id_from);
		if (user.next()) {
			long user_from=user.getLong("i");
			NeighborList neighborList=new NeighborList(userCatList, false, false);
			res="user\tuser_id\turi\tcats\tval\tcmt\ttLast";
			int jSize=neighborList.getRowSize();
			for (int j=1;j<jSize;j++) {
				String neighborJStr=neighborList.get(j, 0);
				long neighborJ=Long.parseLong(neighborJStr, 16);
				ResultSet user_j=findUserByIndex(neighborJ);
				if (user_j.next()) {
					String user_id=user_j.getString("id");
					UriList uriList=getUriList(neighborJ, neighborList.get(j, 1));
					String[] uris=uriList.listOfURIs();
					for (int k=0;k<uris.length;k++) {
						String uri=uris[k];
						ResultSet reco_from=getReco(user_from, uri);
						if (!reco_from.next()) {
							ResultSet neighborReco=getReco(neighborJ, uri);
							if (neighborReco.next()) {
								res+="\n"+neighborJStr+"\t"+user_id+"\t"+StrArray.enclose(uri)+"\t"+StrArray.enclose(neighborReco.getString("cats"))+"\t"+neighborReco.getString("val")+"\t"+StrArray.enclose(neighborReco.getString("cmt"))+"\t"+neighborReco.getTimestamp("tLast").toString();
							}
						}
					}
				}
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public String getRecos(String user_id, StrArray uris) {
	String res="";
	try {
		ResultSet user=findUserById(user_id);
		if (user.next()) {
			long user_me=user.getLong("i");
			res+="uri\tcats\ttitle\tdesc\tcmt\tval\ttFirst\ttLast";
			int size=uris.getRowSize();
			for (int i=1;i<size;i++) {
				String uri=uris.get(i, "uri");
				ResultSet reco=getReco(user_me, uri);
				if (reco.next()) {
					res+="\n"+uri
						+"\t"+StrArray.enclose(reco.getString("cats"))
						+"\t"+StrArray.enclose(reco.getString("title"))
						+"\t"+StrArray.enclose(reco.getString("desc"))
						+"\t"+StrArray.enclose(reco.getString("cmt"))
						+"\t"+StrArray.enclose(reco.getString("val"))
						+"\t"+reco.getString("tFirst")
						+"\t"+reco.getString("tLast");
				}
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public ResultSet getReco(long user_me, String uri) throws SQLException {
	pstmtGetReco.setLong(1, user_me);
	pstmtGetReco.setString(2, uri);
	return pstmtGetReco.executeQuery();
}

// Ref answered by Wytze :: https://stackoverflow.com/questions/4485128/how-do-i-convert-long-to-byte-and-back-in-java
public static byte[] longToBytes(long l) {
	byte[] result=new byte[Long.BYTES];
	for (int i=Long.BYTES-1;i>=0;i--) {
		result[i]=(byte)(l&0xFF);
		l>>=Byte.SIZE;
	}
	return result;
}
public static long bytesToLong(final byte[] b) {
	long result=0;
	for (int i=0;i<Long.BYTES;i++) {
		result<<=Byte.SIZE;
		result|=(b[i]&0xFF);
	}
	return result;
}
public static long lastLongOfBytes(byte[] byteData) {
	if (byteData.length<8) {
		return 0L;
	}
	else {
		byte[] portion=new byte[8];
		System.arraycopy(byteData, byteData.length-8, portion, 0, 8);
		ByteBuffer buffer=ByteBuffer.wrap(portion);
		return buffer.getLong();
	}
}
private static long[] convertByteArrayToLongArray(byte[] byteData) {
	int N=byteData.length/Long.BYTES;
	int N_min=N>RECENTESTS_N?RECENTESTS_N:N;
	System.out.println("N_min:"+N_min);
	int byteLength=N_min*Long.BYTES;
	byte[] portion=new byte[byteLength];
	int offset=(N-N_min)*Long.BYTES;
	System.out.println("offset:"+offset);
	System.arraycopy(byteData, offset, portion, 0, portion.length);
	long[] longArray=new long[N_min];
	ByteBuffer buffer=ByteBuffer.wrap(portion);
	for (int i=0;i<N_min;i++) {
		longArray[i]=buffer.getLong();
	} // Recentest to the last index.
	return longArray;
}
// pstmtPutRecentests=con.prepareStatement("INSERT INTO `RecoStat` (`uri`, `recentests`, `tFirst`, `tUpdate`, `N`) VALUES (?, ?, ?, ?, 1);");
public boolean putRecoRecentests(String uri, long user_me, Timestamp tNow) {
	try {
		pstmtPutRecentests.setString(1, uri);
		pstmtPutRecentests.setBytes(2, longToBytes(user_me));
		pstmtPutRecentests.setTimestamp(3, tNow);
		pstmtPutRecentests.setTimestamp(4, tNow);
		return pstmtPutRecentests.executeUpdate()>0;
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}
public static final int N_MAX=8000;
public static final int N_PADDING=1600;
public static final int N_REMAIN=N_MAX-N_PADDING;
public ResultSet putAndGetRecoRecentests(String uri, long user_me, Timestamp tNow) throws SQLException {
	pstmtGetRecoStat.setString(1, uri);
	ResultSet rs=pstmtGetRecoStat.executeQuery();
	if (rs.next()) {
		boolean equalityOfRecentest=false;
		byte[] recentests=rs.getBytes("recentests");
		byte[] user_me_bytes=longToBytes(user_me);
		int rsL=0;
		try {
			if (recentests!=null) {
				rsL=recentests.length;
				if (rsL>=8) {
					equalityOfRecentest=Arrays.equals(Arrays.copyOfRange(recentests, rsL-8, rsL), user_me_bytes);
					if (equalityOfRecentest) {
						return rs;
					}
				}
				if (rsL>64000) {
					byte[] recentestsCut=new byte[8*201];
					int recentestsStart=rsL-8*200;
					for (int i=recentestsStart;i<rsL;i++) {
						recentestsCut[i-recentestsStart]=recentests[i];
					}
					int offset=rsL-recentestsStart;
					for (int i=0;i<8;i++) {
						recentestsCut[offset+i]=user_me_bytes[i];
					}
					rs.updateBytes("recentests", recentestsCut);
				}
				else {
					byte[] recentestsNew=Arrays.copyOf(recentests, rsL+8);
					int offset=rsL;
					for (int i=0;i<8;i++) {
						recentestsNew[offset+i]=user_me_bytes[i];
					}
					rs.updateBytes("recentests", recentestsNew);
				}
				rs.updateTimestamp("tUpdate", tNow);
				rs.updateRow();
			}
		}
		catch (SQLException e) {
			err(e);
		}
		return rs;
	}
	else {
		putRecoRecentests(uri, user_me, tNow);
		rs=pstmtGetRecoStat.executeQuery();
		if (rs.next()) {
			return rs;
		}
		throw new SQLException("No RecoStat on the uri.");
	}
}
public ResultSet getRecoStat(String uri) throws SQLException {
	pstmtGetRecoStat.setString(1, uri);
	ResultSet rs=pstmtGetRecoStat.executeQuery();
	if (rs.next()) {
		return rs;
	}
	throw new SQLException("No RecoStat on the uri.");
}
public String getFullRecoStat(String uri) {
	String heads="result";
	try {
		pstmtGetRecoStat.setString(1, uri);
		ResultSet rs=pstmtGetRecoStat.executeQuery();
		if (rs.next()) {
			heads+="\turi";
			String contents="o\t"+uri;
			String recentests="index\tid\tval\tcmt";
			Set<Long> recentestsSet=new HashSet<Long>(N_MAX);
			long[] recentestsArray=convertByteArrayToLongArray(rs.getBytes("recentests"));
			for (int i=recentestsArray.length-1;i>=0;i--) {
				long rI=recentestsArray[i];
				if (recentestsSet.add(rI)) {
					ResultSet user=findUserByIndex(rI);
					if (user.next()) {
						ResultSet reco=getReco(rI, uri);
						if (reco.next()) {
							recentests+="\n"+Long.toString(rI, 16)+"\t"+user.getString("id")+"\t"+reco.getString("val")+"\t"+StrArray.enclose(reco.getString("cmt"));
						}
					}
				}
			}
			heads+="\trecentests\ttFirst\ttUpdate\tsumV100\tnV";
			contents+="\t"+StrArray.enclose(recentests)+"\t"+rs.getString("tFirst")+"\t"+rs.getString("tUpdate")+"\t"+Long.toString(rs.getLong("sumV100"), 16)+"\t"+Long.toString(rs.getLong("nV"), 16);
			for (int i=0;i<=100;i++) {
				heads+="\tn"+i;
				contents+="\t"+Long.toString(rs.getLong("n"+i), 16);
			}
			return heads+"\n"+contents;
		}
	}
	catch (SQLException e) {
		err(e);
	}
	heads+="\nx";
	return heads;
}
public void updateRecoStat(long user_me, String uri, Points pts, Timestamp tNow, int increment) throws SQLException {
	ResultSet recoStat=null;
	if (increment>0) {
		recoStat=putAndGetRecoRecentests(uri, user_me, tNow);
	}
	else {
		recoStat=getRecoStat(uri);
	}
	recoStat.updateTimestamp("tUpdate", tNow);
	long nV=recoStat.getLong("nV");
	if (pts.valid()) {
		long val100=pts.val100();
		recoStat.updateLong("sumV100", recoStat.getLong("sumV100")+val100*increment);
		nV+=increment;
		recoStat.updateLong("nV", nV);
		String nVal100="n"+Long.toString(val100);
		recoStat.updateLong(nVal100, recoStat.getLong(nVal100)+increment);
	}
	else {
		recoStat.updateLong("nNull", recoStat.getLong("nNull")+increment);
	}
	recoStat.updateRow();
}
// INSERT INTO `Neighbors` (`user_i`, `cat_i`, `user_from`, `cat_from`, `sumSim`, `nSim`, `tUpdate`, `tScanAll`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
public boolean putNeighbor(long user_to, String cat_to, long user_from, String cat_from, long sumSim, int nSim, Timestamp tNow, Timestamp tScanAll) throws SQLException {
	pstmtPutNeighbor.setLong(1, user_to);
	pstmtPutNeighbor.setString(2, cat_to);
	pstmtPutNeighbor.setLong(3, user_from);
	pstmtPutNeighbor.setString(4, cat_from);
	pstmtPutNeighbor.setLong(5, sumSim);
	pstmtPutNeighbor.setInt(6, nSim);
	pstmtPutNeighbor.setTimestamp(7, tNow);
	pstmtPutNeighbor.setTimestamp(8, tScanAll);
	return pstmtPutNeighbor.executeUpdate()==1;
}
public boolean putNeighbor(long user_to, String cat_to, long user_from, String cat_from, long sumSim, int nSim, Timestamp tNow) throws SQLException {
	pstmtPutNeighbor.setLong(1, user_to);
	pstmtPutNeighbor.setString(2, cat_to);
	pstmtPutNeighbor.setLong(3, user_from);
	pstmtPutNeighbor.setString(4, cat_from);
	pstmtPutNeighbor.setLong(5, sumSim);
	pstmtPutNeighbor.setInt(6, nSim);
	pstmtPutNeighbor.setTimestamp(7, tNow);
	pstmtPutNeighbor.setTimestamp(8, tNow);
	return pstmtPutNeighbor.executeUpdate()==1;
}
public ResultSet getNeighbor(long user_to, String cat_to, long user_from, String cat_from) throws SQLException {
	pstmtGetNeighbor.setLong(1, user_to);
	pstmtGetNeighbor.setString(2, cat_to);
	pstmtGetNeighbor.setLong(3, user_from);
	pstmtGetNeighbor.setString(4, cat_from);
	return pstmtGetNeighbor.executeQuery();
}
public boolean delNeighbor(long user_to, String cat_to, long user_from, String cat_from) throws SQLException {
	pstmtDelNeighbor.setLong(1, user_to);
	pstmtDelNeighbor.setString(2, cat_to);
	pstmtDelNeighbor.setLong(3, user_from);
	pstmtDelNeighbor.setString(4, cat_from);
	return pstmtDelNeighbor.executeUpdate()>0;
}
public boolean putNeighborListFrom(long user_from, String cat_from, NeighborList userCatList, Timestamp tNow) throws SQLException {
	pstmtPutNeighborListFrom.setLong(1, user_from);
	pstmtPutNeighborListFrom.setString(2, cat_from);
	pstmtPutNeighborListFrom.setString(3, userCatList.toStringRowMap());
	pstmtPutNeighborListFrom.setTimestamp(4, tNow);
	return pstmtPutNeighborListFrom.executeUpdate()==1;
}
public NeighborList getNeighborListFrom(long user_from, String cat_from) throws SQLException {
	pstmtGetNeighborListFrom.setLong(1, user_from);
	pstmtGetNeighborListFrom.setString(2, cat_from);
	ResultSet rs=pstmtGetNeighborListFrom.executeQuery();
	if (rs.next()) {
		return new NeighborList(rs.getString("userCatList"), false, true);
	}
	return new NeighborList("", false, true);
}
public NeighborList getNeighborListFrom(long user_from, String cat_from, boolean rowMap) throws SQLException {
	pstmtGetNeighborListFrom.setLong(1, user_from);
	pstmtGetNeighborListFrom.setString(2, cat_from);
	ResultSet rs=pstmtGetNeighborListFrom.executeQuery();
	if (rs.next()) {
		return new NeighborList(rs.getString("userCatList"), false, rowMap);
	}
	return new NeighborList("", false, rowMap);
}
public ResultSet getRSNeighborListFrom(long user_from, String cat_from) throws SQLException {
	pstmtGetNeighborListFrom.setLong(1, user_from);
	pstmtGetNeighborListFrom.setString(2, cat_from);
	ResultSet rs=pstmtGetNeighborListFrom.executeQuery();
	if (rs.next()) {
		return rs;
	}
	return null;
}
public boolean updateNeighborListFrom(long user_from, String cat_from, NeighborList userCatList) throws SQLException {
	pstmtUpdateNeighborListFrom0.setString(1, userCatList.toStringRowMap());
	pstmtUpdateNeighborListFrom0.setLong(2, user_from);
	pstmtUpdateNeighborListFrom0.setString(3, cat_from);
	return pstmtUpdateNeighborListFrom0.executeUpdate()>0;
}
public boolean updateNeighborListFrom(long user_from, String cat_from, NeighborList userCatList, Timestamp tNow) throws SQLException {
	pstmtUpdateNeighborListFrom.setString(1, userCatList.toStringRowMap());
	pstmtUpdateNeighborListFrom.setTimestamp(2, tNow);
	pstmtUpdateNeighborListFrom.setLong(3, user_from);
	pstmtUpdateNeighborListFrom.setString(4, cat_from);
	return pstmtUpdateNeighborListFrom.executeUpdate()>0;
}
public boolean delNeighborListTo(long user_to, String cat_to) throws SQLException {
	pstmtDelNeighborListTo.setLong(1, user_to);
	pstmtDelNeighborListTo.setString(2, cat_to);
	return pstmtDelNeighborListTo.executeUpdate()>0;
}
public boolean putNeighborListTo(long user_to, String cat_to, NeighborList userCatList, Timestamp tNow) throws SQLException {
	pstmtPutNeighborListTo.setLong(1, user_to);
	pstmtPutNeighborListTo.setString(2, cat_to);
	pstmtPutNeighborListTo.setString(3, userCatList.toStringRowMap());
	pstmtPutNeighborListTo.setTimestamp(4, tNow);
	return pstmtPutNeighborListTo.executeUpdate()==1;
}
public NeighborList getNeighborListTo(long user_to, String cat_to) throws SQLException {
	pstmtGetNeighborListTo.setLong(1, user_to);
	pstmtGetNeighborListTo.setString(2, cat_to);
	ResultSet rs=pstmtGetNeighborListTo.executeQuery();
	if (rs.next()) {
		return new NeighborList(rs.getString("userCatList"), false, true);
	}
	return new NeighborList("", false, true);
}
public NeighborList getNeighborListTo(long user_to, String cat_to, boolean rowMap) throws SQLException {
	pstmtGetNeighborListTo.setLong(1, user_to);
	pstmtGetNeighborListTo.setString(2, cat_to);
	ResultSet rs=pstmtGetNeighborListTo.executeQuery();
	if (rs.next()) {
		return new NeighborList(rs.getString("userCatList"), false, rowMap);
	}
	return new NeighborList("", false, rowMap);
}
public ResultSet getRSNeighborListTo(long user_to, String cat_to) throws SQLException {
	pstmtGetNeighborListTo.setLong(1, user_to);
	pstmtGetNeighborListTo.setString(2, cat_to);
	ResultSet rs=pstmtGetNeighborListTo.executeQuery();
	if (rs.next()) {
		return rs;
	}
	return null;
}
public boolean updateNeighborListTo(long user_to, String cat_to, NeighborList userCatList, Timestamp tNow) throws SQLException {
	pstmtUpdateNeighborListTo.setString(1, userCatList.toStringRowMap());
	pstmtUpdateNeighborListTo.setTimestamp(2, tNow);
	pstmtUpdateNeighborListTo.setLong(3, user_to);
	pstmtUpdateNeighborListTo.setString(4, cat_to);
	return pstmtUpdateNeighborListTo.executeUpdate()>0;
}
public long[] getRecentests(String uri) throws SQLException {
	ResultSet rs=getRecoStat(uri);
	if (rs!=null) {
		byte[] recentests=rs.getBytes("recentests");
		return convertByteArrayToLongArray(recentests);
	}
	return new long[0];
}
public void putNeighborWithScanAll(long user_to, String cat_to, long user_from, String cat_from, Timestamp tNow) throws SQLException {
	ResultSet neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
	if (neighbor.next()) {
		delNeighbor(user_to, cat_to, user_from, cat_from);
		delNeighbor(user_from, cat_from, user_to, cat_to);
	}

	UriList uriList_from=getUriList(user_from, cat_from);
	Set<String> uriListSet_from=uriList_from.setOfURIs();
	UriList uriList_to=getUriList(user_to, cat_to);
	Set<String> uriListSet_to=uriList_to.setOfURIs();
	Similarity sim=new Similarity();
	if (uriListSet_from.size()<uriListSet_to.size()) { // 좀 더 작은 uriListSet 으로부터 matching calculation.
		for (String uri_from: uriListSet_from) {
		if (uriListSet_to.contains(uri_from)) {
			ResultSet reco_from=getReco(user_from, uri_from);
			if (reco_from.next()) {
				Points pts_from=new Points(reco_from.getString("val"));
				if (pts_from.valid()) {
					ResultSet reco_to_corresponding=getReco(user_to, uri_from);
					if (reco_to_corresponding.next()) {
						Points pts_to_corresponding=new Points(reco_to_corresponding.getString("val"));
						if (pts_to_corresponding.valid()) {
							sim.simpleAdd(Similarity.sim(pts_to_corresponding, pts_from));
						}
					}
				}
			}
		}}
	}
	else { // 좀 더 작은 uriListSet 으로부터 matching calculation.
		for (String uri_to: uriListSet_to) {
		if (uriListSet_from.contains(uri_to)) {
			ResultSet reco_to=getReco(user_to, uri_to);
			if (reco_to.next()) {
				Points pts_to=new Points(reco_to.getString("val"));
				if (pts_to.valid()) {
					ResultSet reco_from_corresponding=getReco(user_from, uri_to);
					if (reco_from_corresponding.next()) {
						Points pts_from_corresponding=new Points(reco_from_corresponding.getString("val"));
						if (pts_from_corresponding.valid()) {
							sim.simpleAdd(Similarity.sim(pts_to, pts_from_corresponding));
						}
					}
				}
			}
		}}
	}
	putNeighbor(user_to, cat_to, user_from, cat_from, sim.sumSim, sim.nSim, tNow);
	putNeighbor(user_from, cat_from, user_to, cat_to, sim.sumSim, sim.nSim, tNow);
}
public static final int RECENTESTS_N=200;
public static final int N_SET=400;
public static final int N_CUT_NEIGHBOR=200;
public static final long HALF_YEAR_IN_MS=1000L*60L*60L*24L*61L*3L;
public void updateNeighbors(long user_from, String uri, Categories cats, Points pts, CatList catL, Timestamp tNow, int increment) throws SQLException {
	if (pts.valid()) {
		System.out.println("increment:"+increment);
		if (increment==1) {
			// Update existing neighbors and recentests.
			long[] recentests=getRecentests(uri); // recentests upto RECENTESTS_N (200).
			Set<Long> recentestsSet=new HashSet<>(N_SET);
			for (int i=0;i<recentests.length;i++) {
				recentestsSet.add(recentests[i]);
			}
			System.out.println("recentestsSet:");
			for (long recoer: recentestsSet) {
				ResultSet user=findUserByIndex(recoer);
				if (user.next()) {
					System.out.println(user.getString("id"));
				}
			}
			recentestsSet.remove(user_from); // remove myself.
			for (String cat_from: cats.setOfCats) {
				System.out.println("cat_from:"+cat_from);
				NeighborList neighborListFrom=getNeighborListFrom(user_from, cat_from, true);
				System.out.println("neighborListFrom:\n"+neighborListFrom.toStringRowMap());
				NeighborList neighborListTo=getNeighborListTo(user_from, cat_from, true);
				System.out.println("neighborListTo:\n"+neighborListTo.toStringRowMap());
				NeighborList neighborList=new NeighborList(neighborListFrom.toStringRowMap()+neighborListTo.toStringRowMap(), false, true);
				int n=neighborList.getRowSize();
				for (int i=0;i<n;i++) { // 이미 계산된 neighborList 에서 1개 new URI update 하기.
				if (neighborList.mapArray.remove(neighborList.get(i, 0)+"\t"+neighborList.get(i, 1))!=null) {
					long user_to=Long.parseLong(neighborList.get(i, 0), 16);
					recentestsSet.remove(user_to); // recentestsSet 에서 제거.
					String cat_to=neighborList.get(i, 1);
					ResultSet neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
					boolean nbExists=neighbor.next();
					Timestamp nbTScanAll=OLD;
					if (nbExists) {
						nbTScanAll=neighbor.getTimestamp("tScanAll");
					}
					ResultSet neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
					boolean nbRevExists=neighborRev.next();
					Timestamp nbRevTScanAll=OLD;
					if (nbRevExists) {
						nbRevTScanAll=neighborRev.getTimestamp("tScanAll");
					}
					ResultSet reco_to=getReco(user_to, uri);
					if (reco_to.next()) {
						Points pts_to=new Points(reco_to.getString("val"));
						if (pts_to.valid()) {
							Categories cats_to=new Categories(reco_to.getString("cats"));
							if (cats_to.contains(cat_to)) {
								if (nbExists&&nbRevExists) {
									if (nbTScanAll.after(nbRevTScanAll)) { // neighbor 가 더 최신.
										if (tNow.getTime()-nbTScanAll.getTime()>HALF_YEAR_IN_MS) { // 최신 tScanAll 이 6개월이 지났을 때.
											putNeighborWithScanAll(user_to, cat_to, user_from, cat_from, tNow);
										}
										else {
											neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
											neighbor.next();
											Similarity sim=new Similarity(neighbor.getLong("sumSim"), neighbor.getInt("nSim"));
											sim.simpleAdd(Similarity.sim(pts, pts_to));
											neighbor.updateLong("sumSim", sim.sumSim);
											neighbor.updateInt("nSim", sim.nSim);
											neighbor.updateTimestamp("tUpdate", tNow);
											Timestamp tScanAll=neighbor.getTimestamp("tScanAll");
											neighbor.updateRow();
											neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
											neighborRev.next();
											neighborRev.updateLong("sumSim", sim.sumSim);
											neighborRev.updateInt("nSim", sim.nSim);
											neighborRev.updateTimestamp("tUpdate", tNow);
											neighborRev.updateTimestamp("tScanAll", tScanAll);
											neighborRev.updateRow();
										}
									}
									else { // neighborRev 가 더 최신.
										if (tNow.getTime()-nbRevTScanAll.getTime()>HALF_YEAR_IN_MS) { // 최신 tScanAll 이 6개월이 지났을 때.
											putNeighborWithScanAll(user_to, cat_to, user_from, cat_from, tNow);
										}
										else {
											neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
											neighborRev.next();
											Similarity sim=new Similarity(neighborRev.getLong("sumSim"), neighborRev.getInt("nSim"));
											sim.simpleAdd(Similarity.sim(pts, pts_to));
											neighborRev.updateLong("sumSim", sim.sumSim);
											neighborRev.updateInt("nSim", sim.nSim);
											neighborRev.updateTimestamp("tUpdate", tNow);
											Timestamp tScanAll=neighborRev.getTimestamp("tScanAll");
											neighborRev.updateRow();
											neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
											neighbor.next();
											neighbor.updateLong("sumSim", sim.sumSim);
											neighbor.updateInt("nSim", sim.nSim);
											neighbor.updateTimestamp("tUpdate", tNow);
											neighbor.updateTimestamp("tScanAll", tScanAll);
											neighbor.updateRow();
										}
									}
								}
								else if (nbExists) {
									if (tNow.getTime()-nbTScanAll.getTime()>HALF_YEAR_IN_MS) { // 최신 tScanAll 이 6개월이 지났을 때.
										putNeighborWithScanAll(user_to, cat_to, user_from, cat_from, tNow);
									}
									else {
										neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
										neighbor.next();
										Similarity sim=new Similarity(neighbor.getLong("sumSim"), neighbor.getInt("nSim"));
										sim.simpleAdd(Similarity.sim(pts, pts_to));
										neighbor.updateLong("sumSim", sim.sumSim);
										neighbor.updateInt("nSim", sim.nSim);
										neighbor.updateTimestamp("tUpdate", tNow);
										Timestamp tScanAll=neighbor.getTimestamp("tScanAll");
										neighbor.updateRow();
										putNeighbor(user_from, cat_from, user_to, cat_to, sim.sumSim, sim.nSim, tNow, tScanAll);
									}
								}
								else if (nbRevExists) {
									if (tNow.getTime()-nbRevTScanAll.getTime()>HALF_YEAR_IN_MS) { // 최신 tScanAll 이 6개월이 지났을 때.
										putNeighborWithScanAll(user_to, cat_to, user_from, cat_from, tNow);
									}
									else {
										neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
										neighborRev.next();
										Similarity sim=new Similarity(neighborRev.getLong("sumSim"), neighborRev.getInt("nSim"));
										sim.simpleAdd(Similarity.sim(pts, pts_to));
										neighborRev.updateLong("sumSim", sim.sumSim);
										neighborRev.updateInt("nSim", sim.nSim);
										neighborRev.updateTimestamp("tUpdate", tNow);
										Timestamp tScanAll=neighborRev.getTimestamp("tScanAll");
										neighborRev.updateRow();
										putNeighbor(user_to, cat_to, user_from, cat_from, sim.sumSim, sim.nSim, tNow, tScanAll);
									}
								}
								else { // ScanAll
									putNeighborWithScanAll(user_to, cat_to, user_from, cat_from, tNow);
								}
							}
						}
					}
				} // 이미 계산된 neighborList 에서 1개 new URI update 하기.
			}}
			System.out.println("recentestsSet.size():"+recentestsSet.size());
			for (String cat_from: cats.setOfCats) {
				NeighborList neighborListFrom=getNeighborListFrom(user_from, cat_from);
				ResultSet rSneighborListFrom=getRSNeighborListFrom(user_from, cat_from);
				for (Long user_to: recentestsSet) { // 새로운 recentestsSet 에서 new neighbor 추가하기.
					ResultSet reco_to=getReco(user_to, uri);
					if (reco_to.next()) {
						Points pts_to=new Points(reco_to.getString("val"));
						if (pts_to.valid()) {
							Categories cats_to=new Categories(reco_to.getString("cats"));
							for (String cat_to: cats_to.setOfCats) {
								putNeighborWithScanAll(user_to, cat_to, user_from, cat_from, tNow);
								neighborListFrom.mapArray.putIfAbsent(Long.toString(user_to, 16)+"\t"+cat_to, new ArrayList<String>(Arrays.asList(Long.toString(user_to, 16), cat_to)));
								NeighborList neighborListTo=getNeighborListTo(user_to, cat_to);
								ResultSet rSneighborListTo=getRSNeighborListTo(user_to, cat_to);
								neighborListTo.mapArray.putIfAbsent(Long.toString(user_from, 16)+"\t"+cat_from, new ArrayList<String>(Arrays.asList(Long.toString(user_from, 16), cat_from)));
								if (rSneighborListTo==null) {
									putNeighborListTo(user_to, cat_to, neighborListTo, tNow);
								}
								else {
									rSneighborListTo.updateString("userCatList", neighborListTo.toStringRowMap());
									rSneighborListTo.updateTimestamp("tUpdate", tNow);
									rSneighborListTo.updateInt("nUpdate", rSneighborListTo.getInt("nUpdate")+1);
									rSneighborListTo.updateRow();
								}
							}
						}
					}
				}
				if (rSneighborListFrom==null) {
					System.out.println("neighborListFrom.toString() (null)\n"+neighborListFrom.toStringRowMap());
					putNeighborListFrom(user_from, cat_from, neighborListFrom, tNow);
				}
				else {
					System.out.println("neighborListFrom.toString()\n"+neighborListFrom.toStringRowMap());
					rSneighborListFrom.updateString("userCatList", neighborListFrom.toStringRowMap());
					rSneighborListFrom.updateTimestamp("tUpdate", tNow);
					rSneighborListFrom.updateInt("nUpdate", rSneighborListFrom.getInt("nUpdate")+1);
					rSneighborListFrom.updateRow();
				}
			}
		}
		else if (increment==-1) {
			Set<Long> userSet=new HashSet<>(10*N_SET);
			for (String cat_from: cats.setOfCats) {
				System.out.println("cat_from:"+cat_from);
				NeighborList neighborListFrom=getNeighborListFrom(user_from, cat_from, false);
				System.out.println("neighborListFrom:\n"+neighborListFrom);
				int n=neighborListFrom.getRowSize();
				for(int i=0;i<n;i++) {
					userSet.add(Long.parseLong(neighborListFrom.get(i, 0), 16));
				}
				NeighborList neighborListTo=getNeighborListTo(user_from, cat_from, false);
				System.out.println("neighborListTo:\n"+neighborListTo);
				n=neighborListTo.getRowSize();
				for(int i=0;i<n;i++) {
					userSet.add(Long.parseLong(neighborListTo.get(i, 0), 16));
				}
			}
			for (long user_to: userSet) { // neighborListFrom 과 neighborListTo 로부터...
				ResultSet reco_to=getReco(user_to, uri);
				if (reco_to.next()) {
					Points pts_to=new Points(reco_to.getString("val"));
					if (pts_to.valid()) {
						Categories cats_to=new Categories(reco_to.getString("cats"));
						for (String cat_to: cats_to.setOfCats) {
							for (String cat_from: cats.setOfCats) {
								NeighborList neighborListFrom=getNeighborListFrom(user_from, cat_from);
								NeighborList neighborListTo=getNeighborListTo(user_from, cat_from);
								ResultSet neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
								boolean nbExists=neighbor.next();
								Timestamp nbTScanAll=OLD;
								if (nbExists) {
									nbTScanAll=neighbor.getTimestamp("tScanAll");
								}
								boolean nbRemoved=false;
								ResultSet neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
								boolean nbRevExists=neighborRev.next();
								Timestamp nbRevTScanAll=OLD;
								if (nbRevExists) {
									nbRevTScanAll=neighborRev.getTimestamp("tScanAll");
								}
								boolean nbRevRemoved=false;
								if (nbExists&&nbRevExists) {
									if (nbTScanAll.after(nbRevTScanAll)) { // neighbor 가 더 최신.
										neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
										neighbor.next();
										Similarity sim=new Similarity(neighbor.getLong("sumSim"), neighbor.getInt("nSim"));
										sim.remove(Similarity.sim(pts, pts_to));
										Timestamp tScanAll=neighbor.getTimestamp("tScanAll");
										if (sim.nSim==0) {
											nbRemoved=true;
											neighbor.deleteRow();
										}
										else {
											neighbor.updateLong("sumSim", sim.sumSim);
											neighbor.updateInt("nSim", sim.nSim);
											neighbor.updateTimestamp("tUpdate", tNow);
											neighbor.updateRow();
										}
										neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
										neighborRev.next();
										if (sim.nSim==0) {
											nbRevRemoved=true;
											neighborRev.deleteRow();
										}
										else {
											neighborRev.updateLong("sumSim", sim.sumSim);
											neighborRev.updateInt("nSim", sim.nSim);
											neighborRev.updateTimestamp("tUpdate", tNow);
											neighborRev.updateTimestamp("tScanAll", tScanAll);
											neighborRev.updateRow();
										}
									}
									else { // neighborRev 가 더 최신.
										neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
										neighborRev.next();
										Similarity sim=new Similarity(neighborRev.getLong("sumSim"), neighborRev.getInt("nSim"));
										sim.remove(Similarity.sim(pts, pts_to));
										Timestamp tScanAll=neighborRev.getTimestamp("tScanAll");
										if (sim.nSim==0) {
											neighborRev.updateLong("sumSim", sim.sumSim);
											neighborRev.updateInt("nSim", sim.nSim);
											neighborRev.updateTimestamp("tUpdate", tNow);
											nbRevRemoved=true;
											neighborRev.deleteRow();
										}
										else {
											neighborRev.updateRow();
										}
										neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
										neighbor.next();
										if (sim.nSim==0) {
											nbRemoved=true;
											neighbor.deleteRow();
										}
										else {
											neighbor.updateLong("sumSim", sim.sumSim);
											neighbor.updateInt("nSim", sim.nSim);
											neighbor.updateTimestamp("tUpdate", tNow);
											neighbor.updateTimestamp("tScanAll", tScanAll);
											neighbor.updateRow();
										}
									}
								}
								else if (nbExists) {
									neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
									neighbor.next();
									Similarity sim=new Similarity(neighbor.getLong("sumSim"), neighbor.getInt("nSim"));
									sim.remove(Similarity.sim(pts, pts_to));
									Timestamp tScanAll=neighbor.getTimestamp("tScanAll");
									if (sim.nSim==0) {
										nbRemoved=true;
										neighbor.deleteRow();
									}
									else {
										neighbor.updateLong("sumSim", sim.sumSim);
										neighbor.updateInt("nSim", sim.nSim);
										neighbor.updateTimestamp("tUpdate", tNow);
										neighbor.updateRow();
										putNeighbor(user_from, cat_from, user_to, cat_to, sim.sumSim, sim.nSim, tNow, tScanAll);
									}
								}
								else if (nbRevExists) {
									neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
									neighborRev.next();
									Similarity sim=new Similarity(neighborRev.getLong("sumSim"), neighborRev.getInt("nSim"));
									sim.remove(Similarity.sim(pts, pts_to));
									Timestamp tScanAll=neighborRev.getTimestamp("tScanAll");
									if (sim.nSim==0) {
										nbRevRemoved=true;
										neighborRev.deleteRow();
									}
									else {
										neighborRev.updateLong("sumSim", sim.sumSim);
										neighborRev.updateInt("nSim", sim.nSim);
										neighborRev.updateTimestamp("tUpdate", tNow);
										neighborRev.updateRow();
										putNeighbor(user_to, cat_to, user_from, cat_from, sim.sumSim, sim.nSim, tNow, tScanAll);
									}
								}
								else { // ScanAll
									putNeighborWithScanAll(user_to, cat_to, user_from, cat_from, tNow);
								}
								if (nbRemoved) {
									neighborListFrom.mapArray.remove(Long.toString(user_to, 16)+"\t"+cat_to);
									updateNeighborListFrom(user_from, cat_from, neighborListFrom);
								}
								if (nbRevRemoved) {
									neighborListTo.mapArray.remove(Long.toString(user_to, 16)+"\t"+cat_to);
									updateNeighborListTo(user_from, cat_from, neighborListTo, tNow);
								}
							}
						}
					}
				}
			}
		}
	}
}

public String getStringCatList(String user_id) {
	String res="";
	try {
		ResultSet user=findUserById(user_id);
		if (user.next()) {
			long user_me=user.getLong("i");
			res=getStringCatList(user_me);
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public String getStringCatList(long user_me) {
	String res="";
	try {
		CatList catL=getCatList(user_me);
		res=catL.toString();
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public CatList getCatList(long user_me) throws SQLException {
	CatList catL=getCatList(user_me, CatList.DEF_LIST_NAME);
	if (catL==null) {
		catL=new CatList();
	}
	return catL;
}
public CatList getCatList(long user_me, String listName) throws SQLException {
	pstmtGetCatList.setLong(1, user_me);
	pstmtGetCatList.setString(2, listName);
	ResultSet rs=pstmtGetCatList.executeQuery();
	if (rs.next()) {
		return new CatList(rs.getString("catList"));
	}
	return new CatList();
}
public boolean putCatList(long user_me, CatList catL) throws SQLException {
	return putCatList(user_me, CatList.DEF_LIST_NAME, catL);
}
public boolean putCatList(long user_me, String listName, CatList catL) throws SQLException {
	pstmtPutCatList.setLong(1, user_me);
	pstmtPutCatList.setString(2, listName);
	pstmtPutCatList.setString(3, catL.toString());
	return pstmtPutCatList.executeUpdate()==1;
}
public boolean updateCatList(long user_me, CatList catL) throws SQLException {
	return updateCatList(user_me, CatList.DEF_LIST_NAME, catL);
}
public boolean updateCatList(long user_me, String listName, CatList catL) throws SQLException {
	pstmtGetCatList.setLong(1, user_me);
	pstmtGetCatList.setString(2, listName);
	ResultSet rs=pstmtGetCatList.executeQuery();
	if (rs.next()) {
		rs.updateString("catList", catL.toString());
		rs.updateRow();
		return true;
	}
	else {
		return putCatList(user_me, listName, catL);
	}
}
public boolean changeOrdersCatList(long user_me, String newFullCats) {
	return changeOrdersCatList(user_me, CatList.DEF_LIST_NAME, newFullCats);
}
public boolean changeOrdersCatList(long user_me, String listName, String newFullCats) {
	try {
		pstmtGetCatList.setLong(1, user_me);
		pstmtGetCatList.setString(2, listName);
		ResultSet rs=pstmtGetCatList.executeQuery();
		if (rs.next()) {
			CatList catL=new CatList(rs.getString("catList"));
			if (catL.changeOrders(newFullCats)) {
				rs.updateString("catList", catL.toString());
				rs.updateRow();
				return true;
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}

public String getStringCatUriList(String user_id, StrArray catList) {
	String res="";
	if (user_id!=null&&!user_id.isEmpty()) {
		try {
			ResultSet user=findUserById(user_id);
			if (user.next()) {
				res=getStringCatUriList(user.getLong("i"), catList);
			}
		}
		catch (SQLException e) {
			err(e);
		}
		catch (NullPointerException e) {
			err(e);
		}
	}
	return res;
}
public String getStringCatUriList(long user_me, StrArray catList) {
	String res="";
	try {
		res+="cat\tUriList\tcutP\terr";
		int size=catList.getRowSize();
		for (int i=1;i<size;i++) {
			String cat=catList.get(i, "cat");
			res+="\n"+cat+"\t"+getUriList(user_me, cat).toStringEnclosed(catList.get(i, "from"), catList.get(i, "check"));
		}
	}
	catch (SQLException e) {
		err(e);
	}
	catch (NullPointerException e) {
		err(e);
	}
	return res;
}
public ResultSet getRSUriList(long user_me, String cat) throws SQLException {
	pstmtGetUriList.setLong(1, user_me);
	pstmtGetUriList.setString(2, cat);
	ResultSet rs=pstmtGetUriList.executeQuery();
	if (rs.next()) {
		return rs;
	}
	return null;
}
public UriList getUriList(long user_me, String cat) throws SQLException {
	pstmtGetUriList.setLong(1, user_me);
	pstmtGetUriList.setString(2, cat);
	ResultSet rs=pstmtGetUriList.executeQuery();
	if (rs.next()) {
		return new UriList(rs.getString("uriList"));
	}
	return new UriList();
}
public boolean putUriList(long user_me, String cat, UriList uriL) throws SQLException {
	pstmtPutUriList.setLong(1, user_me);
	pstmtPutUriList.setString(2, cat);
	pstmtPutUriList.setString(3, uriL.toString());
	return pstmtPutUriList.executeUpdate()==1;
}
public void putCatsUriToList(long user_me, Categories cats, String uri, CatList catL) throws SQLException {
	for (String cat: cats.setOfCats) {
		pstmtGetUriList.setLong(1, user_me);
		pstmtGetUriList.setString(2, cat);
		ResultSet rs=pstmtGetUriList.executeQuery();
		if (rs.next()) {
			UriList uriL=new UriList(rs.getString("uriList"));
			uriL.putURI(uri);
			rs.updateString("uriList", uriL.toString());
			rs.updateRow();
		}
		else {
			catL.putCat(cat);
			UriList uriL=new UriList();
			uriL.putURI(uri);
			putUriList(user_me, cat, uriL);
		}
	}
}
public void deleteCatsUriFromList(long user_me, Categories cats, String uri, CatList catL) throws SQLException {
	// Reco 를 지우거나, Reco cats 를 바꿀때 빈 cat 들은 자동으로 지우도록. 지워졌을 경우 superCat 들도 비었는지 check 하면서 지워나가야 함.
	for (String cat: cats.setOfCats) {
		pstmtGetUriList.setLong(1, user_me);
		pstmtGetUriList.setString(2, cat);
		ResultSet rs=pstmtGetUriList.executeQuery();
		if (rs.next()) {
			UriList uriL=new UriList(rs.getString("uriList"));
			uriL.deleteURI(uri);
			if (uriL.isEmpty()) {
				rs.deleteRow();
				while (cat!=null&&getUriList(user_me, cat).isEmpty()&&catL.deleteCat(cat)) {
					cat=Categories.getSuperCat(cat);
				}
			}
			else {
				rs.updateString("uriList", uriL.toString());
				rs.updateRow();
			}
		}
	}
}
public void catsChangedOnUri(long user_me, Categories oldCats, Categories newCats, String uri, CatList catL, boolean equalityOfValuesOfPts, Points oldPts, Points newPts, Timestamp tNow) throws SQLException {
	Iterator<String> iter=oldCats.setOfCats.iterator();
	while (iter.hasNext()) {
		String oldCat=iter.next();
		if (newCats.setOfCats.remove(oldCat)) {
			iter.remove();
		}
	}
	deleteCatsUriFromList(user_me, oldCats, uri, catL);
	putCatsUriToList(user_me, newCats, uri, catL);
	updateDefCat(uri, oldCats, -1);
	updateDefCat(uri, newCats, 1);
}

public static final int SORTPER=30;

public void updateDefCat(String uri, Categories cats, int increment) throws SQLException {
if (cats!=null&&!(cats.toString().isEmpty())) {
	pstmtGetRecoStatDefCat.setString(1, uri);
	pstmtGetRecoStatDefCatSet.setString(1, uri);
	for (String cat: cats.setOfCats) {
		ResultSet catSet=pstmtGetRecoStatDefCatSet.executeQuery();
		pstmtGetRecoStatDefCat.setString(2, cat);
		ResultSet rs=pstmtGetRecoStatDefCat.executeQuery();
		if (rs.next()) {
			long count=rs.getLong("count")+increment;
			if (count==0) {
				rs.deleteRow();
				if (catSet.next()) {
					StrArray catSetArray=new StrArray(catSet.getString("catSet"), false, false);
					int n=catSetArray.getRowSize();
					boolean removed=false;
					for (int i=n-1;i>=0;i--) {
						if (catSetArray.get(i, 0).equals(cat)) {
							catSetArray.removeRow(i);
							removed=true;
							break;
						}
					}
					if (removed) {
						String strCatSet=catSetArray.toString();
						if (strCatSet.isEmpty()) {
							catSet.deleteRow();
						}
						else {
							catSet.updateString("catSet", strCatSet);
							catSet.updateRow();
						}
					}
				}
			}
			else {
				rs.updateLong("count", count);
				rs.updateRow();
				if (catSet.next()) {
					int nUpdate=catSet.getInt("nUpdate")+1;
					catSet.updateInt("nUpdate", nUpdate);
					if (nUpdate%SORTPER==0) {
						StrArray catSetArray=new StrArray(catSet.getString("catSet"), false, true);
						int n=catSetArray.getRowSize();
						int[] sorted=new int[n];
						for (int i=0;i<n;i++) {
							sorted[i]=i;
						}
						long[] counts=new long[n];
						for (int i=0;i<n;i++) {
							String catI=catSetArray.get(i, 0);
							pstmtGetRecoStatDefCat.setString(1, uri);
							pstmtGetRecoStatDefCat.setString(2, catI);
							ResultSet rsI=pstmtGetRecoStatDefCat.executeQuery();
							if (rsI.next()) {
								counts[i]=rsI.getLong("count");
							}
							else {
								counts[i]=0;
							}
						}
						for (int i=1;i<n;i++) {
							int temp=sorted[i];
							int j=i;
							for (;(j>0)&&(counts[sorted[j-1]]<counts[temp]);j--) {
								sorted[j]=sorted[j-1];
							}
							sorted[j]=temp;
						}
						catSet.updateString("catSet", catSetArray.toStringBeingCut(sorted, counts));
					}
					catSet.updateRow();
				}
			}
		}
		else if (increment==1) {
			pstmtPutRecoStatDefCat.setString(1, uri);
			pstmtPutRecoStatDefCat.setString(2, cat);
			pstmtPutRecoStatDefCat.executeUpdate();
			if (catSet.next()) {
				StrArray sACatSet=new StrArray(catSet.getString("catSet"), false, true);
				if (sACatSet.mapArray.putIfAbsent(cat, new ArrayList<String>(Arrays.asList(cat)))==null) {
					catSet.updateString("catSet", sACatSet.toStringSet());
					catSet.updateRow();
				}
			}
			else {
				pstmtPutRecoStatDefCatSet.setString(1, uri);
				pstmtPutRecoStatDefCatSet.setString(2, StrArray.enclose(cat));
				pstmtPutRecoStatDefCatSet.executeUpdate();
			}
		}
	}
}}
public void updateDefTitle(String uri, String title, int increment) throws SQLException {
if (title!=null&&!(title.isEmpty())) {
	pstmtGetRecoStatDefTitle.setString(1, uri);
	pstmtGetRecoStatDefTitle.setString(2, title);
	pstmtGetRecoStatDefTitleSet.setString(1, uri);
	ResultSet titleSet=pstmtGetRecoStatDefTitleSet.executeQuery();
	ResultSet rs=pstmtGetRecoStatDefTitle.executeQuery();
	if (rs.next()) {
		long count=rs.getLong("count")+increment;
		if (count==0) {
			rs.deleteRow();
			if (titleSet.next()) {
				StrArray titleSetArray=new StrArray(titleSet.getString("titleSet"), false, false);
				int n=titleSetArray.getRowSize();
				boolean removed=false;
				for (int i=n-1;i>=0;i--) {
					if (titleSetArray.get(i, 0).equals(title)) {
						titleSetArray.removeRow(i);
						removed=true;
						break;
					}
				}
				if (removed) {
					String strTitleSet=titleSetArray.toString();
					if (strTitleSet.isEmpty()) {
						titleSet.deleteRow();
					}
					else {
						titleSet.updateString("titleSet", strTitleSet);
						titleSet.updateRow();
					}
				}
			}
		}
		else {
			rs.updateLong("count", count);
			rs.updateRow();
			if (titleSet.next()) {
				int nUpdate=titleSet.getInt("nUpdate")+1;
				titleSet.updateInt("nUpdate", nUpdate);
				if (nUpdate%SORTPER==0) {
					StrArray titleSetArray=new StrArray(titleSet.getString("titleSet"), false, true);
					int n=titleSetArray.getRowSize();
					int[] sorted=new int[n];
					for (int i=0;i<n;i++) {
						sorted[i]=i;
					}
					long[] counts=new long[n];
					for (int i=0;i<n;i++) {
						String titleI=titleSetArray.get(i, 0);
						pstmtGetRecoStatDefTitle.setString(1, uri);
						pstmtGetRecoStatDefTitle.setString(2, titleI);
						ResultSet rsI=pstmtGetRecoStatDefTitle.executeQuery();
						if (rsI.next()) {
							counts[i]=rsI.getLong("count");
						}
						else {
							counts[i]=0;
						}
					}
					for (int i=1;i<n;i++) {
						int temp=sorted[i];
						int j=i;
						for (;(j>0)&&(counts[sorted[j-1]]<counts[temp]);j--) {
							sorted[j]=sorted[j-1];
						}
						sorted[j]=temp;
					}
					titleSet.updateString("titleSet", titleSetArray.toStringBeingCut(sorted, counts));
				}
				titleSet.updateRow();
			}
		}
	}
	else if (increment==1) {
		pstmtPutRecoStatDefTitle.setString(1, uri);
		pstmtPutRecoStatDefTitle.setString(2, title);
		pstmtPutRecoStatDefTitle.executeUpdate();
		if (titleSet.next()) {
			StrArray sATitleSet=new StrArray(titleSet.getString("titleSet"), false, true);
			if (sATitleSet.mapArray.putIfAbsent(title, new ArrayList<String>(Arrays.asList(title)))==null) {
				titleSet.updateString("titleSet", sATitleSet.toStringSet());
				titleSet.updateRow();
			}
		}
		else {
			pstmtPutRecoStatDefTitleSet.setString(1, uri);
			pstmtPutRecoStatDefTitleSet.setString(2, StrArray.enclose(title));
			pstmtPutRecoStatDefTitleSet.executeUpdate();
		}
	}
}}
public void updateDefDesc(String uri, String desc, int increment) throws SQLException {
if (desc!=null&&!(desc.isEmpty())) {
	pstmtGetRecoStatDefDesc.setString(1, uri);
	byte[] descHash;
	try {
		descHash=sha512(desc);
	}
	catch (Exception e) {
		err(e);
		return;
	}
	pstmtGetRecoStatDefDesc.setBytes(2, descHash);
	pstmtGetRecoStatDefDescSet.setString(1, uri);
	ResultSet descSet=pstmtGetRecoStatDefDescSet.executeQuery();
	ResultSet rs=pstmtGetRecoStatDefDesc.executeQuery();
	if (rs.next()) {
		long count=rs.getLong("count")+increment;
		if (count==0) {
			rs.deleteRow();
			if (descSet.next()) {
				StrArray descSetArray=new StrArray(descSet.getString("descSet"), false, false);
				int n=descSetArray.getRowSize();
				boolean removed=false;
				for (int i=n-1;i>=0;i--) {
					if (descSetArray.get(i, 0).equals(desc)) {
						descSetArray.removeRow(i);
						removed=true;
						break;
					}
				}
				if (removed) {
					String strDescSet=descSetArray.toString();
					if (strDescSet.isEmpty()) {
						descSet.deleteRow();
					}
					else {
						descSet.updateString("descSet", strDescSet);
						descSet.updateRow();
					}
				}
			}
		}
		else {
			rs.updateLong("count", count);
			rs.updateRow();
			if (descSet.next()) {
				int nUpdate=descSet.getInt("nUpdate")+1;
				descSet.updateInt("nUpdate", nUpdate);
				if (nUpdate%SORTPER==0) {
					StrArray descSetArray=new StrArray(descSet.getString("descSet"), false, true);
					int n=descSetArray.getRowSize();
					int[] sorted=new int[n];
					for (int i=0;i<n;i++) {
						sorted[i]=i;
					}
					long[] counts=new long[n];
					for (int i=0;i<n;i++) {
						String descI=descSetArray.get(i, 0);
						byte[] descIHash;
						try {
							descIHash=sha512(descI);
						}
						catch (Exception e) {
							err(e);
							return;
						}
						pstmtGetRecoStatDefDesc.setString(1, uri);
						pstmtGetRecoStatDefDesc.setBytes(2, descIHash);
						ResultSet rsI=pstmtGetRecoStatDefDesc.executeQuery();
						if (rsI.next()) {
							counts[i]=rsI.getLong("count");
						}
						else {
							counts[i]=0;
						}
					}
					for (int i=1;i<n;i++) {
						int temp=sorted[i];
						int j=i;
						for (;(j>0)&&(counts[sorted[j-1]]<counts[temp]);j--) {
							sorted[j]=sorted[j-1];
						}
						sorted[j]=temp;
					}
					descSet.updateString("descSet", descSetArray.toStringBeingCut(sorted, counts));
				}
				descSet.updateRow();
			}
		}
	}
	else if (increment==1) {
		pstmtPutRecoStatDefDesc.setString(1, uri);
		pstmtPutRecoStatDefDesc.setBytes(2, descHash);
		pstmtPutRecoStatDefDesc.setString(3, desc);
		pstmtPutRecoStatDefDesc.executeUpdate();
		if (descSet.next()) {
			StrArray sADescSetRaw=new StrArray(descSet.getString("descSet"), false, false);
			StrArray sADescSet=new StrArray(false, true);
			int iMax=sADescSetRaw.getRowSize();
			for (int i=0;i<iMax;i++) {
				String descIHash=null;
				try {
					descIHash=bytesToHexString(sha512(sADescSetRaw.get(i, 0)));
				}
				catch (Exception e) {
					err(e);
					return;
				}
				ArrayList<String> arrayListI=new ArrayList<String>(Arrays.asList(descIHash, sADescSetRaw.get(i, 0)));
				sADescSet.arrayArray.add(arrayListI);
				sADescSet.mapArray.putIfAbsent(descIHash, arrayListI);
			}
			String strDescHash=bytesToHexString(descHash);
			ArrayList<String> arrayList=new ArrayList<String>(Arrays.asList(strDescHash, desc));
			if (sADescSet.mapArray.putIfAbsent(strDescHash, arrayList)==null) {
				sADescSet.arrayArray.add(arrayList);
				StringBuilder sb=new StringBuilder();
				int kMax=sADescSet.getRowSize();
				for (int k=0;k<kMax;k++) {
					if (sADescSet.mapArray.remove(sADescSet.arrayArray.get(k).get(0))!=null) {
						sb.append(StrArray.enclose(sADescSet.arrayArray.get(k).get(1)));
						sb.append("\n");
					}
				}
				descSet.updateString("descSet", sb.toString());
				descSet.updateRow();
			}
		}
		else {
			pstmtPutRecoStatDefDescSet.setString(1, uri);
			pstmtPutRecoStatDefDescSet.setString(2, StrArray.enclose(desc));
			pstmtPutRecoStatDefDescSet.executeUpdate();
		}
	}
}}

public String recoDefs(String uri) {
	String res="";
	try {
		pstmtGetRecoStatDefCatSet.setString(1, uri);
		ResultSet defCats=pstmtGetRecoStatDefCatSet.executeQuery();
		String heads="def-cats";
		String contents="";
		if (defCats.next()) {
			contents=StrArray.enclose(defCats.getString("catSet"));
		}

		pstmtGetRecoStatDefTitleSet.setString(1, uri);
		ResultSet defTitles=pstmtGetRecoStatDefTitleSet.executeQuery();
		heads+="\t"+"def-titles";
		contents+="\t";
		if (defTitles.next()) {
			contents+=StrArray.enclose(defTitles.getString("titleSet"));
		}

		pstmtGetRecoStatDefDescSet.setString(1, uri);
		ResultSet defDescs=pstmtGetRecoStatDefDescSet.executeQuery();
		heads+="\t"+"def-descs";
		contents+="\t";
		if (defDescs.next()) {
			contents+=StrArray.enclose(defDescs.getString("descSet"));
		}

		res=heads+"\n"+contents;
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public String recoDefs(StrArray uris) {
	String res="uri\tdef-cats\tdef-titles\tdef-descs";
	try {
		int iSize=uris.getRowSize();
		for (int i=0;i<iSize;i++) {
			String uri=uris.get(i, 0);
			res+="\n"+StrArray.enclose(uri);

			pstmtGetRecoStatDefCatSet.setString(1, uri);
			ResultSet defCats=pstmtGetRecoStatDefCatSet.executeQuery();
			res+="\t";
			if (defCats.next()) {
				res+=StrArray.enclose(defCats.getString("catSet"));
			}

			pstmtGetRecoStatDefTitleSet.setString(1, uri);
			ResultSet defTitles=pstmtGetRecoStatDefTitleSet.executeQuery();
			res+="\t";
			if (defTitles.next()) {
				res+=StrArray.enclose(defTitles.getString("titleSet"));
			}

			pstmtGetRecoStatDefDescSet.setString(1, uri);
			ResultSet defDescs=pstmtGetRecoStatDefDescSet.executeQuery();
			res+="\t";
			if (defDescs.next()) {
				res+=StrArray.enclose(defDescs.getString("descSet"));
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public String recoDo(long user_me, String recoStr, Timestamp tNow) {
	System.out.println(recoStr);
	String res="result\ttLast\toriginalURI\turi";
	StrArray sa=new StrArray(recoStr);
	try {
		con.setAutoCommit(false);
		CatList catL=getCatList(user_me);
		for (int i=1;i<sa.getRowSize();i++) {
			res+="\n";
			String doStr=sa.get(i, "do");
			String uri=sa.get(i, "uri");
			String originalURI=uri;
			String catsStr=sa.get(i, "cats");
			Categories cats=new Categories(catsStr);
			String title=sa.get(i, "title");
			String desc=sa.get(i, "desc");
			String cmt=sa.get(i, "cmt");
			Points pts=new Points(sa.get(i, "val"));
			String previousCatListStr=catL.fullCats;
			System.out.println("originalURI: "+originalURI);
			if (getutf8mb4Length(originalURI)>255) {
				String hashpath=Encrypt.encrypt0("", originalURI, 1).substring(0, 16);
				System.out.println("hashpath: "+hashpath);
				long longHashpath=hexStringToLong(hashpath);
				boolean done=false;
				while (!done) {
					pstmtGetRedirect.setLong(1, longHashpath);
					ResultSet rs=pstmtGetRedirect.executeQuery();
					if (rs.next()) {
						if (rs.getString("originalURI").equals(originalURI)) {
							done=true;
							break;
						}
						else {
							longHashpath++;
							continue;
						}
					}
					else {
						pstmtPutRedirect.setLong(1, longHashpath);
						pstmtPutRedirect.setString(2, originalURI);
						done=(pstmtPutRedirect.executeUpdate()==1);
						break;
					}
				}
				System.out.println("done: "+done);
				if (done) {
					uri="https://recoeve.net/redirect/"+longToHexString(longHashpath);
					desc=("#originalURI\n"+originalURI+"\n\n"+(desc!=null?desc.trim():"")).trim();
					System.out.println("uri: "+uri);
					System.out.println("originalURI: "+originalURI);
				}
			}
			try {
				ResultSet reco=getReco(user_me, uri);
				boolean hasReco=reco.next();
				String toDo="nothing";
				switch (doStr) {
				case "reco":
					if (hasReco) {
						// error.
						res+="[--Reco on this uri exists already.--]";
					}
					else {
						// put a reco.
						toDo="put";
					}
					break;
				case "change":
					if (hasReco) {
						// change a reco.
						toDo="change";
					}
					else {
						// error.
						res+="[--Reco on the uri does not exist.--]";
					}
					break;
				case "overwrite":
					if (hasReco) {
						// change a reco.
						toDo="change";
					}
					else {
						// put a reco.
						toDo="put";
					}
					break;
				case "delete":
					if (hasReco) {
						// delete a reco.
						toDo="delete";
					}
					else {
						// error.
						res+="[--Reco on the uri does not exist.--]";
					}
					break;
				}
				System.out.println("toDo: "+toDo);
				switch (toDo) {
				case "put":
					pstmtPutReco.setLong(1, user_me);
					pstmtPutReco.setString(2, uri);
					pstmtPutReco.setTimestamp(3, tNow);
					pstmtPutReco.setTimestamp(4, tNow);
					pstmtPutReco.setString(5, cats.toString());
						putCatsUriToList(user_me, cats, uri, catL); // Update `CatList` and `UriList`
						updateDefCat(uri, cats, 1);
					pstmtPutReco.setString(6, title); // Null can be put?
						updateDefTitle(uri, title, 1);
					pstmtPutReco.setString(7, desc); // Null can be put?
						updateDefDesc(uri, desc, 1);
					pstmtPutReco.setString(8, cmt); // Null can be put?
					if (pts.valid()) {
						pstmtPutReco.setString(9, pts.str());
					}
					else {
						pstmtPutReco.setString(9, null); // null is possible? yes maybe.
					}
					pstmtPutReco.executeUpdate();
					updateRecoStat(user_me, uri, pts, tNow, 1);
						updateNeighbors(user_me, uri, cats, pts, catL, tNow, 1);
					res+="recoed";
					break;
				case "change":
					Categories oldCats=new Categories(reco.getString("cats"));
					boolean equalityOfStringOfCats=(catsStr==null||catsStr.equals(oldCats.toString()));
					boolean equalityOfCats=(catsStr==null||cats.equals(oldCats));
					if (catsStr==null) {
						cats=oldCats;
					}
					String oldTitle=reco.getString("title");
					boolean equalityOfTitle=(title==null||title.equals(oldTitle));
					String oldDesc=reco.getString("desc");
					boolean equalityOfDesc=(desc==null||desc.equals(oldDesc));
					boolean equalityOfCmt=(cmt==null||cmt.equals(reco.getString("cmt")));
					Points oldPts=new Points(reco.getString("val")); // can be null.
					boolean equalityOfPts=(sa.get(i, "val")==null||pts.equals(oldPts));
					boolean equalityOfValuesOfPts=(sa.get(i, "val")==null||pts.equalValue(oldPts));
					if (sa.get(i, "val")==null) {
						pts=oldPts;
					}
					if (equalityOfStringOfCats&&equalityOfTitle&&equalityOfDesc&&equalityOfCmt&&equalityOfPts) {
						res+="no change";
					}
					else {
						reco.updateTimestamp("tLast", tNow);
						if (!equalityOfStringOfCats) {
							reco.updateString("cats", cats.toString());
							if (!equalityOfCats) {
								catsChangedOnUri(user_me, oldCats, cats, uri, catL, equalityOfValuesOfPts, oldPts, pts, tNow);
							}
						}
						if (!equalityOfTitle) {
							reco.updateString("title", title);
							updateDefTitle(uri, oldTitle, -1);
							updateDefTitle(uri, title, 1);
						}
						if (!equalityOfDesc) {
							reco.updateString("desc", desc);
							updateDefDesc(uri, oldDesc, -1);
							updateDefDesc(uri, desc, 1);
						}
						if (!equalityOfCmt) {
							reco.updateString("cmt", cmt);
						}
						if (!equalityOfPts) {
							if (pts.valid()) {
								reco.updateString("val", pts.str());
							}
							else {
								reco.updateString("val", null);
							}
						}
						reco.updateRow();
						if (!equalityOfValuesOfPts||!equalityOfCats) {
							updateRecoStat(user_me, uri, oldPts, tNow, -1);
							updateNeighbors(user_me, uri, oldCats, oldPts, catL, tNow, -1);
							updateRecoStat(user_me, uri, pts, tNow, 1);
							updateNeighbors(user_me, uri, cats, pts, catL, tNow, 1);
						}
						res+="changed.";
						if (!equalityOfCats) {
							res+=" Cats is changed to \""+cats.toString()+"\".";
						}
					}
					break;
				case "delete":
					oldCats=new Categories(reco.getString("cats"));
					oldTitle=reco.getString("title");
					oldDesc=reco.getString("desc");
					oldPts=new Points(reco.getString("val")); // can be null.
					System.out.println("deleting "+reco.getString("uri"));
					deleteCatsUriFromList(user_me, oldCats, uri, catL);
					reco.deleteRow();
					updateDefCat(uri, oldCats, -1);
					updateDefTitle(uri, oldTitle, -1);
					updateDefDesc(uri, oldDesc, -1);
					updateRecoStat(user_me, uri, oldPts, tNow, -1);
					updateNeighbors(user_me, uri, oldCats, oldPts, catL, tNow, -1);
					res+="deleted";
					break;
				case "nothing": default:
					break;
				}
				updateCatList(user_me, catL);
				con.commit();
			}
			catch (SQLException e) {
				err(e);
				res+="[--Error--]: [--"+e.getMessage()+"--]";
				catL.fullCats=previousCatListStr;
				try {
					con.rollback();
				}
				catch (SQLException e2) {
					err(e2);
				}
			}
			res+="\t"+tNow+"\t"+originalURI+"\t"+uri;
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public void updateDefsAll(Timestamp tNow) {
	try {
		PreparedStatement pstmtGetAllRecos=con.prepareStatement("SELECT * FROM `Recos1`;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		ResultSet rs=pstmtGetAllRecos.executeQuery();
		while (rs.next()) {
			long user_me=rs.getLong("user_i");
			String uri=rs.getString("uri");
			String title=rs.getString("title");
			String catsStr=rs.getString("cats");
			Categories cats=new Categories(catsStr);
			String desc=rs.getString("desc");
			Points pts=new Points(rs.getString("val"));
			updateDefCat(uri, cats, 1);
			updateDefTitle(uri, title, 1);
			updateDefDesc(uri, desc, 1);
			updateRecoStat(user_me, uri, pts, tNow, 1);
		}
	}
	catch (SQLException e) {
		err(e);
	}
}
public void moveRecosToRecos1() {
	try {
		PreparedStatement pstmtGetAllRecos=con.prepareStatement("SELECT * FROM `Recos`;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		ResultSet rs=pstmtGetAllRecos.executeQuery();
		// pstmtPutReco=con.prepareStatement("INSERT INTO `Recos1` (`user_i`, `uri`, `tFirst`, `tLast`, `cats`, `title`, `desc`, `cmt`, `val`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
		while (rs.next()) {
			long user_me=rs.getLong("user_i");
			pstmtPutReco.setLong(1, user_me);
			String uri=rs.getString("uri");
			pstmtPutReco.setString(2, uri);
			pstmtPutReco.setTimestamp(3, rs.getTimestamp("tFirst"));
			pstmtPutReco.setTimestamp(4, rs.getTimestamp("tLast"));
			String catsStr=rs.getString("cats");
			pstmtPutReco.setString(5, catsStr);
			String title=rs.getString("title");
			pstmtPutReco.setString(6, title);
			String desc=rs.getString("desc");
			pstmtPutReco.setString(7, desc);
			pstmtPutReco.setString(8, rs.getString("cmt"));
			pstmtPutReco.setString(9, rs.getString("val"));
			pstmtPutReco.executeUpdate();
		}
	}
	catch (SQLException e) {
		err(e);
	}
}
/*
CREATE TABLE `LogInLogs` (
	`user_i` bigint NOT NULL
	, `t` datetime NOT NULL
	, `ip` varchar(32) NOT NULL
	, `log` char(3) NOT NULL
	, `success` boolean NOT NULL
	, `desc` varchar(255)
	, PRIMARY KEY (`user_i`, `t`)
	, FOREIGN KEY (`user_i`) REFERENCES `Users` (`i`)
);
*/
public String printLogs() {
	StringBuilder sb=new StringBuilder();
	sb.append("user_i\tuser_id\temail\tt\tip\tlog\tsuccess\tdesc");
	try {
		PreparedStatement pstmtGetLogs=con.prepareStatement("SELECT * FROM `LogInLogs` WHERE `log`='snu' LIMIT 100;");
		ResultSet rs=pstmtGetLogs.executeQuery();
		while (rs.next()) {
			long user_me=rs.getLong("user_i");
			ResultSet user=findUserByIndex(user_me);
			String user_id="";
			String email="";
			if (user.next()) {
				user_id=user.getString("id");
				email=user.getString("email");
			}
			Timestamp t=rs.getTimestamp("t");
			String ip=rs.getString("ip");
			String log=rs.getString("log");
			boolean success=rs.getBoolean("success");
			String desc=rs.getString("desc");
			sb.append("\n");
			sb.append(Long.toString(user_me, 16));
			sb.append("\t");
			sb.append(user_id);
			sb.append("\t");
			sb.append(email);
			sb.append("\t");
			sb.append(t.toString());
			sb.append("\t");
			sb.append(ip);
			sb.append("\t");
			sb.append(log);
			sb.append("\t");
			sb.append(success);
			sb.append("\t");
			sb.append(desc);
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return sb.toString();
}
public void sendEmailAll() {
	try {
		PreparedStatement pstmtGetAllUsers=con.prepareStatement("SELECT * FROM `Users`;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		ResultSet rs=pstmtGetAllUsers.executeQuery();
		while (rs.next()) {
			String title="Hi, "+rs.getString("id")+". Now Recoeve.net is in beta test service stage.";
			String msg="<span style='line-height:1.6; font-family:'Malgun Gothic', '맑은 고딕', 나눔고딕, NanumGothic, Tahoma, Sans-serif; font-size:20px'>안녕하세요? "+rs.getString("id")+" 님. 현재 Recoeve.net 은 거의 개발을 마쳐서 베터 서비스 단계에 있습니다.<br>다시 한번 방문 하셔서 Slow/Sexy/Sincere SNS 인 <a target=\"_blank\" href=\"https://recoeve.net/\">https://recoeve.net/</a> 서비스를 이용해보세요.<br><br>Hello, "+rs.getString("id")+". Now Recoeve.net (Slow/Sexy/Sincere SNS) is in beta service stage.<br>Please visit <a target=\"_blank\" href=\"https://recoeve.net/\">https://recoeve.net/</a> again, and try to use/play with it please.</span>";
			Gmail.send(rs.getString("email"), "", title, msg);
		}
	}
	catch (Exception e) {
		err(e);
	}
}

public static void main(String... args) {

	// RecoeveDB db=new RecoeveDB();
	// db.sendEmailAll();
	// String now=db.now();
	// // TRUNCATE `RecoStat`;
	// // TRUNCATE `RecoStatDefCat`;
	// // TRUNCATE `RecoStatDefTitle`;
	// // TRUNCATE `RecoStatDefDesc`;
	// // TRUNCATE `RecoStatDefCatSet`;
	// // TRUNCATE `RecoStatDefTitleSet`;
	// // TRUNCATE `RecoStatDefDescSet`;
	// db.updateDefsAll(Timestamp.valueOf(now));



	RecoeveDB db=new RecoeveDB();
	System.out.println(db.delBlogVisitor());
	// db.moveRecosToRecos1();
	db.deleteUser("kipacti@gmail.com");
	// System.out.println(longToHexString(0L));
	// System.out.println(hexStringToLong(longToHexString(0L)));
	// System.out.println(longToHexString(100000000000000L));
	// System.out.println(hexStringToLong(longToHexString(100000000000000L)));
	// System.out.println(longToHexString(-1L));
	// System.out.println(hexStringToLong(longToHexString(-1L)));

	getutf8mb4Length("F".repeat(1024));
}
}// public class RecoeveDB
// UPDATE `Users` SET `id`="jwj0405" WHERE `email`="jwj0405@naver.com";