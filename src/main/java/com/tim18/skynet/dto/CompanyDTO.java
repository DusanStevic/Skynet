package com.tim18.skynet.dto;

public class CompanyDTO {
	private String name;
	private String adress;
	private String description;
	private String image;
	
	
	
	public CompanyDTO(String name, String adress, String description, String image) {
		super();
		this.name = name;
		this.adress = adress;
		this.description = description;
		this.image = image;
	}
	
	

	public String getImage() {
		return image;
	}



	public void setImage(String image) {
		this.image = image;
	}



	public CompanyDTO() {
		super();
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAdress() {
		return adress;
	}
	public void setAdress(String adress) {
		this.adress = adress;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
