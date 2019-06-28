package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.repository.HotelAdminRepository;
import com.tim18.skynet.service.HotelAdminService;

@Service
public class HotelAdminServiceImpl implements HotelAdminService{
	
	@Autowired
	private HotelAdminRepository hotelAdminRepository;

	
	public HotelAdmin save(HotelAdmin hotelAdmin) {
		return hotelAdminRepository.save(hotelAdmin);
	}

	
	public HotelAdmin findOne(Long id) {
		return hotelAdminRepository.getOne(id);
	}

	
	public List<HotelAdmin> findAll() {
		return hotelAdminRepository.findAll();
	}


	public void remove(Long id) {
		hotelAdminRepository.deleteById(id);
		
	}
	

}
