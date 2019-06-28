package com.tim18.skynet.comparator;

import java.util.Comparator;

import com.tim18.skynet.model.RentACar;


public class RentACarComparatorAddress implements Comparator<RentACar>{
	@Override
    public int compare(RentACar r1, RentACar r2) { 

        // for comparison 
        return r1.getAddress().compareTo(r2.getAddress()); 
       
	   }
}
