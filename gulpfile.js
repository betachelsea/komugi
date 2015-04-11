var gulp = require("gulp"),
    concat = require('gulp-concat'),
    concatCSS = require('gulp-concat-css'),
    tap = require('gulp-tap'),
    sass = require("gulp-sass");

gulp.task("sass", function() {
  gulp.src("source/sass/**/*scss")
      .pipe(sass())
      .pipe(concatCSS('style.css'))
      .pipe(gulp.dest('./public/'));
});

gulp.task("js", function() {
  // 読み込み順
  var js_resources = [
    'source/vendor/js/**/*.js',
    'source/js/**/*.js'
  ];
  gulp.src(js_resources)
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
