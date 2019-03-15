const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task("default", ["styles"], function() {
  gulp.watch("sass/**/*.scss", ["styles"]);
  gulp.watch("*.html").on('change', browserSync.reload); // browser reloads on HTML changes
  gulp.watch("js/**/*.js").on('change', browserSync.reload); // browser reloads on JS files change
  browserSync.init({
    server: "./",
    files: ["sass/**/*.scss"] // specify files what browserSync needs to trigger when changed
  });

  console.log('hello there!');
  // code for your default task goes here
});

gulp.task("styles", function() {
  gulp
    .src("sass/**/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
      browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});
