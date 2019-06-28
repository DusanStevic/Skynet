package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.HotelOffer;
import com.tim18.skynet.repository.HotelOfferRepository;
import com.tim18.skynet.service.HotelOfferService;

@Service
public class HotelOfferServiceImpl implements HotelOfferService{

	@Autowired
	private HotelOfferRepository hotelOfferRepository;
	
	@Override
	public HotelOffer save(HotelOffer hotel) {
		return hotelOfferRepository.save(hotel);
	}

	@Override
	public HotelOffer findOne(Long id) {
		return hotelOfferRepository.getOne(id);
	}

	@Override
	public List<HotelOffer> findAll() {
		return hotelOfferRepository.findAll();
	}

	@Override
	public void remove(Long id) {
		hotelOfferRepository.deleteById(id);
	}

}
