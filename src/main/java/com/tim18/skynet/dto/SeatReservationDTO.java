package com.tim18.skynet.dto;

import java.util.ArrayList;
import java.util.Date;

public class SeatReservationDTO {
	private Long flight_id;
	
	
	private ArrayList<String> seats=new ArrayList<>();
	
	
	private double total =0.0;


	public Long getFlight_id() {
		return flight_id;
	}


	public void setFlight_id(Long flight_id) {
		this.flight_id = flight_id;
	}


	public ArrayList<String> getSeats() {
		return seats;
	}


	public void setSeats(ArrayList<String> seats) {
		this.seats = seats;
	}


	public double getTotal() {
		return total;
	}


	public void setTotal(double total) {
		this.total = total;
	}
	
	
	
	
	
	
	
	
}
