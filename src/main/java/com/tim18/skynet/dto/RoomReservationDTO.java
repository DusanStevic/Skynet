package com.tim18.skynet.dto;

import java.util.ArrayList;
import java.util.List;

public class RoomReservationDTO {
	private int days;
	private long roomId;
	private long reservationId;
	private List<Long> hotelOffers = new ArrayList<Long>();
	private String checkin;
	private String checkout;
	

	public RoomReservationDTO() {
		super();
	}

	public List<Long> getHotelOffers() {
		return hotelOffers;
	}



	public void setHotelOffers(List<Long> hotelOffers) {
		this.hotelOffers = hotelOffers;
	}
	


	public RoomReservationDTO(int days, long roomId, long reservationId, List<Long> hotelOffers, String checkin,
			String checkout) {
		super();
		this.days = days;
		this.roomId = roomId;
		this.reservationId = reservationId;
		this.hotelOffers = hotelOffers;
		this.checkin = checkin;
		this.checkout = checkout;
	}

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}

	public long getRoomId() {
		return roomId;
	}

	public void setRoomId(long roomId) {
		this.roomId = roomId;
	}

	public long getReservationId() {
		return reservationId;
	}

	public void setReservationId(long reservationId) {
		this.reservationId = reservationId;
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
	
	
}

