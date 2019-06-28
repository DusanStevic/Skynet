package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim18.skynet.dto.CarReservationDTO;

@Entity
public class CarReservation {

	@Id
	@GeneratedValue
	private Long id;
	
	@Column(name = "price")
	private Double price;
	
	@Column (name="discount")
	private Integer discount;
	
	@Column(name = "start_date")
	private Date startDate;
	
	@Column(name = "end_date")
	private Date endDate;
	
	@Column(name="num_of_pass")
	private Integer numOfPass;
	
	@ManyToOne(fetch = FetchType.EAGER)
	RegisteredUser registredUser;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	Reservation reservation;
	
	public void save(RegisteredUser ru) {
		ArrayList<RegisteredUser> user = new ArrayList<RegisteredUser>();
		user.add(ru);
	}
	
	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}


	@Column(name="flightId")
	Long flightId;
	
	@ManyToOne(fetch = FetchType.EAGER)
	Car car;

	@ManyToOne(fetch = FetchType.EAGER)
	RentACar rentacarRes;
	
	public CarReservation() {
		
	}
	
	public CarReservation(Date startDate, Date endDate) {
		this.startDate=startDate;
		this.endDate=endDate;
	}
	public Long getFlightId() {
		return flightId;
	}

	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}

	public CarReservation(CarReservationDTO dto) {
		this.startDate=dto.getStartDate();
		this.endDate=dto.getEndDate();
		this.numOfPass=dto.getPassengers();
		
	}

	public RentACar getRentacarRes() {
		return rentacarRes;
	}


	public void setRentacarRes(RentACar rentacarRes) {
		this.rentacarRes = rentacarRes;
	}


	


	public RegisteredUser getRegistredUser() {
		return registredUser;
	}

	public void setRegistredUser(RegisteredUser registredUser) {
		this.registredUser = registredUser;
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Double getPrice() {
		return price;
	}


	public void setPrice(Double price) {
		this.price = price;
	}


	public Date getStartDate() {
		return startDate;
	}


	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
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


	public Integer getNumOfPass() {
		return numOfPass;
	}


	public void setNumOfPass(Integer numOfPass) {
		this.numOfPass = numOfPass;
	}


	public Car getCar() {
		return car;
	}


	public void setCar(Car car) {
		this.car = car;
	}
	
	
}
