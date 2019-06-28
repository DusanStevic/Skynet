package com.tim18.skynet.dto;

public class ImageDTO {
	private String url;

	public ImageDTO(String url) {
		super();
		this.url = url;
	}

	public ImageDTO() {
		super();
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
}
