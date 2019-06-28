package com.tim18.skynet.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tim18.skynet.model.Hotel;

public interface HotelService {
	public Hotel save(Hotel hotel);
	public Hotel findOne(Long id);
	public List<Hotel> findAll();
	public List<Hotel> search(String name, String address, Date checkin, Date checkout, int beds);
	public void remove(Long id);
	public ArrayList<Object[]> dailyReport(long id);
	public ArrayList<Object[]> weeklyReport(long id);
	public ArrayList<Object[]> monthlyReport(long id);
	public Long incomeReport(long id, Date date1, Date date2);
}
