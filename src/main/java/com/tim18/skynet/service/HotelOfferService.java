package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.HotelOffer;

public interface HotelOfferService {
	public HotelOffer save(HotelOffer hotel);
	public HotelOffer findOne(Long id);
	public List<HotelOffer> findAll();
	public void remove(Long id);
}
