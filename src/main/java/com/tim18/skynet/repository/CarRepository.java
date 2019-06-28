package com.tim18.skynet.repository;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tim18.skynet.model.Car;
import com.tim18.skynet.model.RentACar;



public interface CarRepository extends JpaRepository<Car, Long>{
	

	@Query("SELECT v FROM Car v WHERE v.branch.rentacar.id = ?1 AND ?3 >= v.price AND ?2 <= v.price")
	ArrayList<Car> findByPriceRange(Long rentacarId, double minPrice, double maxPrice);
	
	@Query("SELECT DISTINCT v FROM Car v " +
		    "WHERE v.branch.rentacar.id = ?1 AND v.id NOT IN " +
					"(SELECT v2.id FROM Car v2, CarReservation vr " +
		             "WHERE v2.id = vr.car.id " +
					 "AND ((vr.startDate <= ?2 AND vr.endDate >= ?2) " +
		             "OR  (vr.startDate < ?3 AND vr.endDate >= ?3) " +
					 "OR  (?2 <= vr.startDate AND ?3 >= vr.startDate)))")
	ArrayList<Car> findByAvailability(Long rentacarId, Date checkIn, Date checkOut);
	
	@Query("SELECT DISTINCT v FROM Car v "+
			   		"WHERE v.rentacar.id = ?1 AND v.id NOT IN "+
			   			"(SELECT DISTINCT vr.car.id FROM CarReservation vr "+
			   			"WHERE ((vr.startDate <= ?3 AND vr.endDate >= ?3) " +
			   			"OR (vr.startDate <= ?2 AND vr.endDate >= ?3) " +
			   			"OR (vr.endDate >= ?2 AND vr.endDate <= ?3) " +
			   			"OR (vr.startDate >= ?2 AND vr.endDate <= ?3)))")
	ArrayList<Car> findAvailable(long racId, Date checkin, Date checkout);
	
	
	public List<Car> findByRentacar(RentACar rentacar);
}
