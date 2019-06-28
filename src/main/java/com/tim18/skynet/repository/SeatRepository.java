package com.tim18.skynet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.Seat;



public interface SeatRepository extends JpaRepository<Seat, Long> {
	public Seat findByFlightIdAndId(Long id_leta, Long id_sedista);

}
