
// 모바일 메뉴 레이어 열기
$('#mobile-menu').on('click', function () {
  $('#dmm').removeClass('hidden');
  $('#mobile-menu-content').addClass('!top-[42px]');
  var mobile_swiper = new Swiper('#mobile-menu-content .swiper', {
    slidesPerView : '4.5',
    spaceBetween : 8
  })
})
// 모바일 메뉴 레이어 닫기
$('#mobile-layer-close').on('click', function () {
  $('#dmm').addClass('hidden');
  $('#mobile-menu-content').removeClass('!top-[42px]');
})

function search_layer() {
  $('#search-layer').addClass('!block');
}

//검색 레이어 닫기
$('#search-layer-close').on('click', function () {
  $('#search-layer').removeClass('!block');
})

/*gnb*/
$(window).on("load resize", function () {
  if ($(window).width() > 768) {
    if ($('.main').length > 0) {
      $('.header_cont').hover(
        function () {
          $(this).addClass('on');
        },
        function () {
          $(this).removeClass('on');
        }
      );
    }
    $('.header .gnb_wrap .dep1').hover(
      function () {
        $(this).find('.dep2').css('display', 'block');
        $('.header .gnb_wrap .dep1_ul.on').addClass('tmpon');
        $('.header .gnb_wrap .dep1_ul').removeClass('on');
      },
      function () {
        $(this).find('.dep2').css('display', 'none');
        $('.header .gnb_wrap .dep1_ul.tmpon').addClass('on');
        $('.header .gnb_wrap .dep1_ul').removeClass('tmpon');
      }
    );
  }
});


/* 검색 레이어 관련 */
function srch_layer() {
  $('#search-layer').addClass('!block');
}

$('.search_full_layer .button_back2').on('click', function () {
  $('.search_full_layer').removeClass('on');
});

$('.mobile-category-wrap input[type="text"]').on('click', function () {
  $('.search_full_layer').addClass('on');
  $('.search_full_layer input[name=search_text]').focus();
  var len = $('.search_full_layer input[name=search_text]').val().length;
  $('.search_full_layer input[name=search_text]')[0].setSelectionRange(len, len);
});

$('.header_top .ico_srch, .m_btm_menu .resp_top_search').on('click', function () {
  $('.search_full_layer').addClass('on');
});
$('.search_full_layer .btn_close').on('click', function () {
  $('.search_full_layer').removeClass('on');
});

$('.mobile-category-wrap .button-search').on('click', function () {
  $('.search_full_layer').addClass('on');
  if ($('.mobile-category-wrap input[type="text"]').attr('value')) {
    $('.search_full_layer input[name="search_text"]').attr('value', $('.mobile-category-wrap input[type="text"]').attr('value'));
  }
})

$('.header .rig_menu .btn-srch').on('click', function () {
  $('.search_full_layer').addClass('on');
  $('.search_full_layer input[name=search_text]').focus();
  var len = $('.search_full_layer input[name=search_text]').val().length;
  $('.search_full_layer input[name=search_text]')[0].setSelectionRange(len, len);
});

// 모바일 카테고리
function layer_open() {
  $('#mobile-category-layer').removeClass('hidden');
}

function layer_close() {
  $('#mobile-category-layer').addClass('hidden');
}

// layer - 리뷰상세보기
// $('.btn-reviews_index_gallery_review').on('click', function () {
//   $('.layer-reviews_index_gallery_review').addClass('!block');
//   $('body').addClass('overflow-hidden');
// });

// layer - 리뷰상세보기 > 댓글
// $('.layer-reviews_index_gallery_review .btn-review_comment').on('click', function () {
//   $('.layer-reviews_index_gallery_review .btn-review_comment svg').toggleClass('rotate-180');
//   $('.layer-reviews_index_gallery_review .review_comment').toggleClass('!block');
// });

// layer - 닫기
$('.btn-pop_close').on('click', function () {
  $('.layer, .layer-bg').removeClass('!block');
  $('.layer .review_comment').removeClass('!block');
  $('.layer .btn-review_comment svg').removeClass('rotate-180');
  $('body').removeClass('overflow-hidden');
});

/* 랭킹 탭 */
$('#ranking-tab li').on('click', function () {
  $('#ranking-tab li').addClass('text-[#c6cad1]').removeClass('text-black').removeClass('font-black');
  $(this).removeClass('text-[#c6cad1]').addClass('text-black').addClass('font-black');
  $('#ranking-ctt > div').removeClass('z-10');
  $('#ranking-ctt > div').eq($(this).index()).addClass('z-10');
})

/* 랭킹 브랜드 */
new Swiper("#ranking-brand .swiper", {
  slidesPerView : "auto",
  spaceBetween : 8,
  loop : false,
  watchSlidesProgress : true,
  navigation : {
    nextEl : "#ranking-brand .swiper-button-next",
    prevEl : "#ranking-brand .swiper-button-prev",
  },
  breakpoints : {
    769 : {
      spaceBetween : 17,
    }
  }
});

/* 랭킹 아이템 */
new Swiper("#ranking-item .swiper", {
  slidesPerView : 2.6,
  spaceBetween : 7,
  loopedSlides : 6,
  loop : false,
  watchSlidesProgress : true,
  navigation : {
    nextEl : "#ranking-item .swiper-button-next",
    prevEl : "#ranking-item .swiper-button-prev",
  },
  breakpoints : {
    769 : {
      slidesPerView : 6,
      spaceBetween : 13,
      loopedSlides : 6,
    }
  }
});


/* layer time sale */
new Swiper('#mobile-timesale-layer .swiper', {
  slidesPerView : 1,
  watchSlidesProgress : true,
  pagination : {
    el : '#mobile-timesale-layer .swiper-pagination',
    clickable : true,
    type : 'bullets',
  },
});

$('#timesale-bar').on('click', function () {
  console.log("aasdasd");
  $('#timesale-item').removeClass('top-auto').removeClass('bottom-[-100%]').addClass('top-0');
  $('#timesale-item').addClass('bottom-[68px]');
});

$('#timesale-item #btn-close').on('click', function () {
  $('#timesale-item').addClass('top-auto').addClass('bottom-[-100%]').removeClass('top-0');
  $('#timesale-item').removeClass('bottom-[68px]')
});
