package Action.Push;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface PushService {

	public void pushAction(HttpServletRequest request, HttpServletResponse response) throws Exception;

}
