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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "seat")
public class Seat {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false)
	private Long id;
	
	/*@ManyToOne
	@JsonIgnore
	private Flight flight;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Hotel hotel;*/
	
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Flight flight;
	
	
	
	@Column(name = "taken", unique = false, nullable = false)
	private boolean taken;
	
	@Column(name = "SeatRow", unique = false, nullable = false)
	private int SeatRow;
	
	@Column(name = "SeatColumn", unique = false, nullable = false)
	private int SeatColumn;
	
    @Column(name = "travelClassa")
	private String travelClassa;
    
    @Column(name = "active", unique = false, nullable = false)
	private boolean active;
    
    @Column(name = "unavailable", unique = false, nullable = false)
   	private boolean unavailable;
    
    @Column(name = "fast", unique = false, nullable = false)
   	private boolean fast;
    
    
    //to do promeni listu u hash set
    @JsonIgnore
	@OneToMany(mappedBy = "reservedSeat", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	List<SeatReservation> reservations = new ArrayList<SeatReservation>();
    
    
   /* @JsonIgnore
	@OneToMany(mappedBy = "flight")
	private Set<FlightReservation> flightReservations = new HashSet<FlightReservation>();*/
	
	
	public Seat() {
		// TODO Auto-generated constructor stub
	}

	
	public Seat(boolean taken, int seatRow, int seatColumn, String travelClassa) {
		super();
		
		this.taken = taken;
		SeatRow = seatRow;
		SeatColumn = seatColumn;
		this.travelClassa = travelClassa;
		this.active = false;
		this.unavailable = false;
	}


	public List<SeatReservation> getReservations() {
		return reservations;
	}


	public void setReservations(List<SeatReservation> reservations) {
		this.reservations = reservations;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public boolean isTaken() {
		return taken;
	}

	public void setTaken(boolean taken) {
		this.taken = taken;
	}

	public int getSeatRow() {
		return SeatRow;
	}

	public void setSeatRow(int seatRow) {
		SeatRow = seatRow;
	}

	public int getSeatColumn() {
		return SeatColumn;
	}

	public void setSeatColumn(int seatColumn) {
		SeatColumn = seatColumn;
	}

	public String getTravelClassa() {
		return travelClassa;
	}

	public void setTravelClassa(String travelClassa) {
		this.travelClassa = travelClassa;
	}


	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}


	public boolean isUnavailable() {
		return unavailable;
	}


	public void setUnavailable(boolean unavailable) {
		this.unavailable = unavailable;
	}





	public Flight getFlight() {
		return flight;
	}


	public void setFlight(Flight flight) {
		this.flight = flight;
	}


	public boolean isFast() {
		return fast;
	}


	public void setFast(boolean fast) {
		this.fast = fast;
	}


	/*@Override
	public String toString() {
		return "Seat [id=" + id + ", flight=" + flight + ", taken=" + taken + ", SeatRow=" + SeatRow + ", SeatColumn="
				+ SeatColumn + ", travelClassa=" + travelClassa + ", active=" + active + ", unavailable=" + unavailable
				+ ", reservations=" + reservations + "]";
	}
	*/
	


	

	

	
	
	

}
