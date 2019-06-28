package com.tim18.skynet.controller;

import java.text.ParseException; 
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.joda.time.Days;
import org.joda.time.Interval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.FastReserveDTO;
import com.tim18.skynet.dto.HotelSearchDTO;
import com.tim18.skynet.dto.ReservationInfo;
import com.tim18.skynet.dto.RoomReservationDTO;
import com.tim18.skynet.model.FastRoomReservation;
import com.tim18.skynet.model.HotelOffer;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.Reservation;
import com.tim18.skynet.model.Room;
import com.tim18.skynet.model.RoomReservation;
import com.tim18.skynet.service.FastRoomReservationService;
import com.tim18.skynet.service.HotelOfferService;
import com.tim18.skynet.service.RoomReservationService;
import com.tim18.skynet.service.RoomService;
import com.tim18.skynet.service.impl.CustomUserDetailsService;
import com.tim18.skynet.service.impl.ReservationServiceImpl;


@RestController
public class RoomReservationController {
	
	@Autowired
	private RoomReservationService roomReservationService;
	
	@Autowired
	private CustomUserDetailsService userInfoService;
	
	@Autowired
	private RoomService roomService;
	
	@Autowired
	private ReservationServiceImpl reservationService;
	
	@Autowired
	private FastRoomReservationService fastRoomReservationService;
	
	@Autowired
	private HotelOfferService hotelOfferService;
	
	@RequestMapping( value="/api/roomReservation/{resid}",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public Reservation reserveRoom(@RequestBody RoomReservationDTO temp, @PathVariable(value = "resid") Long resID){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		RegisteredUser user = (RegisteredUser) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		
		if(user == null){
			return null;
		}
		Reservation reservation = reservationService.findOne(resID);
		
		Room room = roomService.findOne(temp.getRoomId());
		
		RoomReservation roomReservation = new RoomReservation();
		
		if(reservation.getPassangers().isEmpty() || reservation.getSeatReservations().isEmpty()){
			return null;
		}
		Date startDate = null;
		Date endDate = null;
		try {
			startDate = sdf.parse(temp.getCheckin());
			endDate = sdf.parse(temp.getCheckout());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
		
		Calendar day1 = Calendar.getInstance();
	    Calendar day2 = Calendar.getInstance(); 
	    day1.setTime(startDate);
	    day2.setTime(endDate);
	    int daysBetween = day1.get(Calendar.DAY_OF_YEAR) - day2.get(Calendar.DAY_OF_YEAR);
	    if(daysBetween < 0){
	    	daysBetween = daysBetween * (-1);
	    }
		
		Interval interval1 = new Interval(startDate.getTime(), endDate.getTime());
		
		for(RoomReservation reserv : room.getReservations()){
			Interval interval2 = new Interval(reserv.getCheckIn().getTime(), reserv.getCheckOu().getTime());
			Interval overlap = interval2.overlap(interval1);
			if(overlap != null){
				return null;
			}
		}
		
		double price = room.getPrice() *daysBetween ;
		for(long id : temp.getHotelOffers()){
			HotelOffer hotelOffer = hotelOfferService.findOne(id);
			if(hotelOffer != null){
				price += hotelOffer.getPrice();
				hotelOffer.getRoomReservations().add(roomReservation);
				roomReservation.getHotelOffers().add(hotelOffer);
			}
		}
		roomReservation.setReservation(reservation);
		roomReservation.setCheckIn(startDate);
		roomReservation.setCheckOu(endDate);
		roomReservation.setReservedRoom(room);
		roomReservation.setPrice(price);
		
		room.getReservations().add(roomReservation);
		reservation.getRoomReservations().add(roomReservation);
		
		roomReservationService.save(roomReservation);
		roomService.save(room);
		return reservationService.save(reservation);
	}
	
	@RequestMapping(value="/api/fastReserve/{resid}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Reservation fastReserve(@RequestBody FastReserveDTO temp, @PathVariable(value = "resid") Long resID){
		RegisteredUser user = (RegisteredUser) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		FastRoomReservation fr = fastRoomReservationService.findOne(temp.getFastId());
		
		if(user == null){
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		RoomReservation roomReservation = new RoomReservation();
		Date startDate = null;
		Date endDate = null;
		try {
			startDate = sdf.parse(temp.getStartDate());
			endDate = sdf.parse(temp.getEndDate());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
		
		
		Reservation reservation = reservationService.findOne(resID);
		
		Interval interval1 = new Interval(startDate.getTime(), endDate.getTime());
		
		for(RoomReservation reserv : fr.getRoom().getReservations()){
			Interval interval2 = new Interval(reserv.getCheckIn().getTime(), reserv.getCheckOu().getTime());
			Interval overlap = interval2.overlap(interval1);
			if(overlap != null){
				return null;
			}
		}
		
		double price = fr.getPrice();
		
		for(HotelOffer ho : fr.getOffers()){
			price += ho.getPrice();
		}
		
		roomReservation.setReservation(reservation);
		roomReservation.setCheckIn(startDate);
		roomReservation.setCheckOu(endDate);
		roomReservation.setReservedRoom(fr.getRoom());
		roomReservation.setPrice(price);
		
		fr.getRoom().getReservations().add(roomReservation);
		reservation.getRoomReservations().add(roomReservation);
		
		roomReservationService.save(roomReservation);
		roomService.save(fr.getRoom());
		return reservationService.save(reservation);
	}
	
	@RequestMapping( value="/api/removeRoomReservation/{id}",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Reservation removeRoomReservation(@PathVariable(value = "id") Long id){
		RegisteredUser user = (RegisteredUser) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user == null){
			return null;
		}
		RoomReservation rr = roomReservationService.findOne(id);
		
		boolean isUser = false;
		for(RegisteredUser u : rr.getReservation().getPassangers()){
			if(u.getId() == user.getId()){
				isUser = true;
			}
		}
		if(isUser == false){
			return null;
		}
		Reservation r = rr.getReservation();
		rr.setReservation(null);
		rr.setReservedRoom(null);
		rr.setHotelOffers(null);
		roomReservationService.delete(id);
		return r;
	}
	
	@RequestMapping( value="/api/getRoomReservations/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RoomReservation> getRoomReservations(@PathVariable(value = "id") Long id){
		RegisteredUser user = (RegisteredUser) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user == null){
			return null;
		}
		Reservation r = reservationService.findOne(id);
		return r.getRoomReservations();
	}
	
	@RequestMapping( value="/api/getDays",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Room getReservation(@RequestBody HotelSearchDTO dto){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = null;
		Date date2 = null;
		
		try {
			date1 = sdf.parse(dto.getCheckin());
			date2 = sdf.parse(dto.getCheckout());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
		
		Calendar day1 = Calendar.getInstance();
	    Calendar day2 = Calendar.getInstance(); 
	    day1.setTime(date1);
	    day2.setTime(date2);

	    int daysBetween = day1.get(Calendar.DAY_OF_YEAR) - day2.get(Calendar.DAY_OF_YEAR);
	    if(daysBetween < 0){
	    	daysBetween = daysBetween * (-1);
	    }
	    Room r = new Room();
	    r.setBedNumber(daysBetween);
	    System.out.println("OVO JE BR " + r.getBedNumber());
		return r;
	}
}
