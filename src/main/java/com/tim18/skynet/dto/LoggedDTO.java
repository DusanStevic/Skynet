package com.tim18.skynet.dto;

public class LoggedDTO {
	private String token;

	public LoggedDTO(String token) {
		super();
		this.token = token;
	}

	public LoggedDTO() {
		super();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}

