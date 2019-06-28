package com.tim18.skynet.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tim18.skynet.dto.AdminDTO;
import com.tim18.skynet.dto.UserDTO;
import com.tim18.skynet.model.AirlineAdmin;
import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.model.RACAdmin;
import com.tim18.skynet.model.User;
import com.tim18.skynet.model.UserRoleName;
import com.tim18.skynet.model.UserTokenState;
import com.tim18.skynet.security.TokenHelper;
import com.tim18.skynet.service.impl.CustomUserDetailsService;
import com.tim18.skynet.service.impl.UserServiceImpl;

@RestController
public class UserController {

	@Autowired
	private UserServiceImpl userService;
	
	@Autowired
	TokenHelper tokenUtils;

	@Autowired
	private CustomUserDetailsService userInfoService;
	
	
	@GetMapping(value = "/api/getRegUser", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getLogged() {
		User user = (User) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	/*FUNKCIJA ZA PREGLED PROFILA SVIH KORISNIKA*/
	@GetMapping(value = "/api/viewUserProfile", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('ROLE_SYSTEM_ADMIN','ROLE_USER','ROLE_AIRLINE_ADMIN','ROLE_RENTACAR_ADMIN','ROLE_HOTEL_ADMIN')")
	public ResponseEntity<User> viewUserProfile() {
		System.out.println("STA JE STIGLO SA FRONTA1"+SecurityContextHolder.getContext().getAuthentication().getName());
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = (User) userService.findOneByUsername(username);
		if (user!=null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		return null;
	}
	
	/*FUNKCIJA ZA IZMENU PROFILA SVIH KORISNIKA*/
	@PutMapping(value = "/api/updateUserProfile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAnyAuthority('ROLE_SYSTEM_ADMIN','ROLE_USER','ROLE_AIRLINE_ADMIN','ROLE_RENTACAR_ADMIN','ROLE_HOTEL_ADMIN')")
	public ResponseEntity<?> updateUserProfile(@RequestBody User userFromFront) {
		System.out.println("ULETEO SAM U EDITOVANJE KORISNIKA");
		System.out.println("STA JE STIGLO SA FRONTA1"+userFromFront.toString());
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = (User) userService.findOneByUsername(username);
		if (user!=null) {
			System.out.println("STA JE STIGLO SA FRONTA2"+userFromFront.toString());
			user.setPassword(this.userInfoService.encodePassword(userFromFront.getPassword()));
			user.setName(userFromFront.getName());
			user.setSurname(userFromFront.getSurname());
			user.setEmail(userFromFront.getEmail());
		
	
			User korisnik = userService.save(user);
			
			
			System.out.println("POSLE PROMENA:"+korisnik.toString());

		

	
			String jwt = tokenUtils.generateToken(user.getUsername());
			int expiresIn = tokenUtils.getExpiredIn();
		

			return new ResponseEntity<>(new UserTokenState(jwt, expiresIn), HttpStatus.OK);
			
		}
		return null;
	
		
	}
	
	
	
	@RequestMapping(value = "/api/hadmins", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserTokenState> updateHadmin(
			@Valid @RequestBody UserDTO u) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User ha =(User) this.userInfoService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		if(u.getFirstName().equals("") == false){
			ha.setName(u.getFirstName());
		}
		if(u.getLastName().equals("") == false){
			ha.setSurname(u.getLastName());
		}
		if(u.getUsername().equals("") == false){
			if(ha.getUsername().equals(u.getUsername()) == false){
				if (this.userInfoService.usernameTaken(u.getUsername())) {
					return new ResponseEntity<>(null, HttpStatus.OK);
				}
				else{
					ha.setUsername(u.getUsername());
				}
			}
		}
		if(u.getEmail().equals("") == false){
			ha.setEmail(u.getEmail());
		}
		if(u.getPassword().equals("") == false){
			ha.setPassword(this.userInfoService.encodePassword(u.getPassword()));
			ha.setLastPasswordResetDate(new Timestamp(System.currentTimeMillis()));
		}
		userService.save(ha);
		String jwt = tokenUtils.generateToken(ha.getUsername());
		int expiresIn = tokenUtils.getExpiredIn();

		return new ResponseEntity<>(new UserTokenState(jwt, expiresIn), HttpStatus.OK);
	}
	
	
	
	@GetMapping(value = "/api/admins", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<AdminDTO>> getAdmins() {
		List<AdminDTO> users = new ArrayList<AdminDTO>();
		for(User u : userService.findAll()){
			if(u instanceof AirlineAdmin){
				String company = ((AirlineAdmin)u).getAirline().getName();
				AdminDTO admin = new AdminDTO(company, u.getName(), u.getSurname(), u.getUsername(), "", u.getEmail());
				users.add(admin);
			}
			else if(u instanceof HotelAdmin){
				String company = ((HotelAdmin)u).getHotel().getName();
				AdminDTO admin = new AdminDTO(company, u.getName(), u.getSurname(), u.getUsername(), "", u.getEmail());
				users.add(admin);
			}
			else if(u instanceof RACAdmin){
				String company = ((RACAdmin)u).getRentacar().getName();
				AdminDTO admin = new AdminDTO(company, u.getName(), u.getSurname(), u.getUsername(), "", u.getEmail());
				users.add(admin);
			}
		}
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	@PutMapping(value = "/api/blockAdmin/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> blockAdmin(@PathVariable(value = "id") Long id) {
		User user = null;
		for(User u : userService.findAll()){
			if(u.getId() == id){
				if(u.isEnabled()){
					u.setEnabled(false);
				}
				else{
					u.setEnabled(true);
				}
				user = u;
				userService.save(u);
			}
		}
		if(user == null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	
	
	
	
	
	@RequestMapping( value="api/users",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public User createUser(@Valid @RequestBody User user) {
		return userService.save(user);
	}
	

	
	@RequestMapping(value = "/api/users", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<User> getAllUsers() {
		return userService.findAll();
	}

	
	@RequestMapping(value = "/api/users/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUser(
			@PathVariable(value = "id") Long UserId) {
		User user = userService.findOne(UserId);

		if (user == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(user);
	}

	
	@RequestMapping(value = "/api/users/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> updateUser(
			@PathVariable(value = "id") Long UserId,
			@Valid @RequestBody User u) {

		User user = userService.findOne(UserId);
		if (user == null) {
			return ResponseEntity.notFound().build();
		}

		user.setName(u.getName());
		user.setSurname(u.getSurname());
		

		User updateUser = userService.save(user);
		return ResponseEntity.ok().body(updateUser);
	}

	
	@RequestMapping(value = "/api/users/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE,consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> deleteUser(
			@PathVariable(value = "id") Long UserId) {
		User user = userService.findOne(UserId);

		if (user != null) {
			userService.remove(UserId);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}