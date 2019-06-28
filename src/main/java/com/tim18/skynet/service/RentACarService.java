package com.tim18.skynet.service;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.tim18.skynet.model.RentACar;

public interface RentACarService {
	public RentACar save(RentACar rac);
	public RentACar findOne(Long id);
	public List<RentACar> findAll();
	public void delete(Long id);
	public List<RentACar> search2(String name, String address, Date checkin, Date checkout);
	public List<RentACar> findByName(String name);
	public List<RentACar> findByAddress(String address);
	public Collection<RentACar> findByNameAndAddress(String name, String address);

}

