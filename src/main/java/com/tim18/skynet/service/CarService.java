package com.tim18.skynet.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tim18.skynet.model.Car;
import com.tim18.skynet.model.RentACar;

public interface CarService {
	public Car save(Car car);
	public Car findOne(Long id);
	public List<Car> findAll();
	public void delete(Long id);
	public ArrayList<Car> findAvailable(long racId, Date checkin, Date checkout);
	public List<Car> findByRentACar(RentACar r);
}