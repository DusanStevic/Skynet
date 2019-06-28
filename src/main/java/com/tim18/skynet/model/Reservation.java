package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Reservation {
	
	
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false)
	private Long id;
	
	@Column(nullable = false)
	private double totalPrice;
	@Column(nullable = false)
	private boolean completed;
	
	@JsonIgnore
	@OneToMany(mappedBy = "reservation", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private List<SeatReservation> seatReservations = new ArrayList<SeatReservation>();
	@JsonIgnore
	@OneToMany(mappedBy = "reservation", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private List<RoomReservation> roomReservations = new ArrayList<RoomReservation>();
	@JsonIgnore
	@OneToMany(mappedBy = "reservation", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private List<CarReservation> carReservations = new ArrayList<CarReservation>();
	
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.REFRESH)
    @JoinTable(name = "inviting", joinColumns = @JoinColumn(name="reservation_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="user_id", referencedColumnName="id"))
	private List<RegisteredUser> invites = new ArrayList<RegisteredUser>();
	
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.REFRESH)
    @JoinTable(name = "reserving", joinColumns = @JoinColumn(name="reservation_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="user_id", referencedColumnName="id"))
	private List<RegisteredUser> passangers = new ArrayList<RegisteredUser>();
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "initiator", referencedColumnName = "id")
	private RegisteredUser initiator;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	public List<SeatReservation> getSeatReservations() {
		return seatReservations;
	}
	public void setSeatReservations(List<SeatReservation> seatReservations) {
		this.seatReservations = seatReservations;
	}
	public List<RoomReservation> getRoomReservations() {
		return roomReservations;
	}
	public void setRoomReservations(List<RoomReservation> roomReservations) {
		this.roomReservations = roomReservations;
	}
	public List<CarReservation> getCarReservations() {
		return carReservations;
	}
	public void setCarReservations(List<CarReservation> carReservations) {
		this.carReservations = carReservations;
	}
	public List<RegisteredUser> getPassangers() {
		return passangers;
	}
	public void setPassangers(List<RegisteredUser> passangers) {
		this.passangers = passangers;
	}
	
	public boolean isCompleted() {
		return completed;
	}
	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
	
	public RegisteredUser getInitiator() {
		return initiator;
	}
	public void setInitiator(RegisteredUser initiator) {
		this.initiator = initiator;
	}
	
	
	public List<RegisteredUser> getInvites() {
		return invites;
	}
	public void setInvites(List<RegisteredUser> invites) {
		this.invites = invites;
	}
	public Reservation(Long id, double totalPrice, boolean completed, List<SeatReservation> seatReservations,
			List<RoomReservation> roomReservations, List<CarReservation> carReservations, List<RegisteredUser> invites,
			List<RegisteredUser> passangers, RegisteredUser initiator) {
		super();
		this.id = id;
		this.totalPrice = totalPrice;
		this.completed = completed;
		this.seatReservations = seatReservations;
		this.roomReservations = roomReservations;
		this.carReservations = carReservations;
		this.invites = invites;
		this.passangers = passangers;
		this.initiator = initiator;
	}
	public Reservation() {
		super();
	}
}
