package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.RoomReservation;
import com.tim18.skynet.repository.RoomReservationRepository;
import com.tim18.skynet.service.RoomReservationService;
@Service
public class RoomReservationServiceImpl implements RoomReservationService{

	@Autowired
	private RoomReservationRepository roomReservationRepository;
	
	@Override
	public RoomReservation save(RoomReservation roomReservation) {
		return roomReservationRepository.save(roomReservation);
	}

	@Override
	public RoomReservation findOne(Long id) {
		return roomReservationRepository.getOne(id);
	}

	@Override
	public List<RoomReservation> findAll() {
		return roomReservationRepository.findAll();
	}

	@Override
	public void delete(Long id) {
		roomReservationRepository.deleteById(id);	
		
	}

}
