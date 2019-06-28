package com.tim18.skynet.enums;

public enum FriendRequestState {
	
   
    ADD_FRIEND ("Add friend"),
    FRIENDS ("Friends"),
    REQUEST_SENT ("Request sent");

    private final String value;

    private FriendRequestState(final String value) {
        this.value = value;
    }

    public String getValue() { return value; }
    
}