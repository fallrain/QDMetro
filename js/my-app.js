// Initialize your app
var myApp = new Framework7({
  onPageInit: function () {
    function init() {
      bindFun();
    }

    function bindFun() {
      //搜索框跳页
      $('#sch').click(function (e) {
        //e.preventDefault();
        mainView.router.load({
          url: 'about.html'
        })
      });
      $('.js-moreFun').click(function () {
        mainView.router.load({
          url: 'moreFun.html'
        })
      });
      $('.imgnews-list-item,.news-list-item').click(function () {
        mainView.router.load({
          url: 'newsDetail.html'
        })
      });
      //底栏图标active
      $('.toolbar-inner').click('a', function (e) {
        var as = $(this).children('a');
        as.removeClass('active');
        $(e.target).closest('a').addClass('active');
      });
      $('.js-yk').click(function () {
        mainView.router.load({
          url: 'cloudCard.html'
        })
      });
      //二维码进闸
      $('.js-sm').click(function () {
        mainView.router.load({
          url: 'qrcode.html'
        })
      });
      //失物招领
      $('.js-swzl').click(function () {
        mainView.router.load({
          url: 'find-list.html'
        })
      });
      //路线查询
      $('.js-lxcx').click(function () {
        mainView.router.load({
          url: 'line.html'
        })
      });
    }

    init();
  }
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we use fixed-through navbar we can enable dynamic navbar
  dynamicNavbar: true,
  materialPageLoadDelay: 5000
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
  // run createContentPage func after link was clicked
  $$('.create-page').on('click', function () {
    createContentPage();
  });
  $('.address').on('click', 'i', function () {
    $(this).closest('li').remove();
  });
});

//商城模块
myApp.onPageInit('mail-index', function (page) {
  //点击商品，跳转商品详情
  $('.product-list-item').on('click', function () {
    mainView.router.load({
      url: 'product-detail.html'
    })
  });
});

//更多功能
myApp.onPageInit('moreFun', function (page) {
  $('.js-icon-bianji').on('click', function () {
    var $this = $(this);
    var isEdit = $this.attr('data-edit');
    if (isEdit === '1') {
      $('.js-jb').remove();
      $this.attr('data-edit', 0);
    } else {
      $('.js-funItems-top').find('li').prepend('<i class="iconfont icon-jianhao js-jb"></i>');
      $('.js-funItems-mid').find('li').prepend('<i class="iconfont icon-comiisjiahao js-jb"></i>');
      $this.attr('data-edit', 1);
    }
  });
});

//失物招领
myApp.onPageInit('find-list', function (page) {

});

//路线
var lineObj = {};
myApp.onPageInit('line', function (page) {
  var zhanAy = ['青岛站', '人民会堂', '汇泉广场', '中山公园', '太平角公园', '延安三路', '五四广场', '江西路', '宁夏路', '敦化路', '错埠岭', '清江路', '双山', '长沙路', '地铁大厦', '海尔路', '万年泉路', '李村', '群峰路', '振华路', '永平路', '青岛北站'];
  var curStationName = '';
  $('.z').click(function () {
    var lineTip = $('.js-lineTip');
    var lw = lineTip.width();
    var lh = lineTip.height();
    var pos = $(this).position();
    var w = $('.line-map').width();
    lineTip.css({
      top: (pos.top - lh * 0.9) * 100 / w + 'vw',
      left: (pos.left - lw * 0.79) * 100 / w + 'vw'
    });
    lineTip.show();
    var curStationIndex = $(this).attr('data-i');
    curStationName = zhanAy[curStationIndex];
  });
  $('.js-qd').click(function () {
    $('.js-ipt-qd').val(curStationName);
    var btmzm = curStationName;
    lineObj.qd = curStationName;
    if ($('.js-ipt-zd').val()) {
      btmzm += '-' + $('.js-ipt-zd').val();
    }
    $('.js-btm-zm').text(btmzm);
    if ($('.js-ipt-zd').val().replace('/\s/g', '')) {
      mainView.router.load({
        url: 'line-detail.html'
      });
    }
  });

  $('.js-zd').click(function () {
    $('.js-ipt-zd').val(curStationName);
    var btmzm = curStationName;
    lineObj.zd = curStationName;
    if ($('.js-ipt-qd').val()) {
      btmzm = $('.js-ipt-qd').val() + '-' + btmzm;
    }
    $('.js-btm-zm').text(btmzm);
    if ($('.js-ipt-qd').val().replace('/\s/g', '')) {
      mainView.router.load({
        url: 'line-detail.html'
      })
    }
  });
});
//线路列表
myApp.onPageInit('line-list', function (page) {
  var items = $('.line-list-item');
  items.on('click', '.start', function () {
    items.removeClass('startActive');
    var $this = $(this);
    var item = $this.closest('.line-list-item');
    item.removeClass('endActive');
    item.addClass('startActive');
    lineObj.qd = item.find('.mid').text();
    if ($('.endActive').length && $('.startActive').length) {
      mainView.router.load({
        url: 'line-detail.html'
      })
    }
  });

  items.on('click', '.end', function () {
    items.removeClass('endActive');
    var $this = $(this);
    var item = $this.closest('.line-list-item');
    item.removeClass('startActive');
    item.addClass('endActive');
    lineObj.zd = item.find('.mid').text();
    if ($('.endActive').length && $('.startActive').length) {
      mainView.router.load({
        url: 'line-detail.html'
      })
    }
  });

});
//线路详情
myApp.onPageInit('line-detail', function (page) {
  $('.js-zhan1').text(lineObj.qd);
  $('.js-zhan2').text(lineObj.zd);
});
//js-open-card
// Generate dynamic page
var dynamicPageIndex = 0;

function createContentPage() {
  mainView.router.loadContent(
    '<!-- Top Navbar-->' +
    '<div class="navbar">' +
    '  <div class="navbar-inner">' +
    '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
    '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
    '  </div>' +
    '</div>' +
    '<div class="pages">' +
    '  <!-- Page, data-page contains page name-->' +
    '  <div data-page="dynamic-pages" class="page">' +
    '    <!-- Scrollable page content-->' +
    '    <div class="page-content">' +
    '      <div class="content-block">' +
    '        <div class="content-block-inner">' +
    '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
    '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '</div>'
  );
  return;
}