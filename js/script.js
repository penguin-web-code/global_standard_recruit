new WOW().init();

// アコーディオン
$(".js-q").click(function() {
  $(this).next(".js-a").slideToggle(300);
  $(this).toggleClass("--open");
});

// member slider
const cardSwiper = new Swiper('.member__card__swiper', { // swiperの名前
  // 切り替えのモーション
  speed: 1000, // 表示切り替えのスピード
  effect: "slide", // 切り替えのmotion (※1)
  allowTouchMove: true, // スワイプで表示の切り替えを有効に

  // 最後→最初に戻るループ再生を有効に
  loop: false,

  // 自動スライドについて
  // autoplay: { 
  //   delay: 3000, // 何秒ごとにスライドを動かすか
  // },

  // 表示について
  centeredSlides: false, // 中央寄せにしない
  slidesPerView: "1.2",
  spaceBetween: 20,

  // ページネーション
  // pagination: {
  //   el: ".swiper-pagination", // paginationのclass
  //   clickable: true, // クリックでの切り替えを有効に
  //   type: "progressbar" // paginationのタイプ (※2)
  // },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true, // ドラッグ操作を許可するか（お好みで）
    hide: false,     // 常に表示する
  },

  // ナビゲーション
  navigation: {
    prevEl: ".swiper-button-prev", // 戻るボタンのclass
    nextEl: ".swiper-button-next" // 進むボタンのclass
  },
  breakpoints: {
    // 画面幅が1025px以上の場合
    1025: {
      slidesPerView:"3.2",
      spaceBetween:40,
    }
  },
});

/* =================================================== 
※1 effectについて
slide：左から次のスライドが流れてくる
fade：次のスライドがふわっと表示
■ fadeの場合は下記を記述
    fadeEffect: {
        crossFade: true
    },
cube：スライドが立方体になり、3D回転を繰り返す
coverflow：写真やアルバムジャケットをめくるようなアニメーション
flip：平面が回転するようなアニメーション
cards：カードを順番にみていくようなアニメーション
creative：カスタマイズしたアニメーションを使うときに使用します

=======================================================
※2 paginationのタイプ
bullets：スライド枚数と同じ数のドットが表示
fraction：分数で表示（例：1 / 3）
progressbar：スライドの進捗に応じてプログレスバーが伸びる
custom：自由にカスタマイズ

=====================================================*/

// business modal
document.addEventListener('DOMContentLoaded', function() {
  const dialogs = document.querySelectorAll('dialog');
  // ダイアログを開く
  const open = document.querySelectorAll('.modal__open-btn');
  open.forEach(button => {
    button.addEventListener('click', () => {
      const dialogId = button.getAttribute('data-dialog');
      const dialog = document.getElementById(dialogId);
      dialog.showModal();
      dialog.classList.add('js-show');
    });
  });

  // ダイアログを閉じる
  const close = document.querySelectorAll('.modal__close-btn');
  close.forEach(button => {
    button.addEventListener('click', () => {
      const dialog = button.closest('dialog');
      dialog.classList.remove('js-show');
      dialog.close();
    });
  });

  // オーバーレイクリックでダイアログを閉じる
  dialogs.forEach(dialog => {
    dialog.addEventListener('click', (event) => {
      if (event.target.closest('.modal__inner') === null) {
        dialog.classList.remove('js-show');
        dialog.close();
      }
    });
  });
});

// fv
document.addEventListener("DOMContentLoaded", () => {
	const imagesScroll = document.querySelector("#js-images-scroll"); // 無限アニメーション対象の要素を取得
	const images = document.querySelector("#js-images"); // 無限アニメーションの1週分の要素を取得
	const imagesWidth = images.scrollWidth; // 幅を取得
	console.log('imagesWidth:', imagesWidth);

	// itemsを複製
	const imagesClone = images.cloneNode(true); // imagesを複製
	imagesScroll.appendChild(imagesClone); // 複製した要素をimagesScrollに追加	
	imagesClone.classList.add("is-clone"); // is-cloneクラスを追加

	imagesScroll.style.setProperty('--images-width', `${imagesWidth}px`); // CSS変数にセット
});

