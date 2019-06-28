package com.tim18.skynet.controller;

import java.io.IOException; 
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.tim18.skynet.dto.AdminDTO;
import com.tim18.skynet.dto.UserDTO;
import com.tim18.skynet.model.Airline;
import com.tim18.skynet.model.AirlineAdmin;
import com.tim18.skynet.model.Authority;
import com.tim18.skynet.model.Hotel;
import com.tim18.skynet.model.HotelAdmin;
import com.tim18.skynet.model.RACAdmin;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.model.RentACar;
import com.tim18.skynet.model.User;
import com.tim18.skynet.model.UserRoleName;
import com.tim18.skynet.model.UserTokenState;
import com.tim18.skynet.security.TokenHelper;
import com.tim18.skynet.security.auth.JwtAuthenticationRequest;
import com.tim18.skynet.service.AirlineService;
import com.tim18.skynet.service.HotelService;
import com.tim18.skynet.service.RentACarService;
import com.tim18.skynet.service.impl.CustomUserDetailsService;



@RestController
public class AuthenticationController {
	@Autowired
	TokenHelper tokenUtils;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private CustomUserDetailsService userService;

	@Autowired
	private AirlineService airlineService;

	@Autowired
	private HotelService hotelService;

	@Autowired
	private RentACarService racService;
	
	@PostMapping(value = "auth/addAirlineAdmin")
	public ResponseEntity<?> registerAirlineAdmin(@RequestBody UserDTO user) {
		System.out.println("Adding airline admin...");
		if (this.userService.usernameTaken(user.getUsername())) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}

		AirlineAdmin admin = new AirlineAdmin();
		admin.setUsername(user.getUsername());
		admin.setId(null);
		admin.setEmail(user.getEmail());
		admin.setPassword(this.userService.encodePassword(user.getPassword()));
		admin.setEnabled(true);
		admin.setName(user.getFirstName());
		admin.setSurname(user.getLastName());
		admin.setLastPasswordResetDate(new Timestamp(System.currentTimeMillis()));
		admin.setFirstTime(true);

		List<Authority> authorities = new ArrayList<>();
		Authority a = new Authority();
		a.setName(UserRoleName.ROLE_AIRLINE_ADMIN);
		authorities.add(a);
		admin.setAuthorities(authorities);
		
		Airline airline = airlineService.findOne(Long.parseLong(user.getAdminId()));
		admin.setAirline(airline);

