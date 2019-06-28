package com.tim18.skynet.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class RACAdmin extends User{
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "rentacar_id")
	private RentACar rentacarAdmin;

	public RACAdmin() {
		super();
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	private static final long serialVersionUID = 1892679582107777957L;

	public RentACar getRentacar() {
		return rentacarAdmin;
	}

	public void setRentacar(RentACar rentacarAdmin) {
		this.rentacarAdmin = rentacarAdmin;
	}

}
