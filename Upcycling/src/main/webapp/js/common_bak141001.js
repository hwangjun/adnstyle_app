function depth3_gnb(){
	$(function(){
		$("#header .gnb li .sub ul li.two_depth a").addClass("active");
		$("#header .gnb li .sub2 ul.depth li a").removeClass("active");
		$("#header .gnb li .sub2 ul.depth").css("display", "block");
			return false;
	});
}

// gnb
function gnb(dep1, dep2, dep3){
	chgBg(dep1);
		var depth1 = $(".gnb > ul > li:eq("+(dep1-1)+")");
		var depth2 = depth1.find(".sub").find(">ul>li:eq("+(dep2-1)+")");
		var depth3 = depth2.find(">ul>li:eq("+(dep3-1)+")");
		
		depth1.addClass("on");		
		depth2.addClass("on");		
		depth3.addClass("on");
		
		depth1.find(".sub").show();
		depth2.find(".depth").show();	
}

$(document).ready(function(){	
	//���콺����
	$("ul.gnb >  li").click(function(){
		var n = $(this).index();
		$("ul.gnb > li").removeClass("on");
		$(this).addClass("on");
		
		$(".gnb li .sub").hide();
		$(this).find(".sub").show();
	});

	
	//Ŭ��
	$(".gnb .sub > ul > li > a").on("click", function(){
		$(".gnb li .sub2 ul.depth").stop().hide();
		$(".gnb .sub > ul > li").removeClass("active");
		$(this).parents().addClass("active");
		
		if(!$(this).hasClass("active")){
			var a = $(this).attr("href");
			var a = a.indexOf("#none");
			
			if(a>-1){
						
				$(".gnb .sub ul li a").removeClass("active");
				
				$(".active > .sub2 > .depth").stop().slideDown(250);
				
				if(!$(this).hasClass("active")){		
					$(this).addClass("active");
					//$(this).siblings(".depth").stop().slideUp(250);
				}
				return false;
			}			
		}
	});

});// e: gnb




//�����üũ
function checkEmpty (inputName, words)
{
	if (inputName.value == "")
	{
		alert(words);
		inputName.focus();
		return false;
	}
	return true;
}

//���� all Clear
function allClear(inputName)
{
	inputName.value = assert_msglen(inputName.value, 0);
}

//����üũ
function checkLength (inputName, size, words) 
{
	if (inputName.value.length < size )
	{
		alert(words);
		inputName.focus();
		return false;
	}
	return true;
}

//����üũ
function checkNumber (inputName, words)
{
	if (isNaN(inputName.value))
	{
		alert(words);
		inputName.value="";
		inputName.focus();
		return false;
	}
	return true;
}

//â�ݱ�
function closeWin()
{
	self.close(); 
}

//â�ݱ� �θ�â���ΰ�ħ
function popClose()
{
	opener.window.location.reload();
	self.close();
}

//open
function onclickPop(urlN, newN, sizeN) 
{
	var new_open;
	new_open = window.open(urlN, newN, sizeN);
	new_open.focus();
}

//target open
function targetOpen(urlN, inputN, sizeN, formN) 
{
	var new_up;
	new_up = window.open('',inputN,sizeN);
	formN.method="post";
	formN.target=inputN;
	formN.action=urlN;
	formN.submit();
	new_up.focus();
}

//�ڵ��ѱ�
function autoTab(inputName, next, size)
{
	if( inputName != null && next != null)
	{
		if (inputName.value.length >= size)
			next.focus();
	}
}

//����+���� ����
function isValidID(idVal)
{
	var result = true;
	var regExp = /[^0-9A-Za-z_]/;

	if( idVal.length < 4 ) result = false;

	if( regExp.test( idVal ) )	result = false;

	return result;
}

//div display
function disPlay(str01, str02)
{
	if(str02 == 'block')
	{
		document.getElementById(str01).style.display = 'block';
	}
	else
	{
		document.getElementById(str01).style.display = 'none';
	}
}

function check(inputName1, inputName2)
{
	if(inputName1.length > 1)  // ���� ���� ���
	{ 
		for(var i = 0; i<inputName1.length;i++) 
		{
			inputName1[i].checked=inputName2.checked;
		}
	} 
	else // �� ���� ���
	{ 
		inputName1.checked = inputName2.checked;
	}
}

