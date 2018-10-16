var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var shell        = require('gulp-shell');
var browserSync  = require('browser-sync').create();

var Paths = {
  HERE                 : './',
  DIST                 : 'dist/',
  CSS                  : './assets/css/',
  SCSS_SOURCES         : './_scss/**/**',
  SCSS                 : './_scss/main.scss'
};

gulp.task('compile:scss', gulp.series(function(done) {
  gulp.src(Paths.SCSS, { allowEmpty: true })
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write(Paths.HERE))
  .pipe(gulp.dest(Paths.DIST));
  done();
}));

gulp.task('watch', gulp.series(function (done) {
  gulp.watch(Paths.SCSS_SOURCES, gulp.series('compile:scss'));
  done();
}));

gulp.task('build', gulp.series('compile:scss', function(done) {
  done();
}));

// Task for building blog when something changed:
gulp.task('jekyll', gulp.series(shell.task(['jekyll serve']), 'compile:scss'));
// If you don't use bundle:
// gulp.task('build', shell.task(['jekyll serve']));
// If you use  Windows Subsystem for Linux (thanks @SamuliAlajarvela):
// gulp.task('build', shell.task(['bundle exec jekyll serve --force_polling']));

// Task for serving blog with Browsersync
gulp.task('serve', gulp.series(function (done) {
  browserSync.init({
    server: {
      baseDir: '_site/',
      serveStaticOptions: {
        extensions: ["html"]
      }
    }
  });
  // Reloads page when some of the already built files changed:
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('jekyll', 'serve', function(done) {
  done();
}));
