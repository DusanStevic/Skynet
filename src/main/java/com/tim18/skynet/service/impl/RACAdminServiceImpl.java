package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.RACAdmin;
import com.tim18.skynet.repository.RACAdminRepository;
import com.tim18.skynet.service.RACAdminService;

@Service
public class RACAdminServiceImpl implements RACAdminService{
	
	@Autowired
	private RACAdminRepository racAdminRepository;

	
	public RACAdmin save(RACAdmin rac) {
		return racAdminRepository.save(rac);
	}

	
	public RACAdmin findOne(Long id) {
		return racAdminRepository.getOne(id);
	}

	
	public List<RACAdmin> findAll() {
		return racAdminRepository.findAll();
	}


	public void remove(Long id) {
		racAdminRepository.deleteById(id);
		
	}
	

}
