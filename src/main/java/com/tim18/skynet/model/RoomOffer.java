package com.tim18.skynet.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class RoomOffer {
	@Id
	@GeneratedValue
	private long id;
	@Column(nullable = false)
	private String offer;
	
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.REFRESH)
    @JoinTable(name = "offering", joinColumns = @JoinColumn(name="offer_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="room_id", referencedColumnName="id"))
	List<Room> rooms = new ArrayList<Room>();
	
	public RoomOffer(String offer) {
		super();
		this.offer = offer;
	}
	
	public RoomOffer() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getOffer() {
		return offer;
	}

	public void setOffer(String offer) {
		this.offer = offer;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}
}
