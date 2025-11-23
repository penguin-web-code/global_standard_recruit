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