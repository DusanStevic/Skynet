package com.tim18.skynet.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.joda.time.Interval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tim18.skynet.dto.CarReservationDTO;
import com.tim18.skynet.dto.MessageDTO;
import com.tim18.skynet.dto.RoomReservationDTO;
import com.tim18.skynet.model.Car;
import com.tim18.skynet.model.CarReservation;
import com.tim18.skynet.model.HotelOffer;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.RentACar;
import com.tim18.skynet.model.Reservation;
import com.tim18.skynet.model.Room;
import com.tim18.skynet.model.RoomReservation;
import com.tim18.skynet.service.CarReservationService;
import com.tim18.skynet.service.CarService;
import com.tim18.skynet.service.RentACarService;
import com.tim18.skynet.service.ReservationService;
import com.tim18.skynet.service.impl.CustomUserDetailsService;




@Controller
public class CarReservationController {
	@Autowired
	CarReservationService carReservationService;

	@Autowired
	CarService carService;

	@Autowired
	RentACarService rentacarService;

	@Autowired
	private CustomUserDetailsService userDetailsService;
	
	
	@Autowired
	private ReservationService reservationService;
	
	
	@GetMapping(value = "/showCarsOnFastRes/{racID}")
	public ResponseEntity<List<Car>> showCarsOnFastRes(@PathVariable Long racID) {
		RentACar rac = rentacarService.findOne(racID);
		List<Car> cars = carService.findByRentACar(rac);
		List<Car> carsOnFast = new ArrayList<>();
		for (Car car : cars) {
			if (car.getOnFastRes()==true) {
				carsOnFast.add(car);
			}
		}
		return new ResponseEntity<>(carsOnFast, HttpStatus.OK);
	}
	
	
	@DeleteMapping(value = "/cancelCarReservation/{resId}")
	public ResponseEntity<?> cancelCarReservation(@PathVariable Long resId) {
		RegisteredUser user = (RegisteredUser) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		userDetailsService.saveUser(user);
		CarReservation carRes = carReservationService.getOne(resId);
		Car car = carRes.getCar();
		int brojac2 = -1;
		for (CarReservation cr : car.getReservations()) {
			brojac2++;
			if (cr.getId().equals(resId)) {
				car.getReservations().remove(brojac2);
			}
		}
		carService.save(car);
		carReservationService.delete(resId);

		return new ResponseEntity<>(carRes, HttpStatus.OK);

	}

	@SuppressWarnings("deprecation")
	@PutMapping(value = "/api/putCarOnFastRes/{carId}/{startDate}/{endDate}/{price}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> putCarOnFastRes(@PathVariable Long carId, @PathVariable String startDate,
			@PathVariable String endDate, @PathVariable Double price) {
		@SuppressWarnings("deprecation")
		Date startDatee = new Date(Integer.parseInt(startDate.split("\\-")[0]) - 1900,
				Integer.parseInt(startDate.split("\\-")[1]) - 1, Integer.parseInt(startDate.split("\\-")[2]));
		@SuppressWarnings("deprecation")
		Date endDatee = new Date(Integer.parseInt(endDate.split("\\-")[0]) - 1900,
				Integer.parseInt(endDate.split("\\-")[1]) - 1, Integer.parseInt(endDate.split("\\-")[2]));

		Car c = carService.findOne(carId);
		Boolean dozvola = true;
		for (CarReservation res : c.getReservations()) {
			if (res.getStartDate().compareTo(startDatee) < 0 && res.getEndDate().compareTo(startDatee) < 0) {
				dozvola = false;
			}
			if (res.getStartDate().compareTo(endDatee) < 0 && res.getEndDate().compareTo(endDatee) > 0) {
				dozvola = false;
			}
			if (res.getStartDate().compareTo(endDatee) < 0 && res.getEndDate().compareTo(endDatee) < 0) {
				dozvola = false;
			}
		}

		if (dozvola) {
			c.setOnFastRes(true);
			c.setFastResStartDate(startDatee);
			c.setFastResEndDate(endDatee);
			c.setFastResPrice(price);
			carService.save(c);
			return new ResponseEntity<>(c, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new MessageDTO("Car is reserved, it cannot be put on fast res.", "Error"),
					HttpStatus.OK);
		}

	}
	


	@GetMapping(value = "/findRentacarFromRes/{resId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RentACar> findRentacarFromRes(@PathVariable Long resId) {
		CarReservation res = carReservationService.getOne(resId);
		RentACar rentacar = res.getRentacarRes();
		return new ResponseEntity<>(rentacar, HttpStatus.OK);
	}

	@GetMapping(value = "/findCarFromRes/{resId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Car> findCarFromRes(@PathVariable Long resId) {
		CarReservation res = carReservationService.getOne(resId);
		Car car = res.getCar();
		return new ResponseEntity<>(car, HttpStatus.OK);
	}


	@SuppressWarnings("deprecation")
	@PostMapping(value = "/createCarReservation/{carId}/{startDate}/{endDate}/{passengers}/{flight_res}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CarReservation> create(@PathVariable Long carId, @PathVariable String startDate,
			@PathVariable String endDate, @PathVariable Integer passengers, @PathVariable String flight_res) {
		RegisteredUser user = (RegisteredUser) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());

		Integer flights = 0;
		Reservation r = new Reservation();
		


		@SuppressWarnings("deprecation")
		Date startDatee = new Date(Integer.parseInt(startDate.split("\\-")[0]) - 1900,
				Integer.parseInt(startDate.split("\\-")[1]) - 1, Integer.parseInt(startDate.split("\\-")[2]));
		@SuppressWarnings("deprecation")
		Date endDatee = new Date(Integer.parseInt(endDate.split("\\-")[0]) - 1900,
				Integer.parseInt(endDate.split("\\-")[1]) - 1, Integer.parseInt(endDate.split("\\-")[2]));

		

		CarReservationDTO dto = new CarReservationDTO(carId, startDatee, endDatee, passengers);
		CarReservation newCarRes = new CarReservation(dto);
		Car car = null;
		try {
			car = carService.findOne(dto.getCarId());
		}catch(Exception e) {
			return null;
		}
				
	
		newCarRes.setCar(car);
		newCarRes.setPrice(car.getPrice());

		newCarRes.setRegistredUser(user);
		newCarRes.setNumOfPass(passengers);

		RentACar rentacar = rentacarService.findOne(car.getRentacar().getId());
		newCarRes.setRentacarRes(rentacar);

		carReservationService.save(newCarRes);

		double price = r.getTotalPrice();
		
		r.setTotalPrice(price + newCarRes.getPrice());
		r.setCarReservations(carReservationService.findByCar(car));
		
		reservationService.save(r);
		newCarRes.setReservation(r);
		newCarRes.setRegistredUser(user);
		rentacar.getCarReservations().add(newCarRes);
		car.getReservations().add(newCarRes);
		user.save(newCarRes);
		userDetailsService.saveUser(user);
		

		return new ResponseEntity<>(newCarRes, HttpStatus.CREATED);
	}

	
}

