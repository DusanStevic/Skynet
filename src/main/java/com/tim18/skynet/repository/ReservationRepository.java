package com.tim18.skynet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{

}