var gulp = require("gulp"),
    concatCSS = require('gulp-concat-css'),
    sass = require("gulp-sass");

gulp.task("sass", function() {
  gulp.src("sass/**/*scss")
      .pipe(sass())
      .pipe(gulp.dest("./static/css"));
});

gulp.task("concat-css", function() {
  return gulp.src('./static/css/*.css')
      .pipe(concatCSS('style.css'))
      .pipe(gulp.dest('./public/'))
});
