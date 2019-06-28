package com.tim18.skynet.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.Car;
import com.tim18.skynet.model.CarReservation;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.RentACar;
import com.tim18.skynet.repository.CarReservationRepository;
import com.tim18.skynet.service.CarReservationService;


@Service
public class CarReservationServiceImpl implements CarReservationService {

	@Autowired
	CarReservationRepository carReservationRepository;

	public CarReservation getOne(long id) {
		return carReservationRepository.getOne(id);
	}
	
	public List<CarReservation> findByFlightId(long flightId) {
		return carReservationRepository.findByFlightId(flightId);
	}

	public List<CarReservation> getAll() {
		return carReservationRepository.findAll();
	}

	public CarReservation create(CarReservation car) {
		return carReservationRepository.save(car);
	}

	public void delete(long id) {
		carReservationRepository.deleteById(id);
	}

	public CarReservation save(CarReservation car) {
		return carReservationRepository.save(car);
	}



	public List<CarReservation> findByRentacarRes(RentACar rentacarRes) {
		return carReservationRepository.findByRentacarRes(rentacarRes);
	}

	public List<CarReservation> findByCar(Car car) {
		return carReservationRepository.findByCar(car);
	}

	@Override
	public List<CarReservation> findByRegistredUser(RegisteredUser regularUser) {
		return carReservationRepository.findByRegistredUser(regularUser);

	}

	
}


