package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.Reservation;

public interface ReservationService {
	public Reservation save(Reservation reservation);
	public Reservation findOne(Long id);
	public List<Reservation> findAll();
	public void delete(Long id);
}