//Board Detail
function boardDetail(boardSeq ,seq, formName, url)
{
	boardSeq.value = seq;
	formName.action = url;
	formName.submit();
}

//checkBox All
function check(inputName1, inputName2)
{
	 cbox = inputName1;
	 if(cbox.length) 
	 {  // ���� ���� ���
		  for(var i = 0; i<cbox.length;i++) 
		  {
			  cbox[i].checked = inputName2.checked;
		  }
	 } 
	 else 
	 { // �� ���� ���
		 cbox.checked = inputName2.checked;
	 }
}

//div ��ġ
function layerArea()
{
	var o = new Object();
	
	o.x = (document.layers) ? loc.pageX : event.clientX;
	o.y = (document.layers) ? loc.pageY : event.clientY;
	
	return o;
}

//div �ڵ�
function divstyleP(divId, divSt)
{
	var o = new Object();
	o = layerArea();

	//�ش� ��ǥ ��ġ�� ��� ���� ���̾� �̵�
	document.getElementById(divId).style.pixelTop	= o.y;
	document.getElementById(divId).style.pixelLeft	= o.x;
	
	disPlay(divId, divSt);

}

//null üũ
function nullCheck(str)
{
	var doc;
	if (str == null || str == 'null')
	{
		doc = '';
	}
	else
	{
		doc = str;
	}
	return doc;
}

//��¥
function dateSelect(docForm,selectIndex) {
	today = new Date();
	this_year=today.getFullYear();
	watch = new Date(this_year, docForm.month.options[docForm.month.selectedIndex].value,1);
	hourDiffer = watch - 86400000;
	calendar = new Date(hourDiffer);
	
	var daysInMonth = calendar.getDate();
	for (var i = 0; i < docForm.day.length; i++) {
		docForm.day.options[0] = null;
	}
	for (var i = 0; i < daysInMonth; i++) {
		if (i < 9) {
			docForm.day.options[i] = new Option("0"+(i+1));
		} else {
			docForm.day.options[i] = new Option(i+1);
		}
	}
	docForm.day.options[0].selected = true;
}
function Today(year,mon,day,dis){
	if(year == "null" && mon == "null" && day == "null"){
		today = new Date();
		this_year=today.getFullYear();
		this_month=today.getMonth();
		this_month+=1;
		this_day=today.getDate();
	} else {
		var this_year = eval(year);
		var this_month = eval(mon);
		var this_day = eval(day);
	}
	if(this_month <10) this_month="0" + this_month;
	if(this_day < 10) this_day="0" + this_day;

	montharray=new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); 
	maxdays = montharray[this_month-1]; 
	//�Ʒ��� ������ ���ϴ� ��
	if (this_month==2) {
		if ((this_year/4)!=parseInt(this_year/4)) {
			maxdays=28; 
		} else { maxdays=29; }
	}
}

// select option 
function makeOption(st, en)
{
	var newOption = "";
	for (var i=st; i<=en; i++) 
	{
		newOption += "<option value='" + optionCh(i) + "'>"+optionCh(i)+"</option>";
	}
	return newOption;
}


function makeOption2(st, en, num)
{
	var newOption = "";
	for (var i=st; i<=en; i++) 
	{	
		if(optionCh(i) == num) { newOption += "<option value='" + optionCh(i) + "' selected>" +optionCh(i)+ "</option>"; }
		else		 { newOption += "<option value='" + optionCh(i) + "'>" +optionCh(i)+ "</option>"; }
	}
	return newOption;
}

function makeOption3(st, en, num)
{
	var newOption = "";
	for (var i=st; i<=en; i++) 
	{
		if(i%5 == 0)
		{
			if(optionCh(i) == num) { newOption += "<option value='" + optionCh(i) + "' selected>" +optionCh(i)+ "</option>"; }
			else				   { newOption += "<option value='" + optionCh(i) + "'>" +optionCh(i)+ "</option>"; }
		}
	}
	return newOption;
}

// s < 10 = 0+s
function optionCh(s)
{
	if(s < 10) s = '0' + s;
	return s;
}

//��������üũ
function numCheck(st, ed, num, str)
{
	var cnt = 0;
	for(var i=st; i<=ed; i++)
	{
		if(optionCh(i) == num) ++cnt;
	}
	if(cnt == 0) { alert(str); return false; }
	return true;
}

