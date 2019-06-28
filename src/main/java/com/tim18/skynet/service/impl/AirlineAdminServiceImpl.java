package com.tim18.skynet.service.impl;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.AirlineAdmin;
import com.tim18.skynet.repository.AirlineAdminRepository;
import com.tim18.skynet.service.AirlineAdminService;

@Service
public class AirlineAdminServiceImpl implements AirlineAdminService{
	
	@Autowired
	private AirlineAdminRepository airlineAdminRepository;

	
	public AirlineAdmin save(@Valid AirlineAdmin airlineAdmin) {
		return airlineAdminRepository.save(airlineAdmin);
	}

	
	public AirlineAdmin findOne(Long id) {
		return airlineAdminRepository.getOne(id);
	}

	
	public List<AirlineAdmin> findAll() {
		return airlineAdminRepository.findAll();
	}


	public void remove(Long id) {
		airlineAdminRepository.deleteById(id);
		
	}
	

}
