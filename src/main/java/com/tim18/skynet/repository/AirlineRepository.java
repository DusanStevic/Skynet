package com.tim18.skynet.repository;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tim18.skynet.model.Airline;

public interface AirlineRepository extends JpaRepository<Airline, Long>{
	@Query("SELECT DISTINCT a FROM Airline a " +
			   "WHERE lower(a.name) like lower(concat('%', ?1,'%')) " + 
			   "AND a.id in " +
			   		"(SELECT DISTINCT f.airline.id FROM Flight f " +
			   		"WHERE f.airline.id = a.id " +
			   		"AND (date(f.startDate) = ?4) "+
			   		"AND (lower(f.startDestination.name) like lower(concat('%', ?2,'%')) AND lower(f.endDestination.name) like lower(concat('%', ?3,'%'))) "+
			   		"AND f.id NOT in "+
			   			"(SELECT s.flight.id "+
			   			"FROM Seat s " +
			   			"WHERE s.taken = 0 " +
			   			"GROUP BY s.flight.id "+
			   			"HAVING COUNT(s.id) < ?5)) ")
		ArrayList<Airline> findByNameAndAddressAndDate(String name, String start, String end, Date checkin, long beds);
	
	@Query("SELECT DISTINCT a FROM Airline a " +
			   "WHERE a.id in " +
			   		"(SELECT DISTINCT f.airline.id FROM Flight f " +
			   		"WHERE f.airline.id = a.id " +
			   		"AND (date(f.startDate) = ?3) "+
			   		"AND (lower(f.startDestination.name) like lower(concat('%', ?1,'%')) AND lower(f.endDestination.name) like lower(concat('%', ?2,'%'))) "+
			   		"AND f.id NOT in "+
			   			"(SELECT s.flight.id "+
			   			"FROM Seat s " +
			   			"WHERE s.taken = 0 " +
			   			"GROUP BY s.flight.id "+
			   			"HAVING COUNT(s.id) < ?4)) ")
		ArrayList<Airline> findByAddressAndDate(String start, String end, Date checkin, long beds);
}
