var fs = require('fs'),
  connect = require('gulp-connect'),
  gulp = require('gulp'),
  karma = require('karma').server,
  concat = require('gulp-concat'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  es = require('event-stream'),
  del = require('del'),
  templateCache = require('gulp-angular-templatecache'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  open = require('gulp-open'),
  sass = require('gulp-sass'),
  order = require('gulp-order'),
  webdriver_standalone = require('gulp-protractor').webdriver_standalone,
  protractor = require('gulp-protractor').protractor;


var config = {
  pkg: JSON.parse(fs.readFileSync('./package.json')),
  banner: '/*!\n' + ' * <%= pkg.name %>\n' + ' * <%= pkg.homepage %>\n' + ' * Version: <%= pkg.version %> - <%= timestamp %>\n' + ' * License: <%= pkg.license %>\n' + ' */\n\n\n'
};

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(['./demo/*.html'])
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./demo/**/*.html'], ['html']);
  gulp.watch(['./**/*.scss'], ['styles']);
  gulp.watch(['./src/**/*.js', './demo/**/*.js', './**/*.html'], ['scripts']);
});

gulp.task('scripts', function() {
  function buildTemplates() {
    return gulp.src('src/**/*.html')
      .pipe(templateCache({
        module: 'the.directive'
      }));
  }

  function buildDistJS() {
    return gulp.src('src/sn-sticky-table-header.js')
      .pipe(plumber({
        errorHandler: handleError
      }));
  }

  es.merge(buildDistJS(), buildTemplates())
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(order([
      'sn-sticky-table-header.js',
      'template.js'
    ]))
    .pipe(concat('sn-sticky-table-header.js'))
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(),
      pkg: config.pkg
    }))
    .pipe(gulp.dest('demo'))
    .pipe(connect.reload());
});


gulp.task('styles', function() {

  return gulp.src('src/sn-sticky-table-header.scss')
    .pipe(sass())
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(),
      pkg: config.pkg
    }))
    .pipe(gulp.dest('src'))
    .pipe(gulp.dest('demo'))
    .pipe(connect.reload());
});

gulp.task('open', function() {
  gulp.src('./demo/demo.html')
    .pipe(open('', {
      url: 'http://localhost:8080/demo/demo.html'
    }));
});

gulp.task('karma', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('karma-serve', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('watch-protractor', function() {
  gulp.watch(['./src/*.js'], ['scripts']);
  gulp.watch(['./**/*.scss'], ['styles']);
  gulp.watch(['./demo/*.js', './demo/*.css'], ['protractor']);
});

gulp.task('protractor', function() {
  gulp.src(['./test/protractor/*.js'])
    .pipe(protractor({
      configFile: 'protractor.js',
      args: ['--baseUrl', 'http://127.0.0.1:8080']
    }));
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('build', ['scripts', 'styles']);
gulp.task('serve', ['build', 'connect', 'watch', 'open']);
gulp.task('default', ['build', 'test']);
gulp.task('test', ['build', 'karma']);
gulp.task('serve-test', ['build', 'watch', 'karma-serve']);
gulp.task('serve-protractor', ['build', 'connect', 'protractor', 'watch-protractor']);
gulp.task('start-webdriver', ['webdriver_standalone']);

