package com.tim18.skynet.service;

import java.util.List;

import com.tim18.skynet.model.FriendRequest;
import com.tim18.skynet.model.RegisteredUser;



public interface FriendRequestService {
	public FriendRequest getOne(long id);

	public List<FriendRequest> getAll();

	public FriendRequest create(FriendRequest friendRequest);

	public void delete(long id);

	public FriendRequest save(FriendRequest friendRequest);
	
	public List<FriendRequest> friendship(RegisteredUser u);
	
	public FriendRequest friendshipT(RegisteredUser ru1,RegisteredUser ru2);
	
	public FriendRequest friendshipF(RegisteredUser ru1,RegisteredUser ru2);
	
	public List<FriendRequest> requestToMe(RegisteredUser u);
	
	public List<FriendRequest> requestFromMe(RegisteredUser u);

	

}
