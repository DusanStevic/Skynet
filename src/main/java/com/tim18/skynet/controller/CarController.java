package com.tim18.skynet.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;


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

import com.tim18.skynet.dto.CarDTO;
import com.tim18.skynet.dto.MessageDTO;
import com.tim18.skynet.model.Branch;
import com.tim18.skynet.model.Car;
import com.tim18.skynet.model.CarReservation;
import com.tim18.skynet.model.RACAdmin;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.RentACar;
import com.tim18.skynet.model.Reservation;
import com.tim18.skynet.service.CarService;
import com.tim18.skynet.service.RentACarService;
import com.tim18.skynet.service.ReservationService;
import com.tim18.skynet.service.impl.CustomUserDetailsService;



@Controller
public class CarController {
	@Autowired
	CarService carService;

	@Autowired
	RentACarService rentacarService;
	
	@Autowired
	ReservationService reservationService;

	@Autowired
	private CustomUserDetailsService userDetailsService;


	@GetMapping(value = "/showCarsOnFastRes")
	public ResponseEntity<List<Car>> showCarsOnFastRes() {
		RACAdmin ra = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		List<Car> cars = carService.findByRentACar(ra.getRentacar());
		List<Car> carsOnFast = new ArrayList<>();
		for (Car car : cars) {
			if (car.getOnFastRes()==true) {
				carsOnFast.add(car);
			}
		}
		return new ResponseEntity<>(carsOnFast, HttpStatus.OK);
	}
	
