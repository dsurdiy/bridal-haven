const menuBtn = document.querySelector(".menu__btn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("menu--active");
});


const viewGrid = document.querySelector(".view-mode__btn--grid");
const viewLine = document.querySelector(".view-mode__btn--line");
const viewContainer = document.querySelector(".view-mode__container");

viewGrid?.addEventListener("click", () => {
  viewContainer.classList.add("view-mode__container--grid");
  viewContainer.classList.remove("view-mode__container--line");
});

viewLine?.addEventListener("click", () => {
  viewContainer.classList.add("view-mode__container--line");
  viewContainer.classList.remove("view-mode__container--grid");
});


const swiper = new Swiper('.accessories__slider', {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: true,
  navigation: {
    nextEl: '.arrow-next',
    prevEl: '.arrow-prev',
  },
});

const swiperReviews = new Swiper('.reviews-slider', {
  slidesPerView: 12,
  spaceBetween: 16,
  loop: true,
  navigation: {
    nextEl: '.reviews-slider-next',
    prevEl: '.reviews-slider-prev',
  },
  pagination: {
    el: ".reviews-slider-pagination",
    type: "fraction",
  },
  breakpoints: {
    360: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 8,
    },
    1024: {
      slidesPerView: 12,
    },
  },
});

const rangeSlider = document.querySelector('.range__slider');
const inputMin = document.querySelector(".range__min");
const inputMax = document.querySelector(".range__max");

noUiSlider.create(rangeSlider, {
  start: [300, 3000],
  step: 100,
  connect: true,
  range: {
    'min': 300,
    'max': 3000
  },
  format: {
    to: value => Math.round(value),
    from: value => Number(value)
  }
});

rangeSlider.noUiSlider.on("update", (values, handle) => {
  if (handle === 0) {
    inputMin.value = values[0];
  } else {
    inputMax.value = values[1];
  }
});

inputMin.addEventListener("change", () => {
  rangeSlider.noUiSlider.set([inputMin.value, null]);
});

inputMax.addEventListener("change", () => {
  rangeSlider.noUiSlider.set([null, inputMax.value]);
});