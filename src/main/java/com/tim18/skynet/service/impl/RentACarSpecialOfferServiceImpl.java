package com.tim18.skynet.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.RACSpecialOffer;
import com.tim18.skynet.repository.RACSpecialOfferRepository;



@Service
public class RentACarSpecialOfferServiceImpl {
	
	@Autowired
	private RACSpecialOfferRepository racSpecialOfferRepository;
	
	public RACSpecialOffer findOne(Long id) {
		Optional<RACSpecialOffer> offer = racSpecialOfferRepository.findById(id);
		
		if(offer.isPresent()) {
			return offer.get();
		}
		
		return null;
	}
	
	public List<RACSpecialOffer> findAll(){
		return racSpecialOfferRepository.findAll();
	}
	
	public RACSpecialOffer save(RACSpecialOffer offer) {
		return racSpecialOfferRepository.save(offer);
	}
	
	public void delete(Long id) {
		racSpecialOfferRepository.deleteById(id);
	}
}
