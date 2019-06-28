package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.Car;
import com.tim18.skynet.model.CarReservation;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.RentACar;

public interface CarReservationService {
	public CarReservation getOne(long id);
	public List<CarReservation> findByFlightId(long flightId);
	public List<CarReservation> getAll();
	public CarReservation create(CarReservation car);
	public void delete(long id);
	public CarReservation save(CarReservation car);
	public List<CarReservation> findByRegistredUser(RegisteredUser regularUser);
	public List<CarReservation> findByRentacarRes(RentACar rentacarRes);
	public List<CarReservation> findByCar(Car car);
}
