package com.tim18.skynet.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.tim18.skynet.dto.BranchDTO;

@Entity
public class Branch {

	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "city")
	private String city;

	@Column(name = "address")
	private String address;
	
	@ManyToOne(fetch = FetchType.EAGER)
	RentACar rentacar;
	
	@OneToMany(mappedBy = "branch", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Car> vehicles = new HashSet<Car>();

	
	public Branch(Long id, String city, String address, RentACar rentacar, Set<Car> vehicles) {
		super();
		this.id = id;
		this.city = city;
		this.address = address;
		this.rentacar = rentacar;
		this.vehicles = vehicles;
	}

	public Set<Car> getVehicles() {
		return vehicles;
	}

	public void setVehicles(Set<Car> vehicles) {
		this.vehicles = vehicles;
	}

	public Branch() {
		
	}
	
	public Branch(BranchDTO dto) {
		this.city=dto.getCity();
		this.address=dto.getAddress();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public RentACar getRentacar() {
		return rentacar;
	}

	public void setRentacar(RentACar rentacar) {
		this.rentacar = rentacar;
	}
}
