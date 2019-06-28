package com.tim18.skynet.dto;

import java.util.ArrayList;
import java.util.List;

public class RoomSearchDTO {
	private String checkin;
	private String checkout;
	private int beds;
	private String sort;
	private List<String> roomOffers = new ArrayList<String>();
	
	public RoomSearchDTO(String checkin, String checkout, int beds, String sort, List<String> roomOffers) {
		super();
		this.checkin = checkin;
		this.checkout = checkout;
		this.beds = beds;
		this.sort = sort;
		this.roomOffers = roomOffers;
	}
	
	public List<String> getRoomOffers() {
		return roomOffers;
	}

	public void setRoomOffers(List<String> roomOffers) {
		this.roomOffers = roomOffers;
	}

	public RoomSearchDTO() {
		super();
	}
	public String getCheckin() {
		return checkin;
	}
	public void setCheckin(String checkin) {
		this.checkin = checkin;
	}
	public String getCheckout() {
		return checkout;
	}
	public void setCheckout(String checkout) {
		this.checkout = checkout;
	}
	public int getBeds() {
		return beds;
	}
	public void setBeds(int beds) {
		this.beds = beds;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	
	
}
