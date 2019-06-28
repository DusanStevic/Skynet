package com.tim18.skynet.dto;

public class FastReserveDTO {
	private long fastId;
	private String startDate;
	private String endDate;
	
	public FastReserveDTO(long fastId, String startDate, String endDate) {
		super();
		this.fastId = fastId;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	public FastReserveDTO() {
		super();
	}
	public long getFastId() {
		return fastId;
	}
	public void setFastId(long fastId) {
		this.fastId = fastId;
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
