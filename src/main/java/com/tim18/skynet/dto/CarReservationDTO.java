package com.tim18.skynet.dto;

import java.util.Date;

public class CarReservationDTO {
	private Date startDate;
	private Date endDate;
	private Integer passengers;
	private Long carId;
	
	public CarReservationDTO() {
		
	}
	public CarReservationDTO(Long carId, Date startDate, Date endDate, Integer passengers) {
		super();
		this.carId = carId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.passengers = passengers;
		
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
	public Integer getPassengers() {
		return passengers;
	}
	public void setPassengers(Integer passengers) {
		this.passengers = passengers;
	}
	public Long getCarId() {
		return carId;
	}
	public void setCarId(Long carId) {
		this.carId = carId;
	}
	
	
	
}
