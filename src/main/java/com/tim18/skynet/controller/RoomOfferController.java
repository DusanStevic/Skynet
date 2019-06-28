package com.tim18.skynet.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.RoomOffersDTO;
import com.tim18.skynet.model.Hotel;
import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.model.Room;
import com.tim18.skynet.model.RoomOffer;
import com.tim18.skynet.service.impl.CustomUserDetailsService;
import com.tim18.skynet.service.impl.HotelServiceImpl;
import com.tim18.skynet.service.impl.RoomOfferServiceImpl;
import com.tim18.skynet.service.impl.RoomServiceImpl;
@RestController
public class RoomOfferController {
	@Autowired
	private RoomOfferServiceImpl roomOfferService;
	
	@Autowired
	private CustomUserDetailsService userInfoService;
	
	@Autowired
	private RoomServiceImpl roomService;
	
	@Autowired
	private HotelServiceImpl hotelService;
	
	
	@RequestMapping( value="/api/setRoomOffers/{room_id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public List<RoomOffer> setRoomOffers(@PathVariable(value = "room_id") Long room_id, @Valid @RequestBody RoomOffersDTO roomOffers) {
		System.out.println("Usao sam u room offer");
		Room room = roomService.findOne(room_id);
		List<RoomOffer> newOffers = new ArrayList<RoomOffer>();
		for(String ro : roomOffers.getRoomOffers()){
			RoomOffer offer = roomOfferService.findByOffer(ro);
			if(offer != null){
				if(room.containsOffer(offer.getOffer()) == false){
					newOffers.add(offer);
					offer.getRooms().add(room);
					roomOfferService.save(offer);
				}
			}
			else{
				offer = new RoomOffer(ro);
				offer.getRooms().add(room);
				newOffers.add(offer);
				roomOfferService.save(offer);
			}
		}
		for(RoomOffer rof : room.getRoomOffers()){
			if(roomOffers.getRoomOffers().contains(rof.getOffer()) == false){
				rof.getRooms().remove(room);
				if(rof.getRooms().size() == 0){
					roomOfferService.delete(rof.getId());
				}
			}
		}
		room.setRoomOffers(newOffers);
		roomService.save(room);
		return room.getRoomOffers();
	}
	
	@RequestMapping( value="/api/getRoomOffers/{room_id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RoomOffer> getRoomOffers(@PathVariable(value = "room_id") String room_id){
		long room_id1 = Long.parseLong(room_id);
		Room room = roomService.findOne(room_id1);
		return room.getRoomOffers();
	}
	
	@RequestMapping( value="/api/getHotelRoomOffers",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RoomOffer> getHotelRoomOffers(){
		HotelAdmin user = (HotelAdmin) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Hotel hotel = user.getHotel();
		List<RoomOffer> offers = new ArrayList<RoomOffer>();
		for(Room room : hotel.getRooms()){
			for(RoomOffer ro : room.getRoomOffers()){
				if(offers.contains(ro) == false){
					offers.add(ro);
				}
			}
		}
		return offers;
	}
	
	@RequestMapping( value="/api/getHotelRoomOffers/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RoomOffer> getHotelRoomOffersID(@PathVariable(value = "id") Long id){
		Hotel hotel = hotelService.findOne(id);
		List<RoomOffer> offers = new ArrayList<RoomOffer>();
		for(Room room : hotel.getRooms()){
			for(RoomOffer ro : room.getRoomOffers()){
				if(offers.contains(ro) == false){
					offers.add(ro);
				}
			}
		}
		return offers;
	}
	
	@RequestMapping( value="/api/getAllRoomOffers",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RoomOffer> getAllRoomOffersID(){
		return roomOfferService.findAll();
	}
}
