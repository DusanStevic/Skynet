package com.tim18.skynet.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.SeatReservationDTO;
import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.Reservation;
import com.tim18.skynet.model.RoomReservation;
import com.tim18.skynet.model.Seat;
import com.tim18.skynet.model.SeatReservation;
import com.tim18.skynet.service.ReservationService;
import com.tim18.skynet.service.SeatReservationService;
import com.tim18.skynet.service.impl.CustomUserDetailsService;
import com.tim18.skynet.service.impl.SeatService;

@RestController
public class SeatReservationController {
	
	
	@Autowired
	private SeatReservationService seatReservationService;
	
	@Autowired
	private ReservationService reservationService;
	
	@Autowired
	private SeatService seatService;
	
	@Autowired
	private CustomUserDetailsService userInfoService;
	
	 
	@RequestMapping(value = "/api/seatReservation", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<Reservation> createReservation(@RequestBody SeatReservationDTO rezervacijaDTO) {
		
		System.out.println("ULETEO SAM U REZERVACIJE");
		
		List<SeatReservation> seatReservations = new ArrayList<SeatReservation>();
		
		Reservation reservation = new Reservation();
		
		
		if(!rezervacijaDTO.getSeats().isEmpty()) {
			
		
		
			
			for (String str : rezervacijaDTO.getSeats()) {
				Long flightId = rezervacijaDTO.getFlight_id();
				Long seatId = Long.parseLong(str);
				
			
				
				
				
				Seat s = seatService.findByFlightIdAndId(flightId,seatId);
				System.out.println("ID BROJ LETA:"+s.toString());
				s.setTaken(true);
				SeatReservation seatReservation =  new SeatReservation(new Date(), rezervacijaDTO.getTotal(),s);
				seatReservations.add(seatReservation);
				seatReservation.setReservation(reservation);
				seatReservationService.save(seatReservation);
			}
			
			
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			//MORA DA SE REZERVISE LET NEMA REZERVACIJE BEZ LETA
		}
		
		
	
		
	
		
		RegisteredUser user = (RegisteredUser) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		reservation.setInitiator(user);
		reservation.getPassangers().add(user);
		reservation.setSeatReservations(seatReservations);
		reservation.setTotalPrice(rezervacijaDTO.getTotal());
		reservation.setCompleted(false);
		reservationService.save(reservation);
		return new ResponseEntity<>(reservation, HttpStatus.CREATED);
	}
	
	@RequestMapping( value="/api/getSeatReservations/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SeatReservation> getRoomReservations(@PathVariable(value = "id") Long id){
		RegisteredUser user = (RegisteredUser) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		if(user == null){
			return null;
		}
		Reservation r = reservationService.findOne(id);
		return r.getSeatReservations();
	}
	
	@RequestMapping( value="/api/finishReservation/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Reservation finishReservation(@PathVariable(value = "id") Long id){
		Reservation r = reservationService.findOne(id);
		r.setCompleted(true);
		return reservationService.save(r);
	}
}
