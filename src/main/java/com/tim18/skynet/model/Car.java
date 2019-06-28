package com.tim18.skynet.model;

import java.util.Date;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim18.skynet.dto.CarDTO;

@Entity
public class Car {

	@ManyToOne
	private Branch branch;
	
	
	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "name")
	private String name;
	
	@Column(name = "on_fast_res")
	private Boolean onFastRes;

	@Column(name = "fast_res_price")
	private Double fastResPrice;
	
	@Column(name = "price")
	private Double price;

	@Column(name = "carYear")
	private Integer year;

	@ManyToOne(fetch = FetchType.EAGER)
	RentACar rentacar;
	
	@Column(name="fast_res_start_date")
	private Date fastResStartDate;
	
	@Column(name="fast_res_end_date")
	private Date fastResEndDate;
	
	public Date getFastResStartDate() {
		return fastResStartDate;
	}

	public void setFastResStartDate(Date fastResStartDate) {
		this.fastResStartDate = fastResStartDate;
	}

	public Date getFastResEndDate() {
		return fastResEndDate;
	}

	public void setFastResEndDate(Date fastResEndDate) {
		this.fastResEndDate = fastResEndDate;
	}

	public Double getScore() {
		return score;
	}

	public void setScore(Double score) {
		this.score = score;
	}

	public Integer getNumber() {
		return number;
	}

	public Boolean getOnFastRes() {
		return onFastRes;
	}

	public void setOnFastRes(Boolean onFastRes) {
		this.onFastRes = onFastRes;
	}

	public Double getFastResPrice() {
		return fastResPrice;
	}

	public void setFastResPrice(Double fastResPrice) {
		this.fastResPrice = fastResPrice;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	@Column(name="car_type")
	String carType;
	
	@Column(name="brand")
	String brand;
	
	@Column(name="model")
	String model;
	
	@Column(name="seats")
	Integer seats;
	
	@Column(name="score")
	Double score;
	
	@Column(name="number")
	Integer number;
	
	
	

	@JsonIgnore
	@OneToMany(mappedBy = "car", fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	private Set<CarReservation> reservations = new HashSet<>();
	
	
	
	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getSeats() {
		return seats;
	}

	public void setSeats(Integer seats) {
		this.seats = seats;
	}

	public Set<CarReservation> getReservations() {
		return reservations;
	}

	public void setReservations(Set<CarReservation> reservations) {
		this.reservations = reservations;
	}


	public String getCarType() {
		return carType;
	}

	public void setCarType(String carType) {
		this.carType = carType;
	}

	public Car() {

	}

	public Branch getBranch() {
		return branch;
	}

	public void setBranch(Branch branch) {
		this.branch = branch;
	}

	public Car(Set<CarReservation> reservations, Branch branch, Long id, String name, Boolean onFastRes,
			Double fastResPrice, Double price, Integer year, RentACar rentacar, Date fastResStartDate,
			Date fastResEndDate, String carType, String brand, String model, Integer seats, Double score,
			Integer number) {
		super();
		this.reservations = reservations;
		this.branch = branch;
		this.id = id;
		this.name = name;
		this.onFastRes = onFastRes;
		this.fastResPrice = fastResPrice;
		this.price = price;
		this.year = year;
		this.rentacar = rentacar;
		this.fastResStartDate = fastResStartDate;
		this.fastResEndDate = fastResEndDate;
		this.carType = carType;
		this.brand = brand;
		this.model = model;
		this.seats = seats;
		this.score = score;
		this.number = number;
	}

	public Car(CarDTO carDto) {
		this.name = carDto.getName();
		this.price = carDto.getPrice();
		this.year = carDto.getYear();
		this.carType=carDto.getCarType();
		this.brand=carDto.getBrand();
		this.model=carDto.getModel();
		this.seats=carDto.getSeats();
		this.onFastRes=false;
		this.fastResPrice=0.0;
		
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

	public RentACar getRentacar() {
		return rentacar;
	}

	public void setRentacar(RentACar rentacar) {
		this.rentacar = rentacar;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((price == null) ? 0 : price.hashCode());
		result = prime * result + ((rentacar == null) ? 0 : rentacar.hashCode());
		result = prime * result + ((year == null) ? 0 : year.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Car other = (Car) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (price == null) {
			if (other.price != null)
				return false;
		} else if (!price.equals(other.price))
			return false;
		if (rentacar == null) {
			if (other.rentacar != null)
				return false;
		} else if (!rentacar.equals(other.rentacar))
			return false;
		if (year == null) {
			if (other.year != null)
				return false;
		} else if (!year.equals(other.year))
			return false;
		return true;
	}
}
