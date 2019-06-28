package com.tim18.skynet.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class AirlineAdmin extends User{
private static final long serialVersionUID = -1831516149566167290L;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "airline_id", referencedColumnName = "id")
	private Airline airlineAdmin;

	public AirlineAdmin() {
		super();
	}

	public Airline getAirline() {
		return airlineAdmin;
	}

	public void setAirline(Airline airline) {
		this.airlineAdmin = airline;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
