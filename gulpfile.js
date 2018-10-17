const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const browserSync  = require('browser-sync').create();
const { exec }     = require('child_process');

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

gulp.task('jekyll:serve', gulp.series(function(done){
  exec('jekyll serve', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}));

// Task for building blog when something changed:
gulp.task('jekyll', gulp.series('jekyll:serve', 'compile:scss'));

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
