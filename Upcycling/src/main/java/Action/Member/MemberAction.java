package Action.Member;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.RandomStringUtils;

import net.sf.json.JSONObject;

public class MemberAction{
	
	//로그인
	public void loginAction(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("login Action");
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");

		HttpSession session =  request.getSession(true);
		MemberDAO dao = new MemberDAO();
		List<MemberDTO> list = dao.selectUser();
		
		if(list.size() > 0) {
			System.out.println(list.get(0).getUserId());
			System.out.println(list.get(0).getPassword());
			System.out.println(list.get(0).getDeviceToken());
			System.out.println(list.get(0).getAccessToken());
			System.out.println(list.get(0).getExpireTime());
		}
		if(session.getAttribute("access_token") == null){
			String userId = request.getParameter("userId");
			String password = request.getParameter("password");
			System.out.println(userId +" / " + password);
			
			String accessToken = RandomStringUtils.random(36, 0, 20, true, true, "bj81G5RDED3DC6142kasok".toCharArray());
		    System.out.println("token: " + accessToken);

			JSONObject json = new JSONObject();
			
			Date now = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	  	    json.put("expire_time", format.format(now));
		    json.put("access_token", accessToken);

		    session.setAttribute("access_token", accessToken);
		    response.getWriter().println(json);
		}else{
			System.out.println("token있고 expire_time 갱신");
			//expire_time update
		}
		
	}
	
	//로그아웃
	public void logoutAction(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("logout Action");
		HttpSession session = request.getSession();
		if(session != null){
			session.invalidate();
		}
	}
	
	//회원가입
	public void joinAction(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userId = request.getParameter("userId");
		String password = request.getParameter("password");
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		
		params.put("userId", userId);
		
		JSONObject json = new JSONObject();
		
		MemberDAO dao = new MemberDAO();
		
		String admin = dao.selectUserId(params);
		if(admin != null){
			json.put("error", "ID Check");
		}else{
			params.put("password",password);
			dao.insertUser(params);
			json.put("success", "Join success");
		}

		System.out.println("admin : "+ admin);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		response.getWriter().println(json);		
	}

	//토큰 체크
	public void updateDeviceTokenAction(HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");

		JSONObject json = new JSONObject();

		json.put("updateTokenAction", "9999988888");
		json.put("Name", "ManojSarnaik");

		System.out.println(json.toString());
	}

}