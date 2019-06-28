package com.tim18.skynet.dto;

import com.tim18.skynet.model.RegisteredUser;

public class FriendRequestDTO {
	RegisteredUser senderId;
	RegisteredUser receiverId;
	Boolean accepted;
	public FriendRequestDTO(RegisteredUser senderId, RegisteredUser receiverId, Boolean accepted) {
		super();
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.accepted = accepted;
	}
	public RegisteredUser getSenderId() {
		return senderId;
	}
	public void setSenderId(RegisteredUser senderId) {
		this.senderId = senderId;
	}
	public RegisteredUser getReceiverId() {
		return receiverId;
	}
	public void setReceiverId(RegisteredUser receiverId) {
		this.receiverId = receiverId;
	}
	public Boolean getAccepted() {
		return accepted;
	}
	public void setAccepted(Boolean accepted) {
		this.accepted = accepted;
	}
	
	
	
	

}
