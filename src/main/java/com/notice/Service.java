package com.notice;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.notice.domain.Notice;
import com.notice.domain.NoticeWrapper;

@Path("/service")
public class Service {

	@GET
	@Path("/{location}")
	@Produces("application/json")
	public NoticeWrapper getNotices(@PathParam("location") String location) {

		String result = "Restful example : " + location;
		System.out.println(result + "---------------");
		Notice notice1 = new Notice();
		notice1.setLocation(location);
		notice1.setComment("Sample");
		notice1.setSubject("Samplesubject jini oin pinp pknp pknpokm pknpk pknpj pkjj pjnjn jnuibyb ygiuhbhub iuhboijboij uhboijboij ouhboihbh uhbojnoij ojnpijn pojnpn pjnpokn pijnjn oiubohbou igvbuhb ouboijnoijn ounoijnoijn gybhbjnij k;mkmjn ljnlkjnpjkn ygvuyghvbigu pokmpkm hbouhbob kmpokmpoj uygvygv khbjbo oijnojnfyv ohjboijbnbi oujoiuhb ojnoijn oijnijn oiunijh");
		Notice notice2 = new Notice();
		notice2.setLocation(location);
		notice2.setComment("Samplesubject jini oin pinp pknp pknpokm pknpk pknpj pkjj pjnjn jnuibyb ygiuhbhub iuhboijboij uhboijboij ouhboihbh uhbojnoij ojnpijn pojnpn pjnpokn pijnjn oiubohbou igvbuhb ouboijnoijn ounoijnoijn gybhbjnij k;mkmjn ljnlkjnpjkn ygvuyghvbigu pokmpkm hbouhbob kmpokmpoj uygvygv khbjbo oijnojnfyv ohjboijbnbi oujoiuhb ojnoijn oijnijn oiunijh");
		notice2.setSubject("Samplesubject");

		List<Notice> notice = new ArrayList<Notice>();
		notice.add(notice1);
		notice.add(notice2);

		NoticeWrapper wrapper = new NoticeWrapper();
		wrapper.setNotices(notice);

		return wrapper;

	}
	
	@POST
	@Path("/newPost-/{location}")
	@Consumes("application/json")
	@Produces("application/json")
	public String postNotice(@PathParam("location") String location,Notice notice) {
		System.out.println("new Subject"+notice.getSubject());
		System.out.println("location"+location);
		return "ok";
		

	}
	
	
	
}
