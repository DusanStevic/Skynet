package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.RoomReservation;

public interface RoomReservationService {
	public RoomReservation save(RoomReservation roomReservation);
	public RoomReservation findOne(Long id);
	public List<RoomReservation> findAll();
	public void delete(Long id);
}