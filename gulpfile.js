'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var salad = require('postcss-salad')(require('./salad.config.json'));
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('compile:build', function() {
  return gulp.src('./src/*.css')
    .pipe(postcss([salad]))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'));
});

gulp.task('build', ['compile:build', 'copyfont']);

gulp.task('compile:dev', function () {
  return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([salad]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dev'));
});

gulp.task('compile:bs', ['compile:dev'], function () {
  browserSync.reload();
});

gulp.task('dev', function() {
  browserSync.init({
    server: './',
    port: 9849,
    open: false,
    watchOptions: {
      ignoreInitial: true,
      ignored: '*.map'
    },
  });

  gulp.watch('./src/**/*.css', ['compile:bs']);
  gulp.watch('*.html').on('change', browserSync.reload);
});
