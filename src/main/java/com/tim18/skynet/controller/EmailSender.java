package com.tim18.skynet.controller;


import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.EmailDTO;
import com.tim18.skynet.security.TokenHelper;

@RestController
public class EmailSender {

	static Properties mailServerProperties;
	static Session getMailSession;
	static MimeMessage generateMailMessage;
	
	@Autowired
	TokenHelper tokenUtils;
	
	@PostMapping("/sendEmail")
	public void sendEmail(@RequestBody EmailDTO email) throws AddressException, MessagingException{
		System.out.println("SALJEM MAIL");
		mailServerProperties = System.getProperties();
		mailServerProperties.put("mail.smtp.port", "587");
		mailServerProperties.put("mail.smtp.auth", "true");
		mailServerProperties.put("mail.smtp.starttls.enable", "true");

		getMailSession = Session.getDefaultInstance(mailServerProperties, null);
		generateMailMessage = new MimeMessage(getMailSession);
		generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(email.getEmail()));
		//generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress("sonjajosanov98@gmail.com"));
		generateMailMessage.setSubject(email.getSubject());
		String emailBody = email.getBody();
		generateMailMessage.setContent(emailBody, "text/html");

		Transport transport = getMailSession.getTransport("smtp");
		transport.connect("smtp.gmail.com", "hotelivozilaavioni@gmail.com", "hajmopoloziti123!");
		transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
		transport.close();
	}
}