package Action.Watering;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Common.CommonMethod;
import net.sf.json.JSONObject;

public class WateringAction {
	
	public void wateringList(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException{
		String accessToken =  CommonMethod.decoding(request.getParameter("accessToken"));
		HashMap<String, Object> params = new HashMap<String, Object>();
		
		params.put("accessToken", accessToken);
		
		WateringDAO dao = new WateringDAO();
		List<WateringDTO> list = dao.selectWateringList(params);
		
		JSONObject result = new JSONObject();
		result.put("list", list);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
	    response.getWriter().println(result);
	}
	
	public void getWateringId(HttpServletRequest request, HttpServletResponse response) throws SQLException , IOException{
		String accessToken =  CommonMethod.decoding(request.getParameter("accessToken"));

		HashMap<String, Object> params = new HashMap<String, Object>();
		
		params.put("accessToken", accessToken);
		
		WateringDAO dao = new WateringDAO();
		
		int list = dao.selectWateringId(params);
		
		JSONObject result = new JSONObject();
		
		result.put("selectWateringId", list);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
	    response.getWriter().println(result);
	}
	
	public void wateringInsert(HttpServletRequest request, HttpServletResponse response) throws SQLException{
		
	}
	
	public void wateringUpdate(HttpServletRequest request, HttpServletResponse response) throws SQLException{
		
	}
	
	public void wateringDelete(HttpServletRequest request, HttpServletResponse response) throws SQLException{
		
	}

	
}
