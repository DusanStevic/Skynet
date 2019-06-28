package com.tim18.skynet.repository;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tim18.skynet.model.RentACar;



public interface RentACarRepository extends JpaRepository<RentACar, Long> {
	
	@Query("SELECT r FROM RentACar r " +
			   "WHERE lower(r.name) like lower(concat('%', ?1,'%')) " + 
			   "AND lower(r.address) like lower(concat('%', ?2,'%'))")
		ArrayList<RentACar> findByNameAndAddress(String name, String address);
	
	
	@Query("SELECT r FROM RentACar r " +
			 "WHERE lower(r.name) like lower(concat('%', ?1,'%')) ")
	ArrayList<RentACar> findByName(String name);
	
	@Query("SELECT r FROM RentACar r " +
			   "WHERE lower(r.address) like lower(concat('%', ?2,'%'))")
	ArrayList<RentACar> findByAddress(String address);
	
	@Query("SELECT DISTINCT r FROM RentACar r " +
			   "WHERE lower(r.name) like lower(concat('%', ?1,'%')) " + 
			   "AND r.id in" +
			   		"(SELECT DISTINCT b.rentacar.id FROM Branch b " +
			   		"WHERE lower(b.city) like lower(concat('%', ?2,'%'))) " +
			   "AND (r.id in "+
				   "(SELECT DISTINCT v.rentacar.id FROM Car v "+
			   		"WHERE v.id NOT IN "+
			   			"(SELECT DISTINCT vr.car.id FROM CarReservation vr "+
			   			"WHERE ((vr.startDate <= ?4 AND vr.endDate >= ?4) " +
			   			"OR (vr.startDate <= ?3 AND vr.endDate >= ?4) " +
			   			"OR (vr.endDate >= ?3 AND vr.endDate <= ?4) " +
			   			"OR (vr.startDate >= ?3 AND vr.endDate <= ?4))))"+
			   	"OR r.id in " +
			   		"(SELECT DISTINCT r2.branch.rentacar.id FROM Car r2 "+
			   		"WHERE r2.id not in (SELECT vr2.car.id FROM CarReservation vr2)))")
		ArrayList<RentACar> findByNameAndAddressAndDateAndBeds(String name, String address, Date checkin, Date checkout);
	
		@Query("SELECT DISTINCT r FROM RentACar r " +
			   "WHERE r.id in" +
			   		"(SELECT DISTINCT b.rentacar.id FROM Branch b " +
			   		"WHERE lower(b.city) like lower(concat('%', ?1,'%'))) " +
			   "AND (r.id in "+
				   "(SELECT DISTINCT v.rentacar.id FROM Car v "+
			   		"WHERE v.id NOT IN "+
			   			"(SELECT DISTINCT vr.car.id FROM CarReservation vr "+
			   			"WHERE ((vr.startDate <= ?3 AND vr.endDate >= ?3) " +
			   			"OR (vr.startDate <= ?2 AND vr.endDate >= ?3) " +
			   			"OR (vr.endDate >= ?2 AND vr.endDate <= ?3) " +
			   			"OR (vr.startDate >= ?2 AND vr.endDate <= ?3))))"+
			   	"OR r.id in " +
			   		"(SELECT DISTINCT r2.branch.rentacar.id FROM Car r2 "+
			   		"WHERE r2.id not in (SELECT vr2.car.id FROM CarReservation vr2)))")
		ArrayList<RentACar> findByAddressAndDateAndBeds(String address, Date checkin, Date checkout);
	
	
	
	
}
