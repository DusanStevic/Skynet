package com.tim18.skynet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.HotelOfferDTO;
import com.tim18.skynet.model.Hotel;
import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.model.HotelOffer;
import com.tim18.skynet.service.impl.CustomUserDetailsService;
import com.tim18.skynet.service.impl.HotelOfferServiceImpl;
import com.tim18.skynet.service.impl.HotelServiceImpl;

@RestController
public class HotelOfferController {
	@Autowired
	private HotelServiceImpl hotelService;
	
	@Autowired
	private CustomUserDetailsService userInfoService;
	
	@Autowired
	private HotelOfferServiceImpl hotelOfferService;
	
	@RequestMapping(value = "/api/addHotelOffer", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public HotelOffer addHotelOffer(@RequestBody HotelOffer hotelOffer){
		HotelAdmin user = (HotelAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Hotel hotel = user.getHotel();
		hotelOffer.setHotel(hotel);
		hotel.getHotelOffers().add(hotelOffer);
		hotelService.save(hotel);
		return hotelOfferService.save(hotelOffer);
	}
	
	@RequestMapping(value = "/api/getHotelOffers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<HotelOffer> getHotelOffers(){
		HotelAdmin user = (HotelAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Hotel hotel = user.getHotel();
		return hotel.getHotelOffers();
	}
	
	@RequestMapping(value = "/api/getHotelOffers/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<HotelOffer> getHotelOffersID(@PathVariable(value = "id") Long id){
		Hotel hotel = hotelService.findOne(id);
		return hotel.getHotelOffers();
	}
	
	@RequestMapping(value = "/api/getHotelOffer/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public HotelOffer getHotelOfferID(@PathVariable(value = "id") Long id){
		HotelOffer hotel = hotelOfferService.findOne(id);
		return hotel;
	}
	
	@RequestMapping(value = "/api/editHotelOffer", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public HotelOffer editHotelOffers(@RequestBody HotelOfferDTO hotelOfferDTO){
		HotelOffer ho = hotelOfferService.findOne(hotelOfferDTO.getId());
		if(hotelOfferDTO.getName() != ""){
			ho.setName(hotelOfferDTO.getName());
		}
		if(hotelOfferDTO.getDescription() != ""){
			ho.setDescription(hotelOfferDTO.getDescription());
		}
		if(hotelOfferDTO.getPrice() > 0){
			ho.setPrice(hotelOfferDTO.getPrice());
		}
		return hotelOfferService.save(ho);
	}
	
	@RequestMapping(value = "/api/deleteHotelOffer/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HotelOffer> deleteHotelOffers(@PathVariable(value = "id") Long id){
		HotelOffer ho = hotelOfferService.findOne(id);
		if (ho != null) {
			ho.setHotel(null);
			hotelOfferService.remove(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
