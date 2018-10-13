var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');

var Paths = {
  HERE                 : './',
  DIST                 : 'dist/',
  CSS                  : './assets/css/',
  SCSS_TOOLKIT_SOURCES : './assets/scss/material-kit.scss',
  SCSS                 : './assets/scss/**/**'
};

gulp.task('compile:scss', gulp.series(function(done) {
  gulp.src(Paths.SCSS_TOOLKIT_SOURCES, { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
  done();
}));

gulp.task('watch', gulp.series(function (done) {
  gulp.watch(Paths.SCSS, ['compile:scss']);
  done();
}));

gulp.task('default', gulp.series('watch', function(done) { 
  done();
}));
