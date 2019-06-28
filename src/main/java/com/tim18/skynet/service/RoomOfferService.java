package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.RoomOffer;

public interface RoomOfferService {
	public RoomOffer save(RoomOffer room);
	public RoomOffer findOne(Long id);
	public List<RoomOffer> findAll();
	public void delete(Long id);
	public RoomOffer findByOffer(String offer);
}
