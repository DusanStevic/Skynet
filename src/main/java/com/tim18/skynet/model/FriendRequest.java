package com.tim18.skynet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.tim18.skynet.dto.FriendRequestDTO;



@Entity
@Table(name = "friendRequest")
public class FriendRequest {
	@Id
	@GeneratedValue
	private Long id;

	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "sent_id")
	private RegisteredUser sent;

	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "received_id")
	private RegisteredUser received;

	@Column(name = "accepted")
	private Boolean accepted;

	public FriendRequest(FriendRequestDTO dto) {
		super();
		this.sent = dto.getSenderId();
		this.received = dto.getReceiverId();
		this.accepted = dto.getAccepted();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public FriendRequest() {
		super();
	}

	public RegisteredUser getSent() {
		return sent;
	}

	public void setSent(RegisteredUser sent) {
		this.sent = sent;
	}

	public RegisteredUser getReceived() {
		return received;
	}

	public void setReceived(RegisteredUser received) {
		this.received = received;
	}

	public Boolean getAccepted() {
		return accepted;
	}

	public void setAccepted(Boolean accepted) {
		this.accepted = accepted;
	}

}
