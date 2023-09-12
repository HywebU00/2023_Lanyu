$(function(){

  var _html = $('html');
  var _body = $('body');
  var _window = $(window);

  var ww = _window.width();
  var wwNew = ww;

  const wwMedium = 700; //此值以下是手機
  const wwNormal = 1000; //此值以上是電腦
  const wwMaximum = 1440; // 最大寬度

  var _webHeader = $('.webHeader');
  var _menu = _webHeader.find('.menu');
  var _goTop = $('.goTop');

  // _html.removeClass('no-js');


  // 製作側欄選單遮罩
  // --------------------------------------------------------------- //
  _body.append('<div class="sidebarMask"></div>');
  var _sidebarMask = $('.sidebarMask');


  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // 行動版側欄，顯示／隱藏
  var _sidebar = $('.sidebar');
  var _sidebarCtrl = $('.sidebarCtrl');
  // --------------------------------------------------------------- //
  // 點擊漢堡圖示
  _sidebarCtrl.click(function(){
    if (_sidebar.hasClass('reveal')) {
      _sidebar.removeClass('reveal');
      _sidebarCtrl.removeClass('closeIt');
      _sidebarMask.fadeOut(400);
      _body.removeClass('noScroll');
    } else {
      _sidebar.addClass('reveal');
      _sidebarCtrl.addClass('closeIt');
      _sidebarMask.fadeIn(400);
      _body.addClass('noScroll')
    }
  })

  // 點擊遮罩，隱藏側欄
  // --------------------------------------------------------------- //
  _sidebarMask.click(function(){
    _sidebar.removeClass('reveal');
    _sidebarCtrl.removeClass('closeIt');
    _body.removeClass('noScroll');
    $(this).fadeOut(400);
  })



  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // 主選單 ＊＊＊＊＊＊＊＊＊＊＊
  // --------------------------------------------------------------- //
  // 找出_menu中有次選單的li 
  // --------------------------------------------------------------- //
  _menu.find('li').has('ul').addClass('hasChild');

  // 行動版「主選單」 
  // --------------------------------------------------------------- //
  // 複製「主選單」到側欄給行動版用
  _menu.clone().prependTo(_sidebar);
  $('.topLinks').clone().appendTo(_sidebar);
  var _sidebarCtrl = _webHeader.find('.sidebarCtrl');
  var _sidebarMenu = _sidebar.find('.menu');
  var _hasChild = _sidebarMenu.find('.hasChild>a');
  _sidebar.append('<button class="skip" type="button">回到側欄開關</button>');
  var _skipToSidebarCtrl = _sidebar.find('.skip');

  _hasChild.click(
    function(e){
      e.preventDefault();

      let _this = $(this);
      let _subMenu = _this.next('ul');

      if (_subMenu.is(':hidden')) {
        _subMenu.stop(true, false).slideDown();
        _this.parent().addClass('closeIt').siblings().removeClass('closeIt').find('ul:visible').slideUp().parent().removeClass('closeIt');
      } else {
        _subMenu.stop(true, false).slideUp().find('ul:visible').slideUp();
        _subMenu.find('.closeIt').removeClass('closeIt');
        _this.parent().removeClass('closeIt');
      }
    }
  )

  // 隱藏的 button, focus 到此button時，立刻轉移 focus 到_sidebarCtrl
  // --------------------------------------------------------------- //
  _skipToSidebarCtrl.focus(function (){
    _sidebarCtrl.focus();
  })


  // 寬版「主選單」
  // --------------------------------------------------------------- //
  var _mmHasChild = _menu.find('.hasChild');
  var _mmA = _menu.children('ul').children('li').children('a');
  const mmSpeed = 300;
  
  // 滑鼠移如移出 / hover
  _mmHasChild.on( 'mouseenter', function(){
    $(this).addClass('here').children('ul').stop().slideDown(mmSpeed);
  }).on( 'mouseleave', function(){
    $(this).removeClass('here').children('ul').stop().slideUp( mmSpeed, function(){
      $(this).removeAttr('style');
    });
  })

  // 鍵盤焦點 / tab focus
  _mmA.focus(function(){
    let _this = $(this);
    let _parentLi = _this.parent();
    _parentLi.siblings().children('ul').stop().slideUp( mmSpeed, function(){
      $(this).removeAttr('style').parent().removeClass('here');
    });
    if ( _parentLi.hasClass('hasChild') ) {
      _parentLi.addClass('here').children('ul').stop().slideDown( mmSpeed );
    }
  });

  // 離開 _menu 隱藏所有次選單
  $('*').focus(function(){
    if( $(this).parents('.menu').length == 0 ){
      _menu.find('.hasChild').removeClass('here').find('ul').removeAttr('style');
    }
  })





  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // 固定版頭 
  // --------------------------------------------------------------- //
  var fixHeadThreshold;
  var hh = _webHeader.outerHeight();
  if ( ww >= wwNormal) {
    // fixHeadThreshold =  hh - _menu.outerHeight();
    fixHeadThreshold =  hh;
  } else {
    fixHeadThreshold = 0;
  }
  _window.scroll(function(){
    if (_window.scrollTop() > fixHeadThreshold ) {
      _webHeader.addClass('fixed');
      if ( ww >= wwNormal) {
        _body.offset({top: hh});
      }
    } else {
      _webHeader.removeClass('fixed');
      _body.removeAttr('style');
    }

    // goTop button 顯示、隱藏
    if (_window.scrollTop() > 200) {
      _goTop.addClass('show');
    } else {
      _goTop.removeClass('show');
    }
  })
  _window.trigger('scroll');
  // --------------------------------------------------------------- //



  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // 版頭查詢區開合 （手機版）
  // --------------------------------------------------------------- //
  var _searchCtrl = $('.searchCtrl');
  var _search = $('.search');
  _search.append('<button class="skip" type="button">回到控制開關</button>');
  var _skipSearch = _search.find('.skip');
  const srSpeed = 510;

  _searchCtrl.click(function(){
    if( _search.hasClass('reveal')) {
      _search.removeClass('reveal');
      _searchCtrl.removeClass('closeIt');
      setTimeout(function(){_search.hide()}, srSpeed);
    } else {
      _search.show(0, function(){
        _search.addClass('reveal');
        _searchCtrl.addClass('closeIt');
        setTimeout (function(){_search.find('input[type="text"]').focus()}, srSpeed);
      });
    }
  })

  // skip, 回到查詢控制開關
  _skipSearch.focus(function(){
    _search.removeClass('reveal');
    setTimeout(function(){_search.hide()}, srSpeed);
    _searchCtrl.focus().removeClass('closeIt');
  })
  // --------------------------------------------------------------- //

    // --------------------------------------------------------------- //
  // 點擊展開的功能圖示 ---
  // 文字大小和分享
  // --------------------------------------------------------------- //
  var _compIcon = $('.compound'); //li
  _compIcon.each(function(){
    let _this = $(this);
    let _controler = _this.children('button');
    let _optList = _this.children('ul');
    let _optItem = _optList.children('li');
    let _optButton = _optItem.children('button');
    let _optLink = _optItem.children('a');
    let count = _optItem.length;

    const speed = 300;

    // 改變 li 的 z-index 值，第一個 li 要在最上面
    for (let i = 0; i < count; i++) {
      _optItem.eq(i).css('z-index', count - i)
    }

    // 收合
    function glideUp() {
      for (let i = 0; i < count; i++) {
        _optList.stop(true, false).animate({ 'top': 0 }, speed);
        _optItem.eq(i).delay( speed * i * .4).stop(true, false).animate({ 'top': 0 }, speed, function(){
          if ( i == count-1) {_optList.height(0).hide()}
        });
      }
    }

    _controler.click(function(){
      if (_optList.is(':hidden')) {
        _optList.show();
        let height = _optItem.outerHeight(true);
        _optList.stop(true, false).animate({ 'top': height }, speed);
        for (let i = 0; i < count; i++) {
          _optItem.eq(i).delay( speed*i*.3 ).stop(true, false).animate({ 'top': height * i }, speed, function(){
            _optList.height( height * count);
          })
        }
      } else {
        glideUp();
      }
    })

    _optButton.add(_optLink).click(glideUp);
    _this.siblings().click(glideUp);
    _this.siblings().children('a, button').focus(glideUp);
    _optItem.last().children('button').on('keydown', function(e){
      if( e.which === 9 && !e.shiftKey ) {
        glideUp();
      }
    });
  })
  // 複合功能圖示 end ///////////////////////////////////////////////////////////


  // font size 和 cookie 
  // --------------------------------------------------------------- //
  // font size：顯示所選項目
  var _fontSize = $('.fontSize');
  var _fontSizeBtn = _fontSize.children('button');
  var _fsOption = _fontSize.find('ul>li>button');

  _fsOption.click(function(){
    let fontClass = $(this).attr('class');
    _fontSizeBtn.removeClass().addClass(fontClass);
    _body.removeClass('largeFont mediumFont smallFont').addClass(fontClass);
    createCookie('FontSize', fontClass , 365);
  })

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  window.onload = function () {
    var cookie = readCookie('FontSize');

    _body.removeClass('largeFont mediumFont smallFont').addClass(cookie);
    _fontSizeBtn.removeClass().addClass(cookie);
  }
  // font size 和 cookie end 
  // --------------------------------------------------------------- //


  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // 回到頁面頂端
  _goTop.click(function(){
    _html.stop(true,false).animate({scrollTop: 0}, 800, function(){
      $('.goCenter').focus();
    });
  });


  
  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // footer 的 「友善連結」「版權宣告」在行動版時開合
  // --------------------------------------------------------------- //
  var _footerLinkItem = $('.webFooter').find('.rightLinks').children('li');

  _footerLinkItem.click(function(){
    let _this = $(this);
    let _ftUl = _this.children('ul');
    if (ww < wwNormal) {
      if ( _ftUl.is(':hidden') ){
        _this.addClass('closeIt');
        _ftUl.stop().slideDown(300);
      } else {
        _this.removeClass('closeIt');
        _ftUl.stop().slideUp(300, function() {
          _ftUl.removeAttr('style');
        });
      }
    }
  })

  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  // 改變瀏覽器寬度 window resize 
  // --------------------------------------------------------------- //
  var winResizeTimer;
  _window.resize(function () {
    clearTimeout(winResizeTimer);
    winResizeTimer = setTimeout( function () {

      wwNew = _window.width();
      
      // 由小螢幕到寬螢幕
      if( ww < wwNormal && wwNew >= wwNormal ) {
        if (_sidebar.hasClass('reveal')) {
          _sidebar.removeClass('reveal');
          _sidebarCtrl.removeClass('closeIt');
          _sidebarMask.hide();
          _body.removeClass('noScroll');
        }

        _body.removeAttr('style');
        _webHeader.removeClass('fixed');
        _search.removeClass('reveal').removeAttr('style')
        hh = _webHeader.outerHeight();
        // fixHeadThreshold =  hh - _menu.outerHeight();
        fixHeadThreshold =  hh;
        _window.trigger('scroll');
      }

      // 由寬螢幕到小螢幕
      if( ww >= wwNormal && wwNew < wwNormal ){
        hh = _webHeader.outerHeight();
        fixHeadThreshold = 0;
        _body.removeAttr('style');
        _window.trigger('scroll');
      }
      ww = wwNew;
    }, 200);
  });
  // window resize  end /////////////////////////////////////////////
  


  // --------------------------------------------------------------- //
  // --------------------------------------------------------------- //
  
  // -------- 外掛套件 slick 參數設定 
  // --------------------------------------------------------------- //
  // 首頁大圖輪播
  $('.bigBanner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 800,
    autoplay: true,
    arrows: true,
    dots: true,
    fade: false,
    infinite: true,
    zIndex:8
  });

  // -------- 外掛套件 slick 參數設定 END




  // --------------------------------------------------------------- //
	// rwd Table 
	// 把 th 的內容複製到對應的td的 data-th 屬性值
	var _rwdTable = $('.rwdTable');
	_rwdTable.each(function () {
		let _this = $(this);
		let _th = _this.find('thead>tr>th');
		let count = _th.length;
		let _tr = _this.find('tbody').children('tr');

		_tr.each(function () {
			let _td = $(this).children('td');
			for (let i = 0; i < count; i++) {
				_td.eq(i).attr('data-th', _th.eq(i).text());
			}
		})
	})






})