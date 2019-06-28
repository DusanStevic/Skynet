package com.tim18.skynet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
public class Destination {
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "coordinates")
	private String coordinates;
	
	public Destination() {
		// TODO Auto-generated constructor stub
	}

	public Destination( String naziv, String opis, String coordinates) {
		super();
		this.name = naziv;
		this.description = opis;
		this.coordinates = coordinates;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return name;
	}

	public void setNaziv(String naziv) {
		this.name = naziv;
	}

	public String getOpis() {
		return description;
	}

	public void setOpis(String opis) {
		this.description = opis;
	}

	public String getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(String coordinates) {
		this.coordinates = coordinates;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Destination [id=" + id + ", name=" + name + ", description=" + description + ", coordinates="
				+ coordinates + "]";
	}
	
	
	

}
