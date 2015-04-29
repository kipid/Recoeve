package recoeve.http;

import com.sun.mail.smtp.SMTPTransport;

import java.security.Security;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
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
		// Gmail.sendVeriKey("kipid@hanmail.net", "kipid", "dfij378asd91fa9sdf1kraq9defr134nr913hjred9af");
	}
	
	public static void sendVeriKey(String email, String id, String veriKey) throws AddressException, MessagingException {
		String title="Verify your account on Recoeve.";
		String url="http://recoeve.net/account/verify/"+id+"/"+veriKey;
		String msg="<span style='line-height:1.6; font-family:'Malgun Gothic', '맑은 고딕', 나눔고딕, NanumGothic, Tahoma, Sans-serif; font-size:15px'>Thanks for your registration on <a href='http://recoeve.net/'>Recoeve.net</a>.<br><br>Please click the following link to verify your account:<br><a href='"+url+"'>"+url+"</a></span>";
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
        Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());
        final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";

        // Get a Properties object
        Properties props = System.getProperties();
        props.setProperty("mail.smtps.host", "smtp.gmail.com");
        props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
        props.setProperty("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.port", "465");
        props.setProperty("mail.smtp.socketFactory.port", "465");
        props.setProperty("mail.smtps.auth", "true");

        /*
        If set to false, the QUIT command is sent and the connection is immediately closed. If set 
        to true (the default), causes the transport to wait for the response to the QUIT command.

        ref :   http://java.sun.com/products/javamail/javadocs/com/sun/mail/smtp/package-summary.html
                http://forum.java.sun.com/thread.jspa?threadID=5205249
                smtpsend.java - demo program from javamail
        */
        props.put("mail.smtps.quitwait", "false");

        Session session = Session.getInstance(props, null);

        // -- Create a new message --
        final MimeMessage msg = new MimeMessage(session);

        // -- Set the FROM and TO fields --
        msg.setFrom(new InternetAddress("noreply@recoeve.com"));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail, false));

        if (ccEmail.length()>0) {
            msg.setRecipients(Message.RecipientType.CC, InternetAddress.parse(ccEmail, false));
        }

        msg.setSubject(title);
        msg.setContent(message, "text/html; charset=utf-8");
        msg.setSentDate(new Date());

        SMTPTransport t=(SMTPTransport)session.getTransport("smtps");

        t.connect("smtp.gmail.com", username, password);
        t.sendMessage(msg, msg.getAllRecipients());      
        t.close();
    }
}