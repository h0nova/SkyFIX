$(function () {
  $(".feedback__list").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    swipe: true,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  mixitup(".gallery__list", {
    selectors: {
      control: ".gallery__btn",
    },
    animation: {
      duration: 300,
    },
  });

  $(
    ".call-now__btn, .header__btn, .about__btn, .service__btn, .contact-us__btn, .footer__btn",
  ).on("click", function () {
    $(".call-now").toggleClass("call-now--active");
  });

  $(".call-now").on("click", function (e) {
    if (!$(e.target).closest(".call-now__inner").length) {
      $(".call-now").removeClass("call-now--active");
    }
  });

  $(".burger").on("click", function () {
    $(this).toggleClass("burger--active");
    $(".mobile-menu").toggleClass("mobile-menu--active");
  });

  $(".mobile-menu__link").on("click", function () {
    $(".burger").removeClass("burger--active");
    $(".mobile-menu").removeClass("mobile-menu--active");
  });

  $(".process__btn").on("click", function () {
    var index = $(this).closest(".process__item").index();

    $(".process__btn").removeClass("process__btn--active");
    $(".process__item").removeClass("process__item--active");
    $(this).addClass("process__btn--active");
    $(this).closest(".process__item").addClass("process__item--active");

    $(".process__text-item").removeClass("process__text-item--active");
    $(".process__text-item").eq(index).addClass("process__text-item--active");
  });
});
