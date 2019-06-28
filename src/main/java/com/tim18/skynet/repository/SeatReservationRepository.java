package com.tim18.skynet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.SeatReservation;

public interface SeatReservationRepository extends JpaRepository<SeatReservation, Long>{

}
