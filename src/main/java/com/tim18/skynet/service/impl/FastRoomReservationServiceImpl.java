package com.tim18.skynet.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.FastRoomReservation;
import com.tim18.skynet.repository.FastRoomReservationRepository;
import com.tim18.skynet.service.FastRoomReservationService;

@Service
public class FastRoomReservationServiceImpl implements FastRoomReservationService{

	@Autowired
	private FastRoomReservationRepository fastRoomReservationRepository;
	
	@Override
	public FastRoomReservation save(FastRoomReservation fastRoomReservation) {
		return fastRoomReservationRepository.save(fastRoomReservation);
	}

	@Override
	public FastRoomReservation findOne(Long id) {
		return fastRoomReservationRepository.getOne(id);
	}

	@Override
	public List<FastRoomReservation> findAll() {
		return fastRoomReservationRepository.findAll();
	}

	@Override
	public void delete(Long id) {
		fastRoomReservationRepository.deleteById(id);	
		
	}

	@Override
	public List<FastRoomReservation> getAvailbleFastReservaions(long hotelId, Date checkin, Date checkout, int beds) {
		return fastRoomReservationRepository.getAvailbleFastReservaions(hotelId, checkin, checkout, beds);
	}

}
