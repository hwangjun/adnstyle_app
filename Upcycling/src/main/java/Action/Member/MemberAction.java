package Action.Member;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.RandomStringUtils;

import Common.CommonMethod;
import net.sf.json.JSONObject;

public class MemberAction{
	
	//앱처음 실행
	public void getTokenAction(HttpServletRequest request, HttpServletResponse response) throws Exception {
		MemberDAO dao = new MemberDAO();
		
		String accessToken = RandomStringUtils.randomAlphabetic(20);
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("accessToken", accessToken);
		
		String tokenCheck = dao.selectUserId(params);
		System.out.println(accessToken);
		JSONObject result = new JSONObject();
		
		if(tokenCheck == null){
			dao.insertUser(params);	
			result.put("result", "ok");
			result.put("accessToken", CommonMethod.encoding(accessToken));
		}else{
			result.put("result", "fail");
		}
		
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
	    response.getWriter().println(result);
	}
	
	//로그인
	public void loginAction(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String accessToken =  CommonMethod.decoding(request.getParameter("accessToken"));
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		
		params.put("accessToken", accessToken);
		
		JSONObject json = new JSONObject();
		
		MemberDAO dao = new MemberDAO();
		
		String admin = dao.selectUserId(params);
		System.out.println(admin);
		if(admin == null){
			json.put("result", "fail");
		}else{
			json.put("result", "ok");
		}
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		response.getWriter().println(json);		
	}
}