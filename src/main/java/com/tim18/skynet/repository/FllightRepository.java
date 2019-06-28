package com.tim18.skynet.repository;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tim18.skynet.model.Flight;
import com.tim18.skynet.model.Room;



public interface FllightRepository extends JpaRepository<Flight, Long> {
	@Query("SELECT DISTINCT f FROM Flight f " +
			   		"WHERE f.airline.id = ?1 " +
			   		"AND (date(f.startDate) = ?4) "+
			   		"AND (lower(f.startDestination.name) like lower(concat('%', ?2,'%')) AND lower(f.endDestination.name) like lower(concat('%', ?3,'%'))) "+
			   		"AND f.id NOT in "+
			   			"(SELECT s.flight.id "+
			   			"FROM Seat s " +
			   			"WHERE s.taken = 0 " +
			   			"GROUP BY s.flight.id "+
			   			"HAVING COUNT(s.id) < ?5)")
	ArrayList<Flight> findAvailable(long id, String start, String end, Date checkin, long beds);

}
