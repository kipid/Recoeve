package recoeve.http;



// import com.sun.mail.smtp.*;

// import java.security.Security;
// import java.util.Date;
import java.util.Properties;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

// For import: download javax.mail.jar file from <a href="https://java.net/projects/javamail/pages/Home">Java.net - The Source for Java Technology Collaboration - JavaMail API</a>
// and include the filepath in classpath.
// C:\Recoeve\classes\javax.mail.jar

// API: Package com.sun.mail.smtp
// https://javamail.java.net/nonav/docs/api/com/sun/mail/smtp/package-summary.html

// https://developers.google.com/appengine/docs/java/mail/usingjavamail

/**
 * https://stackoverflow.com/questions/3649014/send-email-using-java
 * asked Sep 6 '10 at 4:34 by Mohit Bansal
 * @author doraemon
 */
public class Gmail{
	public static void sendChangePwd(String id, String email, String token, String lang)
			throws AddressException, MessagingException {
		String title="Forgot password on Recoeve.net?";
		if (lang.equals("ko")) {
			title="Recoeve.net 의 비밀번호를 잊어버리셨나요?";
		}
		String url="https://"+Recoeve.HOST+"/account/changePwd?id="+id+"&email="+email+"&token="+token;
		String msg="<span style='line-height:1.6; font-family:'Malgun Gothic', '맑은 고딕', 나눔고딕, NanumGothic, Tahoma, Sans-serif; font-size:27px'>Within 10 minutes after you receive this email, please visit<br><a href='"+url+"&lang=en"+"'>"+url+"&lang=en"+"</a>.<br><br><br><br>이메일을 받으신 후 10분내로 다음 링크를 방문해주세요.<br><a href='"+url+"&lang=ko"+"'>"+url+"&lang=ko"+"</a></span>";
		Gmail.send(email, "", title, msg);
	}

	public static void sendVeriKey(String email, String id, String veriKey)
			throws AddressException, MessagingException {
		String title="Verify your account on Recoeve.net";
		String url="https://"+Recoeve.HOST+"/account/verify/"+id+"/"+veriKey;
		String msg="<span style='line-height:1.6; font-family:'Malgun Gothic', '맑은 고딕', 나눔고딕, NanumGothic, Tahoma, Sans-serif; font-size:27px'>Thanks for your registration on <a href='https://recoeve.net/'>Recoeve.net</a>.<br><br>Please log in <a href='https://recoeve.net/'>Recoeve.net</a> first, and then click the following link to verify your account:<br><a href='"+url+"'>"+url+"</a><br><br><br><br><a href='https://recoeve.net/'>Recoeve.net</a> 가입을 환영합니다.<br><br>계정 이메일 인증을 위해 로그인 후 다음 링크를 클릭해 주세요.:<br><a href='"+url+"'>"+url+"</a><br></span>";
		Gmail.send(email, "", title, msg);
	}

	private static final String username="recoeve";
	private static final String amho="qoqrrwivnimrgwbf";
	private static final Properties prop = new Properties();
	static {
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", "587");
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.starttls.enable", "true"); // TLS
	}
	private static final Session session = Session.getInstance(
		prop, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, amho);
			}
		}
	);


	/**
	 * Send email using Gmail SMTP server.
	 *
	 * @param recipientEmail TO recipient
	 * @param ccEmail CC recipient. Can be empty if there is no CC recipient
	 * @param title title of the message
	 * @param message message to be sent
	 * @throws AddressException if the email address parse failed
	 * @throws MessagingException if the connection is dead or not in the connected state or if the message is not a MimeMessage
	 */
	public static void send(String recipientEmail, String ccEmail, String title, String message)
			throws AddressException, MessagingException {
		try {
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress("recoeve@gmail.com"));
			msg.setRecipients(
				Message.RecipientType.TO,
				InternetAddress.parse(recipientEmail)
			);
			msg.setSubject(title);
			msg.setContent(message, "text/html; charset=utf-8");

			Transport.send(msg);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	public static void main(String... args) throws Exception {
		// Gmail.sendVeriKey("kipid84@naver.com", "kipid", "dfij378asd91fa9sdf1kraq9defr134nr913hjred9af");
		// Gmail.sendChangePwd("kipid", "kipid84@naver.com", "29riw7fus8dfu8348u48f8uf", "ko");
	}
}