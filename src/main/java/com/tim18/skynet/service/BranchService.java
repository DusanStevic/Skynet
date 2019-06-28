package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.Branch;
import com.tim18.skynet.model.RentACar;

public interface BranchService {
	public Branch save(Branch branch);
	public Branch findOne(Long id);
	public List<Branch> findAll();
	public void remove(Long id);
	public List<Branch> findByRentacar(RentACar r);
}
