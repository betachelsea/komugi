var gulp = require("gulp"),
    concat = require('gulp-concat'),
    concatCSS = require('gulp-concat-css'),
    tap = require('gulp-tap'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    sass = require("gulp-sass");

gulp.task("sass", function() {
  gulp.src("source/sass/**/*scss")
      .pipe(sass())
      .pipe(concatCSS('style.css'))
      .pipe(gulp.dest('./public/'));
});

gulp.task("js", function() {
  browserify({
    entries: ['./source/main.js']
  }).bundle()
  .pipe(source('vendors.js'))
  .pipe(gulp.dest('./public/'));
});

gulp.task("default", ['sass', 'js']);
