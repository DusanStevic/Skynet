package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.HotelAdmin;

public interface HotelAdminService {
	public HotelAdmin save(HotelAdmin hotelAdmin);
	public HotelAdmin findOne(Long id);
	public List<HotelAdmin> findAll();
	public void remove(Long id);
}
