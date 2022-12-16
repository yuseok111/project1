var swiper = new Swiper(".swiper-container.mySwiper", {
  spaceBetween: 650,
  slidesPerView: "2",
  centeredSlides: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  loop: true,
  loopAdditionalSlides: 1,
  pagination: {
    el: ".swiper-paginationTo",
    type: "progressbar",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // navigation: {
  //   nextEl: ".button-nextt",
  //   prevEl: ".button-prevv",
  // },
});
//////////////////////
var pagingSwuper = new Swiper(" .swiper-container", {
  spaceBetween: 650,
  slidesPerView: "2",
  centeredSlides: true,
  loop: true,
  loopAdditionalSlides: 1,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    clickable: true,
  },
});
swiper.controller.control = pagingSwuper;

// 두번째슬라이더/////////////////////////////////////////////////////

var swiper = new Swiper(".swiper_two", {
  slidesPerView: 5,
  spaceBetween: 75,
  navigation: {
    nextEl: ".swiper_button_next",
    prevEl: ".swiper_button_prev",
  },
});
var swiper = new Swiper(".swiper_thr", {
  slidesPerView: 5,
  spaceBetween: 75,

  navigation: {
    nextEl: ".swiper-button-nextd",
    prevEl: ".swiper-button-prevd",
  },
});
