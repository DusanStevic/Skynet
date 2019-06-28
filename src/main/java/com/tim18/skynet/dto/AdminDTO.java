package com.tim18.skynet.dto;

public class AdminDTO {
	private String company;
	protected String name;
	protected String surname;
	protected String username;
	protected String password;
	protected String email;
	
	public AdminDTO(String company, String name, String surname, String username, String password, String email) {
		super();
		this.company = company;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	public AdminDTO() {
		super();
	}
	
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
}
