package com.tim18.skynet.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.Branch;
import com.tim18.skynet.model.RentACar;
import com.tim18.skynet.repository.BranchRepository;
import com.tim18.skynet.service.BranchService;


@Service
public class BranchServiceImpl implements BranchService {
	@Autowired
	private BranchRepository branchRepository;

	public Branch findOne(Long id) {
		Optional<Branch> branchOpt = branchRepository.findById(id);
		if(branchOpt.isPresent()) {
			return branchOpt.get();
		}
		return null;
	}

	public List<Branch> findAll() {
		return branchRepository.findAll();
	}

	public Branch save(Branch branch) {
		return branchRepository.save(branch);
	}

	public void delete(Long id) {
		branchRepository.deleteById(id);
	}

	
	public List<Branch> findByRentacar(RentACar r) {
		return branchRepository.findByRentacar(r);
	}

	@Override
	public void remove(Long id) {
		branchRepository.deleteById(id);
	}

	
	
}
