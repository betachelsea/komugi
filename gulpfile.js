var gulp = require("gulp"),
    concatCSS = require('gulp-concat-css'),
    sass = require("gulp-sass");

gulp.task("sass", function() {
  gulp.src("source/sass/**/*scss")
      .pipe(sass())
      .pipe(concatCSS('style.css'))
      .pipe(gulp.dest('./public/'));
});

