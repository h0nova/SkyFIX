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

  var galleryExpanded = false;
  var currentGalleryFilter = "all";

  mixitup(".gallery__list", {
    selectors: {
      control: ".gallery__btn",
    },
    animation: {
      duration: 300,
    },
    callbacks: {
      onMixStart: function (state, futureState) {
        var next = futureState.activeFilter.selector;
        if (next !== "all") {
          $(".gallery__list").removeClass("gallery--limited");
        } else if (!galleryExpanded) {
          $(".gallery__list").addClass("gallery--limited");
        }
      },
      onMixEnd: function (state) {
        var newFilter = state.activeFilter.selector;
        if (newFilter !== currentGalleryFilter) {
          galleryExpanded = false;
        }
        currentGalleryFilter = newFilter;
        $(".gallery__more-btn").toggle(newFilter === "all" && !galleryExpanded);
      },
    },
  });

  $(".gallery__more-btn").on("click", function () {
    galleryExpanded = true;
    $(".gallery__list").removeClass("gallery--limited");
    $(this).hide();
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
    var $item = $(this).closest(".process__item");
    var index;

    if ($(".process__list").hasClass("slick-initialized")) {
      index = parseInt($item.data("slick-index"));
      if (isNaN(index) || index < 0 || index >= $(".process__text-item").length) return;
      $(".process__list").slick("slickGoTo", index);
      return;
    }

    index = $item.index();

    $(".process__btn").removeClass("process__btn--active");
    $(".process__item").removeClass("process__item--active");
    $(this).addClass("process__btn--active");
    $item.addClass("process__item--active");

    $(".process__text-item").removeClass("process__text-item--active");
    $(".process__text-item").eq(index).addClass("process__text-item--active");
  });

  function updateProcessActive(index) {
    $(".process__btn").removeClass("process__btn--active");
    $(".process__item").removeClass("process__item--active");
    $(".process__item")
      .not(".slick-cloned")
      .eq(index)
      .find(".process__btn")
      .addClass("process__btn--active");
    $(".process__item").not(".slick-cloned").eq(index).addClass("process__item--active");
    $(".process__text-item").removeClass("process__text-item--active");
    $(".process__text-item").eq(index).addClass("process__text-item--active");
  }

  function initProcessSlider() {
    if ($(window).width() <= 650) {
      if (!$(".process__list").hasClass("slick-initialized")) {
        $(".process__list")
          .on("init", function () {
            updateProcessActive(0);
          })
          .slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            infinite: true,
            swipe: true,
            speed: 400,
            autoplay: true,
            autoplaySpeed: 5000,
          })
          .on("beforeChange", function (e, slick, currentSlide, nextSlide) {
            updateProcessActive(nextSlide);
          });
      }
    } else {
      if ($(".process__list").hasClass("slick-initialized")) {
        $(".process__list").slick("destroy");
      }
    }
  }

  initProcessSlider();
  $(window).on("resize", initProcessSlider);

  // Form validation
  var $form = $(".home__form");
  var $nameInput = $form.find('[name="name"]');
  var $phoneInput = $form.find('[name="phone"]');

  $nameInput.after('<span class="home__error"></span>');
  $phoneInput.after('<span class="home__error"></span>');

  var $nameError = $nameInput.next(".home__error");
  var $phoneError = $phoneInput.next(".home__error");

  function isValidName(val) {
    val = val.trim();
    return val.length >= 2 && /^[a-zA-ZÀ-ÿ\s\-']+$/.test(val);
  }

  function isValidPhone(val) {
    return val.replace(/\D/g, "").length >= 10;
  }

  function setFieldError($input, $error, msg) {
    $input.addClass("home__input--error");
    $error.text(msg).show();
  }

  function clearFieldError($input, $error) {
    $input.removeClass("home__input--error");
    $error.hide();
  }

  $nameInput.on("input", function () {
    if (isValidName($(this).val())) clearFieldError($nameInput, $nameError);
  });

  $phoneInput.on("input", function () {
    if (isValidPhone($(this).val())) clearFieldError($phoneInput, $phoneError);
  });

  $form.on("submit", function (e) {
    var ok = true;

    if (!isValidName($nameInput.val())) {
      setFieldError($nameInput, $nameError, "Enter a valid name (letters only, min. 2 characters)");
      ok = false;
    } else {
      clearFieldError($nameInput, $nameError);
    }

    if (!isValidPhone($phoneInput.val())) {
      setFieldError($phoneInput, $phoneError, "Enter a valid phone number (min. 10 digits)");
      ok = false;
    } else {
      clearFieldError($phoneInput, $phoneError);
    }

    if (!ok) e.preventDefault();
  });
});
