package com.tim18.skynet.service;

import java.util.Date;
import java.util.List;

import com.tim18.skynet.model.FastRoomReservation;

public interface FastRoomReservationService {
	public FastRoomReservation save(FastRoomReservation fastRoomReservation);
	public FastRoomReservation findOne(Long id);
	public List<FastRoomReservation> findAll();
	public List<FastRoomReservation> getAvailbleFastReservaions(long hotelId, Date checkin, Date checkout, int beds);
	public void delete(Long id);
}
