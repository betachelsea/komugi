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
    entries: ['./source/browserify.js']
  }).bundle()
  .pipe(source('vendors.js'))
  .pipe(gulp.dest('./public/'));

  // 読み込み順があれば
  var js_original_resources = [
    'source/js/**/*.js'
  ];
  gulp.src(js_original_resources)
      .pipe(tap(function(file) {
        file.contents = Buffer.concat([
          new Buffer("(function(){\n"),
          new Buffer("'use strict';\n"),
          file.contents,
            new Buffer("})();")
        ]);
      }))
      .pipe(concat('application.js'))
      .pipe(gulp.dest('./public/'));
});
