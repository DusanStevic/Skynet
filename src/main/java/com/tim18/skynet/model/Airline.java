package com.tim18.skynet.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column; 
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Airline implements Serializable{
	/**
	 * 
	 */
	//private static final long serialVersionUID = 1L;
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
	
	@OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Destination> destinations = new HashSet<Destination>();
	
	@OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Flight>  flights = new  HashSet<Flight>();
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<FastSeatReservation> fastSeatReservation = new HashSet<FastSeatReservation>();
	
	
	
	



	public Set<FastSeatReservation> getFastSeatReservation() {
		return fastSeatReservation;
	}



	public void setFastSeatReservation(Set<FastSeatReservation> fastSeatReservation) {
		this.fastSeatReservation = fastSeatReservation;
	}



	public Airline() {
		super();
	}
	
	
	
	public Airline(String name, String address, String description, String image) {
		super();
		this.name = name;
		this.address = address;
		this.description = description;
		this.image = image;
	}



	public Airline(Long id,String name, String address, String description) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.description = description;
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}



	public Set<Destination> getDestinations() {
		return destinations;
	}



	public void setDestinations(Set<Destination> destinations) {
		this.destinations = destinations;
	}



	public Set<Flight> getFlights() {
		return flights;
	}



	public void setFlights(Set<Flight> flights) {
		this.flights = flights;
	}



}
