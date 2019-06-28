package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.AirlineAdmin;

public interface AirlineAdminService {
	public AirlineAdmin save(AirlineAdmin airlineAdmin);
	public AirlineAdmin findOne(Long id);
	public List<AirlineAdmin> findAll();
	public void remove(Long id);
}

