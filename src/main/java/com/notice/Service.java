package com.notice;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;


















import com.notice.Utils.NoticeUtils;
import com.notice.configuration.SecretObject;
import com.notice.dao.NoticeDao;
import com.notice.domain.Notice;
import com.notice.domain.NoticeWrapper;

@Path("/service")
public class Service {
	
	 private static final  Map<String, String> typeRef;
	 static {
	        Map<String, String> aMap = new HashMap<String, String>();
	        aMap.put("home", "notice");
	        aMap.put("classifieds", "classified");
	        aMap.put("creative writing", "write");
	        aMap.put("cooking", "cook");
	        typeRef = Collections.unmodifiableMap(aMap);
	    }
	 
	 
	@GET
	@Path("/{type}")
	@Produces("application/json")
	public NoticeWrapper getNotices(@PathParam("type") String type) {

	
		System.out.println("Get POST : "+type + "   ---------------");
		/*Notice notice1 = new Notice();
		notice1.setLocation(location);
		notice1.setComment("Sample");
		notice1.setCreatedDate((new Date()).toString());
		System.out.println(notice1.getCreatedDate());
		notice1.setSubject("Samplesubject jini oin pv khbjbo oijnojnfyv ohjboijbnbi oujoiuhb ojnoijn oijnijn oiunijh");
		Notice notice2 = new Notice();
		notice2.setLocation(location);
		notice2.setComment("But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?");
		notice2.setSubject("Samplesubject");

		List<Notice> notice = new ArrayList<Notice>();
		notice.add(notice1);
		notice.add(notice2);
		notice.add(notice1);
		notice.add(notice2);
		notice.add(notice1);
		notice.add(notice2);
		notice.add(notice1);
		notice.add(notice2);
		notice.add(notice1);
		notice.add(notice2);
		notice.add(notice1);
		notice.add(notice2);
		

		NoticeWrapper wrapper = new NoticeWrapper();
		wrapper.setNotices(notice);
		*/
		
		NoticeDao noticeDao = new NoticeDao();
		return noticeDao.getNotices(typeRef.get(type));

		

	}
	
	@POST
	@Path("/newPost")
	@Consumes("application/json")
	@Produces("application/json")
	public String postNotice(Notice notice) {
	
		System.out.println("POST : "+notice.getLocation() + "   -----------");
		
		notice.setLocation(typeRef.get(notice.getLocation()));
		
		NoticeDao noticeDao = new NoticeDao();
		if(!notice.getSubject().trim().isEmpty() && noticeDao.postNotice(notice))
		{
			return "ok";
		}else{
		return "failed";
		}

	}
	
	@GET
	@Path("/token/value")
	public void getToken(@Context HttpServletRequest request,@Context HttpServletResponse response,@HeaderParam("Referer") String referer)
	{
		
		SecretObject secretObject = new SecretObject();
		secretObject.setJsessionId(request.getSession().getId());
		
		System.out.println("JsessionId : "+request.getSession().getId());
		secretObject.setProtocol(request.getProtocol());
		secretObject.setRemoteAddress(request.getRemoteAddr());
		
		String tokenGeneratedTime = String.valueOf(System.currentTimeMillis());
		
		System.out.println("referer :  " +referer);
		System.out.println("tokenGeneratedTime : "+tokenGeneratedTime);
		secretObject.setTokenGeneratedTime(tokenGeneratedTime);
		
		String returnVal = NoticeUtils.generateToken(secretObject);
		
		HttpSession httpSession = request.getSession();
		httpSession.setAttribute(referer, tokenGeneratedTime);
		
		
		response.addHeader("X-TOKEN", returnVal);
		

	}
	
	
 
	
	
	
}
