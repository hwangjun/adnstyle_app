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
import Action.Watering.WateringAction;

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
		WateringAction watering  = null;
		System.out.println(path);
		if (path.equals("/client/login")) {
			member = new MemberAction();
			try {
				member.loginAction(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}else if (path.equals("/client/token")) {
			member = new MemberAction();
			try {
				member.getTokenAction(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (path.equals("/water/list")) {
			watering = new WateringAction();
			try {
				watering.wateringList(request, response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (path.equals("/water/register")) {
			watering = new WateringAction();
			try {
				watering.getWateringId(request, response);
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