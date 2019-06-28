package com.tim18.skynet.dto;

import com.tim18.skynet.model.RegisteredUser;

public class PotentialFriendsDTO {
	
	private RegisteredUser user;
	private String state;
	
	public PotentialFriendsDTO() {
		// TODO Auto-generated constructor stub
	}

	public PotentialFriendsDTO(RegisteredUser user, String status) {
		super();
		this.user = user;
		this.state = status;
	}

	public RegisteredUser getUser() {
		return user;
	}

	public void setUser(RegisteredUser user) {
		this.user = user;
	}

	public String getStatus() {
		return state;
	}

	public void setStatus(String status) {
		this.state = status;
	}
	
	

}
