package com.tim18.skynet.dto;

public class ReservationInfo {
	private int days;
	private String start;
	private String end;

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	public ReservationInfo(int days, String start, String end) {
		super();
		this.days = days;
		this.start = start;
		this.end = end;
	}

	public ReservationInfo() {
		super();
	}
	
	
}
