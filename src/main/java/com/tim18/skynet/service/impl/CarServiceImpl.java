package com.tim18.skynet.service.impl;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.Car;
import com.tim18.skynet.model.RentACar;
import com.tim18.skynet.repository.CarRepository;
import com.tim18.skynet.service.CarService;



@Service
public class CarServiceImpl implements CarService{

	@Autowired
	private CarRepository vehicleRepository;

	public Car findOne(Long id) {
		Optional<Car> vehicle = vehicleRepository.findById(id);
		if (vehicle.isPresent()) {
			return vehicle.get();
		}
		return null;
	}

	public List<Car> findAll() {
		return vehicleRepository.findAll();
	}

	public Car save(Car vehicle) {
		return vehicleRepository.save(vehicle);
	}

	public void delete(Long id) {
		vehicleRepository.deleteById(id);
	}


	/*
	public List<Car> search(CarSearchDTO dto){
		
		ArrayList<Car> result1 = new ArrayList<>();
		ArrayList<Car> result2 = new ArrayList<>();
		
		//result1 = vehicleRepository.findByTypeContainingIgnoreCaseAndGearContainingIgnoreCase(dto.getType(), dto.getGear());
		double min, max;
		
		if(dto.getMinPrice() == null) {
			min = 0;
		}else {
			min = dto.getMinPrice();
		}
		
		if(dto.getMinPrice() == null) {
			max = 999999999;
		}else {
			max = dto.getMaxPrice();
		}
		
		result2 = vehicleRepository.findByPriceRange(dto.getRentacarId(), min, max);
		
		result1.retainAll(result2);
		
		if(dto.getPickUp()!= null && dto.getDropOff() != null) {
			result2 = vehicleRepository.findByAvailability(dto.getRentacarId(), dto.getPickUp(), dto.getDropOff());
		}
		
		result1.retainAll(result2);
		
		return result1;
	}
	*/
	@Override
	public ArrayList<Car> findAvailable(long racId, Date checkin, Date checkout) {
		return vehicleRepository.findAvailable(racId, checkin, checkout);
	}


	@Override
	public List<Car> findByRentACar(RentACar r) {
		return vehicleRepository.findByRentacar(r);

	}

}
