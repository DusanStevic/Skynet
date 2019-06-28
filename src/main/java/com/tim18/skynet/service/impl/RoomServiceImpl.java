package com.tim18.skynet.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.Room;
import com.tim18.skynet.repository.RoomRepository;
import com.tim18.skynet.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService{
	
	@Autowired
	private RoomRepository roomRepository;
	

	@Override
	public Room save(Room room) {
		return roomRepository.save(room);
	}

	@Override
	public Room findOne(Long id) {
		return roomRepository.getOne(id);
	}

	@Override
	public List<Room> findAll() {
		return roomRepository.findAll();
	}

	@Override
	public void delete(Long id) {
		roomRepository.deleteById(id);	
	}

	@Override
	public List<Room> search(long hotelId, Date checkin, Date checkout, int beds) {
		return roomRepository.findAvailable(hotelId, checkin, checkout, beds);
	}

	@Override
	public List<Room> getFastHotelRooms(long hotelId) {
		return roomRepository.getAllFastRooms(hotelId);
	}

}
