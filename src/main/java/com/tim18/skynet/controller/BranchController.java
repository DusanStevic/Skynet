package com.tim18.skynet.controller;


import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tim18.skynet.dto.BranchDTO;
import com.tim18.skynet.model.Branch;
import com.tim18.skynet.model.RACAdmin;
import com.tim18.skynet.model.RentACar;
import com.tim18.skynet.service.BranchService;
import com.tim18.skynet.service.RentACarService;
import com.tim18.skynet.service.impl.CustomUserDetailsService;



@Controller
public class BranchController {

	@Autowired
	RentACarService rentacarService;

	@Autowired
	BranchService branchService;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@PostMapping(value = "/api/createBranch", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Branch> create(@RequestBody BranchDTO branchDTO) {
		RACAdmin user = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Branch newBranch = new Branch(branchDTO);
		newBranch.setRentacar(user.getRentacar());

		Branch retVal = branchService.save(newBranch);
		user.getRentacar().getBranches().add(retVal);
		return new ResponseEntity<>(retVal, HttpStatus.CREATED);
	}

	@GetMapping(value = "/api/getBranches", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Branch>> getBranches() {

		RACAdmin user = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());

		List<Branch> retVal = branchService.findByRentacar(user.getRentacar());

		return new ResponseEntity<>(retVal, HttpStatus.CREATED);
	}

	@GetMapping(value = "/getConcreteBranches/{rentacarId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Branch>> getConcreteBranches(@PathVariable Long rentacarId) {

		RentACar rentacar = rentacarService.findOne(rentacarId);

		List<Branch> retVal = branchService.findByRentacar(rentacar);

		return new ResponseEntity<>(retVal, HttpStatus.CREATED);
	}

	@DeleteMapping(value = "/api/deleteBranch/{id}")
	public ResponseEntity<Branch> deleteBranch(@PathVariable String id) {
		RACAdmin ra = (RACAdmin) this.userDetailsService
				.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		Branch b = branchService.findOne(Long.parseLong(id));
		if (b == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		ra.getRentacar().getBranches().remove(b);
		branchService.remove(Long.parseLong(id));
		return new ResponseEntity<>(b, HttpStatus.OK);
	}

	@PutMapping(value = "/api/saveEditedBranch", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Branch> saveEditedBranch(@RequestBody BranchDTO branch) {
		Branch b = branchService.findOne(branch.getId());
		if (b == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		b.setId(branch.getId());
		b.setCity(branch.getCity());
		b.setAddress(branch.getAddress());

		Branch editedBranch = branchService.save(b);
		return new ResponseEntity<>(editedBranch, HttpStatus.OK);
	}

	@GetMapping(value = "/api/findBranch/{id}")
	public ResponseEntity<Branch> findCar(@PathVariable long id) {
		Branch b = branchService.findOne(id);
		if (b != null) {
			return new ResponseEntity<>(b, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
}
