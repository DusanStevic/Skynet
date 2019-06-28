package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim18.skynet.dto.RoomDTO;

@Entity
public class Room {
	@Id
	@GeneratedValue
	private long id;
	@Column(nullable = false)
	private double price;
	@Column(nullable = false)
	private String description;
	@Column(nullable = false)
	private int bedNumber;
	@Column(nullable = false)
	private int roomNumber;
	@Column(nullable = false)
	private String image;
	
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Hotel hotel;
	
	@ManyToMany(mappedBy = "rooms", cascade = CascadeType.REFRESH)
	List<RoomOffer> roomOffers = new ArrayList<RoomOffer>(); 
	
	@JsonIgnore
	@OneToMany(mappedBy = "reservedRoom", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	List<RoomReservation> reservations = new ArrayList<RoomReservation>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	List<FastRoomReservation> fastReservations = new ArrayList<FastRoomReservation>();

	public Room(double price, String description, int bedNumber, String image, Hotel hotel) {
		super();
		this.price = price;
		this.description = description;
		this.bedNumber = bedNumber;
		this.image = image;
		this.hotel = hotel;
	}

	public Room(RoomDTO room) {
		super();
		this.image = room.getImage();
		this.bedNumber = room.getBeds();
		this.price = room.getPrice();
		this.description = room.getDescription();
	}
	
	public Room(double price, String description, int bedNumber, String image, Hotel hotel,
			List<RoomOffer> roomOffers) {
		super();
		this.price = price;
		this.description = description;
		this.bedNumber = bedNumber;
		this.image = image;
		this.hotel = hotel;
		this.roomOffers = roomOffers;
	}

	
	


	public Room(long id, double price, String description, int bedNumber, String image, Hotel hotel,
			List<RoomOffer> roomOffers, List<RoomReservation> reservations) {
		super();
		this.id = id;
		this.price = price;
		this.description = description;
		this.bedNumber = bedNumber;
		this.image = image;
		this.hotel = hotel;
		this.roomOffers = roomOffers;
		this.reservations = reservations;
	}
	
	

	

	public Room(long id, double price, String description, int bedNumber, int roomNumber, String image, Hotel hotel,
			List<RoomOffer> roomOffers, List<RoomReservation> reservations,
			List<FastRoomReservation> fastReservations) {
		super();
		this.id = id;
		this.price = price;
		this.description = description;
		this.bedNumber = bedNumber;
		this.roomNumber = roomNumber;
		this.image = image;
		this.hotel = hotel;
		this.roomOffers = roomOffers;
		this.reservations = reservations;
		this.fastReservations = fastReservations;
	}

	public Room() {
		super();
	}
	
	@JsonIgnore
	public boolean containsOffer(String offer){
		boolean contains = false;
		for(RoomOffer ro : this.roomOffers){
			if(ro.getOffer().equals(offer)){
				contains = true;
			}
		}
		return contains;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getBedNumber() {
		return bedNumber;
	}

	public void setBedNumber(int bedNumber) {
		this.bedNumber = bedNumber;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public List<RoomOffer> getRoomOffers() {
		return roomOffers;
	}

	public void setRoomOffers(List<RoomOffer> roomOffers) {
		this.roomOffers = roomOffers;
	}

	public List<RoomReservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<RoomReservation> reservations) {
		this.reservations = reservations;
	}

	public int getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(int roomNumber) {
		this.roomNumber = roomNumber;
	}

	public List<FastRoomReservation> getFastReservations() {
		return fastReservations;
	}

	public void setFastReservations(List<FastRoomReservation> fastReservations) {
		this.fastReservations = fastReservations;
	}
}