//�����ٿ�ε�
function excelDown(formName)
{	
	formName.target="hidden_frame";
	formName.method="POST";
	formName.action="../commonPage/excelDownProcess.jsp";
	formName.submit();
}

//�߽Ź�ȣ����
function selectPhone(phone, reqPh)
{
	for(var i=0; i < phone.length ; i++)
	{
		if(phone.value != 0)
		{
			reqPh.value = phone.value;
		}
		else
		{
			reqPh.value = '';
		}
	}
}

//paging
function pageMove(formName , pageN, pageNum) 
{
	pageN.value = pageNum;
	formName.submit();
}

//input text ǳ������
var qTipTag = "i,input";
var qTipX = 0;
var qTipY = 15;

tooltip = {
	name : "qTip",
	offsetX : qTipX,
	offsetY : qTipY,
	tip : null
};

tooltip.init = function () {
	var tipNameSpaceURI = "http://www.w3.org/1999/xhtml";
	if(!tipContainerID){ var tipContainerID = "qTip";}
	var tipContainer = document.getElementById(tipContainerID);

	if(!tipContainer)
	{
		tipContainer = document.createElementNS ? document.createElementNS(tipNameSpaceURI, "div") : document.createElement("div");  
		tipContainer.setAttribute("id", tipContainerID);  
		document.getElementsByTagName("body").item(0).appendChild(tipContainer);  
	}

	if (!document.getElementById) return;  
	this.tip = document.getElementById (this.name);  
	if (this.tip) document.onmousemove = function (evt) { tooltip.move (evt); }; 

	var a, sTitle, elements;  
	var elementList = qTipTag.split(",");  

	for(var j = 0; j < elementList.length; j++)  
	{
		elements = document.getElementsByTagName(elementList[j]);
		if(elements)
		{
			for (var i = 0; i < elements.length; i ++)
			{
				a = elements[i];
				sTitle = a.getAttribute("title");
				if(sTitle)
				{
					a.setAttribute("tiptitle", sTitle);
					a.removeAttribute("title");
					a.removeAttribute("alt");
					a.onmouseover = function() { tooltip.show(this.getAttribute('tiptitle')); };
					a.onmouseout = function()  { tooltip.hide(); };
				}
			}
		}
	}
};

tooltip.move = function (evt) {
	var x=0, y=0;
	if (document.all) {//IE
		x = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
		y = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
		x += window.event.clientX;
		y += window.event.clientY;
	} else {//Good Browsers
		x = evt.pageX;
		y = evt.pageY;
	}
	this.tip.style.left = (x + this.offsetX) + "px";
	this.tip.style.top = (y + this.offsetY) + "px";
};

tooltip.show = function (text) {
	if (!this.tip) return;
	this.tip.innerHTML = text;
	this.tip.style.display = "block";
};

tooltip.hide = function () {
	if (!this.tip) return;
	this.tip.innerHTML = "";
	this.tip.style.display = "none";
};

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
		func();
		};
	}
}

addLoadEvent(function() {
	tooltip.init ();
});

//table �׵θ�
function roundTable(objID) {
	var obj = document.getElementById(objID);
	var Parent, objTmp, Table, TBody, TR, TD;
	var bdcolor, bgcolor, Space;
	var trIDX, tdIDX, MAX;
	var styleWidth, styleHeight;
	Parent = obj.parentNode;
	objTmp = document.createElement('SPAN');
	Parent.insertBefore(objTmp, obj);
	Parent.removeChild(obj);
	bdcolor = obj.getAttribute('rborder');
	bgcolor = obj.getAttribute('rbgcolor');
	radius = parseInt(obj.getAttribute('radius'));

	if (radius == null || radius < 1) { radius = 1; }
	else if (radius > 6)		  { radius = 6; }

	MAX = radius * 2 + 1;
	Table = document.createElement('TABLE');
	TBody = document.createElement('TBODY');
	Table.cellSpacing = 0;
	Table.cellPadding = 0;

	for (trIDX=0; trIDX < MAX; trIDX++) {
		TR = document.createElement('TR');
		Space = Math.abs(trIDX - parseInt(radius));

		for (tdIDX=0; tdIDX < MAX; tdIDX++) {
			TD = document.createElement('TD');
			styleWidth = '1px'; styleHeight = '1px';

			if (tdIDX == 0 || tdIDX == MAX - 1) styleHeight = null;
			else if (trIDX == 0 || trIDX == MAX - 1) styleWidth = null;
			else if (radius > 2)
			{
				if (Math.abs(tdIDX - radius) == 1) styleWidth = '2px';
				if (Math.abs(trIDX - radius) == 1) styleHeight = '2px';
			}


			if (styleWidth != null) TD.style.width = styleWidth;
			if (styleHeight != null) TD.style.height = styleHeight;

			if (Space == tdIDX || Space == MAX - tdIDX - 1) TD.style.backgroundColor = bdcolor;
			else if (tdIDX > Space && Space < MAX - tdIDX - 1)  TD.style.backgroundColor = bgcolor;

			if (Space == 0 && tdIDX == radius) TD.appendChild(obj);

			TR.appendChild(TD);
		}
		TBody.appendChild(TR);
	}
	Table.appendChild(TBody);
	Parent.insertBefore(Table, objTmp);
}

