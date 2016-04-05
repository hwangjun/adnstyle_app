package Action.Watering;

import java.util.Date;

public class WateringDTO {
	private String accessToken;
	private int waterId;
	private Date beforeWateringDate;
	private Date afterWateringDate;
	private String name;
	private String img;
	private Date registrationDate;
	
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public int getWaterId() {
		return waterId;
	}
	public void setWaterId(int waterId) {
		this.waterId = waterId;
	}
	public Date getBeforeWateringDate() {
		return beforeWateringDate;
	}
	public void setBeforeWateringDate(Date beforeWateringDate) {
		this.beforeWateringDate = beforeWateringDate;
	}
	public Date getAfterWateringDate() {
		return afterWateringDate;
	}
	public void setAfterWateringDate(Date afterWateringDate) {
		this.afterWateringDate = afterWateringDate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public Date getRegistrationDate() {
		return registrationDate;
	}
	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}
}
