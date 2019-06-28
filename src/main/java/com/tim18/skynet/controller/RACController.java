package com.tim18.skynet.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.comparator.RentACarComparatorAddress;
import com.tim18.skynet.comparator.RentACarComparatorName;
import com.tim18.skynet.dto.CompanyDTO;
import com.tim18.skynet.dto.HotelSearchDTO;
import com.tim18.skynet.dto.ImageDTO;
import com.tim18.skynet.dto.RentACarDTO;
import com.tim18.skynet.dto.ReportRentacarAttendanceDTO;
import com.tim18.skynet.model.CarReservation;
import com.tim18.skynet.model.Hotel;
import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.model.RACAdmin;
import com.tim18.skynet.model.RentACar;
import com.tim18.skynet.service.CarReservationService;
import com.tim18.skynet.service.RentACarService;
import com.tim18.skynet.service.impl.CustomUserDetailsService;

@RestController
public class RACController {

	@Autowired
	RentACarService rentacarService;

	@Autowired
	CarReservationService carReservationService;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@RequestMapping(value = "/api/racs", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RentACar> getAllMy() {
		
		return rentacarService.findAll();
	}
	
	@RequestMapping(value = "/api/editImage", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RentACar> editHotelImage(@RequestBody ImageDTO image) {
		RACAdmin user = (RACAdmin) this.userDetailsService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		RentACar rac = user.getRentacar();
		System.out.println(image.getUrl());
		rac.setImage(image.getUrl());
		user.setRentacar(rac);
		return new ResponseEntity<>(rentacarService.save(rac), HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/api/rac", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public RentACar createRAC(@RequestBody RentACar rac) {
		rac.setNumber(0);
		double score = 0;
		rac.setScore(score);
		return rentacarService.save(rac);
		
	}
	
	@GetMapping(value = "/api/reportRentacarAttendance")
	public ResponseEntity<ReportRentacarAttendanceDTO> reportRentacarAttendance() throws ParseException {
		ReportRentacarAttendanceDTO retVal = new ReportRentacarAttendanceDTO();
		long DAY_IN_MILI = 86400000;
		Date currentDate = new Date();
		DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
		DateFormat df2 = new SimpleDateFormat("yyyy-MM");
		Date today = df1.parse(df1.format(currentDate));
		Date thisMonth = df2.parse(df2.format(currentDate));
		List<CarReservation> allReservations = carReservationService.getAll();
		Date workWith = new Date();
		Date workWith2 = new Date();
		Date startDate = new Date();
		Date endDate = new Date();
		// daily
		for (int i = 1; i < 8; i++) {
			int number = 0;
			workWith = new Date(today.getTime() - i * DAY_IN_MILI);
			retVal.getDailyLabels().add(df1.format(workWith));
			for (CarReservation carReservation : allReservations) {
				startDate = df1.parse(carReservation.getStartDate().toString());
				endDate = df1.parse(carReservation.getEndDate().toString());
				if (!startDate.after(workWith) && !endDate.before(workWith)) {
					number += carReservation.getNumOfPass();
				}
			}
			retVal.getDailyValues().add(number);
		}
		// weekly
		for (int i = 0; i < 7; i++) {
			int number = 0;
			workWith = new Date(today.getTime() - (i * 7 + 1) * DAY_IN_MILI);
			workWith2 = new Date(today.getTime() - (7 * i + 7) * DAY_IN_MILI);
			retVal.getWeeklyLabels().add(df1.format(workWith2) + " to " + df1.format(workWith));
			for (CarReservation carReservation : allReservations) {
				startDate = df1.parse(carReservation.getStartDate().toString());
				endDate = df1.parse(carReservation.getEndDate().toString());
				if (!startDate.after(workWith) && !endDate.before(workWith2)) {
					number += carReservation.getNumOfPass();
				}
			}
			retVal.getWeeklyValues().add(number);
		}
		// monthly
		for (int i = 0; i < 7; i++) {
			int number = 0;
			workWith = new Date(thisMonth.getTime() - DAY_IN_MILI);
			workWith2 = df2.parse(df2.format(workWith));
			retVal.getMonthlyLabels().add(df2.format(workWith2));
			for (CarReservation carReservation : allReservations) {
				startDate = df1.parse(carReservation.getStartDate().toString());
				endDate = df1.parse(carReservation.getEndDate().toString());
				if (!startDate.after(workWith) && !endDate.before(workWith2)) {
					number += carReservation.getNumOfPass();
				}
			}
			retVal.getMonthlyValues().add(number);
			thisMonth = df2.parse(df2.format(new Date(thisMonth.getTime() - DAY_IN_MILI)));
		}
		return new ResponseEntity<>(retVal, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/racs/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public RentACar getRACid(@PathVariable(value = "id") Long id) {
		return rentacarService.findOne(id);
	}
	
	
	@GetMapping(value = "/api/findRentacarAmount/{startDate}/{endDate}")
	public ResponseEntity<Double> findRentacarAmount(@PathVariable String startDate, @PathVariable String endDate)
			throws ParseException {
		RACAdmin ra = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		List<CarReservation> allReservations = carReservationService.findByRentacarRes(ra.getRentacar());
		List<CarReservation> retVal = new ArrayList<>();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate1 = new Date();
		Date endDate1 = new Date();
		Date startDate2 = new Date();
		Date endDate2 = new Date();
		for (CarReservation carReservation : allReservations) {
			startDate1 = df.parse(carReservation.getStartDate().toString());
			endDate1 = df.parse(carReservation.getEndDate().toString());
			if (!startDate.equals("0000-00-00") && !endDate.equals("0000-00-00")) {
				startDate2 = df.parse(startDate);
				endDate2 = df.parse(endDate);
				if (startDate2.getTime() >= endDate2.getTime()
						|| (startDate2.getTime() < startDate1.getTime() && endDate2.getTime() < startDate1.getTime())
						|| (startDate2.getTime() > endDate1.getTime() && endDate2.getTime() > endDate1.getTime())) {
					continue;
				}
			} else if (startDate.equals("0000-00-00") && !endDate.equals("0000-00-00")) {
				endDate2 = df.parse(endDate);
				if (endDate2.getTime() < startDate1.getTime()) {
					continue;
				}
			} else if (!startDate.equals("0000-00-00") && endDate.equals("0000-00-00")) {
				startDate2 = df.parse(startDate);
				if (endDate1.getTime() < startDate2.getTime()) {
					continue;
				}
			}
			retVal.add(carReservation);
		}
		double value = 0;
		for (CarReservation carReservation : retVal) {
			value += carReservation.getPrice();
		}
		return new ResponseEntity<>(value, HttpStatus.OK);
	}

	@GetMapping(value = "/findConcreteRentacar/{id}")
	public ResponseEntity<RentACar> findConcreteRentacar(@PathVariable String id) {
		RentACar retVal = rentacarService.findOne(Long.parseLong(id));
		return new ResponseEntity<>(retVal, HttpStatus.OK);
	}

	@GetMapping(value = "/getAllRentacars")
	public ResponseEntity<List<RentACar>> getAllRentacars() {
		List<RentACar> rentacars = rentacarService.findAll();
		return new ResponseEntity<>(rentacars, HttpStatus.OK);
	}


	
	@PostMapping(value = "/createRentacar", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RentACar> create(@RequestBody RentACarDTO rentacarDTO) {
		RentACar retVal = rentacarService.save(new RentACar(rentacarDTO));
		return new ResponseEntity<>(retVal, HttpStatus.CREATED);
	}

	

	@GetMapping(value = "/api/myRAC", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RentACar> findRentacar() {
		RACAdmin rentacarAdmin = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		RentACar rentacar = rentacarAdmin.getRentacar();
		if (rentacar != null) {
			return new ResponseEntity<>(rentacar, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@Autowired
	private CustomUserDetailsService userInfoService;

	@PutMapping(value = "/api/saveRAC", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RentACar> editHotel(@RequestBody CompanyDTO dto) {
		RACAdmin user = (RACAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		RentACar hotel = user.getRentacar();
		if(dto.getAdress().equals("") == false){
			hotel.setAddress(dto.getAdress());
		}
		if(dto.getDescription().equals("") == false){
			hotel.setDescription(dto.getDescription());
		}
		if(dto.getName().equals("") == false){
			hotel.setName(dto.getName());
		}
		user.setRentacar(hotel);
		return new ResponseEntity<>(rentacarService.save(hotel), HttpStatus.OK);
	}
	
	
	
	@GetMapping(value = "/showRentACars/{criteria}")
	public ResponseEntity<List<RentACar>> showRentACars(@PathVariable String criteria) {
		List<RentACar> rentACars = rentacarService.findAll();
		if (criteria.equals("sortByNameRentACars")) {
			Collections.sort(rentACars, new RentACarComparatorName());
		} else if (criteria.equals("sortByAddressRentACars")) {
			Collections.sort(rentACars, new RentACarComparatorAddress());
		}
		return new ResponseEntity<>(rentACars, HttpStatus.OK);
	}

	@GetMapping(value = "/findRentacars/{field}")
	public ResponseEntity<List<RentACar>> findRentacars(@PathVariable String field) {
		List<RentACar> rentACars = (List<RentACar>) rentacarService.findByName(field);
		if (rentACars.size() == 0) {
			rentACars = (List<RentACar>) rentacarService.findByAddress(field);
		}

		return new ResponseEntity<>(rentACars, HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/gradeRentacar/{id}/{grade}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RentACar> createGrade(@PathVariable Long id, @PathVariable Integer grade) {
		RentACar rentacar = rentacarService.findOne(id);
		rentacar.setScore(rentacar.getScore() + grade);
		rentacar.setNumber(rentacar.getNumber() + 1);
		rentacarService.save(rentacar);
		return new ResponseEntity<>(rentacar, HttpStatus.CREATED);
	}

	@GetMapping(value = "/findRentacar/{address}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RentACar>> searchFlights(@PathVariable String address) {
		List<RentACar> rentacars = new ArrayList<>();

		rentacars = rentacarService.findByAddress(address);

		return new ResponseEntity<>(rentacars, HttpStatus.OK);
	}


		// search
	/*
		@PostMapping(value="/rentacars/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<Collection<RentACar>> getByNameAndAddress(@RequestBody RentACarSearchDTO rentACar) {
			
			if(rentACar.getPickUp() == null || rentACar.getDropOff() == null) {
				return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
			}
			
			Collection<RentACar> racs = rentacarService.findByNameAndAddress(rentACar.getName(), rentACar.getAddress());

			return new ResponseEntity<>(racs, HttpStatus.OK);
		}*/
		
		/*
		@PostMapping(value = "/rentacars/vehicles/search", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<Collection<Car>> searchVehicles(@RequestBody CarSearchDTO vehicleSearchDTO) {
			Collection<Car> vehs = carService.search(vehicleSearchDTO);
			return new ResponseEntity<>(vehs, HttpStatus.OK);
		}*/
		
		

	@RequestMapping(value = "/api/searchedRacs", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Collection<RentACar> getSearched(@RequestBody HotelSearchDTO search) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = null;
		Date date2 = null;
		try {
			date1 = sdf.parse(search.getCheckin());
			date2 = sdf.parse(search.getCheckout());
		} catch (ParseException e) {
			System.out.println("Neuspesno parsiranje datuma");
			return null;
		}
		if(date1.before(new Date()) || date2.before(new Date())){
			return null;
		}
		
		
		String name = search.getName();
		String address = search.getAddress();
		
		
		if(name == "" || name == null){
			name = null;
		}
		
		List<RentACar> racs = rentacarService.search2(name, address, date1, date2);
		System.out.println(racs.size());
		return racs;
	}
	}




