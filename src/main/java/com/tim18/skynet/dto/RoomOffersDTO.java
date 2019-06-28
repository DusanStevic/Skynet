package com.tim18.skynet.dto;

import java.util.ArrayList;
import java.util.List;


public class RoomOffersDTO {
	private List<String> roomOffers = new ArrayList<String>();
	private String sort;
	
	public RoomOffersDTO(List<String> roomOffers) {
		super();
		this.roomOffers = roomOffers;
	}
	
	public RoomOffersDTO(List<String> roomOffers, String sort) {
		super();
		this.sort = sort;
		this.roomOffers = roomOffers;
	}

	public RoomOffersDTO() {
		super();
	}

	public List<String> getRoomOffers() {
		return roomOffers;
	}

	public void setRoomOffers(List<String> roomOffers) {
		this.roomOffers = roomOffers;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}
}
