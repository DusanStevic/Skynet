package com.tim18.skynet.dto;

public class FastSeatReservationDetailsDTO {
	
	private Long id;
	private Long flightId;
	private Long seatId;
	private double originPrice;
	private double discount;
	
	private String startDate;
	private String endDate;
	private String startDestination;
	private String endDestination;
	private int seatRow;
	private int seatColumn;
	private String travelClass;
	private boolean taken;
	
	public FastSeatReservationDetailsDTO() {
		// TODO Auto-generated constructor stub
	}

	public FastSeatReservationDetailsDTO(Long id, Long flightId, Long seatId, double originPrice, int discount) {
		super();
		this.id = id;
		this.flightId = flightId;
		this.seatId = seatId;
		this.originPrice = originPrice;
		this.discount = discount;
	}
	
	
	public FastSeatReservationDetailsDTO(Long id, Long flightId, Long seatId,double originPrice, double discount, String startDate, String endDate,
			String startDestination, String endDestination, int seatRow, int seatColumn, String travelClass, boolean taken) {
		super();
		this.id = id;
		this.flightId = flightId;
		this.seatId = seatId;
		this.originPrice = originPrice;
		this.discount = discount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.startDestination = startDestination;
		this.endDestination = endDestination;
		this.seatRow = seatRow;
		this.seatColumn = seatColumn;
		this.travelClass = travelClass;
		this.taken = taken;
	}

	public Long getFlightId() {
		return flightId;
	}

	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}

	public Long getSeatId() {
		return seatId;
	}

	public void setSeatId(Long seatId) {
		this.seatId = seatId;
	}

	public double getOriginPrice() {
		return originPrice;
	}

	public void setOriginPrice(double originPrice) {
		this.originPrice = originPrice;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getStartDestination() {
		return startDestination;
	}

	public void setStartDestination(String startDestination) {
		this.startDestination = startDestination;
	}

	public String getEndDestination() {
		return endDestination;
	}

	public void setEndDestination(String endDestination) {
		this.endDestination = endDestination;
	}

	public int getSeatRow() {
		return seatRow;
	}

	public void setSeatRow(int seatRow) {
		this.seatRow = seatRow;
	}

	public int getSeatColumn() {
		return seatColumn;
	}

	public void setSeatColumn(int seatColumn) {
		this.seatColumn = seatColumn;
	}

	public String getTravelClass() {
		return travelClass;
	}

	public void setTravelClass(String travelClass) {
		this.travelClass = travelClass;
	}

	public boolean isTaken() {
		return taken;
	}

	public void setTaken(boolean taken) {
		this.taken = taken;
	}
	
	
	

}
