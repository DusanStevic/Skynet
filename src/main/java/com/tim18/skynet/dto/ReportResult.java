package com.tim18.skynet.dto;

import java.util.ArrayList;

public class ReportResult {
	private ArrayList<Long> daily;
	private ArrayList<String> daily2;
	private ArrayList<Long> weekly;
	private ArrayList<String> weekly2;
	private ArrayList<Long> annualy;
	private ArrayList<String> annualy2;
	private long income;

	public ArrayList<Long> getDaily() {
		return daily;
	}

	public void setDaily(ArrayList<Long> daily) {
		this.daily = daily;
	}

	public ArrayList<Long> getWeekly() {
		return weekly;
	}

	public void setWeekly(ArrayList<Long> weekly) {
		this.weekly = weekly;
	}

	public ArrayList<Long> getAnnualy() {
		return annualy;
	}

	public void setAnnualy(ArrayList<Long> annualy) {
		this.annualy = annualy;
	}

	public long getIncome() {
		return income;
	}

	public void setIncome(long income) {
		this.income = income;
	}

	

	public ReportResult(ArrayList<Long> daily, ArrayList<String> daily2, ArrayList<Long> weekly,
			ArrayList<String> weekly2, ArrayList<Long> annualy, ArrayList<String> annualy2, long income) {
		super();
		this.daily = daily;
		this.daily2 = daily2;
		this.weekly = weekly;
		this.weekly2 = weekly2;
		this.annualy = annualy;
		this.annualy2 = annualy2;
		this.income = income;
	}

	public ArrayList<String> getDaily2() {
		return daily2;
	}

	public void setDaily2(ArrayList<String> daily2) {
		this.daily2 = daily2;
	}

	public ArrayList<String> getWeekly2() {
		return weekly2;
	}

	public void setWeekly2(ArrayList<String> weekly2) {
		this.weekly2 = weekly2;
	}

	public ArrayList<String> getAnnualy2() {
		return annualy2;
	}

	public void setAnnualy2(ArrayList<String> annualy2) {
		this.annualy2 = annualy2;
	}

	public ReportResult() {
		super();
	}
}
