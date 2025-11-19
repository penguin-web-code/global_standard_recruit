$(".js-q").click(function() {
  $(this).next(".js-a").slideToggle(300);
  $(this).toggleClass("--open");
});
