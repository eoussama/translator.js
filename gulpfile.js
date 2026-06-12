const
  gulp = require("gulp");
const babel = require("gulp-babel");
const beautify = require("gulp-beautify");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");



// Building the code for production.
gulp.task("build", (done) => {
  gulp.src("./src/translator.js")

  // Translating code.
    .pipe(babel({
      presets: ["@babel/env"],
    }))
    .pipe(beautify())
    .pipe(gulp.dest("./dist"))

  // Minifying Temme.
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist"))
    .pipe(gulp.dest("demos/assets/js"));

  done();
});

// The default task.
gulp.task("default", gulp.series("build"));
