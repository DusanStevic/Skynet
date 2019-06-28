package com.tim18.skynet.dto;

import java.util.List;

import com.tim18.skynet.model.Seat;



public class SeatsBean {
	
	private List<Seat> seats;
	private int economicCapacity_rows;
	private int economicCapacity_columns;
	private int buisinesssCapacity_rows;
	private int buisinesssCapacity_columns;
	private int firstClassCapacity_rows;
	private int firstClassCapacity_columns;
	private double businessPrice;
	private double economicPrice;
	private double firstClassPrice;
	
	public SeatsBean() {
		// TODO Auto-generated constructor stub
	}
	
	

	



	

	public SeatsBean(List<Seat> seats, int economicCapacity_rows, int economicCapacity_columns,
			int buisinesssCapacity_rows, int buisinesssCapacity_columns, int firstClassCapacity_rows,
			int firstClassCapacity_columns, double businessPrice, double economicPrice, double firstClassPrice) {
		super();
		this.seats = seats;
		this.economicCapacity_rows = economicCapacity_rows;
		this.economicCapacity_columns = economicCapacity_columns;
		this.buisinesssCapacity_rows = buisinesssCapacity_rows;
		this.buisinesssCapacity_columns = buisinesssCapacity_columns;
		this.firstClassCapacity_rows = firstClassCapacity_rows;
		this.firstClassCapacity_columns = firstClassCapacity_columns;
		this.businessPrice = businessPrice;
		this.economicPrice = economicPrice;
		this.firstClassPrice = firstClassPrice;
	}









	public List<Seat> getSeats() {
		return seats;
	}

	public void setSeats(List<Seat> seats) {
		this.seats = seats;
	}



	public int getEconomicCapacity_rows() {
		return economicCapacity_rows;
	}



	public void setEconomicCapacity_rows(int economicCapacity_rows) {
		this.economicCapacity_rows = economicCapacity_rows;
	}



	public int getEconomicCapacity_columns() {
		return economicCapacity_columns;
	}



	public void setEconomicCapacity_columns(int economicCapacity_columns) {
		this.economicCapacity_columns = economicCapacity_columns;
	}



	public int getBuisinesssCapacity_rows() {
		return buisinesssCapacity_rows;
	}



	public void setBuisinesssCapacity_rows(int buisinesssCapacity_rows) {
		this.buisinesssCapacity_rows = buisinesssCapacity_rows;
	}



	public int getBuisinesssCapacity_columns() {
		return buisinesssCapacity_columns;
	}



	public void setBuisinesssCapacity_columns(int buisinesssCapacity_columns) {
		this.buisinesssCapacity_columns = buisinesssCapacity_columns;
	}



	public int getFirstClassCapacity_rows() {
		return firstClassCapacity_rows;
	}



	public void setFirstClassCapacity_rows(int firstClassCapacity_rows) {
		this.firstClassCapacity_rows = firstClassCapacity_rows;
	}



	public int getFirstClassCapacity_columns() {
		return firstClassCapacity_columns;
	}



	public void setFirstClassCapacity_columns(int firstClassCapacity_columns) {
		this.firstClassCapacity_columns = firstClassCapacity_columns;
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









	@Override
	public String toString() {
		return "SeatsBean [seats=" + seats + ", economicCapacity_rows=" + economicCapacity_rows
				+ ", economicCapacity_columns=" + economicCapacity_columns + ", buisinesssCapacity_rows="
				+ buisinesssCapacity_rows + ", buisinesssCapacity_columns=" + buisinesssCapacity_columns
				+ ", firstClassCapacity_rows=" + firstClassCapacity_rows + ", firstClassCapacity_columns="
				+ firstClassCapacity_columns + "]";
	}
	
	
	
	
	
	

	


	
	
	
	
	

}
