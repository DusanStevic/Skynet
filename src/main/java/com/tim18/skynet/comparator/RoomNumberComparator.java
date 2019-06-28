package com.tim18.skynet.comparator;

import java.util.Comparator;

import com.tim18.skynet.model.Room;

public class RoomNumberComparator implements Comparator<Room> {

	@Override
	public int compare(Room r1, Room r2) {
		if(r1.getRoomNumber() < r2.getRoomNumber()) return -1;
		if(r2.getRoomNumber() > r1.getRoomNumber()) return 1;
		return 0;
	}
}