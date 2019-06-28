package com.tim18.skynet.dto;

public class ReservationDTO {
	private String startDate;
	private String endDate;
	private int days;
	
	
	
	public ReservationDTO(String startDate, String endDate, int days) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.days = days;
	}
	
	

	public int getDays() {
		return days;
	}



	public void setDays(int days) {
		this.days = days;
	}



	public ReservationDTO() {
		super();
	}
	
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
}
