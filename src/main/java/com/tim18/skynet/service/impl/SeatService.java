package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.Seat;
import com.tim18.skynet.repository.SeatRepository;



@Service
public class SeatService {
	
	@Autowired
	SeatRepository repository;
	
	public Seat findOne(Long id) {
		return repository.getOne(id);//repository.findOne();
	}

	public List<Seat> findAll() {
		return repository.findAll();
	}
	
	public Page<Seat> findAll(Pageable page) {
		return repository.findAll(page);
	}

	public Seat save(Seat seat) {
		return repository.save(seat);
	}
	
	public List<Seat> saveAll (List<Seat> seats){
		return repository.saveAll(seats);
	}

	public void remove(Long id) {
		repository.deleteById(id);
	}
	
	public Seat findByFlightIdAndId(Long id_leta, Long id_sedista){
		return repository.findByFlightIdAndId(id_leta,id_sedista);
	}

}
