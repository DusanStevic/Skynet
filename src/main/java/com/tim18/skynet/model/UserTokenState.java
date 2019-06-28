package com.tim18.skynet.model;

public class UserTokenState {
	private String accessToken;
	private Long expiresIn;
	private UserRoleName userType;

	public UserTokenState() {
		this.accessToken = null;
		this.expiresIn = null;
		this.setUserRoleName(null);
	}
	
	
	public UserTokenState(String accessToken, long expiresIn) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }
	

	public UserTokenState(String accessToken, long expiresIn, UserRoleName userType) {
		this.accessToken = accessToken;
		this.expiresIn = expiresIn;
		this.setUserRoleName(userType);
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public Long getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(Long expiresIn) {
		this.expiresIn = expiresIn;
	}

	public UserRoleName getUserRoleName() {
		return userType;
	}

	public void setUserRoleName(UserRoleName userType) {
		this.userType = userType;
	}
}
