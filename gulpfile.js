// default
const getFilesFunc = require('./modules/getFilesNode.js');

// gulp
const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minify = require("gulp-babel-minify");
const image = require('gulp-image');
const compress_images = require('compress-images');

//css
function cssLibs(prod = false) {
  let pipe = gulp.src('./assets/css/libs/*.css')
    .pipe(concatCss("css/cssLibs.css"));
  if (prod) {
    pipe.pipe(autoprefixer({
      overrideBrowserslist: ['last 20 versions'],
      cascade: false
    })).pipe(cleanCSS({ compatibility: 'ie8' }))
  };
  pipe.pipe(gulp.dest('src/dist/'));
};

function css(prod = false) {
  let pipe = gulp.src('./assets/css/*.css')
    .pipe(concatCss("css/bundle.css"));
  if (prod) {
    pipe.pipe(autoprefixer({
      overrideBrowserslist: ['last 20 versions'],
      cascade: false
    })).pipe(cleanCSS({ compatibility: 'ie8' }))
  };
  pipe.pipe(gulp.dest('src/dist/'));
};

//js libs
function jsLibs(prod = false) {
  let pipe = gulp.src('./assets/js/libs/**/*.js')
    .pipe(concat('js/libs.js'));
  if (prod) {
    pipe.pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
  }
  pipe.pipe(gulp.dest('src/dist/'));
};

// myJS
function myJs(prod = false) {
  let pipe = gulp.src('./assets/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'));
  if (prod) {
    pipe.pipe(babel({
      presets: ['@babel/env']
    })).pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
  }
  pipe.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/dist/js/'));
};

// img
function copyImg() {
  gulp.src('./assets/img/**/*')
    .pipe(gulp.dest('src/img/'));
  webp('./assets/img/**/*.{jpg,JPG,jpeg,JPEG,png}', 'src/img/', false)
};

// fonts
function fonts() {
  gulp.src('./assets/fonts/**/*')
    .pipe(gulp.dest('src/dist/fonts'))
};

// gulp

function clearDefault() {
  getFilesFunc.removeFiles('src/*.html')
  getFilesFunc.removeFiles('src/links.txt')
  getFilesFunc.deleteFolderRecursive('src/dist');
  getFilesFunc.deleteFolderRecursive('src/img');
};

gulp.task('default', function () {
  clearDefault();
  watch('./assets/css/libs*.css', () => { cssLibs(false) }); cssLibs();
  watch('./assets/css/*.css', () => { css(false) }); css();
  watch('./assets/js/libs/*.js', () => { jsLibs(false) }); jsLibs();
  watch('./assets/js/*.js', () => { myJs(false) }); myJs();
  watch('./assets/img/**/*', copyImg); copyImg();
  watch('./assets/fonts/**/*', fonts); fonts();
});
gulp.task('live_prod', function () {
  clearDefault();
  watch('./assets/css/libs*.css', () => { cssLibs(false) }); cssLibs(true);
  watch('./assets/css/*.css', () => { css(false) }); css(true);
  watch('./assets/js/libs/*.js', () => { jsLibs(false) }); jsLibs(true);
  watch('./assets/js/*.js', () => { myJs(false) }); myJs(true);
  watch('./assets/img/**/*', copyImg); copyImg(true);
  watch('./assets/fonts/**/*', fonts); fonts(true);
});

gulp.task('build', function () {
  clearDefault();
  css(true);
  cssLibs(true);
  fonts(true);
  copyImg(true);
  myJs(true);
  jsLibs(true);
});
gulp.task('buildFast', function () {
  clearDefault();
  css(false);
  cssLibs(false);
  fonts(false);
  copyImg(false);
  myJs(false);
  jsLibs(false);
});

gulp.task('buildJS', function () {
  myJs(false);
});

gulp.task('buildJSMin', function () {
  myJs(true);
});

gulp.task('clear', function () {
  clearDefault();
});

gulp.task('css', function () {
  cssLibs(false);
  css(false);
});

gulp.task('cssMin', function () {
  cssLibs(true);
  css(true);
});

gulp.task('copyImg', function () {
  copyImg();
});

function minImg() {
  gulp.src('src/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('src/img'))
};

gulp.task('minImg', minImg);

function webp(INPUT_path_to_your_images, OUTPUT_path, statistic = false) {
  compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: statistic, autoupdate: true }, false,
    { jpg: { engine: 'webp', command: ['-q', '90'] } },
    { png: { engine: 'webp', command: ['-q', '90'] } },
    { svg: { engine: 'svgo', command: false } },
    { gif: { engine: false, command: false } }, function (err) {
      if (err === null) {

      } else {
        console.error(err);
      }
    });
};
function images(INPUT_path_to_your_images, OUTPUT_path) {
  compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: false }, false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
    { png: { engine: 'pngquant', command: ['--quality=60-80'] } },
    { svg: { engine: 'svgo', command: false } },
    { gif: { engine: false, command: false } }, function (err) {
      if (err === null) {
        // [jpg] ---to---> [jpg(jpegtran)] WARNING!!! autoupdate  - recommended to turn this off, it's not needed here - autoupdate: false

      } else {
        console.error(err);
      }
    });
};

function minImages() {
  // clear();
  const INPUT_path_to_your_images = 'src/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg}';
  const OUTPUT_path = 'src/img/';
  // webp(INPUT_path_to_your_images, OUTPUT_path, false)
  images(INPUT_path_to_your_images, OUTPUT_path)
};

gulp.task('minImages', minImages);