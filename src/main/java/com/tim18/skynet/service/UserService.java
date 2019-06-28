package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.User;

public interface UserService {
	public User save(User user);
	public User findByUsername(String username);
	public User findOneByUsername(String username);
	public User findOne(Long id);
	public List<User> findAll();
	public void remove(Long id);
	public User findUserByToken(String token);
	
}
