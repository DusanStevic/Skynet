package com.tim18.skynet.dto;

public class RentACarDTO {

	private String rentacarNameRegister;
	private String rentacarAddressRegister;
	private String rentacarPromotionalDescription;

	public String getRentacarNameRegister() {
		return rentacarNameRegister;
	}

	public void setRentacarNameRegister(String rentacarNameRegister) {
		this.rentacarNameRegister = rentacarNameRegister;
	}

	public String getRentacarAddressRegister() {
		return rentacarAddressRegister;
	}

	public void setRentacarAddressRegister(String rentacarAddressRegister) {
		this.rentacarAddressRegister = rentacarAddressRegister;
	}

	public String getRentacarPromotionalDescription() {
		return rentacarPromotionalDescription;
	}

	public void setRentacarPromotionalDescription(String rentacarPromotionalDescription) {
		this.rentacarPromotionalDescription = rentacarPromotionalDescription;
	}

	public RentACarDTO(String rentacarNameRegister, String rentacarAddressRegister,
			String rentacarPromotionalDescription) {
		super();
		this.rentacarNameRegister = rentacarNameRegister;
		this.rentacarAddressRegister = rentacarAddressRegister;
		this.rentacarPromotionalDescription = rentacarPromotionalDescription;
	}

	public RentACarDTO() {
		super();
	}

	
}
