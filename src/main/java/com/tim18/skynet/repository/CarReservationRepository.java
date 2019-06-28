package com.tim18.skynet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.Car;
import com.tim18.skynet.model.CarReservation;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.RentACar;



public interface CarReservationRepository extends JpaRepository<CarReservation, Long>{
	public List<CarReservation> findByRegistredUser(RegisteredUser regularUser);
	public List<CarReservation> findByCar(Car car);
	public List<CarReservation> findByRentacarRes(RentACar rentacarRes);
	public List<CarReservation> findByFlightId(Long flightId);
}
