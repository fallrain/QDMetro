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