		if (this.userService.saveUser(admin)) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.OK);
	}
	
	@PostMapping(value = "auth/addHotelAdmin")
	public ResponseEntity<?> registerHotelAdmin(@RequestBody UserDTO user) {
		System.out.println("Adding hotel admin...");
		if (this.userService.usernameTaken(user.getUsername())) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}

		HotelAdmin admin = new HotelAdmin();
		List<Authority> authorities = new ArrayList<>();
		Authority authority = new Authority();
		Hotel hotel = hotelService.findOne(Long.parseLong(user.getAdminId()));
		
		admin.setHotel(hotel);
		admin.setUsername(user.getUsername());
		admin.setId(null);
		admin.setEmail(user.getEmail());
		admin.setPassword(this.userService.encodePassword(user.getPassword()));
		admin.setEnabled(true);
		admin.setName(user.getFirstName());
		admin.setSurname(user.getLastName());
		admin.setLastPasswordResetDate(new Timestamp(System.currentTimeMillis()));
		admin.setFirstTime(true);
		authority.setName(UserRoleName.ROLE_HOTEL_ADMIN);
		authorities.add(authority);
		admin.setAuthorities(authorities);

		if (this.userService.saveUser(admin)) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.OK);
	}
	
	@PostMapping(value = "auth/addRACAdmin")
	public ResponseEntity<?> registerRentacarAdmin(@RequestBody UserDTO user) {
		System.out.println("Adding rac admin...");
		if (this.userService.usernameTaken(user.getUsername())) {
			return new ResponseEntity<>(null, HttpStatus.OK);
		}

		RACAdmin admin = new RACAdmin();
		List<Authority> authorities = new ArrayList<>();
		Authority authority = new Authority();
		RentACar rac = racService.findOne(Long.parseLong(user.getAdminId()));
		
		admin.setRentacar(rac);
		admin.setUsername(user.getUsername());
		admin.setId(null);
		admin.setEmail(user.getEmail());
		admin.setPassword(this.userService.encodePassword(user.getPassword()));
		admin.setEnabled(true);
		admin.setName(user.getFirstName());
		admin.setSurname(user.getLastName());
		admin.setLastPasswordResetDate(new Timestamp(System.currentTimeMillis()));
		admin.setFirstTime(true);
		authority.setName(UserRoleName.ROLE_HOTEL_ADMIN);
		authorities.add(authority);
		admin.setAuthorities(authorities);

		if (this.userService.saveUser(admin)) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.OK);
	}
	
	@PostMapping(value = "auth/registerUser")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO user) {
		System.out.println("Register user...");
		if (this.userService.usernameTaken(user.getUsername()) == true) {
			return new ResponseEntity<>("Username already exists. Please choose another username.", HttpStatus.OK);
		}
		RegisteredUser newUser = new RegisteredUser();
		newUser.setUsername(user.getUsername());
		newUser.setId(null);
		newUser.setEmail(user.getEmail());
		newUser.setPassword(this.userService.encodePassword(user.getPassword()));
		List<Authority> authorities = new ArrayList<>();
		Authority a = new Authority();
		a.setName(UserRoleName.ROLE_USER);
		authorities.add(a);
		newUser.setAuthorities(authorities);
		newUser.setEnabled(false);
		newUser.setName(user.getFirstName());
		newUser.setSurname(user.getLastName());
		newUser.setLastPasswordResetDate(new Timestamp(System.currentTimeMillis()));
		newUser.setFirstTime(true);

		if (this.userService.saveUser(newUser)) {
			return new ResponseEntity<>(newUser, HttpStatus.OK);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	@PostMapping(value = "auth/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletResponse response) throws AuthenticationException, IOException {
		final Authentication authentication;
		try {
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return new ResponseEntity<>("Wrong username or password. Please check your input and try again.", HttpStatus.OK);
		} catch (DisabledException e) {
			return new ResponseEntity<>("Account is not verified. Please check your email.",HttpStatus.OK);
		}
		User user = (User) authentication.getPrincipal();
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenUtils.generateToken(user.getUsername());
		int expiresIn = tokenUtils.getExpiredIn();
		UserRoleName userType = null;

		if (user instanceof HotelAdmin) {
			userType = UserRoleName.ROLE_HOTEL_ADMIN;
		} else if (user instanceof RACAdmin) {
			userType = UserRoleName.ROLE_RENTACAR_ADMIN;
		} else if (user instanceof AirlineAdmin) {
			userType = UserRoleName.ROLE_AIRLINE_ADMIN;
		} else if (user instanceof RegisteredUser) {
			userType = UserRoleName.ROLE_USER;
		} else {
			userType = UserRoleName.ROLE_SYSTEM_ADMIN;
		}
		return new ResponseEntity<>(new UserTokenState(jwt, expiresIn, userType), HttpStatus.OK);
	}
	
	@GetMapping(value = "auth/confirmRegistration/{id}")
	public RedirectView confirmRegistration(@PathVariable Long id) {
		User user = (User) userService.loadUserById(id);
		if (user != null) {
			user.setEnabled(true);
			userService.saveUser(user);
			return new RedirectView("http://localhost:8080/confirmed.html");
		}
		return null;
	}
	
	@PutMapping(value = "/auth/changePassword")
	public ResponseEntity<UserTokenState> changePassword(@RequestBody AdminDTO admin) {
		User user = (User) this.userService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		user.setFirstTime(false);
		user.setPassword(this.userService.encodePassword(admin.getPassword()));
		user.setLastPasswordResetDate(new Timestamp(System.currentTimeMillis()));
		this.userService.saveUser(user);
		String jwt = tokenUtils.generateToken(user.getUsername());
		int expiresIn = tokenUtils.getExpiredIn();
		UserRoleName userType = null;
		return new ResponseEntity<>(new UserTokenState(jwt, expiresIn, userType), HttpStatus.OK);
	}
}