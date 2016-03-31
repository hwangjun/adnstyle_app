

/**
 * 메인 비주얼 
 * @return {[type]} [description]
 */
var MainCarousel=( function() {
     

     var _oldCount=0;
     var _rollCount=0;
     var _imgList=null;
     var _btnList=null;
     
     var _container=null;
     var _imgItems=[];
     var _btnItems=[];
     var _datas=null;
     var _defaultDatas=[  
                                { caption:"/common/images/com/main/kv1_txt.png", slideimg:"/common/images/com/main/kv1.jpg"},
                                {caption:"", slideimg:""},
                                {caption:"", slideimg:""} 
                              ];
     var RESIZE_MOVE_EVENT="resizeMoveEvent";

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
        setData( data );
        setContainer(container);
        build();

         //브라우저 리사이즈 시 실행하는 trigger
        $( getContainer() ).bind( RESIZE_MOVE_EVENT, function(event, targetW){
              resizeMoveSlide(targetW);
        });
        
        updateResize();
        touchInit();

    }

    function updateResize(){
        if(Shared.ua.isMobile || Shared.ua.isTablet ){
            // alert("isMobile"+Shared.ua.isMobile+"::isTablet"+Shared.ua.isTablet);
            $(getContainer()).trigger(RESIZE_MOVE_EVENT, [$(window).width()]);
        }else{
            $(getContainer()).trigger(RESIZE_MOVE_EVENT, [$( getContainer() ).outerWidth()]);
        }
    }

    $(window).resize(function(){
            var tw=_imgItems[0].img.outerWidth();
           // console.log(  $(getContainer()).width() );
           if($(this).width()<1008){
             //  tw=$(getContainer()).width();
           }
            $(getContainer()).trigger(RESIZE_MOVE_EVENT, [tw]);
     });
     
     $(window).bind("orientationchange", function(e){
         var tw=_imgItems[0].img.outerWidth();
         //console.log( $(getContainer()).width() );
         updateResize();
     });

    /**
     * [resizeMoveSlide 브라우저 리사이즈시 실행되는 함수 ]
     * @param  {[type]} tw [ 슬라이드 이미지 width]
     * 
     */
    function resizeMoveSlide( tw ){
        setWidth(tw);
         _imgList.each(function(i, item) {
         	//console.log(getWidth()*i)
            $(this).css({ left:getWidth()*i } );
        });
    }

     /**
      * 메인 비주얼 태그 생성.
      */
    function build(){
            //캐러셀 버튼 
            var btns=$('<ol class="indicators"></ol>');
            //슬라이드 컨테이너 
            var slides=$('<div class="carousel_cnt"></div>');
            
            //getContainer() --> 캐러셀 컨테이너 
            $(getContainer()).append(btns);
            $(getContainer()).append(slides);
            
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
                $(getContainer()).children(".indicators").append(cirBtn);
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
                }
               
            });

            //슬라이드 초기화 
           itemSlide( ".carousel_cnt .item", ".indicators li" );
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

        _imgList.each(function(i, item) {
            var tx=getWidth()*i;
            $(this).css({left:tx});
            _imgItems.push( { img:$(this), btn:_btnList.eq(i) });
        });
        
          var container=$(getContainer());
        _btnList.bind("click", function(e){
            activeCarousel( $(e.currentTarget).index() );
        });
        //버튼 및 이미지 첫번째 것으로 활성화 시켜놓음 
        activeCarousel(0);
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
    
     /**
      * 터치 이벤트 초기화 함수 
      */
     function touchInit(){
                 
              var container=$(getContainer())
              //item- 터치 대상
              //idx - 터치 대상의 인덱스값
              //sx - 터치 시작 x위치값
              //tx - 터치 완료된 offset x
              var touchItems={item:null, idx:0, sx:0, sy:0,  tx:0, ty:0 };
              var _count=0;
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
                };
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
                    if( dist-tx>100 && ty>tx ){
                       _isTouch=false;
                       evt.preventDefault(); 
                    }else{
                       _isTouch=true;
                    }
                };
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
                            bodys.stop().animate({scrollTop:-touchItems.ty}, 750, 'easeOutQuint');
                         }
                        //이벤트 제거.
                        removeEvent( _imgList, "touchmove", onTouchMove);
                        removeEvent( _imgList, "touchend", onTouchEnd);
                };

                /**
                 * 이벤트 제거 
                 * @param  {String} target    jQuery selector 문자열
                 * @param  {String} eventType 이벤트 타입 문자열 
                 * @param  {Function} func      이벤트 콜백 함수
                 */
                function removeEvent(target, eventType, func ){
                    if( hasEvent(target, eventType) ){
                        $(target).each(function(i, item){
                            $(this).unbind(eventType, func);
                        })
                    }
                }
                
                /**
                 * 이벤트 유무 체크 
                 * @param  {String}  target    jquery selector 문자열
                 * @param  {String}  eventType 이벤트 문자열
                 */
                function hasEvent(target, eventType){
                     var events = $._data($(target)[0], "events")[eventType];
                     if( events ){
                         return true;
                     }else{
                         return false;
                     }
                };
               
             }// end --> if( Shared.html.hasTouch )
              
              /**
              * 카운트 계산
              * @param {Number} count 현재 카운트값
              * @param {Number} len 롤링할 최대개수
              * @param {Boolean} mountUp (증가) true 이면 증가식
              * @param {Boolean} countLoop true 이면 무한 롤링
              */
              function  getCount(count, len, mountUp, countLoop){
                  if (mountUp) {
                      count++;
                  }else {
                      count--;
                  }
                  if (countLoop) {
                      if (count > len) count = 0;
                      if (count < 0) count = len;
                  }else {
                      if (count > len) count = len;
                      if (count <= 0) count = 0;
                  }
                  return count;
              }
    }
    return {
        init:init,
        setContainer:setContainer,
        getContainer:getContainer,
        slide:itemSlide
    };

}()  );





