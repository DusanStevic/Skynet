package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class HotelOffer {
	@Id
	@GeneratedValue
	private long id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String description;
	@Column(nullable = false)
	private double price;
	
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "hotel_id", referencedColumnName = "id")
	private Hotel hotel;
	
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.REFRESH)
    @JoinTable(name = "reservation_hotel_offer", joinColumns = @JoinColumn(name="hotel_offer_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="room_reserv_id", referencedColumnName="id"))
	List<RoomReservation> roomReservations = new ArrayList<RoomReservation>();

	public HotelOffer(String name, String description, double price, Hotel hotel) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.hotel = hotel;
	}

	public HotelOffer() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public List<RoomReservation> getRoomReservations() {
		return roomReservations;
	}

	public void setRoomReservations(List<RoomReservation> roomReservations) {
		this.roomReservations = roomReservations;
	}
}
