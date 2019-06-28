package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.User;
import com.tim18.skynet.repository.UserRepository;
import com.tim18.skynet.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;

	
	public User save(User user) {
		return userRepository.save(user);
	}

	
	public User findOne(Long id) {
		return userRepository.getOne(id);
	}

	
	public List<User> findAll() {
		return userRepository.findAll();
	}


	public void remove(Long id) {
		userRepository.deleteById(id);
		
	}


	@Override
	public User findUserByToken(String token) {
		return userRepository.findByToken(token);
	}
	
	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	public User findOneByUsername(String username) {
		return userRepository.findOneByUsername(username);
	}

}
