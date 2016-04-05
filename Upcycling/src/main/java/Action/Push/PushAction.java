package Action.Push;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javapns.Push;
import javapns.communication.exceptions.CommunicationException;
import javapns.communication.exceptions.KeystoreException;
import javapns.notification.PushNotificationPayload;
import javapns.notification.PushedNotification;
import javapns.notification.ResponsePacket;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class PushAction {

	private static String certificate = "keystore/certificate_push.p12";
	private static String password = "password1234";
	
	// 알람 전송
	public void pushAction(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("push Action");
		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		
		JSONObject jsonObj = JSONObject.fromObject(request.getParameterMap());
		
		String jsonString = request.getParameter("json");
		
		System.out.println(jsonObj.get("json"));
		System.out.println(jsonString);
		
		JSONObject json      = new JSONObject();
		JSONArray  addresses = new JSONArray();
		JSONObject address;
		try{
			int count = 2;

		   for (int i=0 ; i<count ; i++){
		       address = new JSONObject();
		       address.put("CustomerName"     , "Decepticons" + i);
		       address.put("AccountId"        , "1999" + i);
		       addresses.add(address);
		   }
		   json.put("Addresses", addresses);
		} catch (net.sf.json.JSONException e){ 
			System.out.println(e);
		}
		ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();

		//ajax return json
		Runnable runnable = new Runnable() {
			public void run() {
				//System.out.println("Hello !!");
				//try {
					//sendAPNS("mess",false,"aaa");
					//Date startTime = new Date();
					ZonedDateTime now = ZonedDateTime.now( ZoneOffset.UTC );
					 System.out.println("time : "+now);
				//} catch (CommunicationException | KeystoreException e) {
				//	e.printStackTrace();
				//}
			}
		};
		
		response.getWriter().println(json);
		
		service.scheduleAtFixedRate(runnable, 0, 2, TimeUnit.MINUTES);
	
	}

	public void sendAPNS(String message, boolean production, String deviceToken) throws CommunicationException, KeystoreException {
		/*
		 * String Message : push message 
		 * boolean production : true(배포),
		 * false(개발) String deviceToken : device Token
		 */
		//PushNotification push = new PushNotification();
		//push.sendAPNS("Hello World!",false,"2ed202ac08ea9...cf8d55910df290567037dcc4");
		System.out.println("-------Push Notification-------");
		PushNotificationPayload payload = PushNotificationPayload.complex();
		try {
			payload.addAlert(message);
			payload.addBadge(1);
			payload.addSound("default");

			List<PushedNotification> notifications = Push.payload(payload, certificate, password, production, deviceToken);

			for (PushedNotification notification : notifications) {
				if (notification.isSuccessful()) {
					System.out.println("success : " + notification.getDevice().getToken());
				} else {
					Exception exception = notification.getException();
					exception.printStackTrace();

					ResponsePacket errorResponse = notification.getResponse();
					if (errorResponse != null) {
						System.out.println(errorResponse.getMessage());
					}
					System.out.println("fail : " + notification.getDevice().getToken());
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}