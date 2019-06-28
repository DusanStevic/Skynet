package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.RoomReservation;
import com.tim18.skynet.model.SeatReservation;
import com.tim18.skynet.repository.RoomReservationRepository;
import com.tim18.skynet.repository.SeatReservationRepository;
import com.tim18.skynet.service.RoomReservationService;
import com.tim18.skynet.service.SeatReservationService;
@Service
public class SeatReservationServiceImpl implements SeatReservationService{

	@Autowired
	private SeatReservationRepository seatReservationRepository;
	
	@Override
	public SeatReservation save(SeatReservation seatReservation) {
		return seatReservationRepository.save(seatReservation);
	}

	@Override
	public SeatReservation findOne(Long id) {
		return seatReservationRepository.getOne(id);
	}

	@Override
	public List<SeatReservation> findAll() {
		return seatReservationRepository.findAll();
	}

	@Override
	public void delete(Long id) {
		seatReservationRepository.deleteById(id);	
		
	}

}
