package com.tim18.skynet.comparator;

import java.util.Comparator;

import com.tim18.skynet.model.Room;

public class RoomPriceComparatorHighToLow implements Comparator<Room>{
	@Override
	public int compare(Room r1, Room r2) {
		if(r1.getPrice() > r2.getPrice()) return -1;
		if(r2.getPrice() < r1.getPrice()) return 1;
		return 0;
	}
}