package com.tim18.skynet.repository;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tim18.skynet.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long>{
	
	@Query("SELECT DISTINCT h FROM Hotel h " +
			   "WHERE lower(h.name) like lower(concat('%', ?1,'%')) " + 
			   "AND lower(h.address) like lower(concat('%', ?2,'%')) " +
			   "AND (h.id in "+
				   "(SELECT DISTINCT r.hotel.id FROM Room r "+
			   		"WHERE r.bedNumber <= ?5 "+
			   		"AND r.id NOT IN "+
			   			"(SELECT DISTINCT rr.reservedRoom.id FROM RoomReservation rr "+
			   			"WHERE ((rr.checkIn <= ?4 AND rr.checkOu >= ?4) " +
			   			"OR (rr.checkIn <= ?3 AND rr.checkOu >= ?4) " +
			   			"OR (rr.checkOu >= ?3 AND rr.checkOu <= ?4) " +
			   			"OR (rr.checkIn >= ?3 AND rr.checkOu <= ?4))) "+
			   		"AND r.id NOT IN " +
			   			"(Select fr.room.id FROM FastRoomReservation fr " +
			   			"WHERE (fr.startDate > ?3 AND fr.startDate < ?4) OR (fr.endDate > ?3 AND fr.endDate < ?4))) " +
			   	"OR h.id in " +
			   		"(SELECT DISTINCT r2.hotel.id FROM Room r2 "+
			   		"WHERE r2.id not in (SELECT rr2.reservedRoom.id FROM RoomReservation rr2) AND r2.bedNumber <= ?5))")
		ArrayList<Hotel> findByNameAndAddressAndDateAndBeds(String name, String address, Date checkin, Date checkout, int beds);
	
		@Query("SELECT DISTINCT h FROM Hotel h " +
			   "WHERE lower(h.address) like lower(concat('%', ?1,'%')) " + 
			   "AND (h.id in "+
			   		"(SELECT DISTINCT r.hotel.id FROM Room r "+
			   		"WHERE r.bedNumber <= ?4 "+
			   		"AND r.id NOT IN "+
			   			"(SELECT DISTINCT rr.reservedRoom.id FROM RoomReservation rr "+
			   			"WHERE ((rr.checkIn <= ?3 AND rr.checkOu >= ?3) " +
			   			"OR (rr.checkIn <= ?2 AND rr.checkOu >= ?3) " +
			   			"OR (rr.checkOu >= ?2 AND rr.checkOu <= ?3) " +
			   			"OR (rr.checkIn >= ?2 AND rr.checkOu <= ?3))) "+
		   			"AND r.id NOT IN " +
			   			"(Select fr.room.id FROM FastRoomReservation fr " +
			   			"WHERE (fr.startDate > ?2 AND fr.startDate < ?3) OR (fr.endDate > ?2 AND fr.endDate < ?3))) " +
			   "OR h.id in " +
			   		"(SELECT DISTINCT r2.hotel.id FROM Room r2 "+
			   		"WHERE r2.id not in (SELECT rr2.reservedRoom.id FROM RoomReservation rr2) AND r2.bedNumber <= ?4))")
		ArrayList<Hotel> findByAddressAndDateAndBeds(String address, Date checkin, Date checkout, int beds);
		
		
		@Query("SELECT COALESCE(SUM(rr.reservedRoom.bedNumber),0), rr.checkIn FROM RoomReservation rr " +
				"WHERE rr.reservedRoom.hotel.id = ?1 " +
				"AND rr.checkIn <= NOW() " +
				"GROUP BY WEEKDAY(rr.checkIn)" +
				"ORDER BY WEEKDAY(rr.checkIn )")
		ArrayList<Object[]> dailyReport(long id);
		
		@Query("SELECT COALESCE(SUM(rr.reservedRoom.bedNumber),0), rr.checkIn FROM RoomReservation rr " +
				"WHERE rr.reservedRoom.hotel.id = ?1 " +
				"AND rr.checkIn <= NOW() " +
				"GROUP BY week(rr.checkIn)"+
				"ORDER BY week(rr.checkIn)" )
		ArrayList<Object[]> weeklyReport(long id);
		
		@Query("SELECT COALESCE(SUM(rr.reservedRoom.bedNumber),0), rr.checkIn FROM RoomReservation rr " +
				"WHERE rr.reservedRoom.hotel.id = ?1 " +
				"AND rr.checkIn <= NOW() " +
				"GROUP BY MONTH(rr.checkIn)"+
				"ORDER BY MONTH(rr.checkIn)")
		ArrayList<Object[]> monthlyReport(long id);
		
		@Query("SELECT rr.price FROM RoomReservation rr " +
				"WHERE rr.reservedRoom.hotel.id = ?1 " +
				"AND rr.checkIn >= ?2 AND rr.checkIn <= ?3")
		Long incomeReport(long id, Date date1, Date date2);

}

