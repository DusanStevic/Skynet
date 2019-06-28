package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.repository.RegisteredUserRepository;



@Service
public class RegisteredUserService {

	
	@Autowired
	private RegisteredUserRepository repository;
	
	public RegisteredUser findOne(Long id) {
		return repository.getOne(id);
	}
	
	public RegisteredUser findByUsername(String username) {
		return repository.findByUsername(username);
	}

	public List<RegisteredUser> findAll() {
		return repository.findAll();
	}
	
	public Page<RegisteredUser> findAll(Pageable page) {
		return repository.findAll(page);
	}

	public RegisteredUser save(RegisteredUser user) {
		return repository.save(user);
	}

	public void remove(Long id) {
		repository.deleteById(id);
	}
}
