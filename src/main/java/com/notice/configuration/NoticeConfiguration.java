package com.notice.configuration;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

import com.notice.Service;

public class NoticeConfiguration extends Application{

	private Set<Object> singletons = new HashSet<Object>();
	 
	public NoticeConfiguration() {
		singletons.add(new Service());
	}
 
	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
	
}
