const
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    beautify = require('gulp-beautify'),
    uglify = require('gulp-uglify');

// Building the code for production.
gulp.task('build', () => {
    gulp.src('src/translate.js')

        // Translating code.
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(beautify())
        .pipe(gulp.dest('dist'))

        // Minifying Temme.
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('docs/assets/js/lib'));
});

// The default task.
gulp.task('default', ['build']);
