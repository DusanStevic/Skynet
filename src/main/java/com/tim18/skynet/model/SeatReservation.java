package com.tim18.skynet.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class SeatReservation {
	
	@Id
	@GeneratedValue
	private long id;
	
	
	@Column(name = "datum", unique = false, nullable = false)
	private Date datum;
	
	@Column(nullable = false)
	private double price;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reserved_seat", referencedColumnName = "id")
	private Seat reservedSeat;
	
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "reservation_id", referencedColumnName = "id")
	private Reservation reservation;

	

	public SeatReservation() {
		super();
	}

	public SeatReservation(Date datum, double price, Seat reservedSeat) {
		super();
		this.datum = datum;
		this.price = price;
		this.reservedSeat = reservedSeat;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Seat getReservedSeat() {
		return reservedSeat;
	}

	public void setReservedSeat(Seat reservedSeat) {
		this.reservedSeat = reservedSeat;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}
}
