package com.tim18.skynet.service.impl;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tim18.skynet.model.Hotel;
import com.tim18.skynet.repository.HotelRepository;
import com.tim18.skynet.service.HotelService;

@Service
public class HotelServiceImpl implements HotelService{
	
	@Autowired
	private HotelRepository hotelRepository;

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public Hotel save(Hotel hotel) {
		return hotelRepository.save(hotel);
	}

	
	public Hotel findOne(Long id) {
		return hotelRepository.getOne(id);
	}

	
	public List<Hotel> findAll() {
		return hotelRepository.findAll();
	}


	public void remove(Long id) {
		hotelRepository.deleteById(id);
		
	}


	@Override
	public List<Hotel> search(String name, String address, Date checkin, Date checkout, int beds) {
		if(name != null){
			return hotelRepository.findByNameAndAddressAndDateAndBeds(name, address, checkin, checkout, beds);
		}
		else{
			return hotelRepository.findByAddressAndDateAndBeds(address, checkin, checkout, beds);
		}
	}


	@Override
	public ArrayList<Object[]> dailyReport(long id) {
		return hotelRepository.dailyReport(id);
	}


	@Override
	public ArrayList<Object[]> monthlyReport(long id) {
		return hotelRepository.monthlyReport(id);
	}
	
	@Override
	public ArrayList<Object[]> weeklyReport(long id) {
		return hotelRepository.weeklyReport(id);
	}


	@Override
	public Long incomeReport(long id, Date date1, Date date2) {
		return hotelRepository.incomeReport(id, date1, date2);
	}
	

}
