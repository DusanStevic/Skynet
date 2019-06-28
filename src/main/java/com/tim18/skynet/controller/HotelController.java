package com.tim18.skynet.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.CompanyDTO;
import com.tim18.skynet.dto.HotelSearchDTO;
import com.tim18.skynet.dto.ImageDTO;
import com.tim18.skynet.dto.ReportDTO;
import com.tim18.skynet.dto.ReportResult;
import com.tim18.skynet.dto.RoomSearchDTO;
import com.tim18.skynet.model.Hotel;
import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.model.Room;
import com.tim18.skynet.repository.HotelRepository;
import com.tim18.skynet.service.impl.CustomUserDetailsService;
import com.tim18.skynet.service.impl.HotelServiceImpl;
import com.tim18.skynet.service.impl.RoomServiceImpl;

@RestController
public class HotelController {

	@Autowired
	private HotelServiceImpl hotelService;
	

	@Autowired
	private RoomServiceImpl roomService;
	
	@Autowired
	private CustomUserDetailsService userInfoService;
	
	@GetMapping(value = "/api/getHotel", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Hotel> getHotel() {
		HotelAdmin user = (HotelAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Hotel hotel = user.getHotel();
		if (hotel != null) {
			return new ResponseEntity<>(hotel, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	@RequestMapping(value = "/api/editHotel", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Hotel> editHotel(@RequestBody CompanyDTO dto) {
		HotelAdmin user = (HotelAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Hotel hotel = user.getHotel();
		if(dto.getAdress().equals("") == false){
			hotel.setAddress(dto.getAdress());
		}
		if(dto.getDescription().equals("") == false){
			hotel.setDescription(dto.getDescription());
		}
		if(dto.getName().equals("") == false){
			hotel.setName(dto.getName());
		}
		Hotel h = null;
		try {
			h = hotelService.save(h);
		} catch (JpaSystemException e) {
		}
		
		return new ResponseEntity<>(h, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/editHotelImage", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Hotel> editHotelImage(@RequestBody ImageDTO image) {
		HotelAdmin user = (HotelAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Hotel hotel = user.getHotel();
		System.out.println(image.getUrl());
		hotel.setImage(image.getUrl());
		user.setHotel(hotel);
		return new ResponseEntity<>(hotelService.save(hotel), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/api/hotels", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Hotel> getAll() {
		return hotelService.findAll();
	}
	
	@RequestMapping(value = "/api/searchedHotels", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Collection<Hotel> getSearched(@RequestBody HotelSearchDTO search) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = null;
		Date date2 = null;
		System.out.println(search.getCheckin());
		System.out.println(search.getCheckout());
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
		
		int beds = search.getBeds();
		String name = search.getName();
		String address = search.getAddress();
		
		if(name == "" || name == null){
			name = null;
		}
		
		List<Hotel> hotels = hotelService.search(name, address, date1, date2, beds);
		return hotels;
	}
	
	@RequestMapping(value = "/api/hotel", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Hotel createHotel(@RequestBody Hotel hotel) {
		return hotelService.save(hotel);
	}
	
	@RequestMapping(value = "/api/hotels/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Hotel> getHotel(@PathVariable(value = "id") Long hotelId) {
		Hotel hotel = hotelService.findOne(hotelId);

		if (hotel == null) {
			return ResponseEntity.notFound().build();
		}
	
		return ResponseEntity.ok().body(hotel);
	}
	
	@RequestMapping(value = "/api/hotelReport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ReportResult dailyReport() {
		HotelAdmin user = (HotelAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Hotel hotel = user.getHotel();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		ArrayList<Object[]> daily = hotelService.dailyReport(hotel.getId());
		ArrayList<Object[]> weekly = hotelService.weeklyReport(hotel.getId());
		ArrayList<Object[]> monthly = hotelService.monthlyReport(hotel.getId());
		
		ArrayList<String> days = new ArrayList<String>();
		ArrayList<String> weeks = new ArrayList<String>();
		ArrayList<String> months = new ArrayList<String>();
		
		ArrayList<Long> days2 = new ArrayList<Long>();
		ArrayList<Long> weeks2 = new ArrayList<Long>();
		ArrayList<Long> months2 = new ArrayList<Long>();
		
		for(Object[] o : daily){
			long day = ((long)o[0]);
			Date date = ((Date)o[1]);
			String d = sdf.format(date);
			days.add(d);
			days2.add(day);
		}
		
		for(Object[] o : weekly){
			long day = ((long)o[0]);
			Date date = ((Date)o[1]);
			String d = sdf.format(date);
			weeks.add(d);
			weeks2.add(day);
		}
		
		for(Object[] o : monthly){
			long day = ((long)o[0]);
			Date date = ((Date)o[1]);
			String d = sdf.format(date);
			months.add(d);
			months2.add(day);
		}
		
		ReportResult rr = new ReportResult();
		rr.setDaily(days2);
		rr.setWeekly(weeks2);
		rr.setAnnualy(months2);
		rr.setDaily2(days);
		rr.setWeekly2(weeks);
		rr.setAnnualy2(months);
		rr.setIncome(0);
		return rr;
	}
	
	@RequestMapping(value = "/api/HotelIncome", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ReportResult income(@RequestBody ReportDTO report) {
		HotelAdmin user = (HotelAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Hotel hotel = user.getHotel();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = null;
		Date date2 = null;
		try {
			date1 = sdf.parse(report.getDate1());
			date2 = sdf.parse(report.getDate1());
		} catch (ParseException e) {
			System.out.println("Neuspesno parsiranje datuma");
			return null;
		}
		long res = hotelService.incomeReport(hotel.getId(), date1, date2);
		ReportResult rr = new ReportResult();
		rr.setAnnualy(new ArrayList<Long>());
		rr.setDaily(new ArrayList<Long>());
		rr.setWeekly(new ArrayList<Long>());
		rr.setIncome(res);
		System.out.println(rr.getIncome());
		return rr;
		}
	
	@RequestMapping(value = "/api/hotels/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Hotel> deleteHotel(
			@PathVariable(value = "id") Long hotelId) {
			Hotel hotel = hotelService.findOne(hotelId);

			if (hotel != null) {
				hotelService.remove(hotelId);
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
	
	
}