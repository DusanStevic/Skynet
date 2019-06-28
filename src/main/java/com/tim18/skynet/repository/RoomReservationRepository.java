package com.tim18.skynet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.RoomReservation;

public interface RoomReservationRepository extends JpaRepository<RoomReservation, Long>{

}