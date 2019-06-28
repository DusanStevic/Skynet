package com.tim18.skynet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.RoomOffer;

public interface RoomOfferRepository extends JpaRepository<RoomOffer, Long>{
	public RoomOffer findByOffer(String offer);
}
