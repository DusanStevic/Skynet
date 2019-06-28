package com.tim18.skynet.dto;

public class HotelOfferDTO {
	private long id;
	private long hotel_id;
	private String name;
	private String description;
	private double price;
	
	public HotelOfferDTO() {
		super();
	}
	public HotelOfferDTO(long id, long hotel_id, String name, String description, double price) {
		super();
		this.id = id;
		this.hotel_id = hotel_id;
		this.name = name;
		this.description = description;
		this.price = price;
	}
	
	public HotelOfferDTO(String name, String description, double price) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getHotel_id() {
		return hotel_id;
	}
	public void setHotel_id(long hotel_id) {
		this.hotel_id = hotel_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
}
