package com.tim18.skynet.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class HotelAdmin extends User{
	private static final long serialVersionUID = -1831516149566167290L;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "hotel_id", referencedColumnName = "id")
	private Hotel hotel;

	public HotelAdmin() {
		super();
	}

	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