// hamburger menu
// ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", () => {
  //定義
  const drawerIcon = document.querySelector('.drawer__icon');
  const drawer = document.querySelector('.drawer');
  const drawerNavItem = document.querySelectorAll('.drawer__body a[href^="#"]');
  const headerHeight = document.querySelector('header').offsetHeight;
  const breakpoint = 768;
  let isMenuOpen = false;
  let isMenuOpenAtBreakpoint = false;

  //メニューを開くアニメーション
  const openMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      drawer.classList.add("js-show");
      drawerIcon.classList.add("js-show");
    }
  }

  //メニューを閉じるアニメーション
  const closeMenu = () => {
    if (drawer.classList.contains("js-show")) {
      drawer.classList.remove("js-show");
      drawerIcon.classList.remove("js-show");
      isMenuOpen = false;
    }
  }

  //メニューの開閉動作
  const toggleMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  //リサイズ処理
  const handleResize = () => {
    const bp = breakpoint;
    const windowWidth = window.innerWidth;
    if (windowWidth > bp && isMenuOpenAtBreakpoint) {
      closeMenu();
    } else if (windowWidth <= bp && drawer.classList.contains("js-show")) {
      isMenuOpenAtBreakpoint = true;
    }
  };

  //メニュー外クリック処理
  const clickOuter = (event) => {
    if (drawer.classList.contains("js-show") && !drawer.contains(event.target) && isMenuOpen) {
      closeMenu();
    } else if (drawer.classList.contains("js-show") && !drawer.contains(event.target)) {
      isMenuOpen = true;
    }
  }

  //該当箇所までスクロール
  const linkScroll = (target) => {
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  //ヘッダーアイコン クリック時
  drawerIcon.addEventListener("click", toggleMenu);
  //画面幅リサイズ時
  window.addEventListener("resize", handleResize);
  //メニュー外クリック時
  document.addEventListener("click", clickOuter);
  //ページ内リンクナビメニュー クリック時
  drawerNavItem.forEach(item => {
    item.addEventListener("click", event => {
      event.preventDefault();
      closeMenu();
      const targetItem = document.querySelector(item.getAttribute("href"));
      linkScroll(targetItem);
    });
  });
});


/* =========================================
   Businessセクションのスライダー連携
========================================= */

// 1. Swiperの設定
const businessCardSwiper = new Swiper('.business__card__swiper', {
  // 切り替えのモーション
  speed: 1000,
  effect: "slide",
  allowTouchMove: true,

  // ★ループを有効にする場合、連動には「realIndex」などを使う必要があります
  loop: true,

  // 表示について（SPの初期値）
  centeredSlides: false,
  slidesPerView: 1.2, // "1.2" でも動きますが数値の方が安全です
  spaceBetween: 16,
  
  // PC等の切り替え
  breakpoints: {
    1025: {
      slidesPerView: 2.2,
      spaceBetween: 24,
    }
  },
});

// 2. カテゴリーボタンとSwiperの連動処理
const categoryItems = document.querySelectorAll('.business__category__item');

// 【A】ボタンをクリックしたらスライド移動
categoryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    // ★ loop: true の場合は slideTo ではなく slideToLoop を使います
    businessCardSwiper.slideToLoop(index);
    
    // 見た目を反映
    updateActiveCategory(index);
  });
});

// 【B】スライドが動いたらボタンの見た目を変える
businessCardSwiper.on('slideChange', () => {
  // ★ loop: true の場合は activeIndex ではなく realIndex（本当の番号）を使います
  updateActiveCategory(businessCardSwiper.realIndex);
});

// 【共通】クラス（--active）を付け替える関数
function updateActiveCategory(index) {
  categoryItems.forEach(item => {
    item.classList.remove('--active');
  });
  
  if (categoryItems[index]) {
    categoryItems[index].classList.add('--active');
  }
}

// 表示領域にはいったら扉が開く
$(function () {
  const $target = $('.js-cta');

  function checkInView() {
    const windowTop = $(window).scrollTop();
    const windowBottom = windowTop + $(window).height();

    const targetTop = $target.offset().top;
    const targetBottom = targetTop + $target.outerHeight();

    // 30% くらい見えたら開く
    const visibleHeight = targetBottom - windowTop;
    const threshold = $target.outerHeight() * 0.3;

    if (visibleHeight > threshold && windowBottom > targetTop) {
      $target.addClass('active');
    } else {
      $target.removeClass('active');
    }
  }

  // 初回チェック
  checkInView();

  // スクロールやリサイズ時にもチェック
  $(window).on('scroll resize', checkInView);
});


// 文字色変更 lead
$(function(){
  // --- 1. 文字の加工処理 (前回と同じ) ---
  var delaySpeed = 0.05;
  var totalCount = 0;

  $('.text-flow__line').each(function(){
    var $line = $(this);
    var text = $line.text().trim();
    $line.empty();

    $.each(text.split(''), function(i, char){
      var $wrapper = $('<span>').addClass('char-wrapper');
      var $base = $('<span>').addClass('text-flow__base').text(char);
      var $cover = $('<span>')
        .addClass('text-flow__cover')
        .text(char);

      var currentDelay = totalCount * delaySpeed;
      $cover.css('--delay', currentDelay + 's');

      $wrapper.append($base).append($cover);
      $line.append($wrapper);
      totalCount++; 
    });
  });

  // --- 2. 監視処理 (ここを追加) ---
  
  // 監視する設定（画面の20%くらい見えたら発火）
  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 
  };

  // 監視員さんを作成
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // 画面に入ったらクラスをつける
        $(entry.target).addClass('is-inview');
        
        // 一度発火したら監視をやめる（何度も再生させない場合）
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // 監視対象を指定（ラッパー全体を監視対象にする）
  // もし段落ごとにバラバラに発火させたい場合は '.text-flow' に変えてください
  $('.text-flow-wrapper').each(function() {
    observer.observe(this);
  });
  
});

// fvおくらせる
$(function() {
  setTimeout(function() {
    $('.fv').addClass('is-show');
  }, 300); // ← 0.3秒遅れて表示
});

// fv__leadおくらせる
$(function() {
  setTimeout(function() {
    $('.fv__lead').addClass('is-show');
  }, 400); // ← 0.4秒遅れて表示
});
