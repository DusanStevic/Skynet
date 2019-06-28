package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class RoomReservation {
	@Id
	@GeneratedValue
	private long id;
	@Column(nullable = false)
	private Date checkIn;
	@Column(nullable = false)
	private Date checkOu;
	@Column(nullable = false)
	private double price;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id", referencedColumnName = "id")
	private Room reservedRoom;
	
	@ManyToMany(mappedBy = "roomReservations", cascade = CascadeType.REFRESH)
	List<HotelOffer> hotelOffers = new ArrayList<HotelOffer>(); 
	
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "reservation_id", referencedColumnName = "id")
	private Reservation reservation;

	public RoomReservation() {
		super();
	}

	public RoomReservation(Room reservedRoom, Date checkIn, Date checkOu, double price) {
		super();
		this.reservedRoom = reservedRoom;
		this.checkIn = checkIn;
		this.checkOu = checkOu;
		this.price = price;
	}

	public RoomReservation(long id, Room reservedRoom, Date checkIn, Date checkOu, double price) {
		super();
		this.id = id;
		this.reservedRoom = reservedRoom;
		this.checkIn = checkIn;
		this.checkOu = checkOu;
		this.price = price;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Room getReservedRoom() {
		return reservedRoom;
	}

	public void setReservedRoom(Room reservedRoom) {
		this.reservedRoom = reservedRoom;
	}

	public Date getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(Date checkIn) {
		this.checkIn = checkIn;
	}

	public Date getCheckOu() {
		return checkOu;
	}

	public void setCheckOu(Date checkOu) {
		this.checkOu = checkOu;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public List<HotelOffer> getHotelOffers() {
		return hotelOffers;
	}

	public void setHotelOffers(List<HotelOffer> hotelOffers) {
		this.hotelOffers = hotelOffers;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}
	
	
}
