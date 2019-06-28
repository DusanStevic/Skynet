package com.tim18.skynet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tim18.skynet.model.FriendRequest;
import com.tim18.skynet.model.RegisteredUser;
import com.tim18.skynet.repository.FriendRequestRepository;
import com.tim18.skynet.service.FriendRequestService;



@Service
public class FriendRequestServiceImpl implements FriendRequestService{
	
	@Autowired
	FriendRequestRepository friendRequestRepository;

	@Override
	public FriendRequest getOne(long id) {
		return friendRequestRepository.getOne(id);
	}

	@Override
	public List<FriendRequest> getAll() {
		return friendRequestRepository.findAll();
	}

	@Override
	public FriendRequest create(FriendRequest friendRequest) {
		return friendRequestRepository.save(friendRequest);
	}

	@Override
	public void delete(long id) {
		friendRequestRepository.delete(friendRequestRepository.getOne(id));
		
	}

	@Override
	public FriendRequest save(FriendRequest friendRequest) {
		return friendRequestRepository.save(friendRequest);
	}

	
	
	
	@Override
	public List<FriendRequest> friendship(RegisteredUser u) {
		return friendRequestRepository.friendship(u);
	}
	
	@Override
	public FriendRequest friendshipT(RegisteredUser ru1, RegisteredUser ru2) {
		return friendRequestRepository.friendshipT(ru1, ru2);
	}
	
	@Override
	public FriendRequest friendshipF(RegisteredUser ru1, RegisteredUser ru2) {
		return friendRequestRepository.friendshipF(ru1, ru2);
	}
	
	
	@Override
	public List<FriendRequest> requestToMe(RegisteredUser ru) {
		return friendRequestRepository.requestToMe(ru);
	}
	
	@Override
	public List<FriendRequest> requestFromMe(RegisteredUser ru) {
		return friendRequestRepository.requestFromMe(ru);
	}
	
	

	
	

}
