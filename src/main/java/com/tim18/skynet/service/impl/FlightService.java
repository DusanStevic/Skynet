package com.tim18.skynet.service.impl;

import java.util.Collection;
import java.util.Date; 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.Flight;
import com.tim18.skynet.repository.FllightRepository;



@Service
public class FlightService {
	
	@Autowired
	FllightRepository repository;
	
	public Flight findOne(Long id) {
		return repository.getOne(id);//repository.findOne();
	}

	public List<Flight> findAll() {
		return repository.findAll();
	}
	
	public Page<Flight> findAll(Pageable page) {
		return repository.findAll(page);
	}

	public Flight save(Flight flight) {
		return repository.save(flight);
	}

	public void remove(Long id) {
		repository.deleteById(id);
	}
	
	public List<Flight> search(long id, String start, String end, Date checkin, long l) {
		return repository.findAvailable(id, start, end, checkin, l);
	}

}
