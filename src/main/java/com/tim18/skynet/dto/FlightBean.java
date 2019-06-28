package com.tim18.skynet.dto;

import java.util.Date;

import com.tim18.skynet.model.Flight;



public class FlightBean {
	
	
	private String startDestination;
	private String endDestination;
	private Date startDate;
	private String startDate_str;
	private String endDate_str;
	private Date endDate;
	private int  flightDuration;
	private int flightLength;
	private double businessPrice;
	private double economicPrice;
	private double firstClassPrice;
	private double minBusiness;
	private double minEconomic;
	private double minFirstClass;
	private double maxBusiness;
	private double maxEconomic;
	private double maxFirstClass;
	private String flightCompany;
	private String  economicCapacity;
	private String buisinesssCapacity;
	private String firstClassCapacity;
	private Long id;
	private Long companyId;
	private double rate;
	
	
	public FlightBean() {
		// TODO Auto-generated constructor stub
	}


	public FlightBean(String startDestination, String endDestination, Date startDate, Date endDate, int flightDuration,
			int flightLength, double businessPrice, double economicPrice, double firstClassPrice, double minBusiness,
			double minEconomic, double minFirstClass, double maxBusiness, double maxEconomic, double maxFirstClass,
			String flightCompany, String economicCapacity, String buisinesssCapacity, String firstClassCapacity, Long companyId) {
		super();
		this.startDestination = startDestination;
		this.endDestination = endDestination;
		this.startDate = startDate;
		this.endDate = endDate;
		this.flightDuration = flightDuration;
		this.flightLength = flightLength;
		this.businessPrice = businessPrice;
		this.economicPrice = economicPrice;
		this.firstClassPrice = firstClassPrice;
		this.minBusiness = minBusiness;
		this.minEconomic = minEconomic;
		this.minFirstClass = minFirstClass;
		this.maxBusiness = maxBusiness;
		this.maxEconomic = maxEconomic;
		this.maxFirstClass = maxFirstClass;
		this.flightCompany = flightCompany;
		this.economicCapacity = economicCapacity;
		this.buisinesssCapacity = buisinesssCapacity;
		this.firstClassCapacity = firstClassCapacity;
		this.companyId = companyId;
	}
	
	public FlightBean(Flight flight, String companyName, String startDate, String endDate) {
		this.startDestination = flight.getStartDestination().getName();
		this.endDestination = flight.getEndDestination().getName();;
		this.startDate = flight.getStartDate();
		this.endDate = flight.getEndDate();
		this.flightDuration = flight.getFlightDuration();
		this.flightLength = flight.getFlightLength();
		this.businessPrice = flight.getBusinessPrice();
		this.economicPrice = flight.getEconomicPrice();
		this.firstClassPrice = flight.getFirstClassPrice();
		this.flightCompany = companyName;
		this.id = flight.getId();
		this.startDate_str = startDate;
		this.endDate_str = endDate;
	}


	public String getStartDestination() {
		return startDestination;
	}


	public void setStartDestination(String startDestination) {
		this.startDestination = startDestination;
	}


	public String getEndDestination() {
		return endDestination;
	}


	public void setEndDestination(String endDestination) {
		this.endDestination = endDestination;
	}


	public Date getStartDate() {
		return startDate;
	}


	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}


	public Date getEndDate() {
		return endDate;
	}


	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}


	public int getFlightDuration() {
		return flightDuration;
	}


	public void setFlightDuration(int flightDuration) {
		this.flightDuration = flightDuration;
	}


	public int getFlightLength() {
		return flightLength;
	}


	public void setFlightLength(int flightLength) {
		this.flightLength = flightLength;
	}


	public double getBusinessPrice() {
		return businessPrice;
	}


	public void setBusinessPrice(double businessPrice) {
		this.businessPrice = businessPrice;
	}


	public double getEconomicPrice() {
		return economicPrice;
	}


	public void setEconomicPrice(double economicPrice) {
		this.economicPrice = economicPrice;
	}


	public double getFirstClassPrice() {
		return firstClassPrice;
	}


	public void setFirstClassPrice(double firstClassPrice) {
		this.firstClassPrice = firstClassPrice;
	}


	public double getMinBusiness() {
		return minBusiness;
	}


	public void setMinBusiness(double minBusiness) {
		this.minBusiness = minBusiness;
	}


	public double getMinEconomic() {
		return minEconomic;
	}


	public void setMinEconomic(double minEconomic) {
		this.minEconomic = minEconomic;
	}


	public double getMinFirstClass() {
		return minFirstClass;
	}


	public void setMinFirstClass(double minFirstClass) {
		this.minFirstClass = minFirstClass;
	}


	public double getMaxBusiness() {
		return maxBusiness;
	}


	public void setMaxBusiness(double maxBusiness) {
		this.maxBusiness = maxBusiness;
	}


	public double getMaxEconomic() {
		return maxEconomic;
	}


	public void setMaxEconomic(double maxEconomic) {
		this.maxEconomic = maxEconomic;
	}


	public double getMaxFirstClass() {
		return maxFirstClass;
	}


	public void setMaxFirstClass(double maxFirstClass) {
		this.maxFirstClass = maxFirstClass;
	}


	public String getFlightCompany() {
		return flightCompany;
	}


	public void setFlightCompany(String flightCompany) {
		this.flightCompany = flightCompany;
	}


	public String getEconomicCapacity() {
		return economicCapacity;
	}


	public void setEconomicCapacity(String economicCapacity) {
		this.economicCapacity = economicCapacity;
	}


	public String getBuisinesssCapacity() {
		return buisinesssCapacity;
	}


	public void setBuisinesssCapacity(String buisinesssCapacity) {
		this.buisinesssCapacity = buisinesssCapacity;
	}


	public String getFirstClassCapacity() {
		return firstClassCapacity;
	}


	public void setFirstClassCapacity(String firstClassCapacity) {
		this.firstClassCapacity = firstClassCapacity;
	}


	public String getStartDate_str() {
		return startDate_str;
	}


	public void setStartDate_str(String startDate_str) {
		this.startDate_str = startDate_str;
	}


	public String getEndDate_str() {
		return endDate_str;
	}


	public void setEndDate_str(String endDate_str) {
		this.endDate_str = endDate_str;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long getCompanyId() {
		return companyId;
	}


	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}


	public double getRate() {
		return rate;
	}


	public void setRate(double rate) {
		this.rate = rate;
	}


	@Override
	public String toString() {
		return "FlightBean [startDestination=" + startDestination + ", endDestination=" + endDestination
				+ ", startDate=" + startDate + ", startDate_str=" + startDate_str + ", endDate_str=" + endDate_str
				+ ", endDate=" + endDate + ", flightDuration=" + flightDuration + ", flightLength=" + flightLength
				+ ", businessPrice=" + businessPrice + ", economicPrice=" + economicPrice + ", firstClassPrice="
				+ firstClassPrice + ", minBusiness=" + minBusiness + ", minEconomic=" + minEconomic + ", minFirstClass="
				+ minFirstClass + ", maxBusiness=" + maxBusiness + ", maxEconomic=" + maxEconomic + ", maxFirstClass="
				+ maxFirstClass + ", flightCompany=" + flightCompany + ", economicCapacity=" + economicCapacity
				+ ", buisinesssCapacity=" + buisinesssCapacity + ", firstClassCapacity=" + firstClassCapacity + ", id="
				+ id + ", companyId=" + companyId + ", rate=" + rate + "]";
	}
	
	

}
