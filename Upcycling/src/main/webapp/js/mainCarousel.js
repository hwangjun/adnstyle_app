

/**
 * 메인 비주얼 
 * @return {[type]} [description]
 */
var MainCarousel=( function() {
     
     /**
      *현재의 카운트를 체크해둘 변수. 
      */
     var _oldCount=0;
     
     /**
      *루프 카운트  
      */
     var _count=0;
     
     var _imgList=null;
     var _btnList=null;
     
     /**
      *캐러셀이 추가되는 최상위 부모 컨테이너. 
      */
     var _container=null;
     
     /**
      *캐러셀 이미지에 관련된 노드리스트 담아둘 배열. 
      */
     var _imgItems=[];
     /**
      *캐러셀 이미지 컨트롤 할 버튼들을 담아둘 배열.
      */
     var _btnItems=[];
     
     /**
      *이미지, 텍스트이미지의 url 정보를 담아둘 배열. 
      */
     var _datas=null;
     
     /**
      * 캐러셀 - 슬라이드 이미지 및 텍스트 이미지의 local default url 정보. 
      */
     var _defaultDatas=[  
                               /*
                                * 리소스 관리는 마크업에서 해야 하므로 스크립트에서 제거.
                                * #myCarousel 영역의 input으로 데이터 추가 가능.
                               { caption:"/common/images/com/main/kv1_txt.png", slideimg:"/common/images/com/main/kv1.jpg"},
                                { caption:"/common/images/com/main/kv1_txt.png", slideimg:"/common/images/com/main/kv2.jpg"},
                                { caption:"/common/images/com/main/kv3_txt.png", slideimg:"/common/images/com/main/kv3.jpg"}
                                */
                              ];

	
     var CEvent = {};
      CEvent.RESIZE_MOVE_EVENT="resizeMoveEvent";
    /**
     *타이머 이벤트 시작알림
     */
    CEvent.TIMER_EVENT = "timerEvent";
    /**
     *타이머 완료이벤트 알림
     */
    CEvent.TIMER_COMPLETE = "timerComplete";
    
    /**
     *timer 루프 시간  
     */
    CEvent.TIME_COUNT = 5000;
    
    /**
     *타이머 클래스를 담아둘 변수. 
     */
     var _timer = null; 
    
    /**
     *현재 재생되고 있는지 체크 
     */
    var _playChk=true;
    /**
     *play버튼 접근성 텍스트 설정 정보. 
     */
    var _playInfo={play:"플레이버튼", pause:"일시정지버튼"};

    function setContainer(container){
        _container=container;
    }
    function getContainer(){
       return _container;
    }
    function getOldCount() {
        return _oldCount;
    }

    function setOldCount(count) {
        _oldCount = count;
    }

    function getWidth(){
        return _imgWidth;
    }

    function setWidth( w ){
        _imgWidth=w;
    }
    function setData(datas){
        _datas=datas;
     }
    function getData(){
         return (_datas==null)? _defaultDatas : _datas;
    }

    function init( data, container ){
        _count = parseInt(Math.random()*data.length);
        setData( data );
        setContainer(container);
        build();
        
        if( Shared.ua.isIEgt8 || Shared.ua.isSafari || Shared.ua.isChrome ||  Shared.ua.isOpera || Shared.ua.isFireFox || Shared.ua.isMac){

          //브라우저 리사이즈 시 실행하는 trigger
          $( getContainer() ).bind( CEvent.RESIZE_MOVE_EVENT, function(event, targetW){
              resizeMoveSlide(targetW);
          });
        }
        
        updateResize();
        touchInit();
        
        
        timerInit();

    }

    
     /**
      * 메인 비주얼 태그 생성.
      */
    function build(){
        
            var controller=$('<div class="controller"></div>');
            //캐러셀 버튼 
            var btns=$('<ol class="indicators"></ol>');
            var playBtns=$('<div class="playController"><a href="#none" class="btns"><span class="blind">재생버튼</span></a></div>');
            //슬라이드 컨테이너 
            var slides=$('<div class="carousel_cnt"></div>');
            
            //getContainer() --> 캐러셀 컨테이너 
           
            $(getContainer()).append(controller);
            $(getContainer()).append(slides);
            $('.controller').append(btns);
            $('.controller').append(playBtns);
           
            
            
            //버튼 태그 문자열 
            var cirBtn='';
            //슬라이드 이미지 태그 문자열
            var slideImg='';
            
            //버튼 및 슬라이드 이미지 태그 문자열 설정 
            for( var i=0, len=getData().length;i<len;i++){
             var getCaption=getData()[i].caption;
             var resultCaption=(getCaption=="" || getCaption==undefined )? "caption" : '<img src="'+getCaption+'" alt="" />';


             slideImg+='<div class="item">';
             slideImg+='    <div class="fill"><span class="blind">'+String(i+1)+' 번째 슬라이드 이미지</span></div>';
             slideImg+='    <div class="caption">';
             slideImg+='          <h2>'+resultCaption+'</h2>';
             slideImg+='    </div>';
             slideImg+='</div>';
             
             if( getData().length>1 ){
                  cirBtn+='<li>';
                  cirBtn+='   <a href="#none" data-target="#myCarousel" data-slide-to="0">';
                  cirBtn+='      <span class="blind">'+String(i+1)+'번째 슬라이드 이미지 보기 버튼</span>';
                  cirBtn+='   </a>';
                  cirBtn+='</li>';
             }else{
                 cirBtn="";
             }
             
            }
            //캐러셀 컨테이너에 버튼 및 슬라이드 이미지 추가 
            if( cirBtn!="" ){
                $('.controller').children(".indicators").append(cirBtn);
            }
            
            $(getContainer()).children(".carousel_cnt").append(slideImg);
            

            var slideItems=$(".carousel_cnt .item");
            
            //슬라이드 이미지 추가될때 설정 
            $(".carousel_cnt .fill").each( function(i, item){

                var getSlideImg=getData()[i].slideimg;
                //데이터에 이미지에 대한 데이터 값이 없을시 
                if(getSlideImg=="" || getSlideImg==undefined){
                      $(this).css({backgroundColor:"#ddd", backgroundImage:"url(none)"});
                      $(this).append('<div class="default_slide">'+String(i+1)+'Slide Image'+'</div>');
                      $(this).children(".default_slide").css({position:"absolute", left:"5%", bottom:200, fontSize:70});
                }else{
                    $(this).css('background-image', 'url('+getSlideImg+')');
                    $(this).addClass("back_pt"+String(i+1));
                }

            });
            
            //슬라이드 초기화 
           itemSlide( ".carousel_cnt .item", ".indicators li" );


           $(window).resize(function(){

                // console.log("resize 반응 ")
                  var tw=_imgItems[0].img.outerWidth();
                 // console.log(  $(getContainer()).width() );
                 if($(this).width()<1008){
                    tw=$(window).width();
                 }
                  $(getContainer()).trigger(CEvent.RESIZE_MOVE_EVENT, [tw]);
          });

          $(window).bind("orientationchange", function(e){
                  var tw=_imgItems[0].img.outerWidth();
                  //console.log( $(getContainer()).width() );
                  updateResize();
          });
    }
     
     /**
      * 이미지 슬라이드 초기화 
      * @param  {슬라이드 이미지 jQuery selector 문자열} imgLen List [description]
      * @param  {[type]} btnList [description]
      * @return {[type]}         [description]
      */
     function itemSlide( imgList, btnList) {

        _imgList=$(imgList);
        _btnList=$(btnList);

        var itemLen = _imgList.length;      
        setWidth( _imgList.eq(0).outerWidth() );
        
        var tw=getWidth();

        _imgList.each(function(i, item) {
            var tx=tw*i;
            $(this).css({left:tx});
            _imgItems.push( { img:$(this), btn:_btnList.eq(i) });
        });
        
          var container=$(getContainer());
        _btnList.bind( { 
            click:function(e){
               activeCarousel( $(e.currentTarget).index() );
            }, 
            mouseenter:function(e){
                stopTimer();
            },
            mouseleave:function(e){
                startTimer();
            }
           
        } );
        
        //play, pause 버튼 클릭시 설정.
        $(".playController").addClass("play");
        $(".playController .btns").bind("click", function(e){
            e.preventDefault();
           if( _playChk ){
               stopTimer();
               $(this).children().text(_playInfo.play);
               $(this).parent().removeClass("play");
           }else{
               startTimer();
               $(this).children().text(_playInfo.pause);
               $(this).parent().addClass("play");
           }
           _playChk=!_playChk;
        });

        //버튼 및 이미지 첫번째 것으로 활성화 시켜놓음
        var cnt = parseInt(Math.random()*_datas.length);
         console.log(cnt);
        activeCarousel(cnt);
    }
    
    /**
     * 버튼 및 이미지 슬라이드 활성화 설정 
     * @param  {Number} id  버튼 클릭시 index 값 
     */
    function activeCarousel(id) {
            var oldNum = getOldCount();
            var tw=getWidth();
            //transition함수를 실행할 수 있을 경우에만~
            if(Shared.css.hasTransition){
                _imgItems[id].img.parent().css({left:-tw*id}).transition("all", 750, "easeOutQuint");
            }else{
                _imgItems[id].img.parent().stop(true, false).animate({left:-tw*id}, 750, "easeOutQuint");
            }
           activeBtn(id);
           setOldCount(id);
      }

      /**
       * 버튼 활성화 
       * @param  {Number} id [버튼 클릭시 index값 ]
       */
      function activeBtn(id){
           for( var i=0;i<getData().length;i++){
               if(id==i){
                   _imgItems[id].btn.addClass("active");
               }else{
                   _imgItems[i].btn.removeClass("active");
               }
            } 
      }


      function updateResize(){
        if(Shared.ua.isMobile || Shared.ua.isTablet ){
            // alert("isMobile"+Shared.ua.isMobile+"::isTablet"+Shared.ua.isTablet);
            $(getContainer()).trigger(CEvent.RESIZE_MOVE_EVENT, [$(window).width()]);
        }else{
            var tw=_imgItems[0].img.outerWidth();
            $(getContainer()).trigger(CEvent.RESIZE_MOVE_EVENT, [tw]);
        }
    }

    

    /**
     * 브라우저 리사이즈시 CEvent.RESIZE_MOVE_EVENT 이벤트를 받아서 실행되는 함수 
     * @param  {[type]} tw [ 슬라이드 이미지 width]
     * 
     */
    function resizeMoveSlide( tw ){
        setWidth(tw);
         var targetW=getWidth();

         _imgList.each(function(i, item) {
          //console.log(getWidth()*i)
            $(this).css({ left:targetW*i } );
        });

         activeCarousel(getOldCount());
    }

    
     /**
      * 터치 이벤트 초기화 함수 
      */
     function touchInit(){
                 
              var container=$(getContainer());
              //item- 터치 대상
              //idx - 터치 대상의 인덱스값
              //sx - 터치 시작 x위치값
              //tx - 터치 완료된 offset x
              var touchItems={item:null, idx:0, sx:0, sy:0,  tx:0, ty:0 };
             
              var _isTouch=true;
           
              //touch event가 존재할 경우.
             if( Shared.html.hasTouch ){
                // alert("touch 시작 ");
                _imgList.bind("touchstart", onTouchStart );
                
                function onTouchStart(e){
                     e.bubbles=false;
                     e.preventDefault();

                     var evt=e.originalEvent;
                     var touchObj=evt.touches[0];
                     touchItems.item=touchObj.target;
                     touchItems.sx=touchObj.pageX;
                     touchItems.sy=touchObj.pageY;
                    // touchItems.idx=$(touchItems.item).find('.item').index();
                     _imgList.bind("touchmove", onTouchMove );
                     _imgList.bind( "touchend", onTouchEnd );
                }
                function onTouchMove(e){
                    e.bubbles=false;
                    e.preventDefault();
                    var evt=e.originalEvent;
                    var touchObj=evt.touches[0];
                    touchItems.tx=touchObj.pageX-touchItems.sx;
                    touchItems.ty=touchObj.pageY-touchItems.sy;
                    var tx=Math.abs(touchItems.tx);
                    var ty=Math.abs(touchItems.ty);

                    //x,y 의 사이 거리값 측정.
                    var dist=Math.sqrt(tx*tx+ty*ty);
                    //console.log( "dist="+dist+":::tx="+tx+":::ty="+ty);
                    if( dist-tx>60 && ty>tx ){
                       _isTouch=false;
                       evt.preventDefault(); 
                       evt.stopPropagation();
                    }else{
                       _isTouch=true;
                    }
                    
                }
                function onTouchEnd(e){
                    // console.log( "tx="+touchItems.tx, ":::_count="+_count, getData().length-1);
                    // console.log( "tx="+touchItems.tx, ":::ty="+touchItems.ty);
                       e.bubbles=false;
                       e.preventDefault();
                       var evt=e.originalEvent;
                       var bodys=$('html, body');
                       if( _isTouch ){
                            if( touchItems.tx<0 ){
                              _count=getCount(_count, getData().length-1, true, false );
                            }else{
                              _count=getCount(_count, getData().length-1, false, false );
                            }   
                             var tw=getWidth();
                             //transition - css 모션 확장 함수.(상단에 선언되어 있다.)
                            _imgItems[_count].img.parent().css({left:-tw*_count}).transition('all', 750, 'easeOutQuint');
                             //버튼 활성화.
                             activeBtn(_count);
                         }else{
                           bodys.stop(true, false).animate({scrollTop:-touchItems.ty}, 350);
                         }
                        //이벤트 제거.
                        removeEvent( _imgList, "touchmove", onTouchMove);
                        removeEvent( _imgList, "touchend", onTouchEnd);
                }

                
               
             }// end --> if( Shared.html.hasTouch )
              
              
       }//end --> touchInit()
      
        /**
         * 이벤트 제거
         * @param  {String} target    jQuery selector 문자열
         * @param  {String} eventType 이벤트 타입 문자열
         * @param  {Function} func      이벤트 콜백 함수
         */
        function removeEvent(target, eventType, func) {
            if (hasEvent(target, eventType)) {
                $(target).each(function(i, item) {
                    $(this).unbind(eventType, func);
                });
            }
        }

        /**
         * 이벤트 유무 체크
         * @param  {String}  target    jquery selector 문자열
         * @param  {String}  eventType 이벤트 문자열
         */
        function hasEvent(target, eventType) {
            var events = $._data($(target)[0], "events")[eventType];
            if (events) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * 카운트 계산
         * @param {Number} count 현재 카운트값
         * @param {Number} len 롤링할 최대개수
         * @param {Boolean} mountUp (증가) true 이면 증가식
         * @param {Boolean} countLoop true 이면 무한 롤링
         */
        function getCount(count, len, mountUp, countLoop) {
            if (mountUp) {
                count++;
            } else {
                count--;
            }
            if (countLoop) {
                if (count > len)
                    count = 0;
                if (count < 0)
                    count = len;
            } else {
                if (count > len)
                    count = len;
                if (count <= 0)
                    count = 0;
            }
            return count;
        }

      
        /**
         *Timer 클래스 초기화  
         */
        function timerInit(){
            _timer=new Timer( CEvent.TIME_COUNT );
            startTimer();
        }
        
        function startTimer(){
            _timer.clear();
            _timer.add( CEvent.TIMER_EVENT, loopSlide );
            _timer.start();
        }
        
        function stopTimer(){
            _timer.clear();
        }
        
        function loopSlide(){
            
           /*_count=getCount(_count, getData().length-1, true, true );
             activeCarousel(_count);
             activeBtn(_count);*/
            var arr=[];
            for(var i = 0, len = getData().length- 1; i < len; i++){
                if(i !== _count) arr.push(i);
            }
            _count = arr[parseInt(Math.random()*arr.length)];
            activeCarousel(_count);
            activeBtn(_count);
        }
        
        
        
        /**
         * 타이머 설정
         * @param {Number} loopTime
         * @param {Number} loopCount
         */
        function Timer(loopTime, loopCount) {
            this.init(loopTime, loopCount);
        }
        
        Timer.prototype = (function() {
        
            var _loopCount = 0,
                _loopTime = 0,
                _count = 0,
                _timers = [],
                _timerCompletes = [],
                _timer = null,
                _this = this;
        
                //생성자에 초기화~
               function init(loopTime, loopCount) {
                    _loopTime = loopTime;
                    _loopCount = loopCount || 0;
                }
                //리스너 역활~
               function add( type, func, args ) {
                    if (_timers === null || _timerCompletes === null) {
                        _timers = [];
                        _timerCompletes = [];
                    };
        
                    if (type === CEvent.TIMER_EVENT) {
                        _timers.push( func );
                    } else if (type === CEvent.TIMER_COMPLETE) {
                        _timerCompletes.push( func );
                    }
                }
                //타이머 시작
                function start() {
                    stop();
                    _timer = setTimeout(timerControl, _loopTime);
                }
                //타이머 정지
                function stop() {
                    if (_timer != null)
                        window.clearTimeout(_timer);
                    _timer = null;
                    //console.log("timer상태 : ", _timer);
                }
                //타이머 지움
                function clear() {
                    stop();
                    _timers = null;
                    _timerCompletes = null;
                }
                //타이머 한번만 활용~
               function delay() {
                    setTimeout(stop, _loopTime);
                    //onceCall = null;
                }
               function defineFn(arr) {
                    var i = 0,
                        //arrStr = "[object Array]", 
                        //toString = Object.prototype.toString, 
                        len = ( typeCheck(arr) == "array") ? arr.length : 0;
                    for (i = 0; i < len; i++) {
                        arr[i]();
                    }
                }
                //타이머 컨트롤~
               function timerControl() {
        
                    if (_loopCount != 0) {
                        if (_count < _loopCount) {
                            defineFn(_timers);
                            start();
                        } else {
                            _count = 0;
                            defineFn(_timerCompletes);
                            stop();
                        }
                        _count++;
                    } else {
                        defineFn(_timers);
                        start();
                    }
                }
            return {
                init: init,
                add: add,
                start: start,
                stop: stop,
                clear: clear,
                delay: delay
            };
        }());
    
    /**
     * 기존의 typeof 를 확장한 함수~
     * @param {Object} o
     */
    function typeCheck(o) {
        var t, c, n;

        //형식, 클래스, 이름(type,class, name)
        if (o === null) return "null";
        if (o !== o) return "nan";

        //typeof 의 결과가 "object"가 아니면 그 값을 사용한다.
        //이는 모든 원시 값과 함수를 판별한다.
        if ((t = typeof o) !== "object") return t;

        //객체의 클래스가 "Object"가 아니라면 그것을 반환
        //이는 대부분의 네이티브 객체를 판별한다.
        if ((c = classof(o)) !== "object") return c;

        //만약 객체가 생성자 이름을 가지고 있다면 생성자 이름을 반환한다.
        if (o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName())) return n;

        //더는 자세한 형식을 판단할 수 없다. 따라서 "Object"를 반환한다.
        return "object";
    }

    /**
     * Object.toString 메서드를 빌려와서 해당 타입의 이름을 호출한다.
     * @param {Object} o
     */
    function classof(o) {
        return (Object.prototype.toString.call(o).slice(8, -1)).toLowerCase();
    }

    
    
    return {
        init:init,
        setContainer:setContainer,
        getContainer:getContainer,
        slide:itemSlide
    };

}()  );





