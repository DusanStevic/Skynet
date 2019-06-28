package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "flight")
public class Flight {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne
	@JsonIgnore
	private Airline airline;
	
	@Column(name = "startDate", unique = false, nullable = false)
	private Date startDate;
	
	@Column(name = "endDate", unique = false, nullable = false)
	private Date endDate;
	
	@Column(name = "flightDuration", unique = false, nullable = false)
	private int  flightDuration;
	
	@Column(name = "flightLength", unique = false, nullable = false)
	private int flightLength;
	
	@OneToOne()
	private Destination startDestination;
	
	@OneToOne()
	private Destination endDestination;
	
	@Column(name="rating", nullable = true)
	private double rating;
	
	
	
	
	
	/*@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Seat> seats = new HashSet<Seat>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	List<Room> rooms = new ArrayList<Room>();
	*/
	
	


	@JsonIgnore
	@OneToMany(mappedBy = "flight", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	//Set<Seat> seats = new HashSet<Seat>();
	List<Seat> seats = new ArrayList<Seat>();
	
	
	
	
	
	@Column(name = "buisinessPrice", unique = false, nullable = true)
	private double businessPrice;
	
	@Column(name = "economicPrice", unique = false, nullable = true)
	private double economicPrice;
	
	@Column(name = "firstClassPrice", unique = false, nullable = true)
	private double firstClassPrice;
	
	public Flight() {
		// TODO Auto-generated constructor stub
	}

	
	public Flight( Airline airline ,Date startDate, Date endDate, int flightDuration, int flightLength,
			Destination startDestination, Destination endDestination, List<Seat> seats,
			double businessPrice, double economicPrice, double firstClassPrice) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.flightDuration = flightDuration;
		this.flightLength = flightLength;
		this.startDestination = startDestination;
		this.endDestination = endDestination;
		this.seats = seats;
		this.businessPrice = businessPrice;
		this.economicPrice = economicPrice;
		this.firstClassPrice = firstClassPrice;
		this.airline = airline;
		this.rating = 0;
	}


	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public int getFlightDuration() {
		return flightDuration;
	}

	public void setFlightDuration(int flightDuration) {
		this.flightDuration = flightDuration;
	}

	public int getFlightLength() {
		return flightLength;
	}

	public void setFlightLength(int flightLength) {
		this.flightLength = flightLength;
	}

	/*public Set<String> getDestinationsOnTheWay() {
		return destinationsOnTheWay;
	}

	public void setDestinationsOnTheWay(Set<String> destinationsOnTheWay) {
		this.destinationsOnTheWay = destinationsOnTheWay;
	}
*/
	public List<Seat> getSeats() {
		return seats;
	}

	public void setSeats(List<Seat> seats) {
		this.seats = seats;
	}

	public double getBusinessPrice() {
		return businessPrice;
	}

	public void setBusinessPrice(double businessPrice) {
		this.businessPrice = businessPrice;
	}

	public double getEconomicPrice() {
		return economicPrice;
	}

	public void setEconomicPrice(double economicPrice) {
		this.economicPrice = economicPrice;
	}

	public double getFirstClassPrice() {
		return firstClassPrice;
	}

	public void setFirstClassPrice(double firstClassPrice) {
		this.firstClassPrice = firstClassPrice;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}



	public Destination getStartDestination() {
		return startDestination;
	}



	public void setStartDestination(Destination startDestination) {
		this.startDestination = startDestination;
	}

	public Destination getEndDestination() {
		return endDestination;
	}



	public void setEndDestination(Destination endDestination) {
		this.endDestination = endDestination;
	}


	


	public double getRating() {
		return rating;
	}


	public void setRating(double rating) {
		this.rating = rating;
	}


	public Airline getAirline() {
		return airline;
	}


	public void setAirline(Airline airline) {
		this.airline = airline;
	}


	@Override
	public String toString() {
		return "Flight [id=" + id + ", airline=" + airline + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", flightDuration=" + flightDuration + ", flightLength=" + flightLength + ", startDestination="
				+ startDestination + ", endDestination=" + endDestination + ", rating=" + rating + ", seats=" + seats
				+ ", businessPrice=" + businessPrice + ", economicPrice=" + economicPrice + ", firstClassPrice="
				+ firstClassPrice + "]";
	}


	

	

	

}
