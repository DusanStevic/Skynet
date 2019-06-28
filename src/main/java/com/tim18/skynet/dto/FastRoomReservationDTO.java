package com.tim18.skynet.dto;

import java.util.ArrayList;
import java.util.List;

public class FastRoomReservationDTO {
	private long roomID;
	private long id;
	private int discount;
	private String start;
	private String end;
	private List<Long> hotelOffers = new ArrayList<Long>();
	
	public FastRoomReservationDTO(long roomID, long id, int discount, String start, String end,
			List<Long> hotelOffers) {
		super();
		this.roomID = roomID;
		this.id = id;
		this.discount = discount;
		this.start = start;
		this.end = end;
		this.hotelOffers = hotelOffers;
	}
	public FastRoomReservationDTO() {
		super();
	}
	public long getRoomID() {
		return roomID;
	}
	public void setRoomID(long roomID) {
		this.roomID = roomID;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
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
	public List<Long> getHotelOffers() {
		return hotelOffers;
	}
	public void setHotelOffers(List<Long> hotelOffers) {
		this.hotelOffers = hotelOffers;
	}
	
	
	
	
}
