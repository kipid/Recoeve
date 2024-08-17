package kipid.jdbc;

// import java.sql.Connection;
// import java.sql.SQLException;
import java.sql.*;

import java.util.Properties;

// import java.lang.Class;

class MySQL {
	public static void err(SQLException e) {
		System.out.println(e);
	}
	
	public static void viewTable(Connection con)
		throws SQLException {
		Statement stmt = null;
		String query = "select * from student";
		try {
			stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				System.out.println("data: "+rs.getString("name"));
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
				System.out.println("data "+(++count)+": "+rs.getString("id")+"\t"+rs.getString("name"));
			}
		} catch (SQLException e) {
			err(e);
		}
	}
	
	public static Connection getConnection()
		throws SQLException {
		Connection conn = null;
		Properties connectionProps = new Properties();
		connectionProps.put("user", "root");
		connectionProps.put("password", "commyscarekl12");
		conn = DriverManager.getConnection(
			"jdbc:mysql://localhost:3306/test1"
			, connectionProps);
		System.out.println("Connected to database");
		return conn;
	}
	
	public static void main(String... args){
		System.out.println("Hello World!");
		try {
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			Connection conn = getConnection();
			viewTable(conn);
		} catch (SQLException e) {
			err(e);
		}
	}
}