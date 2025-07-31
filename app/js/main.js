const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

if (modalOverlay) {
  modalOverlay.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

function openModal() {
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("scroll-lock");
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("scroll-lock");
}


const breakpoint = window.matchMedia("(min-width: 600px)");
let sliderMobile = null;

function initSwiper() {
  sliderMobile = new Swiper('.slider-mobile', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.product__arrow-next',
      prevEl: '.product__arrow-prev',
    },
  });
}

function destroySwiper() {
  if (sliderMobile) {
    sliderMobile.destroy(true, true);
    sliderMobile = null;
  }
}

function handleBreakpointChange(e) {
  if (e.matches) {
    destroySwiper();
  } else {
    if (!sliderMobile) initSwiper();
  }
}

handleBreakpointChange(breakpoint);

breakpoint.addEventListener("change", handleBreakpointChange);


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
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 3,
    },
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