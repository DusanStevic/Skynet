package com.tim18.skynet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.VerificationToken;
import com.tim18.skynet.repository.VerificationTokenRepository;
import com.tim18.skynet.service.VerificationTokenService;

@Service
public class VerificationTokenServiceImpl implements VerificationTokenService{
	@Autowired
	private VerificationTokenRepository verificationTokenRepository;
	
	@Override
	public void saveToken(VerificationToken token) {
		verificationTokenRepository.save(token);
		
	}
}

