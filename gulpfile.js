var gulp = require("gulp");

var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var yuidoc = require("gulp-yuidoc");

gulp.task("doc", function(){
  gulp.src("./src/*.js")
      .pipe(yuidoc())
      .pipe(gulp.dest("./doc"))
});

gulp.task("compress", function(){
  gulp.src("./src/*.js")
      .pipe(uglify())
      .pipe(rename({extname: ".min.js"}))
      .pipe(gulp.dest("./minimize"));
});

gulp.task("default", ["doc","compress"]);
