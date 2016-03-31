var UIController=( function() {

    var _size=0;
    var _breakpoint=0;
    var _barChk=false;
    var _mn=-1;
    var _sn=-1;
    var _ln=-1;
    var _currentMn=0;
    var _currentSn=0;
    var _subChk=false;
    var _sidebarWrapper = $("#sidebar-wrapper");
    var _wrapper = $("#wrapper");
    var _contentH = _sidebarWrapper.height();
    var _menus = [];//메뉴 초기화 할 배열
    var _subMenus=[];//서브 메뉴 초기화 할 배열 
    var _lastMenus=[];//3depth 메뉴 초기화 할 배열 
    var SIDE_BAR_EVENT="sidebarEvent";
    var WRAPPER_TOGGLE_EVENT="wrapperToggleEvent";
    var MENU_VIEW_EVENT="menuViewEvent";

    function setSize(value){
        _size=value;
    };
    function getSize(){
        return _size;
    };
    function setBreakpointSize(value){
        _breakpoint=value;
    };
    function getBreakpointSize(){
        return _breakpoint;
    };
    function getSideBarState(){
        return _barChk;
    };
    function setSideBarState(chk){
        _barChk=chk;
         updateSubpageState();
    };
    function getMn(){
        return _mn;
    };
    function setMn(value){
        _mn=value;
    };
    function getSn(){
       return _sn;
    }
    function setSn(value){
       _sn=value;
    }
    function getLn(){
      return _ln;
    }
    function setLn(value){
       _ln=value;
    }
    
    function setView( mn,  sn, ln ){
        setMn(mn);
        setSn(sn);
        setLn(ln);
        
   
       activeMenus( getMn() );
       activeSub( getMn(), getSn() );
       activeLastSub( getMn(), getSn(), getLn() );

    }
    
    init();
    
    function init(){
         
        
	    //서브 페이지 메인페이지 인지 체크~
	    if(getSideBarState()==false){
	    	
	    	//브레이크 포인트 설정.
    	    setBreakpointSize(1008);
    	
	    	//$("#sidebar-wrapper")
	    	_sidebarWrapper.bind(MENU_VIEW_EVENT, function(event, chk) {
	            mobileMenuViewChk(chk);
	        });
	    
	    	$("body").bind(SIDE_BAR_EVENT, function(){  updateSideBarH(); }).trigger(SIDE_BAR_EVENT);
	     $("body").bind(WRAPPER_TOGGLE_EVENT, wrapperToggleChk);
	    	
	    	 //모바일 태블릿 버전시 - 상단에 메뉴바 버튼 클릭 설정
		    $("#menu-toggle").bind("click", function(e) {
		        e.preventDefault();
		        _wrapper.toggleClass("toggled");
		        // _sidebarWrapper.css({
		            // top: scrollY + 20
		        // });
		
		        $(this).trigger(SIDE_BAR_EVENT);
		        var toggleChk = _wrapper.hasClass('toggled');
		        //$("#sidebar-wrapper")
		        _sidebarWrapper.trigger(MENU_VIEW_EVENT, [toggleChk]);
		    });
		    
		 
		    $(window).resize(function() {
		        
                 if(Shared.ua.isIEgt8 || Shared.ua.isSafari || Shared.ua.isChrome ||  Shared.ua.isOpera || Shared.ua.isFireFox || Shared.ua.isMac){
                    var toggleChk = _wrapper.hasClass('toggled');
                    if (toggleChk) {
                    _wrapper.removeClass("toggled");
                    }
                     mobileMenuViewChk(toggleChk);
                     updateMenuBar( getSideBarState() );
                 }
                 
		    });
	    }
	   
	    
		
	    
	    menuInit();
	    
    }//end init
    
    
	
    function menuInit(){

	     //모든 메뉴에 active 활성 초기화
	    $(".gnb li a").each(function(i, item) {
	        $(item).removeClass("active");
	    });
	    _subMenus=[];
	    //1depth 설정
         var depth1=$("#header .gnb").children("li");

         
         var subH=29;
	    depth1.each(function(i, item) {
	        var menuTxt = $(this).children("a");
	        var subContainer = $(this).find(".sub");
             var subM=subContainer.children("ul").children("li");
             var subLen=subM.length;

	        if (menuTxt == undefined) {
	            menuTxt = "";
	            sub = "";
	        }

	        _menus.push({main: $(this), txt: menuTxt, sub: subContainer, subList:subM});
            _subMenus[i]=[];
            _lastMenus[i]=[];

            subContainer.css({width:0})


             //2depth
             subM.each( function( j, subm ){

                  var subs=$(this);
                  var subTxt=$(this).children("a");

                  if( subTxt.hasClass("active")){
                      subTxt.removeClass("active");
                  }
                   
                   var lastContainer=subs.children(".sub2");
                   var lastM=lastContainer.children(".depth").children("li");
                   var lastLen=lastM.length;
                  
                   //마지막 서브 메뉴에만 마우스 오버시 떨림 방지를 위해 영역 추가 확보 시킴.
                   if( j ==subLen-1 ){
                        subs.css({paddingBottom:60});
                   }
                   _subMenus[i].push({sub:$(this), txt:subTxt, lastCon:lastContainer,  th:subH*lastLen });
                    _lastMenus[i][j]=[];
                  
                  //two_depth 라는 클래스가 존재하는 경우에만 실행 
                  if( subs.hasClass("two_depth") ){
                      
                       //3depth
                       lastM.each(function(k, lastm){
                           var lastMenu=$(this);
                           var lastMenuTxt=lastMenu.children("a");

                           _lastMenus[i][j].push(lastMenuTxt);
                       });
                  }
                  
             });

            $(".notice_bottom .mb_link").bind("click", function(e){
                   if( getSize()>480 ){
                       e.preventDefault();
                   }
            })
	    });

       
	    //1depth메뉴h 메뉴 마우스 이벤트
	    depth1.bind({ 
	        click:function(e){
             
	           // waitingMsg( e.target, "현재 2차 오픈 준비중입니다.");
               if(getSideBarState()==false){
                   if( Shared.ua.isMobile || Shared.ua.isTablet  ){
                       //
                   }
               } 
	        },
	        mouseenter:onOverMenu, 
	        mouseleave:onOutMenu, 
	        focusin:onOverMenu, 
	        focusout:onOutMenu
	    });
	
	    depth1.bind("keydown", function(e){
	        //console.log( "여기는메인 타입은 "+e.type+"::::"+e.currentTarget );
	        $(this).trigger("mouseenter");
	    });
	
	    //2depth 마우스 이벤트
	    $(".gnb .sub ul").children("li").bind({ 
	        click:onSubClick, 
	        mouseenter: onSubOver, 
	        mouseleave: onSubOut, 
	        focusin:onSubOver, 
	        focusout:onSubOut 
	    });
	
	    //서브 메뉴 아웃 체크
	    $(".gnb .sub").bind({
	        mouseenter: function(e) {},
	        mouseleave: function(e) {
	          activeMenus( getMn());
	        }
	    });

         // $(".gnb .two_depth .depth li").bind({
         //      mouseenter:onLastOver,
         //      mouseleave:onLastOut,
         //      focusin:onLastOver,
         //      focusout:onLastOut
         // });
         // 
         // var headerLogo=$("#header h1 a");
         // var tabIdx=$("#header h1 a").attr("tabindex");

         // if( tabIdx==undefined ){
         //      headerLogo.attr("tabindex", 2);
         // }
    }
    
    
    
    
    function wrapperToggleChk(){
        if(  _wrapper.hasClass("toggled") ){
           _wrapper.removeClass("toggled");
        }else{
             _wrapper.addClass("toggled");
        }
    }
    
    /**
     * 안내 멘트 alert
     * @param  {String} target  jquery selector 문자열 
     * @param  {String} message alert로 띄울 메세지 문자.
     */
    function waitingMsg( target, message){
        if( $(target).attr("href")=="#none"){
            alert(message);
        }
    }
    


    /**
     *메뉴 오버 이벤트~
     */
    function onOverMenu(e) {
        var target = $(this);
         _currentMn= target.index();
        e.preventDefault();
        
       // console.log($(e.target).attr("tabindex") );
        activeMenus( target.index() );
        _sidebarWrapper.trigger(MENU_VIEW_EVENT, [true]);
        
        //브라우저 사이즈가 모바일 태블릿 사이즈일때 focusin 이벤트가 진행될 경우 ~(실제 모바일 테블릿에선 포커스 이동 없음. 브라우저 사이즈 만을 위한 것)
        if( e.type=="focusin" && target.index() == 0 && getSize() < getBreakpointSize() ){
            if(  !_wrapper.hasClass("toggled") ){
                  _wrapper.addClass("toggled");
                  _sidebarWrapper.trigger(MENU_VIEW_EVENT, [true]);
            }
        }

    }
    /**
     *메뉴 아웃 이벤트~
     */
    function onOutMenu(e) {
        e.preventDefault();
        activeMenus( getMn() );

        //모바일 태블릿 버전에서 마지막 메뉴에 focusout 시 메뉴 비활성 .
        if( e.type=="focusout" && $(e.currentTarget).index()==_menus.length-1 && getSize()<getBreakpointSize() ){
             if(  _wrapper.hasClass("toggled") ){
                _wrapper.removeClass("toggled");
                _sidebarWrapper.trigger(MENU_VIEW_EVENT, [false]);
             }
        }
    }

    function onSubOver(e){
       e.preventDefault();
        // $(e.target).addClass("active");
       //console.log(  $(e.currentTarget).parent() ) ;
       //
       var mainIdx=$(this).parents(".sub").parent().index();
       var subIdx=$(this).index();
       activeSub( mainIdx, subIdx );
      
      //3depth
       if( $(e.currentTarget).parent().hasClass("depth") ){

           subIdx=$(e.currentTarget).parents("li").index();
           var lastIdx=$(e.currentTarget).index();

           activeSub( mainIdx, subIdx );
           activeLastSub( mainIdx, subIdx, lastIdx);
       }
    }

    function onSubOut(e){
          e.preventDefault();
          // var mainMn=_menus[ getMn() ].main
          // var subMn=(getSn()!=-1)? mainMn.find("a").eq( getSn() ) : $(e.target);
          // subMn.removeClass("active");
         activeSub( getMn(), getSn() );
         activeLastSub( getMn(), getSn(), getLn() );
    }

    function onSubClick(e){
      //console.log(getMn(), getSn(), getLn());
      //waitingMsg( e.target, "현재 2차 오픈 준비중입니다.");

      
      var mainIdx=$(this).parents(".sub").parent().index();
       var subIdx=$(this).index();

       setMn(mainIdx);
       setSn(subIdx);

       activeSub( mainIdx, subIdx );
       
       $(".gnb li .depth").css("display", "block")

        //3depth
         if( $(e.currentTarget).parent().hasClass("depth") ){
             
             subIdx=$(e.currentTarget).parents("li").index();
             var lastIdx=$(e.currentTarget).index();

             setSn(subIdx);
             setLn(lastIdx);
             
             

             activeSub( getMn(), getSn() );
             activeLastSub( getMn(), getSn(), getLn() );
         }
    }
    
    
    /**
     * 서브메뉴 활성화
     * @param  {Number} mn 메인 메뉴 index
     * @param  {Number} sn 서브 메뉴 index
     */
    function activeSub( mn, sn ){

         for( var i=0, len=_subMenus.length; i<len; i++){
             for( var j=0, sLen=_subMenus[i].length; j<sLen; j++){

                  var subList=_subMenus[i][j];
                  var subM=subList.sub;
                  var subTxt=subList.txt;
                  var lastCon=subList.lastCon;

                  if(i==mn && j==sn){
                       subTxt.addClass("active");
                       var subH=subList.th;
                       if( lastCon[0]!=undefined ){
                           lastCon.css("display", "block").stop().animate({height:subH}, 500);
                       }
                       
                  }else{
                       subTxt.removeClass("active");
                       if( lastCon[0]!=undefined ){
                           lastCon.stop().animate({height:0}, 100 );
                       }
                  }
             }
         }
    }

    /**
     * 3depth 메뉴 활성화.
     * @param  {Number} mn 메인 메뉴 index
     * @param  {Number} sn 서브 메뉴 index
     * @param  {Number } ln  3depth 메뉴 index
     */
    function activeLastSub( mn, sn, ln){
        for( var i=0, len=_subMenus.length; i<len; i++){
             for( var j=0, sLen=_subMenus[i].length; j<sLen; j++){
                  for(var k=0, kLen=_lastMenus[i][j].length;k<kLen;k++){
                      var lastM=_lastMenus[i][j][k];
                      if(i==mn && j==sn && k==ln){
                            lastM.addClass("on");
                      }else{
                            lastM.removeClass("on");
                      }
                  }
             }
         }
    }

    /**
     *  메인 메뉴 활성화
     * @param {Number} id
     */
    function activeMenus(id) {
        var barW=130;
        var barAlpha=0.9;
        var onSpd=500;
        var outSpd=300;
        var easingFunc="easeOutExpo";
        
        for (var i = 0, len=_menus.length; i < len; i++) {
            if (i == id) {
                _menus[id].main.addClass("on");
                _menus[id].sub.css( { display:"block", left:180} ).stop(true, false).animate({width:barW, opacity:barAlpha}, onSpd, easingFunc);
            } else {
                _menus[i].main.removeClass("on");
                _menus[i].sub.stop(true, false).animate(  { width:0,opacity:0 }, outSpd, easingFunc, function() {
                  $(this).css("display", "none");
                }  );
            }
        }

    }
    
    /**
     *브라우저 크기에 맞게  메뉴의 height값 재설정 (jquery의 on 메서드로 이벤트를 등록해놨기 때문에 trigger 함수로 dispatch 할 수 있다.)
     */
    function updateSideBarH() {
        var winW = $(window).width();
        var menuOnChk = _wrapper.hasClass("toggled");
        
        //가운데 content height값 측정--> side menu height값 설정해줌.
        _contentH=( arguments[0]==undefined || arguments[0]==null)? $(".container-fluid").height() : arguments[0];
        if( isNaN(_contentH) ){
        	_contentH=$(".container-fluid").height();
        }else if( _contentH==null ){
        	console.log("현재 서브페이지에 접속중입니다.");
        	return
        }
          
         
        if (winW < getBreakpointSize() ) {
            //console.log("현재 fixed 중");
            //$("#sidebar-wrapper")
            _sidebarWrapper.css({position:"fixed", top:45, height:"100%"});

           // console.log("winW="+winW);
        } else {
            //$("#sidebar-wrapper")
           
            _sidebarWrapper.css({position:"absolute", top:0, height:_contentH});
        }
       // setWindowSize(winW);
        setSize(winW);
       updateSubBarSize( _contentH );
    }
    
    /**
     *서브 바 height 조절 
     */
    function updateSubBarSize( th ){
    	$(".gnb .sub").css({height:th});
    }
    
    /**
     *서브인지 메인인지  체크 
     */
    function updateSubpageState(){
    	
    	//console.log( getSideBarState()  );
    	if( getSideBarState() ){
    		 _sidebarWrapper.css({ position:"fixed", left:0, top:0, height:"100%"});
    		 
    		 //console.log( $(window).height() )
    		 $(".gnb .sub").css({ width:180, height:$(window).height() });
    	}
    	
    }
    
     /**
     * 버전 체크하여 좌측 메뉴바 리사이즈 
     * @param  {[Boolean]} chk 
     */
    function updateMenuBar( chk ){
         // chk 가 true 이면 메인 페이지 상태
         if( chk ){ return; }
         _sidebarWrapper.trigger(MENU_VIEW_EVENT, [ _wrapper.hasClass('toggled') ]);
         $("body").trigger(SIDE_BAR_EVENT);
    }

    /**
     * 기본적으로 부트스트랩의 레이아웃을 따르기에 메뉴에 overflow:hidden 이 기본설정되어 있기에 
     * 서브 메뉴를 보여주기 위해선  1depth메뉴 오버시 overflow:visible을 해야 볼수 있다.
     * @param {Object} chk
     */
    function mobileMenuViewChk(chk) {
        if (chk) {
            //$("#sidebar-wrapper")
            _sidebarWrapper.css({overflow: "visible" });
        } else {
            //$("#sidebar-wrapper")
            _sidebarWrapper.css({overflow: "hidden"});
        }
    }
   


    return {
        setSideBarState:setSideBarState,
        setMn:setMn,
        setUpdateSideBarH:updateSideBarH,
        setView:setView
    }

}() );

