package com.tim18.skynet.dto;

public class RoomDTO {
	private String image;
	private double price;
	private int beds;
	private String description;
	private long id;
	
	public RoomDTO(String image, double price, int beds, String description, long id) {
		super();
		this.image = image;
		this.price = price;
		this.beds = beds;
		this.description = description;
		this.id = id;
	}
	public RoomDTO() {
		super();
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getBeds() {
		return beds;
	}
	public void setBeds(int beds) {
		this.beds = beds;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public long getId() {
		return id;
	}
	public void setId(long roomId) {
		this.id = roomId;
	}
}

