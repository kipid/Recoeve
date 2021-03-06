package recoeve.http;

// import com.sun.mail.smtp.SMTPTransport;

// import java.security.Security;
// import java.util.Date;
import java.util.Properties;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

// For import: download javax.mail.jar file from <a href="https://java.net/projects/javamail/pages/Home">Java.net - The Source for Java Technology Collaboration - JavaMail API</a>
// and include the filepath in classpath.
// C:\Users\강수\Documents\DaumCloud\JAVA\classes\javax.mail.jar

// API: Package com.sun.mail.smtp
// https://javamail.java.net/nonav/docs/api/com/sun/mail/smtp/package-summary.html

// https://developers.google.com/appengine/docs/java/mail/usingjavamail

/**
 * http://stackoverflow.com/questions/3649014/send-email-using-java
 * asked Sep 6 '10 at 4:34 by Mohit Bansal
 * @author doraemon
 */
public class Gmail{
	public static void main(String... args) throws Exception {
		// Gmail.sendVeriKey("recoeve@gmail.com", "kipid", "dfij378asd91fa9sdf1kraq9defr134nr913hjred9af");
        // Gmail.sendChangePwd("recoeve@gmail.com", "29riw7fus8dfu8348u48f8uf", "ko");
	}

    public static String host=//"recoeve.net";
                            "localhost";

    public static void sendChangePwd(String id, String email, String token, String lang) throws AddressException, MessagingException {
        String title="Forgot password on Recoeve.net?";
        if (lang.equals("ko")) {
            title="Recoeve.net의 비밀번호를 잊어버리셨나요?";
        }
        String url="http://"+host+"/account/changePwd?id="+id+"&email="+email+"&token="+token;
        String msg="<span style='line-height:1.6; font-family:'Malgun Gothic', '맑은 고딕', 나눔고딕, NanumGothic, Tahoma, Sans-serif; font-size:15px'>Within 10 minutes after you receive this email, please visit <a href='"+url+"&lang=en"+"'>"+url+"&lang=en"+"</a>.<br><br>이메일을 받으신 후 10분내로 다음 링크를 방문해주세요. <a href='"+url+"&lang=ko"+"'>"+url+"&lang=ko"+"</a></span>";
        Gmail.send("recoeve", "com$goscarekl12", email, "", title, msg);
    }
	
	public static void sendVeriKey(String email, String id, String veriKey) throws AddressException, MessagingException {
		String title="Verify your account on Recoeve.";
		String url="http://"+host+"/account/verify/"+id+"/"+veriKey;
		String msg="<span style='line-height:1.6; font-family:'Malgun Gothic', '맑은 고딕', 나눔고딕, NanumGothic, Tahoma, Sans-serif; font-size:15px'>Thanks for your registration on <a href='http://recoeve.net/'>Recoeve.net</a>.<br><br>Please log in <a href='http://recoeve.net/'>Recoeve.net</a> first, then click the following link to verify your account:<br><a href='"+url+"'>"+url+"</a><br><br><a href='http://recoeve.net/'>Recoeve.net</a> 가입을 환영합니다.<br><br>계정 이메일 인증을 위해 로그인 후 다음 링크를 클릭해 주세요.:<a href='"+url+"'>"+url+"</a><br></span>";
		Gmail.send("recoeve", "com$goscarekl12", email, "", title, msg);
	}

    /**
     * Send email using GMail SMTP server.
     *
     * @param username GMail username
     * @param password GMail password
     * @param recipientEmail TO recipient
     * @param ccEmail CC recipient. Can be empty if there is no CC recipient
     * @param title title of the message
     * @param message message to be sent
     * @throws AddressException if the email address parse failed
     * @throws MessagingException if the connection is dead or not in the connected state or if the message is not a MimeMessage
     */
    public static void send(final String username, final String password, String recipientEmail, String ccEmail, String title, String message) throws AddressException, MessagingException {
        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); // TLS

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress("noreply@recoeve.com"));
            msg.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(recipientEmail)
            );
            msg.setSubject(title);
            msg.setContent(message, "text/html; charset=utf-8");

            Transport.send(msg);
        }
        catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}