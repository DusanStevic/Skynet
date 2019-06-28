package com.tim18.skynet.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column; 
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim18.skynet.dto.RentACarDTO;

import io.jsonwebtoken.lang.Objects;

@Entity
public class RentACar {
	@Id
	@GeneratedValue
	private Long id;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String address;
	@Column(nullable = false)
	private String description;
	@Column(nullable = false)
	private String image;
	@Column(nullable = false)
	private Double score;
	@Column(nullable = false)
	private Integer number;

	
	
	public RentACar(Long id, String name, String address, String description, String image, Double score,
			Integer number, Set<RACAdmin> rentacarAdmins, Set<Car> cars, Set<CarReservation> carReservations,
			Set<Branch> branches) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.description = description;
		this.image = image;
		this.score = score;
		this.number = number;
		this.rentacarAdmins = rentacarAdmins;
		this.cars = cars;
		this.carReservations = carReservations;
		this.branches = branches;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	@JsonIgnore
	@OneToMany(mappedBy = "rentacarAdmin", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private Set<RACAdmin> rentacarAdmins = new HashSet<>();

	/*
	@JsonIgnore
	@OneToMany(mappedBy = "rentacar", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private Set<RentacarCustomerService> rentacarCustomerServices = new HashSet<>();*/

	@JsonIgnore
	@OneToMany(mappedBy = "rentacar", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private Set<Car> cars = new HashSet<>();

	@JsonIgnore
	@OneToMany(mappedBy = "rentacarRes", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private Set<CarReservation> carReservations = new HashSet<>();

	
	@JsonIgnore
	@OneToMany(mappedBy = "rentacar", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private Set<Branch> branches = new HashSet<>();
	
	
		
		public RentACar(Long id, String name, String address, String description, String image, Double score,
			Set<RACAdmin> rentacarAdmins, /*Set<rentacarCustomerService> rentacarCustomerServices,*/ Set<Car> cars,
			Set<CarReservation> carReservations, Set<Branch> branches) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.description = description;
		this.image = image;
		this.score = score;
		this.rentacarAdmins = rentacarAdmins;
		//this.rentacarCustomerServices = rentacarCustomerServices;
		this.cars = cars;
		this.carReservations = carReservations;
		this.branches = branches;
	}

		public Double getScore() {
		return score;
	}

	public void setScore(Double score) {
		this.score = score;
	}

	public Set<RACAdmin> getRentacarAdmins() {
		return rentacarAdmins;
	}

	public void setRentacarAdmins(Set<RACAdmin> rentacarAdmins) {
		this.rentacarAdmins = rentacarAdmins;
	}
/*
	public Set<RentacarCustomerService> getRentacarCustomerServices() {
		return rentacarCustomerServices;
	}

	public void setRentacarCustomerServices(Set<RentacarCustomerService> rentacarCustomerServices) {
		this.rentacarCustomerServices = rentacarCustomerServices;
	}*/

	public Set<Car> getCars() {
		return cars;
	}

	public void setCars(Set<Car> cars) {
		this.cars = cars;
	}

	public Set<CarReservation> getCarReservations() {
		return carReservations;
	}

	public void setCarReservations(Set<CarReservation> carReservations) {
		this.carReservations = carReservations;
	}

	public Set<Branch> getBranches() {
		return branches;
	}

	public void setBranches(Set<Branch> branches) {
		this.branches = branches;
	}

		@Override
		public int hashCode() {
			return Objects.hashCode(id);
		}

		@Override
		public String toString() {
			return "Rent a car [id=" + id + "]";
		}

	


	
	public RentACar(String name, String address, String description, String image) {
		super();
		this.name = name;
		this.address = address;
		this.description = description;
		this.image = image;
	}





	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public RentACar() {
		super();
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	public RentACar(RentACarDTO rentacarDTO) {
		this.name = rentacarDTO.getRentacarNameRegister();
		this.address = rentacarDTO.getRentacarAddressRegister();
		this.description = rentacarDTO.getRentacarPromotionalDescription();
		this.score = 0.0;
	}

	
}
