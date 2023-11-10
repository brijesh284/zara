const swiper = new Swiper(".swiper-container", {
  loop: false,
  effect: "slide",
  hashNavigation: {
    watchState: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function handleVerticalSliderNavigation(slider, sliderIndex) {
  slider.on("slideChange", function () {
    if (slider.activeIndex === slider.slides.length - 1) {
      $(".swiper-button-next, .swiper-button-prev").css("display", "none");
    } else {
      $(".swiper-button-next, .swiper-button-prev").css("display", "block");
    }
  });
}

$(document).ready(function () {
  const $menuButton = $(".menu-button");
  const menuBar = document.getElementById("menu-bar");
  const $menuDropdown = $(".menu-dropdown");
  const $menuIcon = $(".menu-icon");
  var is_menu_open = false;

  $menuButton.on("click", function () {
    $menuDropdown.toggleClass("active");
    $menuIcon.toggleClass("active");
    menuBar.classList.toggle("menu-active");

    if ($menuButton.hasClass("menu-active")) {
      is_menu_open = true;
      $menuIcon.removeClass("fa-bars").addClass("fa-times");
      $(".menu-sub-container").addClass("menu-sub-container-visible");
      $(".menu-universes-bar-container").animate(
        { left: "0%" },
        "slow",
        function () {
          $(".search input#gsearch").css({ border: "1px solid black" });
        }
      );
    } else {
      is_menu_open = false;
      $menuIcon.removeClass("fa-times").addClass("fa-bars");
      $(".menu-universes-bar-container").animate(
        { left: "-100%" },
        "slow",
        function () {
          $(".search input#gsearch").css({ border: "1px solid white" });
        }
      );
      if (window.innerWidth > 768) {
        $(".menu-sub-container").removeClass("menu-sub-container-visible");
      }
    }
  });

  $(document).on("click", function (event) {
    if (
      !$menuButton.is(event.target) &&
      !$menuDropdown.has(event.target).length === 0
    ) {
      $menuDropdown.removeClass("active");
      $menuIcon.removeClass("active");
      $menuIcon.removeClass("fa-times").addClass("fa-bars");
    }
  });

  const sliderObj = {
    direction: "vertical",
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    parallax: true,
    keyboard: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2000000,
      disableOnInteraction: false,
    },
  };

  var sliders = [];

  for (let i = 1; i <= 3; i++) {
    const sliderSelector = `.vertical-slider-${i}`;
    const slider = new Swiper(sliderSelector, sliderObj);
    sliders.push(slider);

    slider.on("slideChange", function () {
      if (swiper.activeIndex === i - 1) {
        if (slider.activeIndex === slider.slides.length - 1) {
          // console.log('active');
          $(".swiper-button-next, .swiper-button-prev").css("display", "none");
          $(".header-links a").css({ color: "black" });
          $(".menu-button .menu-icon").css({ color: "black" });
          if (window.innerWidth < 769) {
            if (!is_menu_open) {
              $(".search").css("display", "none");
            }
          }
        } else {
          // console.log('inactive');
          $(".swiper-button-next, .swiper-button-prev").css("display", "block");
          $(".header-links a").css({ color: "white" });
          $(".menu-button .menu-icon").css({ color: "white" });
          if (window.innerWidth < 769) {
            $(".search").css("display", "block");
          }
        }
      }
    });
  }

  function handleButtonClick(button) {
    var buttonValue = $(button).attr("value");

    var currentURL = window.location.href;

    if (currentURL.indexOf("#") !== -1) {
      var newURL = currentURL.replace(/#.*$/, buttonValue);
    } else {
      var newURL = currentURL + buttonValue;
    }

    window.location.href = newURL;
  }

  $(".menu-universes-bar-item").click(function () {
    handleButtonClick(this);
  });

  $(".mobile-close").click(function () {
    $menuButton.trigger("click");
  });
});

$(document).ready(function () {
  // -- product page slider
  $(".product-gallery-slide").on("click", function () {
    var imageSrc = $(this).find("img").attr("src");
    var imageAlt = $(this).find("img").attr("alt");
    $(".product-gallery-slide").css({ opacity: "0.3" });
    $(this).css({ opacity: "1" });
    $(".product-gallery-zoom-container>img").animate(
      {
        opacity: 0,
      },
      300,
      function () {
        // Opacity is 0, now change the source
        $(".product-gallery-zoom-container>img").attr("src", imageSrc);
        $(".product-gallery-zoom-container>img").attr("alt", imageAlt);
        // Animate opacity back to 1
        $(".product-gallery-zoom-container>img").animate({
          opacity: 1,
        });
      }
    );
  });
  $($(".product-gallery-slide")[0]).trigger("click");
  // -- product loop box slider
  var media__wrapper_slider = new Swiper(".media__wrapper-slider", {
    slidesPerView: 1,
    // spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 10000,
    },
    mousewheel: true,
  });
});
