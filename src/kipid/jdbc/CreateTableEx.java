package kipid.jdbc;

import java.sql.*;
import javax.sql.DataSource; // http://docs.oracle.com/javase/8/docs/api/index.html

import java.util.Properties;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
// com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource


public class CreateTableEx {
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
				System.err.println("Message: " + e.getMessage());
				Throwable t = ex.getCause();
				while(t != null) {
					System.out.println("Cause: " + t);
					t = t.getCause();
				}
			}
		}
	}
	
	// ResultSet rs; rs.getWarnings();
	// Statement stmt; stmt.getWarnings();
	public static void printWarnings(SQLWarning warning)
		throws SQLException {
		if (warning != null) {
			System.out.println("\n---Warning---\n");
			while (warning != null) {
				System.out.println("Message: " + warning.getMessage());
				System.out.println("SQLState: " + warning.getSQLState());
				System.out.print("Vendor error code: ");
				System.out.println(warning.getErrorCode());
				System.out.println("");
				warning = warning.getNextWarning();
			}
		}
	}
	
	//////////////////////////////////////////////////
	// Using Context (failed)
	//////////////////////////////////////////////////
	// public static InitialContext createContext(){
	// 	InitialContext context = null;
	// 	Properties env = new Properties();
	// 	try {
	// 		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory"); // What should I put here???
	// 		env.put(Context.PROVIDER_URL, "ldap://ldap.wiz.com:389");
	// 		context = new InitialContext(env);
	// 	} catch (NamingException e){
	// 		err(e);
	// 	}
	// 	return context;
	// }
	
	public MysqlDataSource ds;
	
	public void createDS(){
		ds = new MysqlDataSource(); // http://www.docjar.com/docs/api/com/mysql/jdbc/jdbc2/optional/MysqlDataSource.html
		ds.setServerName("localhost");
		ds.setPort(3306);
		ds.setDatabaseName("test1");
		// ds.setURL("local/test1");
		ds.setUser("root");
		ds.setPassword("commyscarekl12");
	}
	
	public static void dropTable(Connection con) throws SQLException {
		String dropString = "DROP TABLE IF EXISTS COFFEES";
		
		Statement stmt = null;
		try {
			stmt = con.createStatement();
			stmt.executeUpdate(dropString);
		} catch (SQLException e) {
			err(e);
		} finally {
			if (stmt != null) { stmt.close(); }
		}
	}
	
	public static void createTable(Connection con) throws SQLException {
		String createString =
			"create table COFFEES (" +
				"COF_NAME varchar(32) NOT NULL, " +
				"SUP_ID int NOT NULL, " +
				"PRICE float NOT NULL, " +
				"SALES integer NOT NULL, " +
				"TOTAL integer NOT NULL, " +
				"PRIMARY KEY (COF_NAME) "
				//+", FOREIGN KEY (SUP_ID) REFERENCES " + dbName + ".SUPPLIERS (SUP_ID)"
			+")";

		Statement stmt = null;
		try {
			stmt = con.createStatement();
			stmt.executeUpdate(createString);
		} catch (SQLException e) {
			err(e);
		} finally {
			if (stmt != null) { stmt.close(); }
		}
	}
	
	public static void populateTable(Connection con) throws SQLException {
		Statement stmt = null;
		try {
			stmt = con.createStatement();
			stmt.executeUpdate(
			"insert into COFFEES " +
			"values('Colombian', 00101, " +
			"7.99, 0, 0)");

			stmt.executeUpdate(
			"insert into COFFEES " +
			"values('French_Roast', " +
			"00049, 8.99, 0, 0)");

			stmt.executeUpdate(
			"insert into COFFEES " +
			"values('Espresso', 00150, 9.99, 0, 0)");

			stmt.executeUpdate(
			"insert into COFFEES " +
			"values('Colombian_Decaf', " +
			"00101, 8.99, 0, 0)");

			stmt.executeUpdate(
			"insert into COFFEES " +
			"values('French_Roast_Decaf', " +
			"00049, 9.99, 0, 0)");
		} catch (SQLException e) {
			err(e);
		} finally {
			if (stmt != null) { stmt.close(); }
		}
	}
	
	public static void main(String... args) throws Exception {
		System.out.println("Hello World!");
		CreateTableEx ct = new CreateTableEx();
		ct.createDS();
		
		Connection con = null;
		try {
			con = ct.ds.getConnection();
			dropTable(con); // Can be called if table 'COFFEES' exists.
			createTable(con); // Can be called once.
			populateTable(con); // Can be called once.
			viewTable(con);
		} catch (Exception e) {
			// ... code to handle exceptions
		} finally {
			if (con != null) con.close();
		}
	}
	
	public static void viewTable(Connection con)
		throws SQLException {
		Statement stmt = null;
		String query = "select * from COFFEES";
		try {
			stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				System.out.println("data: "+rs.getString("COF_NAME"));
			}
		} catch (SQLException e) {
			err(e);
		} finally {
			if (stmt != null) { stmt.close(); }
		}
		
		try (Statement stmt1 = con.createStatement()) {
			ResultSet rs = stmt1.executeQuery(query);
			int count=0;
			while (rs.next()) {
				System.out.println("data "+(++count)+": "+rs.getString("COF_NAME")+"\t"+rs.getInt("SUP_ID"));
			}
		} catch (SQLException e) {
			err(e);
		}
	}
}