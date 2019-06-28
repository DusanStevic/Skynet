package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.RoomOffer;
import com.tim18.skynet.repository.RoomOfferRepository;
import com.tim18.skynet.service.RoomOfferService;

@Service
public class RoomOfferServiceImpl implements RoomOfferService{

	@Autowired
	private RoomOfferRepository roomOfferRepository;
	
	@Override
	public RoomOffer save(RoomOffer room) {
		return roomOfferRepository.save(room);
	}

	@Override
	public RoomOffer findOne(Long id) {
		return roomOfferRepository.getOne(id);
	}

	@Override
	public List<RoomOffer> findAll() {
		return roomOfferRepository.findAll();
	}

	@Override
	public void delete(Long id) {
		roomOfferRepository.deleteById(id);
	}

	@Override
	public RoomOffer findByOffer(String offer) {
		return roomOfferRepository.findByOffer(offer);
	}

}