//��¥üũ 
function dateCheck(ct, st, num)
{
	var c_day = new Array();
	var s_day = new Array();
	c_day = ct.split("-");
	s_day = st.split("-");

	var date1 = new Date(c_day[0],c_day[1]-num);
	var date2 = new Date(s_day[0],s_day[1]); 

	if((date2-date1) < 0) { alert(num+"���� ���� �����ʹ� �˻� �� �������ϴ�."); return false; }
	return true;
}

//s: Tab Menu
$(document).ready(function(){
	//����ġ �ʱ�ȭ
	$(window).load(function() {
		tabTitPosition();	
	});
	//Ȱ��ȭ�� �� ����
	tabView();
	
	//inTab
	inTabView();
	
	//�Ǹ޴� Ŭ��
	$(".tab_tit a").on("click",function(){
		if(!$(this).hasClass("on")){	
			$(".tab_tit a.on").removeClass("on");
			$(this).addClass("on");
			tabView();
		}
		return false;
	});
	
	$(".in_tab_link li a").on("click",function(){
		if(!$(this).hasClass("on")){	
			$(this).parent().siblings("li").find("a").removeClass("on");
			$(this).addClass("on");
			inTabView();
		}
		return false;
	});
});

function tabView(){
	$(".tab_con").hide();
	$(".tab_tit a").each(function() {
		if($(this).hasClass("on")){
			var a = $(this).attr("href");
			$(a).show();
			var aImg = $(this).find("img").attr("src");
			var bImg = aImg.replace("_off","_on");
			$(this).find("img").attr("src",bImg);
		}
		else{
			var aImg = $(this).find("img").attr("src");
			var bImg = aImg.replace("_on","_off");
			$(this).find("img").attr("src",bImg);
		}
	});
}

function tabTitPosition(){
	var tabNum = $(".tab_tit").size();
	var tabWidth =[];		
	for(i=0;i<tabNum;i++){
		var e =$(".tab_tit:eq("+i+") a").outerWidth();
		tabWidth.push(e);
	}
	$(".tab_tit").each(function(index){
		if(index==0){
				$(this).css({"left":0});
		}					
		if(index>0){
			var tabWidthSum = 0 ;
			for(i=0;i<index;i++){
				tabWidthSum += tabWidth[i];
				$(this).css({"left":tabWidthSum});
			}
		}
	});	
}

function inTabView(){
	$(".in_tab_con").hide();
	$(".in_tab_link li a").each(function() {
		if($(this).hasClass("on")){
			var a = $(this).attr("href");
			$(a).show();
		}
	});
}
//e: Tab Menu

//faq
jQuery(function(){
	
	var article = $('.faq_wrap .article');
	article.addClass('hide');
	article.find('.a').slideUp(300);
	$(".a_first").removeClass('hide').addClass('show');
	$(".first").show();
	
	$('.faq_wrap .article .trigger').click(function(){
		var myArticle = $(this).parents('.article:first');
		if(myArticle.hasClass('hide')){
			article.addClass('hide').removeClass('show');
			article.find('.a').slideUp(300);
			myArticle.removeClass('hide').addClass('show');
			myArticle.find('.a').slideDown(300);
		} else {
			myArticle.removeClass('show').addClass('hide');
			myArticle.find('.a').slideUp(300);
		}
	});

});