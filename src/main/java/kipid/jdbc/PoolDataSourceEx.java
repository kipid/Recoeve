// package kipid.jdbc;

// import java.sql.*;
// import javax.sql.DataSource; // http://docs.oracle.com/javase/8/docs/api/index.html

// import java.util.Properties;

// import javax.naming.Context;
// import javax.naming.InitialContext;
// import javax.naming.NamingException;

// // import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
// import com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource;


// public class PoolDataSourceEx {
// 	public static void err(Exception e) {
// 		System.out.println(e);
// 	}

// 	//////////////////////////////////////////////////
// 	// Using Context (failed)
// 	//////////////////////////////////////////////////
// 	// public static InitialContext createContext(){
// 	// 	InitialContext context = null;
// 	// 	Properties env = new Properties();
// 	// 	try {
// 	// 		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory"); // What should I put here???
// 	// 		env.put(Context.PROVIDER_URL, "ldap://ldap.wiz.com:389");
// 	// 		context = new InitialContext(env);
// 	// 	} catch (NamingException e){
// 	// 		err(e);
// 	// 	}
// 	// 	return context;
// 	// }

// 	public static void main(String... args) throws Exception {
// 		System.out.println("Hello World!");
// 		MysqlConnectionPoolDataSource ds = new MysqlConnectionPoolDataSource(); // http://www.docjar.com/docs/api/com/mysql/jdbc/jdbc2/optional/MysqlDataSource.html
// 		ds.setServerName("localhost");
// 		ds.setPort(3306);
// 		ds.setDatabaseName("test1");
// 		// ds.setURL("local/test1");
// 		ds.setUser("root");
// 		ds.setPassword("commyscarekl12");

// 		// try {
// 		// 	InitialContext ctx = createContext();
// 		// 	ctx.bind("jdbc/test1DB", ds);
// 		// } catch (NamingException e){
// 		// 	err(e);
// 		// }

// 		// MysqlDataSource ds = (MysqlDataSource)ctx.lookup("jdbc/test1DB");
// 		Connection con = null;
// 		try {
// 			con = ds.getConnection();
// 			// ... code to use the pooled
// 			// connection con
// 			viewTable(con);
// 		} catch (Exception e) {
// 			// ... code to handle exceptions
// 		} finally {
// 			if (con != null) con.close();
// 		}
// 	}

// 	public static void viewTable(Connection con)
// 		throws SQLException {
// 		Statement stmt = null;
// 		String query = "select * from student";
// 		try {
// 			stmt = con.createStatement();
// 			ResultSet rs = stmt.executeQuery(query);
// 			while (rs.next()) {
// 				System.out.println("data: "+rs.getString("name"));
// 			}
// 		} catch (SQLException e) {
// 			err(e);
// 		} finally {
// 			if (stmt != null) { stmt.close(); }
// 		}

// 		try (Statement stmt1 = con.createStatement()) {
// 			ResultSet rs = stmt1.executeQuery(query);
// 			int count=0;
// 			while (rs.next()) {
// 				System.out.println("data "+(++count)+": "+rs.getString("id")+"\t"+rs.getString("name"));
// 			}
// 		} catch (SQLException e) {
// 			err(e);
// 		}
// 	}
// }