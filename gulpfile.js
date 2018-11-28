const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const browserSync  = require('browser-sync').create();
const { exec }     = require('child_process');
const rename       = require('gulp-rename');
const babel        = require('gulp-babel');
const minify       = require("gulp-minify");

var Paths = {
  HERE                 : './',
  DIST                 : './dist/',
  CSS                  : './assets/css/',
  SCSS_SOURCES         : './_scss/**/**',
  SCSS                 : './_scss/main.scss',
  JS                   : './assets/js/custom.js',
};

var errorHandler = function(error) {
    notify.onError({
        title: 'Task Failed [' + error.plugin + ']',
        message: 'Oops, something went wrong!',
        sound: true
    })(error);

    // Prevent gulp watch from stopping
    this.emit('end');
};

gulp.task('compile:scss', gulp.series(function(done) {
  gulp.src(Paths.SCSS, { allowEmpty: true })
  .pipe(sourcemaps.init())
  .pipe(sass())
  .on('error', errorHandler)
  .pipe(autoprefixer())
  .pipe(sourcemaps.write(Paths.HERE))
  .pipe(gulp.dest(Paths.DIST+"css/"));
  done();
}));

gulp.task('compile:js', gulp.series(function(done) {
  gulp.src(Paths.JS)
  .pipe(rename('hackntx.js'))
  .pipe(babel({
    "plugins": ["transform-es2015-template-literals"]
  }))
  .on('error', errorHandler)
  .pipe(minify())
  .pipe(gulp.dest(Paths.DIST+"js/"));
  done();
}));

gulp.task('watch', gulp.series(function (done) {
  gulp.watch(Paths.SCSS_SOURCES, gulp.series('compile:scss'));
  done();
}));

gulp.task('build', gulp.series('compile:scss', 'compile:js', function(done) {
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
gulp.task('jekyll', gulp.parallel('jekyll:serve', 'compile:scss', 'compile:js'));

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
