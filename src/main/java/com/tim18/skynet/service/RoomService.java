package com.tim18.skynet.service;

import java.util.Date;
import java.util.List;

import com.tim18.skynet.model.Room;

public interface RoomService {
	public Room save(Room room);
	public Room findOne(Long id);
	public List<Room> findAll();
	public void delete(Long id);
	public List<Room> search(long hotelId, Date checkin, Date checkout, int beds);
	public List<Room> getFastHotelRooms(long hotelId);
}
