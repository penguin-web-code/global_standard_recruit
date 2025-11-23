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
  slidesPerView: "1.1",
  spaceBetween: 20,

  // ページネーション
  pagination: {
    el: ".swiper-pagination", // paginationのclass
    clickable: true, // クリックでの切り替えを有効に
    type: "progressbar" // paginationのタイプ (※2)
  },

  // ナビゲーション
  navigation: {
    prevEl: ".swiper-button-prev", // 戻るボタンのclass
    nextEl: ".swiper-button-next" // 進むボタンのclass
  },
  breakpoints: {
    // 画面幅が1025px以上の場合
    1025: {
      slidesPerView:"3.1",
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

// business slider
const businessCardSwiper = new Swiper('.business__card__swiper', { // swiperの名前
  // 切り替えのモーション
  speed: 1000, // 表示切り替えのスピード
  effect: "slide", // 切り替えのmotion (※1)
  allowTouchMove: true, // スワイプで表示の切り替えを有効に

  // 最後→最初に戻るループ再生を有効に
  loop: true,

  // 自動スライドについて
  // autoplay: { 
  //   delay: 3000, // 何秒ごとにスライドを動かすか
  // },

  // 表示について
  centeredSlides: false, // 中央寄せにしない
  slidesPerView: "1.2",
  spaceBetween: 16,
  breakpoints: {
    // 画面幅が1025px以上の場合
    1025: {
      slidesPerView:"2.2",
      spaceBetween:24,
    }
  },
});

