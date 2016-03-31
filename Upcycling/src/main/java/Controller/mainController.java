package Controller;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Action.Member.MemberAction;
import Action.Push.PushAction;

@WebServlet("/")
public class mainController extends HttpServlet implements Servlet {

	static final long serialVersionUID = 1L;

	public mainController() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doProcess(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doProcess(request, response);
	}

	protected void doProcess(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String path = request.getRequestURI().replace(request.getContextPath(), "");
		//MemberService member = null;
		MemberAction member = null;
		PushAction push = null;

		if (path.equals("/loginAction.do")) {
			member = new MemberAction();
			try {
				member.loginAction(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		} else if (path.equals("/logoutAction.do")) {
			member = new MemberAction();
			try {
				member.logoutAction(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (path.equals("/joinAction.do")) {
			member = new MemberAction();
			try {
				member.joinAction(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (path.equals("/updateDeviceTokenAction.do")) {
			member = new MemberAction();
			try {
				member.updateDeviceTokenAction(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (path.equals("/pushAction.do")) {
			push = new PushAction();
			try {
				push.pushAction(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}