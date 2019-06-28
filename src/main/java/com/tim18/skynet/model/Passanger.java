package com.tim18.skynet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Passanger {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(name = "firstName", unique = false, nullable = false)
	private String firstName;

	@Column(name = "lastName", unique = false, nullable = false)
	private String lastName;

	@Column(name = "passport", unique = false, nullable = false)
	private String passport;
	
	@OneToOne
	private Seat seat;

	public Passanger() {
		// TODO Auto-generated constructor stub
	}

	public Passanger( String firstName, String lastName, String passport, Seat seat) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.passport = passport;
		this.seat = seat;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getPassport() {
		return passport;
	}


	public void setPassport(String passport) {
		this.passport = passport;
	}


	public Seat getSeat() {
		return seat;
	}


	public void setSeat(Seat seat) {
		this.seat = seat;
	}

}
