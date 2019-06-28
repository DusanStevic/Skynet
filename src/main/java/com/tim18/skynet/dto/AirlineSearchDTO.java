package com.tim18.skynet.dto;

public class AirlineSearchDTO {
	private String name;
	private String departure;
	private String arrival;
	private long passangers;
	private String startDestination;
	private String endDestination;
	
	public AirlineSearchDTO(String name, String departure, String arrival, int passangers, String startDestination,
			String endDestination) {
		super();
		this.name = name;
		this.departure = departure;
		this.arrival = arrival;
		this.passangers = passangers;
		this.startDestination = startDestination;
		this.endDestination = endDestination;
	}
	public AirlineSearchDTO() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDeparture() {
		return departure;
	}
	public void setDeparture(String departure) {
		this.departure = departure;
	}
	public String getArrival() {
		return arrival;
	}
	public void setArrival(String arrival) {
		this.arrival = arrival;
	}
	public long getPassangers() {
		return passangers;
	}
	public void setPassangers(long passangers) {
		this.passangers = passangers;
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
	
	
}

