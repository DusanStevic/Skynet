package com.tim18.skynet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Version;

@Entity
public class FastSeatReservation {
	
	
	@Id
	@GeneratedValue
	private Long id;
	
	@OneToOne
	private Seat seat;
	
	@ManyToOne
	private Flight flight;
	
	@Column(name = "originPrice")
	private double originPrice;
	
	@Column(name = "discount")
	private double discount;
	
	@Column(name = "taken")
	private boolean taken;
	
	@Version
	private Long version;
	
	public FastSeatReservation() {
		// TODO Auto-generated constructor stub
	}

	public FastSeatReservation(Seat seat, Flight flight, double originPrice, double discount) {
		super();
		this.seat = seat;
		this.flight = flight;
		this.originPrice = originPrice;
		this.discount = discount;
		this.taken = false;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Seat getSeat() {
		return seat;
	}

	public void setSeat(Seat seat) {
		this.seat = seat;
	}

	public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
	}

	public double getOriginPrice() {
		return originPrice;
	}

	public void setOriginPrice(double originPrice) {
		this.originPrice = originPrice;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public boolean isTaken() {
		return taken;
	}

	public void setTaken(boolean taken) {
		this.taken = taken;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}
	
	

}
