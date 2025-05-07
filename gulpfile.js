// Присвоюємо змінним (ключовим словам) модулі з gulp
const { src, dest, watch, series, parallel } = require("gulp");

// Підключаємо автоматичне оновлення сторінки в браузері
const browserSync = require("browser-sync").create();

// Підключаємо конвертування scss в звичайний css
const scss = require("gulp-sass")(require("sass"));

// Підключаємо роботу з файлами JS
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;

// Підключаємо додавання автопрефіксів в css
const autoprefixer = require("gulp-autoprefixer");

// Підключаємо автоматичне видалення папок і файлів (перед продакшеном)
const clean = require("gulp-clean");

// Підключаємо плагіни для оптимізації зображень
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const newer = require("gulp-newer"); // Робить так, щоб зображення, які вже оптимізовані, не оптимізувалися знову

// Підключаємо конвертацію шрифтів
const ttf2woff2 = require("gulp-ttf2woff2");

// Підключаємо плагін для модульної верстки
const include = require("gulp-include");

// Підключаємо плагін для створення svg спрайту
const svgstore = require("gulp-svgstore");

// Створюємо функцію для створення svg спрайту
function sprites() {
  return src("app/images/sprite/*.svg")
    .pipe(svgstore())
    .pipe(dest("app/images"));
}

// Створюємо функцію для модульної верстки
function pages() {
  return src("app/pages/*.html")
    .pipe(include({
      includePaths: "app/components"
    }))
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

// Створюємо функцію для конвертації шрифтів в формат woff2
function fonts() {
  return src("app/fonts/*.ttf")
    .pipe(ttf2woff2())
    .pipe(dest("app/fonts"));
}

// Створюємо функцію для оптимізації зображень
function images() {
  return src(["app/images/src/*.*", "!app/images/src/*.svg"])
    .pipe(newer("app/images"))
    .pipe(avif({ quality: 50 }))

    .pipe(src("app/images/src/*.*"))
    .pipe(newer("app/images"))
    .pipe(webp())

    .pipe(src("app/images/src/*.*"))
    .pipe(newer("app/images"))
    .pipe(imagemin())

    .pipe(dest("app/images"));
}

// Створюємо функцію, яка конвертує scss в звичайний css
function styles() {
  return src("app/scss/style.scss")
    .pipe(autoprefixer())
    .pipe(concat("style.min.css"))
    .pipe(scss({
      style: "compressed"
    }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

// Створюємо функцію, яка буде збирати усі файли JS в один
function scripts() {
  return src([
    "node_modules/swiper/swiper-bundle.js",
    "app/js/main.js"
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

// Створюємо функцію, яка буде спостерігати за усіма змінами в наших файлах і запускати відповідні функції
function watching() {
  // Запускаємо автоматичне оновлення сторінки браузера
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
  // Слідкуємо за змінами в файлах стилів scss
  watch(["app/scss/*.scss"], styles);
  // Слідкуємо за змінами в js файлах
  watch(["app/js/main.js"], scripts);
  // Слідкуємо за змінами в images
  watch(["app/images/src"], images);
  // Слідкуємо за змінами іконок
  watch(["app/images/sprite"], sprites);
  // Слідкуємо за файлами компонентів
  watch(["app/components/*", "app/pages/*"], pages);
  // Слідкуємо за усіма файлами html
  watch(["app/*.html"]).on("change", browserSync.reload);
}

// Створюємо функцію, яка переносить потрібні файли для продакшену (заливки на хостинг)
function building() {
  return src([
    "app/css/style.min.css",
    "app/images/**/*.*",
    "app/fonts/*.woff2",
    "app/js/main.min.js",
    "app/*.html"
  ], { base: "app" })
    .pipe(dest("dist"));
}

// Створюємо функцію, яка буде видаляти папку dist перед продакшеном
function cleanDist() {
  return src("dist")
    .pipe(clean());
}

// Експортуємо функції, щоб вони працювали
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.sprites = sprites;
exports.pages = pages;
exports.watching = watching;
exports.building = building;
exports.cleanDist = cleanDist;

// Експорт, при якому функції виконуються строго одна за одною
exports.build = series(cleanDist, building);

// Експорт, з яким можна запускати декілька функцій паралельно
exports.default = parallel(styles, images, sprites, scripts, pages, watching);