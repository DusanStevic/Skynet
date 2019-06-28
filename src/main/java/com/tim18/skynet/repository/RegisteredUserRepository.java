package com.tim18.skynet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.RegisteredUser;



public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Long> {
	
	RegisteredUser findByUsername(String username);

}
