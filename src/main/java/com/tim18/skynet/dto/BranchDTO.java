package com.tim18.skynet.dto;

public class BranchDTO {
	private  Long id;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	private String city;
	private String address;
	
	public BranchDTO() {
		
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public BranchDTO(String city, String address) {
		super();
		this.city = city;
		this.address = address;
	}
	
	
}
