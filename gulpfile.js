var
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	rename = require('gulp-rename'),
	beautify = require('gulp-beautify'),
	uglify = require('gulp-uglify');

// Building the code for production.
gulp.task('build', function (done) {
	gulp.src('./src/eo-translator.js')

		// Translating code.
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(beautify())
		.pipe(gulp.dest('./dist'))

		// Minifying Temme.
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('docs/assets/js/lib'));

	done();
});

// The default task.
gulp.task('default', gulp.series('build'));
