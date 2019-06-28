package com.tim18.skynet.dto;

public class HotelSearchDTO {
	private String name;
	private String checkin;
	private String checkout;
	private int beds;
	private String address;
	
	public HotelSearchDTO(String name, String checkin, String checkout, int beds, String address) {
		super();
		this.name = name;
		this.checkin = checkin;
		this.checkout = checkout;
		this.beds = beds;
		this.address = address;
	}
	public HotelSearchDTO() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCheckin() {
		return checkin;
	}
	public void setCheckin(String checkin) {
		this.checkin = checkin;
	}
	public String getCheckout() {
		return checkout;
	}
	public void setCheckout(String checkout) {
		this.checkout = checkout;
	}
	public int getBeds() {
		return beds;
	}
	public void setBeds(int beds) {
		this.beds = beds;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
}
