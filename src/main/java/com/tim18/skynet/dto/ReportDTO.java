package com.tim18.skynet.dto;
public class ReportDTO {
	private String date1;
	private String date2;
	public ReportDTO(String date1, String date2) {
		super();
		this.date1 = date1;
		this.date2 = date2;
	}
	public ReportDTO() {
		super();
	}
	public String getDate1() {
		return date1;
	}
	public void setDate1(String date1) {
		this.date1 = date1;
	}
	public String getDate2() {
		return date2;
	}
	public void setDate2(String date2) {
		this.date2 = date2;
	}
	
	
}
