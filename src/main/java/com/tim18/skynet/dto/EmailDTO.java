package com.tim18.skynet.dto;

public class EmailDTO {
	private String subject;
	private String body;
	private String email;
	public EmailDTO(String subject, String body, String email) {
		super();
		this.subject = subject;
		this.body = body;
		this.email = email;
	}
	public EmailDTO() {
		super();
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}

