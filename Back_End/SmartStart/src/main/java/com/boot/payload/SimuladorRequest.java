package com.boot.payload;

public class SimuladorRequest {

	private String[] names;
	
	public SimuladorRequest() {}
	
	public SimuladorRequest(String[] names) {
		this.names=names;
	}

	public String[] getNames() {
		return names;
	}

	public void setNames(String[] names) {
		this.names = names;
	}
}
