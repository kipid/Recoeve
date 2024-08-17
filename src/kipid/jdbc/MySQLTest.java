package kipid.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySQLTest {
	public static void main(String... args) {
		Connection conn = null;

		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

			String url = "jdbc:mysql://localhost:3306/recoeve0.1?serverTimezone=UTC";

			conn = DriverManager.getConnection(url, "eve", "$repakeoco#eve");
			System.out.println("연결 성공");
		}
		catch(ClassNotFoundException e) {
			System.out.println("드라이버 로딩 실패");
		}
		catch(SQLException e) {
			System.out.println("에러: "+e);
		}
		finally {
			try {
				if (conn!=null && !conn.isClosed()) {
					conn.close();
				}
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}