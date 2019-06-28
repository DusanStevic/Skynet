package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class RegisteredUser extends User {
	
	

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@JsonIgnore
	@OneToMany(mappedBy = "sent", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private List<FriendRequest> sent = new ArrayList<>();
	


	
	@JsonIgnore
	@OneToMany(mappedBy = "received", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private List<FriendRequest> received = new ArrayList<>();

	

	@ManyToMany(mappedBy = "passangers", cascade = CascadeType.REFRESH)
	private List<Reservation> reservations = new ArrayList<Reservation>();
	
	@ManyToMany(mappedBy = "invites", cascade = CascadeType.REFRESH)
	private List<Reservation> invites = new ArrayList<Reservation>();
	
	public RegisteredUser() {
		// TODO Auto-generated constructor stub
	}
	
	public RegisteredUser( String username, String password, String firstName, String lastName, String email) {
		super(username,password,firstName,lastName,email);
	}

	
	
	public static void save(CarReservation cr) {
		 ArrayList<CarReservation> reservationMy = new ArrayList<>();
		 reservationMy.add(cr);
		 
		}
	
	
	
	


	public List<FriendRequest> getSent() {
		return sent;
	}

	public void setSent(List<FriendRequest> sent) {
		this.sent = sent;
	}

	public List<FriendRequest> getReceived() {
		return received;
	}

	public void setReceived(List<FriendRequest> received) {
		this.received = received;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
    @JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
    @JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

	



}

