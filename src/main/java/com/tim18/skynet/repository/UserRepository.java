package com.tim18.skynet.repository;

import java.util.List;  

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{	
	
	@Query(value = "select * from users u where u.id =(select t.user from verification_tokens t where t.token = ?1)", nativeQuery = true)
	User findByToken(String token);
	
	public List<RegisteredUser> findByNameAndSurname(String name, String surname);
	public List<RegisteredUser> findBySurname(String surname);
	public List<RegisteredUser> findByName(String name);
	public User findByUsername(String username);
	public User findOneByUsername(String username);

}