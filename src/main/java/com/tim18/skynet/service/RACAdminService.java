package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.RACAdmin;

public interface RACAdminService {
	public RACAdmin save(RACAdmin racAdmin);
	public RACAdmin findOne(Long id);
	public List<RACAdmin> findAll();
	public void remove(Long id);
}