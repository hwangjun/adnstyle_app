( function($){
    var doc = document;

    window.Shared = (function(){
        var _ua = window.navigator.userAgent.toLowerCase(),
            _IE, _IEver,
            _Chrome, _ChromeVer,
            _FireFox, _FireFoxVer,
            _Safari, _SafariVer,
            _Opera, _OperaVer,
            _Mac, _iPhone, _iPad, _iPod, _iOSver,
            _Android, _AndroidMobile, _AndroidTablet, _AndroidVer,
            _WindowsPhone,
            _bot;

        // 브라우저 설정.
        if (_ua.indexOf("msie") != -1){
            _IE = true;
            _ua.match(/msie (\d+\.\d)/);
            _IEver = parseFloat(RegExp.$1);

        }else if (_ua.indexOf("chrome")  != -1){
            _Chrome = true;
            _ua.match(/chrome[\/ ]?(\d+\.\d+)/);
            _ChromeVer = parseFloat(RegExp.$1);

        }else if (_ua.indexOf("firefox") != -1){
            _FireFox = true;
            _ua.match(/firefox[\/ ]?(\d+\.\d+)/);
            _FireFoxVer = parseFloat(RegExp.$1);

        }else if (_ua.indexOf("opera")   != -1){
            _Opera = true;
            _ua.match(/opera[\/ ]?(\d+\.\d+)/);
            _OperaVer = parseFloat(RegExp.$1);

        }else if (_ua.indexOf("safari")  != -1){
            _Safari = true;
            _ua.match(/version[\/ ]?(\d+\.\d+)/);
            _SafariVer = parseFloat(RegExp.$1);
        }

        //모바일 설정.
        if (_ua.indexOf("iphone") != -1){
            _iPhone = true;
            _ua.match(/iphone os (\d+)_(\d+)/);
            _iOSver = RegExp.$1*1 + RegExp.$2*0.1;

        }else if (_ua.indexOf("ipad") != -1){
            _iPad = true;
            _ua.match(/cpu os (\d+)_(\d+)/);
            _iOSver = RegExp.$1*1 + RegExp.$2*0.1;

        }else if (_ua.indexOf("ipod") != -1){
            _iPod = true;
            _ua.match(/os (\d+)_(\d+)/);
            _iOSver = RegExp.$1*1 + RegExp.$2*0.1;

        }else if (_ua.indexOf("android")       != -1){
            _Android = true;
            _ua.match(/android (\d+\.\d)/);
            _AndroidVer = parseFloat(RegExp.$1);

            if(_ua.indexOf('mobile') != -1){
                _AndroidMobile = true;
            }else{
                _AndroidTablet = true;
            }
        }else if (_ua.indexOf("windows phone") != -1) {
            _WindowsPhone = true;
        }
        if(_ua.indexOf('mac os') != -1){
            _Mac = true;
        }

        var ua = {
            isIE     : (_IE),
            isIE6    : (_IEver == 6.0),
            isIE7    : (_IEver == 7.0),
            isIE8    : (_IEver == 8.0),
            isIE9    : (_IEver == 9.0),
            isIE10   : (_IEver == 10.0),
            isIEgt6  : (_IEver > 6),
            isIEgt7  : (_IEver > 7),
            isIEgt8  : (_IEver > 8),
            isIEgt9  : (_IEver > 9),
            isIEgt10 : (_IEver > 10),
            isIElt6  : (_IE && _IEver < 6),
            isIElt7  : (_IE && _IEver < 7),
            isIElt8  : (_IE && _IEver < 8),
            isIElt9  : (_IE && _IEver < 9),
            isIElt10 : (_IE && _IEver < 10),

            isiPhone        : _iPhone ,
            isiPad          : _iPad,
            isiPod          : _iPod,
            isiOS           : (_iPhone || _iPad || _iPod),
            isAndroid       : _Android,
            isAndroidMobile : _AndroidMobile,
            isAndroidTablet : _AndroidTablet,
            isWindowsPhone  : _WindowsPhone,
            isSmartPhone    : (_iPhone || _iPad || _iPod || _Android || _WindowsPhone),

            isMobile : (_iPhone || _iPod || _AndroidMobile || _WindowsPhone),
            isTablet : (_iPad || _AndroidTablet),

            isSafari  : _Safari,
            isChrome  : _Chrome,
            isOpera   : _Opera,
            isFireFox : _FireFox,
            isMac     : _Mac,

            verIE      : _IEver,
            verFireFox : _FireFoxVer,
            verChrome  : _ChromeVer,
            verSafari  : _SafariVer,
            verOpera   : _OperaVer,
            verAndroid : _AndroidVer,
            veriOS     : _iOSver
        };

        // CSS기능설정.
        var style  = doc.createElement('div').style;
        var vendor = false;
        var transitionEnd = false;

        var hasOpacity        = false;
        var hasTransform      = false;
        var hasTranslate3d    = false; // translate3d 
        var hasTranslate2d    = false; // translate 
        var hasTransition     = false; // transition 
        var hasBackgroundSize = false; // background-size 
        var hasBorderRadius   = false; // border-radius 
        var hasZoom           = false;

        if('opacity' in style){
            hasOpacity = true;
        }
        if('transform' in style){
            vendor = '';
            style.transform = 'translate(1px, 1px)';
            if(style.transform != '') hasTranslate2d = true;
            style.transform = 'translate3d(1px, 1px, 1px)';
            if(style.transform != '') hasTranslate3d = true;
        }
        if('transition' in style){
            style.transition = 'opacity 0ms linear 0ms';
            if(style.transition != ''){
                hasTransition = true;
                transitionEnd = 'transitionend';
            }
        }
        if('msTransform' in style){
            vendor = '-ms-';
            style.msTransform = 'translate(1px, 1px)';
            if(style.msTransform != '') hasTranslate2d = true;
            style.msTransform = 'translate3d(1px, 1px, 1px)';
            if(style.msTransform != '') hasTranslate3d = true;
        }
        if(_IEver > 9 && 'msTransition' in style){
            style.msTransition = 'opacity 0ms linear 0ms';
            if(style.msTransition != ''){
                hasTransition = true;
                transitionEnd = 'transitionend';
            }
        }
        if('MozTransform' in style){
            vendor = '-moz-';
            style.MozTransform = 'translate(1px, 1px)';
            if(style.MozTransform != '') hasTranslate2d = true;
            style.MozTransform = 'translate3d(1px, 1px, 1px)';
            if(style.MozTransform != '') hasTranslate3d = true;
        }
        if('MozTransition' in style){
            style.MozTransition = 'opacity 0ms linear 0ms';
            if(style.MozTransition != ''){
                hasTransition = true;
                transitionEnd = 'transitionend';
            }
        }
        if('webkitTransform' in style){
            vendor = '-webkit-';
            style.webkitTransform = 'translate(1px, 1px)';
            if(style.webkitTransform != '') hasTranslate2d = true;
            style.webkitTransform = 'translate3d(1px, 1px, 1px)';
            if(style.webkitTransform != '') hasTranslate3d = true;
        }
        if('webkitTransition' in style){
            style.webkitTransition = 'opacity 0ms linear 0ms';
            if(style.webkitTransition != ''){
                hasTransition = true;
                transitionEnd = 'webkitTransitionEnd';
            }
        }
       

        if(_IEver == 9 || _Opera){
            hasTranslate3d = false;
        }

        var css = {
            vendor : vendor,
            hasZoom : hasZoom,
            hasOpacity : hasOpacity,
            hasTransition : hasTransition,
            hasTranslate2d : hasTranslate2d,
            hasTranslate3d : hasTranslate3d,
            hasBackgroundSize : hasBackgroundSize,
            hasBorderRadius : hasBorderRadius,
            transitionEnd : transitionEnd
        };

        var hasCanvas = false;
        var hasTouch  = false;

        var canvas = doc.createElement('canvas');

        if(canvas && canvas.getContext){
            hasCanvas = true;
        }
        if('ontouchstart' in window){
            hasTouch = true;
        }

        var html = {
            hasCanvas : hasCanvas,
            hasTouch  : hasTouch
        };

        return {
            ua:ua,
            css:css,
            html:html
        };
    })();
    
    //easing 값 설정.
    var cubicBezierParams = {
        linear : null,
        swing : [0.250, 0.100, 0.250, 1.000],
        easeInQuad : [0.55, 0.085, 0.68, 0.53],
        easeOutQuad : [0.25, 0.460, 0.45, 0.94],
        easeInOutQuad : [0.455, 0.03, 0.515, 0.955],
        easeInCubic : [0.550, 0.055, 0.675, 0.190],
        easeOutCubic : [0.215, 0.610, 0.355, 1.000],
        easeInOutCubic : [0.645, 0.045, 0.355, 1.000],
        easeInQuart : [0.895, 0.030, 0.685, 0.220],
        easeOutQuart : [0.165, 0.840, 0.440, 1.000],
        easeInOutQuart : [0.770, 0.000, 0.175, 1.000],
        easeInQuint : [0.755, 0.050, 0.855, 0.060],
        easeOutQuint : [0.230, 1.000, 0.320, 1.000],
        easeInOutQuint : [0.860, 0.000, 0.070, 1.000],
        easeInSine : [0.470, 0.000, 0.745, 0.715],
        easeOutSine : [0.390, 0.575, 0.565, 1.000],
        easeInOutSine : [0.445, 0.050, 0.550, 0.950],
        easeInExpo : [0.950, 0.050, 0.795, 0.035],
        easeOutExpo : [0.190, 1.000, 0.220, 1.000],
        easeInOutExpo : [1.000, 0.000, 0.000, 1.000],
        easeInCirc : [0.600, 0.040, 0.980, 0.335],
        easeOutCirc : [0.075, 0.820, 0.165, 1.000],
        easeInOutCirc : [0.785, 0.135, 0.150, 0.860],
        easeInBack : [0.600, -0.280, 0.735, 0.045],
        easeOutBack : [0.175, 0.885, 0.320, 1.275],
        easeInOutBack : [0.680, -0.550, 0.265, 1.550]
    };
    
    /**
     * 크로스 브라우징 easing 함수 
     * @param  {String} name easing 함수 이름 String
     * @return {String}    설정된 easing 함수 리턴.
     */
    function cubicBezier(name){
        if(name in cubicBezierParams){
            var easing = cubicBezierParams[name];

            if(easing != null){
                return 'cubic-bezier('+easing[0]+', '+easing[1]+', '+easing[2]+', '+easing[3]+')';
            }else{
                return 'linear';
            }
        }else{
            return 'linear';
        }
    }
    
    //transition 모션 함수 확장. 
    $.fn.extend({
        /**
         * @param {String} prop - css3 속성.
         * @param {Number} duration - 모션 시간.
         * @param {String} easing - 이징함수..
         * @param {Number} delay - 지연시간.
         */
        transition : function(prop, duration, easing, delay){
            if(Shared.css.hasTransition){
                if(!prop) prop = 'all';
                if(!duration) duration = 0;
                if(!easing) easing = 'linear';
                if(!delay) delay = 0;
                if(prop == 'transform') prop = Shared.css.vendor+prop;

                this.css('transition', prop+' '+duration+'ms '+cubicBezier(easing)+' '+delay+'ms');
                this.css(Shared.css.vendor+'transition', prop+' '+duration+'ms '+cubicBezier(easing)+' '+delay+'ms');
            }
            return this;
        }
    });
    
})(jQuery);
