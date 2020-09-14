const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const del = require('del');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const htmlmin = require("gulp-htmlmin");

// Watcher
const watcher = () => {
  gulp.watch("source/sass//*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

//html
const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build/"))
};
exports.html = html

// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
  .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

const image = () => {
  return gulp.src('source/img//*.{png,jpg}')
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 90, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
}

exports.image = image;

// sprites
const sprite = () => {
  return gulp
    .src("source/img//icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

// copy
const copy = () => {
  return gulp
    .src([
      "source/fonts//*.{woff,woff2}",
      "source/img/**",
      "source/*.ico",
      "source/js/*.js"
      ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
}
exports.copy = copy;

// clean
const clean = () => {
  return del("build")
}
exports.clean = clean;

exports.default = gulp.series(
  styles, server, watcher
);

exports.build = gulp.series(
  clean, copy, styles, image, html
);

exports.start = gulp.series(
  clean,
  copy,
  styles,
  html,
  server,
  watcher
);
