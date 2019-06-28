package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.FastSeatReservation;
import com.tim18.skynet.repository.FastSeatReservationRepository;



@Service
public class FastSeatReservationService {
	
	@Autowired
	FastSeatReservationRepository repository;
	
	public FastSeatReservation findOne(Long id) {
		return repository.getOne(id);//repository.findOne();
	}

	public List<FastSeatReservation> findAll() {
		return repository.findAll();
	}
	
	public Page<FastSeatReservation> findAll(Pageable page) {
		return repository.findAll(page);
	}
	
	public FastSeatReservation save(FastSeatReservation quickFlightReservation) {
		return repository.save(quickFlightReservation);
	}
	
	
	public void remove(Long id) {
		repository.deleteById(id);
	}

}
