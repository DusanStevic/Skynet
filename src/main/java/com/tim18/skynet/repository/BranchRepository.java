package com.tim18.skynet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tim18.skynet.model.Branch;
import com.tim18.skynet.model.RentACar;


public interface BranchRepository extends JpaRepository<Branch, Long> {
	public List<Branch> findByRentacar(RentACar rentacar);

}
