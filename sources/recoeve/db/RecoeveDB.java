package recoeve.db;

import java.sql.*;
	// java.sql.Timestamp;
	// java.sql.PreparedStatement
import javax.sql.DataSource; // http://docs.oracle.com/javase/8/docs/api/index.html

// import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
	// http://www.docjar.com/docs/api/com/mysql/jdbc/jdbc2/optional/MysqlDataSource.html
import com.mysql.cj.jdbc.MysqlConnectionPoolDataSource;
	// http://www.docjar.com/docs/api/com/mysql/jdbc/jdbc2/optional/MysqlConnectionPoolDataSource.html

import io.vertx.core.MultiMap;

// import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;

// import java.net.URLDecoder;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Random;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import recoeve.http.NaverMail;
import recoeve.http.Cookie;
import recoeve.http.BodyData;



public class RecoeveDB {
public static final String encoding="UTF-8";
public static final int port=80;
public static final String domain="recoeve.net";
	// "localhost:"+port;

	// domain="localhost" does not works in cookie.
public static final int hoursSSN=3;
public static final long secondsSSN=hoursSSN*60*60L;

public static final int daysRMB=30;
public static final long secondsRMB=daysRMB*24*60*60L;

public static final int daysRMBtoken=10;
public static final long secondsRMBtoken=daysRMBtoken*24*60*60L;

public static byte[] randomBytes(int length) {
	byte[] rb=new byte[length];
	new Random().nextBytes(rb);
	return rb;
}

// The below is from http://stackoverflow.com/questions/8890174/in-java-how-do-i-convert-a-hex-string-to-a-byte
final protected static char[] hexArray="0123456789abcdef".toCharArray();
public static String hex(byte[] bytes) {
	char[] hexChars=new char[bytes.length*2];
	for (int j=0; j<bytes.length; j++) {
		int v=bytes[j]&0xFF;
		hexChars[j*2]=hexArray[v>>>4];
		hexChars[j*2+1]=hexArray[v&0x0F];
	}
	return new String(hexChars);
}

public static byte[] unhex(String s) {
	int len=s.length();
	byte[] data=new byte[len/2];
	for (int i=0; i<len; i+=2) {
		data[i/2]=(byte) ((Character.digit(s.charAt(i), 16)<<4)
								+ Character.digit(s.charAt(i+1), 16));
	}
	return data;
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
private PreparedStatement pstmtCheckTimeDiff;
private PreparedStatement pstmtCheckDayDiffLessThan1;
private PreparedStatement pstmtCheckDateDiff;
	// java.sql.Timestamp class, and java.sql.Date class
	// java.util.Date dt=new java.util.Date();
	// java.text.SimpleDateFormat sdf=new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	// String currentTime=sdf.format(dt);

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

private PreparedStatement pstmtPutNeighbor;
private PreparedStatement pstmtGetNeighbor;
private PreparedStatement pstmtPutNeighborListFrom;
private PreparedStatement pstmtGetNeighborListFrom;

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
		pstmtCheckTimeDiff=con.prepareStatement("SELECT TIMESTAMPDIFF(SECOND, ?, ?) < ?;");
		pstmtCheckDayDiffLessThan1=con.prepareStatement("SELECT TIMESTAMPDIFF(DAY, ?, ?) < 1;");
		pstmtCheckDateDiff=con.prepareStatement("SELECT datediff(?, ?)<?;");

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
		
		pstmtFindUserByIndex=con.prepareStatement("SELECT * FROM `Users` WHERE `i`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtFindUserById=con.prepareStatement("SELECT * FROM `Users` WHERE `id`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtFindUserByEmail=con.prepareStatement("SELECT * FROM `Users` WHERE `email`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		
		pstmtGetUserIndexToPut=con.prepareStatement("SELECT * FROM `UserClass` WHERE `class`=-1;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtUpdateUserClass=con.prepareStatement("UPDATE `UserClass` SET `count`=`count`+? WHERE `class`=?;");
		pstmtLog=con.prepareStatement("INSERT INTO `LogInLogs` (`user_i`, `t`, `ip`, `log`, `success`, `desc`) VALUES (?, ?, ?, ?, ?, ?);");
		
		pstmtGetWholeRecos=con.prepareStatement("SELECT * FROM `Recos` WHERE `user_i`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtGetReco=con.prepareStatement("SELECT * FROM `Recos` WHERE `user_i`=? and `uri`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutReco=con.prepareStatement("INSERT INTO `Recos` (`user_i`, `uri`, `tFirst`, `tLast`, `cats`, `title`, `desc`, `cmt`, `val`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
		
		pstmtGetCatList=con.prepareStatement("SELECT * FROM `CatList` WHERE `user_i`=? and `listName`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutCatList=con.prepareStatement("INSERT INTO `CatList` (`user_i`, `listName`, `catList`) VALUES (?, ?, ?);");
		pstmtGetUriList=con.prepareStatement("SELECT * FROM `UriList` WHERE `user_i`=? and `cat`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutUriList=con.prepareStatement("INSERT INTO `UriList` (`user_i`, `cat`, `uriList`) VALUES (?, ?, ?);");

		pstmtPutNeighbor=con.prepareStatement("INSERT INTO `Neighbors` (`user_i`, `cat_i`, `user_from`, `cat_from`, `sumSim`, `nSim`, `simAvg100`, `tUpdate`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);");
		pstmtGetNeighbor=con.prepareStatement("SELECT * FROM `Neighbors` WHERE `user_i`=? and `cat_i`=? and `user_from`=? and `cat_from`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		pstmtPutNeighborListFrom=con.prepareStatement("INSERT INTO `NeighborListFrom` (`user_from`, `cat_from`, `userCatList`, `tUpdate`) VALUES (?, ?, ?, ?);");
		pstmtGetNeighborListFrom=con.prepareStatement("SELECT * FROM `NeighborListFrom` WHERE `user_from`=? and `cat_from`=?;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);

		pstmtPutRecoStat=con.prepareStatement("INSERT INTO `RecoStat` (`uri`, `recentests`, `tUpdate`) VALUES (?, ?, ?);");
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
public boolean checkTimeDiff(String now, String from, int lessThanInSeconds) {
	try {
		System.out.println("now:"+now);
		System.out.println("from:"+from);
		System.out.println("lessThanInSeconds:"+lessThanInSeconds);

		pstmtCheckDayDiffLessThan1.setTimestamp(1, Timestamp.valueOf(from));
		pstmtCheckDayDiffLessThan1.setTimestamp(2, Timestamp.valueOf(now));
		ResultSet rs0=pstmtCheckDayDiffLessThan1.executeQuery();

		pstmtCheckTimeDiff.setTimestamp(1, Timestamp.valueOf(from));
		pstmtCheckTimeDiff.setTimestamp(2, Timestamp.valueOf(now));
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
public boolean checkDateDiff(String now, String from, int lessThanInDays) {
	try {
		pstmtCheckDateDiff.setDate(1, Date.valueOf(now.substring(0,10)));
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
public boolean createAuthToken(String t, String ip, byte[] token) {
	boolean done=false;
	try {
		con.setAutoCommit(false);
		pstmtCreateAuthToken.setTimestamp(1, Timestamp.valueOf(t));
		pstmtCreateAuthToken.setString(2, ip);
		pstmtCreateAuthToken.setBytes(3, token);
		done=(pstmtCreateAuthToken.executeUpdate()>0);
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
public boolean checkAuthToken(StrArray inputs, String ip, String now) {
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
			boolean tokenC=Arrays.equals(rs.getBytes("token"), unhex(token));
			boolean timeC=checkTimeDiff(now, tToken, 30);
			System.out.println("newC:"+newC+", tokenC:"+tokenC+", timeC:"+timeC);
			if (newC&&tokenC&&timeC) {
				pstmtUpdateAuthToken.setTimestamp(1, Timestamp.valueOf(tToken));
				pstmtUpdateAuthToken.setString(2, ip);
				logsCommit(1, now, ip, "tkn", true, "tToken: "+tToken);
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
		logsCommit(1, now, ip, "tkn", false, errMsg);
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

public boolean checkChangePwdToken(MultiMap params, String now) {
	try{
		ResultSet user=findUserById(params.get("id"));
		if (user.next()) {
			String from=user.getString("tChangePwd");
			System.out.println(now+"\t"+from);
			return from!=null
				&& checkTimeDiff(now, from, 10*60)
				&& Arrays.equals(unhex(params.get("token")), user.getBytes("tokenChangePwd"));
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}
public boolean checkChangePwdToken(String id, String token, String now) {
	try{
		ResultSet user=findUserById(id);
		if (user.next()) {
			String from=user.getString("tChangePwd");
			System.out.println(now+"\t"+from);
			return from!=null
				&& checkTimeDiff(now, from, 10*60)
				&& Arrays.equals(unhex(token), user.getBytes("tokenChangePwd"));
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
public boolean createUser(StrArray inputs, String ip, String now) {
	boolean done=false;
	String id=inputs.get(1, "userId");
	byte[] pwd_salt=unhex( inputs.get(1, "authToken") );
	String pwd=inputs.get(1, "userPwd");
	String email=inputs.get(1, "userEmail");
	String veriKey=hex(randomBytes(32));
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
		pstmtCreateUser.setTimestamp(8, Timestamp.valueOf(now));
		pstmtCreateUser.setTimestamp(9, Timestamp.valueOf(now));
		if (pstmtCreateUser.executeUpdate()>0) {
			user=findUserById(id);
			if (user.next()) {
				NaverMail.sendVeriKey(email, id, veriKey);
				updateUserClass(0, +1); // 0: Not verified yet
				logsCommit(user.getLong("i"), now, ip, "snu", true, "ID: "+id+", E-mail: "+email); // sign-up
				done=true;
				con.commit();
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
private boolean deleteUser(String userEmail) {
	boolean done=false;
	ResultSet user=null;
	try {
		con.setAutoCommit(false);
		ResultSet rsUser=findUserByEmail(userEmail);
		pstmtDeleteUser.setString(1, userEmail);
		updateUserClass(rsUser.getInt("class"), -1);
		pstmtDeleteUserCatList.setLong(1, rsUser.getLong("i"));
		pstmtDeleteUserCatList.executeUpdate();
		done=pstmtDeleteUser.executeUpdate()>0;
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
public boolean changePwd(BodyData inputs, String ip, String now) {
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
			logsCommit(user.getLong("i"), now, ip, "cpw", true); // change password
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
public boolean verifyUser(String cookieI, String id, String veriKey, String ip) {
	boolean done=false;
	long user_i=Long.parseLong(cookieI, 16);
	String now=now();
	try {
		con.setAutoCommit(false);
		ResultSet user=findUserByIndex(user_i);
		if ( user.next()
			&&user.getString("id").equals(id)
			&&user.getString("veriKey").equals(veriKey)
			&&user.getInt("class")==0
			&&checkTimeDiff(now, user.getString("tReg"), 24*60*60) ) {
			// IP check is needed???
			updateUserClass(0, -1); // 0: Not verified yet
			user.updateInt("class", 6);
			updateUserClass(6, +1); // 6: Initial
			updateUserClass(-2, +1); // -2: Total number of accounts
			String email=user.getString("email");
			updateEmailStat(email.substring(email.indexOf("@")+1), +1);
			user.updateString("veriKey", null);
			user.updateRow();
			logsCommit(user_i, now, ip, "vrf", true); // verified.
			done=true;
		}
	}
	catch (SQLException e) {
		err(e);
	}
	try {
		if (!done) {
			con.rollback();
			logsCommit(user_i, now, ip, "vrf", false); // not verified.
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
		con.setAutoCommit(false);
		ResultSet user=null;
		if (idType.equals("id")) {
			user=findUserById(id);
		}
		else if (idType.equals("email")) {
			user=findUserByEmail(id);
		}
		if ( user!=null&&user.next() ) {
			result=Integer.toString( user.getInt("pwd_iteration") )
				+"\t"+hex( user.getBytes("pwd_salt") );
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
			System.out.println("pwd_salt is renewed. :: "+hex(new_salt));
			user.updateRow();
			result=hex(new_salt);
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
public String forgotPwd(StrArray inputs, String lang) {
	String now=now();
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
			if (from!=null&&checkTimeDiff(now, from, 10*60)) {
				return FileMap.replaceStr("[--pre already sended email to--] "+encryptEmail(email)+"[--post already sended email to--]", lang);
			}
			System.out.println("from=null or checkTimeDiff(now, from, 10*60)=false.");
			System.out.println("from:"+from);
			System.out.println("now:"+now);
			System.out.println("checkTimeDiff(now, from, 10*60):"+checkTimeDiff(now, from, 10*60));
			user.updateString("tChangePwd", now);
			byte[] token=randomBytes(32);
			user.updateBytes("tokenChangePwd", token);
			NaverMail.sendChangePwd(id, email, hex(token), lang);
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
				varMap.put("{--myId--}", HTMLString.escapeHTML(user.getString("id")));
				varMap.put("{--myCatList--}", HTMLString.escapeHTML(getCatList(my_i).toString()));
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
			if ((cookie.get("I")==null&&cookie.get("rmbdI")==null)||user_i!=my_i) {
				varMap.put("{--CatList--}", HTMLString.escapeHTML(getCatList(user_i).toString()));
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	varMap.putIfAbsent("{--myIndex--}", "");
	varMap.putIfAbsent("{--myId--}", "");
	varMap.putIfAbsent("{--myCatList--}", "");
	varMap.putIfAbsent("{--CatList--}", "");
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
		long my_i=Long.parseLong(myIndex, 16);
		try {
			ResultSet user=findUserByIndex(my_i);
			if (user.next()) {
				varMap.put("{--myId--}", user.getString("id"));
				varMap.put("{--myCatList--}", HTMLString.escapeHTML(getCatList(my_i).toString()));
			}
		}
		catch (SQLException e) {
			err(e);
		}
	}
	varMap.putIfAbsent("{--myIndex--}", "");
	varMap.putIfAbsent("{--myId--}", "");
	varMap.putIfAbsent("{--myCatList--}", "");
	varMap.putIfAbsent("{--CatList--}", "");
	return varMap;
}
public String sessionIter(Cookie cookie) {
	if (cookie.get("I")!=null) {
		long user_i=Long.parseLong(cookie.get("I"), 16);
		String tCreate=cookie.get("tCreate").replaceAll("_", " ");
		if (tCreate!=null) {
			String now=now();
			if (checkTimeDiff(now, tCreate, hoursSSN*60*60)) {
				try {
					pstmtSession.setLong(1, user_i);
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
public boolean sessionCheck(Cookie cookie) {
	if (cookie.get("I")!=null) {
		long user_i=Long.parseLong(cookie.get("I"), 16);
		String tCreate=cookie.get("tCreate").replaceAll("_", " ");
		String session=cookie.get("SSN");
		if (tCreate!=null&&session!=null) {
			String now=now();
			if (checkTimeDiff(now, tCreate, hoursSSN*60*60)) {
				try {
					pstmtSession.setLong(1, user_i);
					pstmtSession.setTimestamp(2, Timestamp.valueOf(tCreate));
					ResultSet rs=pstmtSession.executeQuery();
					if ( rs.next()
						&&Arrays.equals(rs.getBytes("encryptedSSN"), pwdEncrypt(rs.getBytes("salt"), Encrypt.encryptSSNRest(hex(rs.getBytes("salt")), session, rs.getInt("iter")))) ) {
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
public List<io.vertx.core.http.Cookie> authUser(StrArray inputs, String ip, String userAgent) {
	boolean done=false;
	long user_i=1; // anonymous
	String now=now();
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
		if ( user!=null&&user.next() ) {
			user_i=user.getLong("i");
			byte[] salt=user.getBytes("pwd_salt");
			int iter=user.getInt("pwd_iteration");
			if ( Arrays.equals(
					pwdEncrypt(salt, Encrypt.encryptRest(hex(salt), inputs.get(1, "userPwd"), iter))
					, user.getBytes("pwd")
				) ) {
				user.updateInt("pwd_iteration", iter-1);
				byte[] session=randomBytes(32);
				byte[] saltSSN=randomBytes(32);
				// int ssnC=user.getInt("ssnC");
				setCookie=createUserSession(user_i, now, session, saltSSN, ip, userAgent);
				// user.updateInt("ssnC", ssnC+1);
				String logDesc="Not remembered";
				String rmb=inputs.get(1, "rememberMe");
				if ( rmb!=null && rmb.equals("yes") ) {
					byte[] rmbdAuth=randomBytes(32);
					byte[] rmbdToken=randomBytes(32);
					// int rmbdC=user.getInt("rmbdC");
					setCookie.addAll(createUserRemember(user_i, now, rmbdAuth, rmbdToken, inputs, ip, userAgent));
					// user.updateInt("rmbdC", rmbdC+1);
					logDesc="Remembered";
				}
				user.updateRow();
				logsCommit(user_i, now, ip, "lgi", true, logDesc); // log-in success
			}
			else {
				System.out.println(hex(pwdEncrypt(salt, Encrypt.encryptRest(hex(salt), inputs.get(1, "userPwd"), iter))));
				System.out.println(hex(user.getBytes("pwd")));
				logsCommit(user_i, now, ip, "lgi", false); // log-in fail
			}
		}
		else {
			logsCommit(user_i, now, ip, "lgi", false); // user_i=1: anonymous (no id/email) log-in try. This must not happen, because of "account/pwd_iteration" check before log-in request.
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
public List<io.vertx.core.http.Cookie> authUserFromRmbd(Cookie cookie, StrArray inputs, String ip, String userAgent) {
	List<io.vertx.core.http.Cookie> setCookie=new ArrayList<>();
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdI", "").setSecure(true)
			.setPath("/").setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdT", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdAuth", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", "").setSecure(true)
			.setPath("/account").setHttpOnly(true).setMaxAge(-100L));
	String now=now();
	if (cookie.get("rmbdI")!=null) {
	long user_i=Long.parseLong(cookie.get("rmbdI"), 16);
	String rmbdT=cookie.get("rmbdT").replaceAll("_", " ");
	String rmbdAuth=cookie.get("rmbdAuth");
	String rmbdToken=cookie.get("rmbdToken");
	String log=inputs.get(1, "log");
	String sW=inputs.get(1, "sW");
	String sH=inputs.get(1, "sH");
	if( rmbdT!=null && rmbdAuth!=null && rmbdToken!=null && log!=null && sW!=null && sH!=null ) {
	try {
		pstmtCheckUserRemember.setLong(1, user_i);
		pstmtCheckUserRemember.setTimestamp(2, Timestamp.valueOf(rmbdT));
		ResultSet rs=pstmtCheckUserRemember.executeQuery();
		String errMsg="Error: ";
		if (rs.next()) {
			// TODO: ip check.
			if ( /*ip.startsWith(rs.getString("ip").split(":")[0])
				&&*/checkDateDiff(now, rmbdT, daysRMB)
				&&Arrays.equals(rs.getBytes("auth"), unhex(rmbdAuth))
				&&Arrays.equals(rs.getBytes("token"), unhex(rmbdToken))
				&&rs.getString("log").equals(log)
				&&rs.getInt("sW")==Integer.parseInt(sW)
				&&rs.getInt("sH")==Integer.parseInt(sH)
				&&rs.getString("userAgent").equals(userAgent) ) {
				byte[] session=randomBytes(32);
				byte[] token=randomBytes(32);
				ResultSet user=findUserByIndex(user_i);
				if (user!=null&&user.next()) {
					setCookie=createUserSession(user.getLong("i"), now, session, token, ip, userAgent);
					byte[] newToken=randomBytes(32);
					rs.updateTimestamp("tLast", Timestamp.valueOf(now));
					rs.updateBytes("token", newToken);
					setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", hex(newToken)).setSecure(true)
							.setPath("/account").setHttpOnly(true).setMaxAge(secondsRMBtoken));
					System.out.println("Remembered.");
					logsCommit(user_i, now, ip, "rmb", true);
					rs.updateRow();
					return setCookie;
				}
			}
			else {
				// Failed: Delete rmbd cookie.
				if (!ip.startsWith(rs.getString("ip").split(":")[0])) {
					errMsg+="diff ip. "+rs.getString("ip")+" ";
				}
				if (!checkDateDiff(now, rmbdT, daysRMB)) {
					errMsg+="expired. ";
				}
				if (!Arrays.equals(rs.getBytes("auth"), unhex(rmbdAuth))) {
					errMsg+="auth. ";
				}
				if (!Arrays.equals(rs.getBytes("token"), unhex(rmbdToken))) {
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
		logsCommit(user_i, now, ip, "rmb", false, errMsg);
	}
	catch (SQLException e) {
		err(e);
	}}}
	return setCookie;
}
public List<io.vertx.core.http.Cookie> createUserSession(long user_i, String now, byte[] session, byte[] salt, String ip, String userAgent)
	throws SQLException {
	List<io.vertx.core.http.Cookie> setCookie=new ArrayList<>();
	try {
		pstmtCreateUserSession.setLong(1, user_i);
		pstmtCreateUserSession.setTimestamp(2, Timestamp.valueOf(now));
		pstmtCreateUserSession.setBytes(3, pwdEncrypt(salt, Encrypt.encrypt(hex(salt), hex(session).substring(3, 11), Encrypt.iterSSNFull)));
		pstmtCreateUserSession.setBytes(4, salt);
		pstmtCreateUserSession.setString(5, ip);
		pstmtCreateUserSession.setString(6, userAgent);
		String now_=now.replaceAll("\\s", "_");
		if (pstmtCreateUserSession.executeUpdate()>0) {
			setCookie.add(io.vertx.core.http.Cookie.cookie("I", Long.toString(user_i, 16)).setSecure(true)
					.setPath("/").setHttpOnly(true).setMaxAge(secondsSSN));
			setCookie.add(io.vertx.core.http.Cookie.cookie("tCreate", now_).setSecure(true)
					.setPath("/").setMaxAge(secondsSSN-30));
			// setCookie.add(io.vertx.core.http.Cookie.cookie("tCjs", now_).setSecure(true)
			// 		.setPath("/").setMaxAge(secondsSSN));
			setCookie.add(io.vertx.core.http.Cookie.cookie("session", hex(session)).setSecure(true)
					.setPath("/").setMaxAge(secondsSSN));
			setCookie.add(io.vertx.core.http.Cookie.cookie("salt", hex(salt)).setSecure(true)
					.setPath("/").setMaxAge(secondsSSN));
		}
	}
	catch (Exception e) {
		err(e);
	}
	return setCookie;
}
public List<io.vertx.core.http.Cookie> createUserRemember(long user_i, String now, byte[] rmbdAuth, byte[] rmbdToken, StrArray inputs, String ip, String userAgent)
	throws SQLException {
	pstmtCreateUserRemember.setLong(1, user_i);
	pstmtCreateUserRemember.setTimestamp(2, Timestamp.valueOf(now));
	pstmtCreateUserRemember.setBytes(3, rmbdAuth);
	pstmtCreateUserRemember.setBytes(4, rmbdToken);
	pstmtCreateUserRemember.setString(5, inputs.get(1, "log"));
	pstmtCreateUserRemember.setInt(6, Integer.parseInt(inputs.get(1, "screenWidth")));
	pstmtCreateUserRemember.setInt(7, Integer.parseInt(inputs.get(1, "screenHeight")));
	pstmtCreateUserRemember.setString(8, ip);
	pstmtCreateUserRemember.setString(9, userAgent);
	String now_=now.replaceAll("\\s", "_");
	List<io.vertx.core.http.Cookie> setCookie=new ArrayList<>();
	if (pstmtCreateUserRemember.executeUpdate()>0) {
		// user.updateInt("rmbdC", user.getInt("rmbdC")+1);
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdI", Long.toString(user_i, 16)).setSecure(true)
				.setPath("/").setMaxAge(secondsRMB));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdT", now_).setSecure(true)
				.setPath("/account").setHttpOnly(true).setMaxAge(secondsRMB));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdAuth", hex(rmbdAuth)).setSecure(true)
				.setPath("/account").setHttpOnly(true).setMaxAge(secondsRMB));
		setCookie.add(io.vertx.core.http.Cookie.cookie("rmbdToken", hex(rmbdToken)).setSecure(true)
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
public List<io.vertx.core.http.Cookie> logout(Cookie cookie) {
	if (cookie.get("I")!=null) {
		long user_i=Long.parseLong(cookie.get("I"), 16);
		String tCreate=cookie.get("tCreate").replaceAll("_", " ");
		if (tCreate!=null) {
			try {
				pstmtSession.setLong(1, user_i);
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
		long user_i=Long.parseLong(cookie.get("rmbdI"), 16);
		String rmbdT=cookie.get("rmbdT").replaceAll("_", " ");
		if(rmbdT!=null) {
			try {
				pstmtCheckUserRemember.setLong(1, user_i);
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

public boolean logs(long user_i, String t, String ip, String log, boolean success) throws SQLException {
	return this.logs(user_i, t, ip, log, success, null);
}
public boolean logs(long user_i, String t, String ip, String log, boolean success, String desc)
	throws SQLException {
	pstmtLog.setLong(1, user_i);
	pstmtLog.setTimestamp(2, Timestamp.valueOf(t));
	pstmtLog.setString(3, ip);
	pstmtLog.setString(4, log);
	pstmtLog.setBoolean(5, success);
	pstmtLog.setString(6, desc);
	return (pstmtLog.executeUpdate()>0);
}
public boolean logsCommit(long user_i, String t, String ip, String log, boolean success) {
	try {
		con.setAutoCommit(false);
		return logs(user_i, t, ip, log, success, null);
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}
public boolean logsCommit(long user_i, String t, String ip, String log, boolean success, String desc) {
	try {
		con.setAutoCommit(false);
		return logs(user_i, t, ip, log, success, desc);
	}
	catch (SQLException e) {
		err(e);
	}
	return false;
}

// public String getUriCatsVal(String user_id_from, StrArray sa) {
// 	sa.get(1, "user_i")
// }

// public String getStrOfNeighbors(String user_id_from, StrArray cat_froms) {
// 	String res="";
// 	try {
// 		ResultSet user=findUserById(user_id_from);
// 		if (user.next()) {
// 			long user_from=user.getLong("i");
// 			res="user_i\tcat_i\tuser_from\tcat_from\tsumSim\tnSim\tsimAvg100\ttUpdate";
// 			int size=cat_froms.getRowSize();
// 			for (int i=1;i<size;i++) {
// 				ResultSet rs=getNeighbors(user_from, cat_froms.get(i, "cat_from"));
// 				while (rs.next()) {
// 					res+="\n"+Long.toString(rs.getLong("user_i"), 16)
// 						+"\t"+rs.getString("cat_i")
// 						+"\t"+Long.toString(user_from, 16)
// 						+"\t"+cat_froms.get(i, "cat_from")
// 						+"\t"+Long.toString(rs.getLong("sumSim"), 16)
// 						+"\t"+Integer.toString(rs.getInt("nSim"), 16)
// 						+"\t"+Integer.toString(rs.getInt("simAvg100"), 16)
// 						+"\t"+rs.getString("tUpdate");
// 				}
// 			}
// 		}
// 	}
//	catch (SQLException e) {
// 		err(e);
// 	}
// 	return res;
// }
public String getRecos(String user_id, StrArray uris) {
	String res="";
	try {
		ResultSet user=findUserById(user_id);
		if (user.next()) {
			long user_i=user.getLong("i");
			res+="uri\tcats\ttitle\tdesc\tcmt\tval\ttFirst\ttLast";
			int size=uris.getRowSize();
			for (int i=1;i<size;i++) {
				String uri=uris.get(i, "uri");
				ResultSet reco=getReco(user_i, uri);
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
public ResultSet getReco(long user_i, String uri) throws SQLException {
	pstmtGetReco.setLong(1, user_i);
	pstmtGetReco.setString(2, uri);
	return pstmtGetReco.executeQuery();
}

public boolean putNeighbor(long user_i, String cat_i, long user_from, String cat_from, long sumSim, int nSim, int simAvg100, String now) throws SQLException {
	pstmtPutNeighbor.setLong(1, user_i);
	pstmtPutNeighbor.setString(2, cat_i);
	pstmtPutNeighbor.setLong(3, user_from);
	pstmtPutNeighbor.setString(4, cat_from);
	pstmtPutNeighbor.setLong(5, sumSim);
	pstmtPutNeighbor.setInt(6, nSim);
	pstmtPutNeighbor.setInt(7, simAvg100);
	pstmtPutNeighbor.setString(8, now);
	return pstmtPutNeighbor.executeUpdate()==1;
}
public ResultSet getNeighbor(long user_i, String cat_i, long user_from, String cat_from) throws SQLException {
	pstmtGetNeighbor.setLong(1, user_i);
	pstmtGetNeighbor.setString(2, cat_i);
	pstmtGetNeighbor.setLong(3, user_from);
	pstmtGetNeighbor.setString(4, cat_from);
	return pstmtGetNeighbor.executeQuery();
}
public boolean putNeighborListFrom(long user_from, String cat_from, String userCatList, String now) throws SQLException {
	pstmtPutNeighborListFrom.setLong(1, user_from);
	pstmtPutNeighborListFrom.setString(2, cat_from);
	pstmtPutNeighborListFrom.setString(3, userCatList);
	pstmtPutNeighborListFrom.setTimestamp(4, Timestamp.valueOf(now));
	return pstmtPutNeighborListFrom.executeUpdate()==1;
}
public ResultSet getNeighborListFrom(long user_from, String cat_from) throws SQLException {
	pstmtGetNeighborListFrom.setLong(1, user_from);
	pstmtGetNeighborListFrom.setString(2, cat_from);
	ResultSet rs=pstmtGetNeighborListFrom.executeQuery();
	return rs;
	// if (rs.next()) {
	// 	rs.getString("userCatList");
	// }
}
public Set<Long> getRecentests(String uri) throws SQLException {
	ResultSet rs=getRecoStat(uri);
	String[] recentests=rs.getString("recentests").split("\n");
	Set<Long> setOfRecentests=new HashSet<Long>(recentests.length*2);
	for (int i=0;i<recentests.length;i++) {
		setOfRecentests.add(Long.parseLong(recentests[i], 16));
	}
	return setOfRecentests;
}
public void updateNeighbors(long user_from, String uri, Categories cats, Points pts, CatList catL, String now, int increment) throws SQLException {
	if (pts.valid()) {
		if (increment==1) {
			//////////////////////////////////////////////////////
			// Update existing neighbors and recentests.
			//////////////////////////////////////////////////////
			Set<Long> recentests=getRecentests(uri);
			recentests.remove(user_from);
			for (String cat_from: cats.setOfCats) {
				ResultSet neighborList=getNeighborListFrom(user_from, cat_from);
				for (Long user_to: recentests) {
					ResultSet reco_to=getReco(user_to, uri);
					if (reco_to.next()) {
						Points pts_to=new Points(reco_to.getString("val"));
						if (pts_to.valid()) {
							Categories cats_to=new Categories(reco_to.getString("cats"));
							for (String cat_to: cats_to.setOfCats) {
								ResultSet neighbor=getNeighbor(user_to, cat_to, user_from, cat_from);
								if (neighbor.next()) {
									ResultSet neighborRev=getNeighbor(user_from, cat_from, user_to, cat_to);
								}
								else {

								}
							}
						}
					}
				}
			}
		}
		else if (increment==-1) {
			// for (String cat_from: cats.setOfCats) {
			// 	getNeighborListFrom(user_from, cat_from);
			// 	getNeighborListTo(user_from, cat_from);
			// }
		}
	}
}


// 			ResultSet neighbors=getNeighbors(user_i, cat);
// 			while (neighbors.next()) {
// 				ResultSet reco=getReco(neighbors.getLong("user_i"), uri);
// 				if (reco.next()) {
// 					Points pts2=new Points(reco.getString("val"));
// 					if (pts2.valid()&&Categories.isSuperCat(neighbors.getString("cat_i"), reco.getString("cats"))) {
// 						long sumSim=neighbors.getLong("sumSim")+Similarity.sim(pts.val()-pts2.val())*increment;
// 						int nSim=neighbors.getInt("nSim")+increment;
// 						neighbors.updateLong("sumSim", sumSim);
// 						neighbors.updateInt("nSim", nSim);
// 						neighbors.updateInt("simAvg100", Similarity.simAvg100(sumSim, nSim) );
// 						neighbors.updateString("tUpdate", now);
// 						neighbors.updateRow();
// 					}
// 				}
// 			}
// 			ResultSet followers=getFollowers(user_i, cat);
// 			while (followers.next()) {
// 				ResultSet reco=getReco(followers.getLong("user_from"), uri);
// 				if (reco.next()) {
// 					Points pts2=new Points(reco.getString("val"));
// 					if (pts2.valid()&&Categories.isSuperCat(followers.getString("cat_from"), reco.getString("cats"))) {
// 						long sumSim=followers.getLong("sumSim")+Similarity.sim(pts.val()-pts2.val())*increment;
// 						int nSim=followers.getInt("nSim")+increment;
// 						followers.updateLong("sumSim", sumSim);
// 						followers.updateInt("nSim", nSim);
// 						followers.updateInt("simAvg100", Similarity.simAvg100(sumSim, nSim) );
// 						followers.updateString("tUpdate", now);
// 						followers.updateRow();
// 					}
// 				}
// 			}
// 		}
		
// 		//////////////////////////////////////////////////////////////
// 		// Put new neighbors with recent recoers on the uri.
// 		//////////////////////////////////////////////////////////////
// 		if (increment>0) {
// 			Set<Long> setRR=setOfRecentRecoersWithVal(uri);
// 			HashMap<Long, Categories> newNeighbors=new HashMap<Long, Categories>();
// 			for (long user: setRR) {
// 			if (user!=user_i&&!newNeighbors.containsKey(user)) {
// 				ResultSet reco=getReco(user, uri);
// 				if (reco.next()) {
// 					Points recoPts=new Points(reco.getString("val"));
// 					if (recoPts.valid()&&Math.abs(recoPts.val()-pts.val())<=0.5) {
// 						newNeighbors.put(user, new Categories(reco.getString("cats")));
// 					}
// 				}
// 			} }
// 			if (newNeighbors.size()>0) {
// 			for (String cat: cats.setOfCats) {
// 				Set<String> setOfSubCats=new HashSet<String>();
// 				Set<String> setOfURIs=new HashSet<String>();
// 				setOfURIs.add(""); // hack to avoid an empty URI.
// 				Map<String, Points> recosWithValInSubCats=new HashMap<String, Points>();
// 				while (cat!=null) {
// 					ArrayList<String> subCats=catL.subCats(cat);
// 					for (int i=0;i<subCats.size();i++) {
// 					if (setOfSubCats.add(subCats.get(i))) {
// 						String[] list=getUriList(user_i, subCats.get(i)).listOfURIs();
// 						for (int j=0;j<list.length;j++) {
// 						if (setOfURIs.add(list[j])) {
// 							ResultSet reco=getReco(user_i, list[j]);
// 							if (reco.next()) {
// 								Points recoPts=new Points(reco.getString("val"));
// 								if (recoPts.valid()) { recosWithValInSubCats.put(list[j], recoPts); }
// 							}
// 						} }
// 					} }
// 					for (Map.Entry<Long, Categories> neighbor: newNeighbors.entrySet()) {
// 						long user_n=neighbor.getKey();
// 						Categories cats_n=neighbor.getValue();
// 						CatList catL_n=getCatList(user_n);
// 						for (String cat_n: cats_n.setOfCats) {
// 							Set<String> setOfSubCats_n=new HashSet<String>();
// 							Set<String> setOfURIs_n=new HashSet<String>();
// 							setOfURIs_n.add(""); // hack to avoid an empty URI.
// 							Map<String, Points> recosWithValInSubCats_n=new HashMap<String, Points>();
// 								// check if not exists in neighbors of user_i
// 							while (cat_n!=null) {
// 								ResultSet myNeighbor=getNeighbor(user_n, cat_n, user_i, cat);
// 								ResultSet myFollower=getFollower(user_n, cat_n, user_i, cat);
// 								boolean eMyN=myNeighbor.next();
// 								boolean eHisN=myFollower.next();
// 								if (eMyN&&eHisN) {
// 									if (myNeighbor.getInt("simAvg100")==myFollower.getInt("simAvg100")) {
// 										cat_n=Categories.getSuperCat(cat_n);
// 										continue;
// 									}
// 									else {
// 										System.out.println("Two symmetric sims are different!");
// 									}
// 								}
// 								ArrayList<String> subCats_n=catL_n.subCats(cat);
// 								for (int i=0;i<subCats_n.size();i++) {
// 								if (setOfSubCats_n.add(subCats_n.get(i))) {
// 									String[] list=getUriList(user_n, subCats_n.get(i)).listOfURIs();
// 									for (int j=0;j<list.length;j++) {
// 									if (setOfURIs_n.add(list[j])) {
// 										ResultSet reco=getReco(user_n, list[j]);
// 										if (reco.next()) {
// 											Points recoPts=new Points(reco.getString("val"));
// 											if (recoPts.valid()) { recosWithValInSubCats_n.put(list[j], recoPts); }
// 										}
// 										reco.close();
// 									} }
// 								} }
// 								long sumSim=0;
// 								int nSim=0;
// 								for (Map.Entry<String, Points> reco: recosWithValInSubCats.entrySet()) {
// 									Points pts_n=recosWithValInSubCats_n.get(reco.getKey());
// 									if (pts_n!=null) {
// 										sumSim+=Similarity.sim(reco.getValue().val()-pts_n.val());
// 										nSim++;
// 									}
// 								}
// 								int simAvg100=Similarity.simAvg100(sumSim, nSim);
// 								if (eMyN) {
// 									if (myNeighbor.getInt("simAvg100")!=simAvg100) {
// 										// Put error log?
// 										System.out.println("Sim is different :\n\told : "+myNeighbor.getInt("simAvg100")+"\n\tnew : "+simAvg100);
// 										myNeighbor.updateLong("sumSim", sumSim);
// 										myNeighbor.updateInt("nSim", nSim);
// 										myNeighbor.updateInt("simAvg100", simAvg100);
// 										myNeighbor.updateRow();
// 									}
// 								}
// 								else {
// 									putNeighbor(user_n, cat_n, user_i, cat, sumSim, nSim, simAvg100, now);
// 								}
// 								if (eHisN) {
// 									if (myFollower.getInt("simAvg100")!=simAvg100) {
// 										// Put error log?
// 										System.out.println("Sim is different :\n\told : "+myFollower.getInt("simAvg100")+"\n\tnew : "+simAvg100);
// 										myFollower.updateLong("sumSim", sumSim);
// 										myFollower.updateInt("nSim", nSim);
// 										myFollower.updateInt("simAvg100", simAvg100);
// 										myFollower.updateRow();
// 									}
// 								}
// 								else {
// 									putNeighbor(user_i, cat, user_n, cat_n, sumSim, nSim, simAvg100, now);
// 								}
// 								cat_n=Categories.getSuperCat(cat_n);
// 							}
// 						}
// 					}
// 					cat=Categories.getSuperCat(cat);
// 				}
// 			} }
// 			cutNeighbors(user_i, cats);
// 		}
// 	}
// }
// public void cutNeighbors(long user_i, Categories cats) throws SQLException {
// 	cutNeighbors(user_i, cats, 200, 1000, 3500); // default
// }
// public void cutNeighbors(long user_i, Categories cats, int min_NN, int max_NN, int simAvg100Cutoff) throws SQLException {
// 	// min_NN: minimum number of neighbors.
// 	// Cutting least sims.
// 	for (String cat: cats.setOfSuperCats) {
// 		ResultSet neighbors=getNeighborsOrdered(user_i, cat);
// 		int size=neighbors.getFetchSize();
// 		if (size>min_NN) {
// 			int i=min_NN;
// 			if (size>max_NN) {
// 				i=max_NN+1;
// 				while (neighbors.absolute(i)) {
// 					neighbors.deleteRow();
// 					i++;
// 				}
// 				i=max_NN;
// 			}
// 			else {
// 				i=size;
// 			}
// 			while (i>min_NN&&neighbors.absolute(i)&&neighbors.getInt("simAvg100")<simAvg100Cutoff) {
// 				neighbors.deleteRow();
// 				i--;
// 			}
// 		}
// 	}
// }

public String getStringCatList(String user_id) {
	String res="";
	try {
		ResultSet user=findUserById(user_id);
		if (user.next()) {
			long user_i=user.getLong("i");
			res=getStringCatList(user_i);
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public String getStringCatList(long user_i) {
	String res="";
	try {
		CatList catL=getCatList(user_i);
		res=catL.toString();
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}
public CatList getCatList(long user_i) throws SQLException {
	CatList catL=getCatList(user_i, CatList.defListName);
	if (catL==null) {
		catL=new CatList();
	}
	return catL;
}
public CatList getCatList(long user_i, String listName) throws SQLException {
	pstmtGetCatList.setLong(1, user_i);
	pstmtGetCatList.setString(2, listName);
	ResultSet rs=pstmtGetCatList.executeQuery();
	if (rs.next()) {
		return new CatList(rs.getString("catList"));
	}
	return new CatList();
}
public boolean putCatList(long user_i, CatList catL) throws SQLException {
	return putCatList(user_i, CatList.defListName, catL);
}
public boolean putCatList(long user_i, String listName, CatList catL) throws SQLException {
	pstmtPutCatList.setLong(1, user_i);
	pstmtPutCatList.setString(2, listName);
	pstmtPutCatList.setString(3, catL.toString());
	return pstmtPutCatList.executeUpdate()==1;
}
public boolean updateCatList(long user_i, CatList catL) throws SQLException {
	return updateCatList(user_i, CatList.defListName, catL);
}
public boolean updateCatList(long user_i, String listName, CatList catL) throws SQLException {
	pstmtGetCatList.setLong(1, user_i);
	pstmtGetCatList.setString(2, listName);
	ResultSet rs=pstmtGetCatList.executeQuery();
	if (rs.next()) {
		rs.updateString("catList", catL.toString());
		rs.updateRow();
		return true;
	}
	else {
		return putCatList(user_i, listName, catL);
	}
}
public boolean changeOrdersCatList(long user_i, String newFullCats) {
	return changeOrdersCatList(user_i, CatList.defListName, newFullCats);
}
public boolean changeOrdersCatList(long user_i, String listName, String newFullCats) {
	try {
		pstmtGetCatList.setLong(1, user_i);
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
public String getStringCatUriList(long user_i, StrArray catList) {
	String res="";
	try {
		res+="cat\tUriList\tcutP\terr";
		int size=catList.getRowSize();
		for (int i=1;i<size;i++) {
			String cat=catList.get(i, "cat");
			res+="\n"+cat+"\t"+getUriList(user_i, cat).toStringEnclosed(catList.get(i, "from"), catList.get(i, "check"));
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
// public String getStringCatUriList(long user_i, ArrayList<String> catList) {
// 	String res="";
// 	try {
// 		res+="cat\tUriList\n";
// 		int size=catList.size();
// 		for (int i=0;i<size;i++) {
// 			String cat=catList.get(i);
// 			UriList uriL=getUriList(user_i, cat);
// 			String strUriL=uriL.toString().trim();
// 			if (!strUriL.isEmpty()) {
// 				strUriL="\""+strUriL.replaceAll("\"", "\"\"")+"\"";
// 			}
// 			res+=cat+"\t"+strUriL+"\n";
// 		}
// 	}
//	catch (SQLException e) {
// 		err(e);
// 	}
// 	return res;
// }
public UriList getUriList(long user_i, String cat) throws SQLException {
	pstmtGetUriList.setLong(1, user_i);
	pstmtGetUriList.setString(2, cat);
	ResultSet rs=pstmtGetUriList.executeQuery();
	if (rs.next()) {
		return new UriList(rs.getString("uriList"));
	}
	return new UriList();
}
public boolean putUriList(long user_i, String cat, UriList uriL) throws SQLException {
	pstmtPutUriList.setLong(1, user_i);
	pstmtPutUriList.setString(2, cat);
	pstmtPutUriList.setString(3, uriL.toString());
	return pstmtPutUriList.executeUpdate()==1;
}
public void putCatsUriToList(long user_i, Categories cats, String uri, CatList catL) throws SQLException {
	for (String cat: cats.setOfCats) {
		pstmtGetUriList.setLong(1, user_i);
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
			putUriList(user_i, cat, uriL);
		}
	}
}
public void deleteCatsUriFromList(long user_i, Categories cats, String uri, CatList catL) throws SQLException {
	// Reco 를 지우거나, Reco cats 를 바꿀때 빈 cat 들은 자동으로 지우도록. 지워졌을 경우 superCat 들도 비었는지 check 하면서 지워나가야 함.
	for (String cat: cats.setOfCats) {
		pstmtGetUriList.setLong(1, user_i);
		pstmtGetUriList.setString(2, cat);
		ResultSet rs=pstmtGetUriList.executeQuery();
		if (rs.next()) {
			UriList uriL=new UriList(rs.getString("uriList"));
			uriL.deleteURI(uri);
			if (uriL.isEmpty()) {
				rs.deleteRow();
				while (cat!=null&&getUriList(user_i, cat).isEmpty()&&catL.deleteCat(cat)) {
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
public void catsChangedOnUri(long user_i, Categories oldCats, Categories newCats, String uri, CatList catL, boolean equalityOfValuesOfPts, Points oldPts, Points newPts, String now) throws SQLException {
	Iterator<String> iterator=newCats.setOfCats.iterator();
	while (iterator.hasNext()) {
		String newCat=iterator.next();
		if (oldCats.setOfCats.remove(newCat)) {
			iterator.remove();
			// newCats.setOfCats.remove(newCat);
		}
	}
	deleteCatsUriFromList(user_i, oldCats, uri, catL);
	putCatsUriToList(user_i, newCats, uri, catL);
	updateDefCat(uri, oldCats, -1);
	updateDefCat(uri, newCats, +1);
	if (equalityOfValuesOfPts) {
		iterator=newCats.setOfSuperCats.iterator();
		while (iterator.hasNext()) {
			String newSuperCat=iterator.next();
			if (oldCats.setOfSuperCats.remove(newSuperCat)) {
				iterator.remove();
				// newCats.setOfSuperCats.remove(newSuperCat);
			}
		}
		updateRecoStat(user_i, uri, oldPts, now, -1);
		// updateNeighbors(user_i, uri, oldCats, oldPts, catL, now, -1);
		updateRecoStat(user_i, uri, newPts, now, +1);
		// updateNeighbors(user_i, uri, newCats, newPts, catL, now, +1);
	}
}

public static final int sortPer=100;

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
					if (nUpdate%sortPer==0) {
						StrArray catSetArray=new StrArray(catSet.getString("catSet"), false, false);
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
						catSet.updateString("catSet", catSetArray.toString(sorted));
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
				catSet.updateString("catSet", catSet.getString("catSet")+"\n"+StrArray.enclose(cat));
				catSet.updateRow();
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
				if (nUpdate%sortPer==0) {
					StrArray titleSetArray=new StrArray(titleSet.getString("titleSet"), false, false);
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
					titleSet.updateString("titleSet", titleSetArray.toString(sorted));
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
			titleSet.updateString("titleSet", titleSet.getString("titleSet")+"\n"+StrArray.enclose(title));
			titleSet.updateRow();
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
				if (nUpdate%sortPer==0) {
					StrArray descSetArray=new StrArray(descSet.getString("descSet"), false, false);
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
					descSet.updateString("descSet", descSetArray.toString(sorted));
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
			descSet.updateString("descSet", descSet.getString("descSet")+"\n"+StrArray.enclose(desc));
			descSet.updateRow();
		}
		else {
			pstmtPutRecoStatDefDescSet.setString(1, uri);
			pstmtPutRecoStatDefDescSet.setString(2, StrArray.enclose(desc));
			pstmtPutRecoStatDefDescSet.executeUpdate();
		}
	}
}}
public ResultSet putAndGetRecoStat(String uri, long user_i, String now) throws SQLException {
	pstmtGetRecoStat.setString(1, uri);
	ResultSet rs=pstmtGetRecoStat.executeQuery();
	if (rs.next()) {
		return rs;
	}
	else {
		pstmtPutRecoStat.setString(1, uri);
		pstmtPutRecoStat.setString(2, Long.toString(user_i, 16));
		pstmtPutRecoStat.setTimestamp(3, Timestamp.valueOf(now));
		pstmtPutRecoStat.executeUpdate();
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

public static final int recoStatUpdatePer=50;
public static final int recoStatMaxRecentests=200;

public void updateRecoStat(long user_i, String uri, Points pts, String now, int increment) throws SQLException {
	ResultSet recoStat=putAndGetRecoStat(uri, user_i, now);
	recoStat.updateString("tUpdate", now);
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
	if (increment>0) {
		String recentests=Long.toString(user_i, 16)+"\n"+recoStat.getString("recentests");
		if (nV%recoStatUpdatePer==0) {
			String[] recoers=recentests.split("\n");
			Set<String> recoersSet=new HashSet<String>(recoStatMaxRecentests*2);
			int n=0;
			List<String> recoersList=new ArrayList<String>();
			for (String recoer : recoers) {
				if (recoersSet.add(recoer)) {
					n++;
					recoersList.add(recoer);
					if (n==recoStatMaxRecentests) { break; }
				}
			}
			recentests=String.join("\n", recoersList);
		}
		recoStat.updateString("recentests", recentests);
	}
	recoStat.updateRow();
}
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
public String recoDo(long user_i, String recoStr) {
	String res="i\tresult";
	String now=now();
	StrArray sa=new StrArray(recoStr);
	try {
		con.setAutoCommit(false);
		CatList catL=getCatList(user_i);
		for (int i=1;i<sa.getRowSize();i++) {
			res+="\n"+i+"\t";
			String doStr=sa.get(i, "do");
			String uri=sa.get(i, "uri");
			String catsStr=sa.get(i, "cats");
			Categories cats=new Categories(catsStr);
			String title=sa.get(i, "title");
			String desc=sa.get(i, "desc");
			String cmt=sa.get(i, "cmt");
			Points pts=new Points(sa.get(i, "val"));
			String previousCatListStr=catL.fullCats;
			try {
				ResultSet reco=getReco(user_i, uri);
				boolean hasReco=reco.next();
				String toDo="nothing";
				switch (doStr) {
				case "reco":
					if (hasReco) {
						// error.
						res+="Reco on this uri exists already.";
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
						res+="Reco on the uri does not exist.";
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
						res+="Reco on the uri does not exist.";
					}
					break;
				}
				switch (toDo) {
				case "put":
					pstmtPutReco.setLong(1, user_i);
					pstmtPutReco.setString(2, uri);
					pstmtPutReco.setTimestamp(3, Timestamp.valueOf(now));
					pstmtPutReco.setTimestamp(4, Timestamp.valueOf(now));
					pstmtPutReco.setString(5, cats.toString());
						putCatsUriToList(user_i, cats, uri, catL); // Update `CatList` and `UriList`
						updateDefCat(uri, cats, +1);
					pstmtPutReco.setString(6, title); // Null can be put?
						updateDefTitle(uri, title, +1);
					pstmtPutReco.setString(7, desc); // Null can be put?
						updateDefDesc(uri, desc, +1);
					pstmtPutReco.setString(8, cmt); // Null can be put?
					if (pts.valid()) {
						pstmtPutReco.setString(9, pts.str());
					}
					else {
						pstmtPutReco.setString(9, null); // null is possible? yes maybe.
					}
					pstmtPutReco.executeUpdate();
					updateRecoStat(user_i, uri, pts, now, +1);
						// updateNeighbors(user_i, uri, cats, pts, catL, now, +1);
					res+="recoed";
					break;
				case "change":
					Categories oldCats=new Categories(reco.getString("cats"));
					boolean equalityOfStringOfCats=(catsStr==null||catsStr.equals(oldCats.toString()));
					boolean equalityOfCats=(catsStr==null||cats.equals(oldCats));
					String oldTitle=reco.getString("title");
					boolean equalityOfTitle=(title==null||title.equals(oldTitle));
					String oldDesc=reco.getString("desc");
					boolean equalityOfDesc=(desc==null||desc.equals(oldDesc));
					boolean equalityOfCmt=(cmt==null||cmt.equals(reco.getString("cmt")));
					Points oldPts=new Points(reco.getString("val")); // can be null.
					boolean equalityOfPts=(sa.get(i, "val")==null||pts.equals(oldPts));
					boolean equalityOfValuesOfPts=(sa.get(i, "val")==null||pts.equalValue(oldPts));
					if (equalityOfStringOfCats&&equalityOfTitle&&equalityOfDesc&&equalityOfCmt&&equalityOfPts) {
						res+="no change";
					}
					else {
						if (!equalityOfValuesOfPts) {
							updateRecoStat(user_i, uri, oldPts, now, -1);
							// updateNeighbors(user_i, uri, oldCats, oldPts, catL, now, -1);
							updateRecoStat(user_i, uri, pts, now, +1);
							// updateNeighbors(user_i, uri, cats, pts, catL, now, +1);
						}
						reco.updateString("tLast", now);
						if (!equalityOfStringOfCats) {
							reco.updateString("cats", cats.toString());
							if (!equalityOfCats) {
								catsChangedOnUri(user_i, oldCats, cats, uri, catL, equalityOfValuesOfPts, oldPts, pts, now);
							}
						}
						if (!equalityOfTitle) {
							reco.updateString("title", title);
							updateDefTitle(uri, oldTitle, -1);
							updateDefTitle(uri, title, +1);
						}
						if (!equalityOfDesc) {
							reco.updateString("desc", desc);
							updateDefDesc(uri, oldDesc, -1);
							updateDefDesc(uri, desc, +1);
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
						res+="changed";
					}
					break;
				case "delete":
					oldCats=new Categories(reco.getString("cats"));
					oldTitle=reco.getString("title");
					oldDesc=reco.getString("desc");
					oldPts=new Points(reco.getString("val")); // can be null.
					System.out.println("deleting "+reco.getString("uri"));
					deleteCatsUriFromList(user_i, oldCats, uri, catL);
					updateDefCat(uri, oldCats, -1);
					updateDefTitle(uri, oldTitle, -1);
					updateDefDesc(uri, oldDesc, -1);
					updateRecoStat(user_i, uri, oldPts, now, -1);
					// updateNeighbors(user_i, uri, oldCats, oldPts, catL, now, -1);
					reco.deleteRow();
					res+="deleted";
					break;
				}
				updateCatList(user_i, catL);
				con.commit();
			}
			catch (SQLException e) {
				err(e);
				res+="error";
				catL.fullCats=previousCatListStr;
				try {
					con.rollback();
				}
				catch (SQLException e2) {
					err(e2);
				}
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return res;
}

// put or overwrite Reco
public String putReco(long user_i, String recoStr) {
	boolean done=false;
	String res="i\tresult";
	String now=now();
	StrArray sa=new StrArray(recoStr);
	try {
		con.setAutoCommit(false);
		CatList catL=getCatList(user_i);
		for (int i=1;i<sa.getRowSize();i++) {
			res+="\n"+i+"\t";
			String uri=sa.get(i, "uri");
			String catsStr=sa.get(i, "cats");
			Categories cats=new Categories(catsStr);
			String title=sa.get(i, "title");
			String desc=sa.get(i, "desc");
			String cmt=sa.get(i, "cmt");
			Points pts=new Points(sa.get(i, "val"));
			String previousCatListStr=catL.fullCats;
			try {
				ResultSet reco=getReco(user_i, uri);
				if (reco.next()) {
					Categories oldCats=new Categories(reco.getString("cats"));
					boolean equalityOfStringOfCats=(catsStr==null||catsStr.equals(oldCats.toString()));
					boolean equalityOfCats=(catsStr==null||cats.equals(oldCats));
					String oldTitle=reco.getString("title");
					boolean equalityOfTitle=(title==null||title.equals(oldTitle));
					String oldDesc=reco.getString("desc");
					boolean equalityOfDesc=(desc==null||desc.equals(oldDesc));
					boolean equalityOfCmt=(cmt==null||cmt.equals(reco.getString("cmt")));
					Points oldPts=new Points(reco.getString("val")); // can be null.
					boolean equalityOfPts=(sa.get(i, "val")==null||pts.equals(oldPts));
					boolean equalityOfValuesOfPts=(sa.get(i, "val")==null||pts.equalValue(oldPts));
					if (equalityOfStringOfCats&&equalityOfTitle&&equalityOfDesc&&equalityOfCmt&&equalityOfPts) {
						res+="no change";
					}
					else {
						if (!equalityOfValuesOfPts) {
							updateRecoStat(user_i, uri, oldPts, now, -1);
							// updateNeighbors(user_i, uri, oldCats, oldPts, catL, now, -1);
							updateRecoStat(user_i, uri, pts, now, +1);
							// updateNeighbors(user_i, uri, cats, pts, catL, now, +1);
						}
						reco.updateString("tLast", now);
						if (!equalityOfStringOfCats) {
							reco.updateString("cats", cats.toString());
							if (!equalityOfCats) {
								catsChangedOnUri(user_i, oldCats, cats, uri, catL, equalityOfValuesOfPts, oldPts, pts, now);
							}
						}
						if (!equalityOfTitle) {
							reco.updateString("title", title);
							updateDefTitle(uri, oldTitle, -1);
							updateDefTitle(uri, title, +1);
						}
						if (!equalityOfDesc) {
							reco.updateString("desc", desc);
							updateDefDesc(uri, oldDesc, -1);
							updateDefDesc(uri, desc, +1);
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
						res+="changed";
					}
				}
				else {
					pstmtPutReco.setLong(1, user_i);
					pstmtPutReco.setString(2, uri);
					pstmtPutReco.setTimestamp(3, Timestamp.valueOf(now));
					pstmtPutReco.setTimestamp(4, Timestamp.valueOf(now));
					pstmtPutReco.setString(5, cats.toString());
						putCatsUriToList(user_i, cats, uri, catL); // Update `CatList` and `UriList`
						updateDefCat(uri, cats, +1);
					pstmtPutReco.setString(6, title); // Null can be put?
						updateDefTitle(uri, title, +1);
					pstmtPutReco.setString(7, desc); // Null can be put?
						updateDefDesc(uri, desc, +1);
					pstmtPutReco.setString(8, cmt); // Null can be put?
					if (pts.valid()) {
						pstmtPutReco.setString(9, pts.str());
					}
					else {
						pstmtPutReco.setString(9, null); // null is possible? yes maybe.
					}
					pstmtPutReco.executeUpdate();
						updateRecoStat(user_i, uri, pts, now, +1);
						// updateNeighbors(user_i, uri, cats, pts, catL, now, +1);
					res+="recoed";
				}
				updateCatList(user_i, catL);
				con.commit();
				done=true;
			}
			catch (SQLException e) {
				err(e);
				res+="error";
				catL.fullCats=previousCatListStr;
				try {
					con.rollback();
				}
				catch (SQLException e2) {
					err(e2);
				}
			}
		}
	}
	catch (SQLException e) {
		err(e);
	}
	return res+" :: done:"+done;
}
// public boolean updateReco(long user_i, String recoStr) {
// 	try {
// 		StrArray sa=new StrArray(recoStr);
// 		ResultSet reco=getReco(user_i, sa.get(1, "uri"));
// 		if (reco.next()) {
// 			String now=now();
// 			reco.updateString("tLast", now);
// 			if (sa.get(1, "cats")!=null&&!sa.get(1, "cats").equals(reco.getString("cats"))) {
// 				reco.updateString("cats", sa.get(1, "cats"));
// 			}
// 			if (sa.get(1, "title")!=null&&!sa.get(1, "title").equals(reco.getString("title"))) {
// 				reco.updateString("title", sa.get(1, "title"));
// 			}
// 			if (sa.get(1, "desc")!=null&&!sa.get(1, "desc").equals(reco.getString("desc"))) {
// 				reco.updateString("desc", sa.get(1, "desc"));
// 			}
// 			if (sa.get(1, "cmt")!=null&&!sa.get(1, "cmt").equals(reco.getString("cmt"))) {
// 				reco.updateString("cmt", sa.get(1, "cmt"));
// 			}
// 			if (sa.get(1, "val")!=null&&!sa.get(1, "val").equals(reco.getString("val"))) {
// 				reco.updateString("val", sa.get(1, "val"));
// 			}
// 			reco.updateRow(); // void return;
// 			return true;
// 		}
// 	}
//	catch (SQLException e) {
// 		err(e);
// 	}
// 	return false;
// }

public void updateDefs() {
	try {
		PreparedStatement pstmtGetAllRecos=con.prepareStatement("SELECT * FROM `Recos`;", ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
		ResultSet rs=pstmtGetAllRecos.executeQuery();
		String now=now();
		while (rs.next()) {
			long user_i=rs.getLong("user_i");
			String uri=rs.getString("uri");
			String title=rs.getString("title");
			String catsStr=rs.getString("cats");
			Categories cats=new Categories(catsStr);
			String desc=rs.getString("desc");
			Points pts=new Points(rs.getString("val"));
			updateDefCat(uri, cats, +1);
			updateDefTitle(uri, title, +1);
			updateDefDesc(uri, desc, +1);
			updateRecoStat(user_i, uri, pts, now, +1);
		}
	}
	catch (SQLException e) {
		err(e);
	}
}

public static void main(String... args) {
	// RecoeveDB db=new RecoeveDB();
	// db.deleteUser("Sophy.5912@gmail.com");
}
}// public class RecoeveDB