	@RequestMapping( value="/api/getCarReservations/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<CarReservation> getCarReservations(@PathVariable(value = "id") Long id){
		RegisteredUser user = (RegisteredUser) this.userDetailsService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user == null){
			return null;
		}
		Reservation r = reservationService.findOne(id);
		return r.getCarReservations();
	}
	
	@GetMapping(value = "/searchCarUnregistered/{lowestPrice}/{highestPrice}/{racID}")
	public ResponseEntity<List<Car>> searchCarUnregistered( @PathVariable Double lowestPrice,
			@PathVariable Double highestPrice, @PathVariable Long racID) {
		RentACar rac = rentacarService.findOne(racID);
		List<Car> allCars = carService.findByRentACar(rac);
		List<Car> retVal = new ArrayList<>();
		for (Car car : allCars) {
			if (lowestPrice != -1 && lowestPrice > car.getPrice()) {
				continue;
			}
			if (highestPrice != -1 && highestPrice < car.getPrice()) {
				continue;
			}
			retVal.add(car);
		}
		return new ResponseEntity<>(retVal, HttpStatus.OK);
	}

	
	
	@PutMapping(value = "/removeCarOnFastRes/{carId}")
	public ResponseEntity<?> removeCarOnFastRes(@PathVariable String carId) {
		RACAdmin ra = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Car car = carService.findOne(Long.parseLong(carId));
		if (car == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Date now = new Date();
		Boolean dozvola = true;
		for (CarReservation r : car.getReservations()) {
			if (r.getEndDate().compareTo(now) > 0) {
				dozvola = false;
			}
		}
		if (dozvola) {
			car.setOnFastRes(false);
			carService.save(car);
			return new ResponseEntity<>(car, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new MessageDTO("Car is reserved, it cannot be deleted.", "Error"),
					HttpStatus.OK);
		}

	}

	@GetMapping(value = "/findConcreteCars/{rentacarId}")
	public ResponseEntity<Set<Car>> findConcreteCars(@PathVariable String rentacarId) {
		RentACar retVal = rentacarService.findOne(Long.parseLong(rentacarId));
		return new ResponseEntity<>(retVal.getCars(), HttpStatus.OK);
	}

	@GetMapping(value = "/getAllCars", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Car>> getAllCars() {
		List<Car> cars = carService.findAll();
		return new ResponseEntity<>(cars, HttpStatus.OK);
	}

	@PostMapping(value = "/api/addCar", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Car> create(@RequestBody CarDTO carDTO) {
		RACAdmin user = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Car newCar = new Car(carDTO);
		newCar.setRentacar(user.getRentacar());
		newCar.setScore(0.0);
		newCar.setNumber(0);
		Car retVal = carService.save(newCar);
		user.getRentacar().getCars().add(retVal);
		return new ResponseEntity<>(retVal, HttpStatus.CREATED);
	}

	@GetMapping(value = "/api/getCars")
	public ResponseEntity<List<Car>> getCars() {
		RACAdmin ra = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		List<Car> cars = carService.findByRentACar(ra.getRentacar());
		return new ResponseEntity<>(cars, HttpStatus.OK);
	}

	@DeleteMapping(value = "/api/deleteCar/{carId}")
	public ResponseEntity<?> deleteCar(@PathVariable String carId) {
		RACAdmin ra = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Car car = carService.findOne(Long.parseLong(carId));
		if (car == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Date now = new Date();
		Boolean dozvola = true;
		for (CarReservation r : car.getReservations()) {
			if (r.getEndDate().compareTo(now) > 0) {
				dozvola = false;
			}
		}
		if (dozvola) {
			ra.getRentacar().getCars().remove(car);
			carService.delete(Long.parseLong(carId));
			return new ResponseEntity<>(car, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(new MessageDTO("Car is reserved, it cannot be deleted.", "Error"),
					HttpStatus.OK);
		}

	}

	@GetMapping(value = "/api/findCar/{carId}")
	public ResponseEntity<Car> findCar(@PathVariable long carId) {
		Car car = carService.findOne(carId);
		if (car != null) {
			return new ResponseEntity<>(car, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping(value = "/gradeCar/{id}/{grade}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Car> createGrade(@PathVariable Long id, @PathVariable Integer grade) {
		Car car = carService.findOne(id);
		car.setScore(car.getScore() + grade);
		car.setNumber(car.getNumber() + 1);
		carService.save(car);
		return new ResponseEntity<>(car, HttpStatus.CREATED);
	}
	
	@SuppressWarnings("deprecation")
	@GetMapping(value = "/findSuitCars/{rentacarId}/{startDate}/{endDate}/{startCity}/{endCity}/{carType}/{passengers}/{fromPrice}/{toPrice}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Car>> findSuitCars(@PathVariable Long rentacarId, @PathVariable String startDate,
			@PathVariable String endDate, @PathVariable String startCity, @PathVariable String endCity,
			@PathVariable String carType, @PathVariable Integer passengers, @PathVariable Double fromPrice,
			@PathVariable Double toPrice)

	{
		List<Car> theFinalList = new ArrayList<>();
		List<Car> finalList = new ArrayList<>();
		List<Car> lista1 = new ArrayList<>();
		List<Car> lista2 = new ArrayList<>();
		Date startDatee = new Date(Integer.parseInt(startDate.split("\\-")[0]) - 1900,
				Integer.parseInt(startDate.split("\\-")[1]) - 1, Integer.parseInt(startDate.split("\\-")[2]));
		Date endDatee = new Date(Integer.parseInt(endDate.split("\\-")[0]) - 1900,
				Integer.parseInt(endDate.split("\\-")[1]) - 1, Integer.parseInt(endDate.split("\\-")[2]));

		RentACar rentacar = rentacarService.findOne(rentacarId);
		List<Car> cars = carService.findByRentACar(rentacar);

		Boolean mesto1 = false;
		Boolean mesto2 = false;
		for (Branch b : rentacar.getBranches()) {
			if (b.getCity().equalsIgnoreCase(startCity)) {
				mesto1 = true;
			}
			if (b.getCity().equalsIgnoreCase(endCity)) {
				mesto2 = true;
			}
		}

		if (mesto1 && mesto2) {
			for (Car c : cars) {
				if (c.getCarType().equalsIgnoreCase(carType) && c.getSeats() >= passengers) {
					lista1.add(c);
				}
			}

			if (fromPrice != -1) {

				for (Car c : lista1) {
					if (c.getPrice() >= fromPrice) {
						lista2.add(c);
					}
				}
			} else {
				for (Car c : lista1) {
					lista2.add(c);
				}
			}
			if (toPrice != -1) {
				for (Car c : lista2) {
					if (c.getPrice() <= toPrice) {
						finalList.add(c);
					}
				}
			} else {
				for (Car c : lista2) {
					finalList.add(c);
				}
			}

			for (Car car : finalList) {
				Boolean dozvola = true;
				for (CarReservation res : car.getReservations()) {
					if (startDatee.compareTo(res.getStartDate()) < 0 && endDatee.compareTo(res.getEndDate()) < 0
							&& endDatee.compareTo(res.getStartDate()) > 0) {
						dozvola = false;
					} else if (startDatee.compareTo(res.getStartDate()) <= 0
							&& endDatee.compareTo(res.getEndDate()) >= 0) {
						dozvola = false;
					} else if (startDatee.compareTo(res.getStartDate()) >= 0
							&& endDatee.compareTo(res.getEndDate()) >= 0
							&& startDatee.compareTo(res.getEndDate()) < 0) {
						dozvola = false;
					} else if (startDatee.compareTo(res.getStartDate()) >= 0
							&& endDatee.compareTo(res.getEndDate()) <= 0) {
						dozvola = false;
					} else {
						dozvola = true;
					}
				}
				if (dozvola) {
					theFinalList.add(car);
				}
			}
		}
		
		ArrayList<Car> forReturn = new ArrayList<>();
		

		for (int i = 0; i < theFinalList.size(); i++) {

			if (theFinalList.get(i).getOnFastRes()==false) {
				forReturn.add(theFinalList.get(i));
			}
		}
		return new ResponseEntity<>(forReturn, HttpStatus.OK);


	}

	

	@PutMapping(value = "/api/saveEditedCar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Car> saveChangesRentACar(@RequestBody CarDTO car) {
		Car c = carService.findOne(car.getId());
		if (c == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		c.setId(car.getId());
		c.setName(car.getName());
		c.setPrice(car.getPrice());
		c.setYear(car.getYear());
		c.setCarType(car.getCarType());
		c.setBrand(car.getBrand());
		c.setModel(car.getModel());
		c.setSeats(car.getSeats());

		Car editedCar = carService.save(c);
		return new ResponseEntity<>(editedCar, HttpStatus.OK);
	}

	

}
