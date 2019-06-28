package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Hotel {
	
	@Id
	@GeneratedValue
	private Long id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String address;
	@Column(nullable = false)
	private String description;
	@Column(nullable = false)
	private String image;
	
	
	@JsonIgnore
	@OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	List<Room> rooms = new ArrayList<Room>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	List<HotelOffer> hotelOffers = new ArrayList<HotelOffer>();
	
	public Hotel() {
		super();
	}
	
	
	
	


	public Hotel(String name, String address, String description, String image) {
		super();
		this.name = name;
		this.address = address;
		this.description = description;
		this.image = image;
	}
	
	public Hotel(String name, String address, String description, List<Room> rooms) {
		super();
		this.name = name;
		this.address = address;
		this.description = description;
		this.rooms = rooms;
	}

	public Hotel(Long id, String name, String address, String description, String image, List<Room> rooms, List<HotelOffer> hotelOffers) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.description = description;
		this.image = image;
		this.rooms = rooms;
		this.hotelOffers = hotelOffers;
	}
	
	

	public List<HotelOffer> getHotelOffers() {
		return hotelOffers;
	}


	public void setHotelOffers(List<HotelOffer> hotelOffers) {
		this.hotelOffers = hotelOffers;
	}


	public String getImage() {
		return image;
	}



	public void setImage(String image) {
		this.image = image;
	}



	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
