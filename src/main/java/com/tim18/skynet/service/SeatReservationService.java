package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.SeatReservation;

public interface SeatReservationService {
	public SeatReservation save(SeatReservation seatReservation);
	public SeatReservation findOne(Long id);
	public List<SeatReservation> findAll();
	public void delete(Long id);
}