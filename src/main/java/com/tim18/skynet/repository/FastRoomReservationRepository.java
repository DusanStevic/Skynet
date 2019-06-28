package com.tim18.skynet.repository;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tim18.skynet.model.FastRoomReservation;

public interface FastRoomReservationRepository extends JpaRepository<FastRoomReservation, Long>{
	
	@Query("SELECT DISTINCT fr FROM FastRoomReservation fr " +
		    "WHERE fr.room.hotel.id = ?1 " +
			"AND fr.room.bedNumber = ?4 " +
		    "AND (fr.startDate <= ?2 AND fr.endDate >= ?3) " +
			"AND fr.room.id NOT IN " +
				"(SELECT DISTINCT rr.reservedRoom.id FROM RoomReservation rr "+
		   		"WHERE ((rr.checkIn <= ?3 AND rr.checkOu >= ?3) " +
		   		"OR (rr.checkIn <= ?2 AND rr.checkOu >= ?3) " +
		   		"OR (rr.checkOu >= ?2 AND rr.checkOu <= ?3) " +
		   		"OR (rr.checkIn >= ?2 AND rr.checkOu <= ?3)))")
	ArrayList<FastRoomReservation> getAvailbleFastReservaions(long hotelId, Date checkin, Date checkout, int beds);
}