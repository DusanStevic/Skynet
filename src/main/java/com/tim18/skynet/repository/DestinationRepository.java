package com.tim18.skynet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.Destination;



public interface DestinationRepository extends JpaRepository<Destination, Long> {
	
	
	public Destination findByName(String name);

}
