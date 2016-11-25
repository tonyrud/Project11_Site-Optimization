"use strict"

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

/*-------------------
  Reload Browser
---------------------*/
//run concat, then reload the page
gulp.task('reload',['concatCss'], function(done){
  browserSync.reload();
  done();
});

/*-------------------
Concat functions
---------------------*/

gulp.task('concatScripts', ['concatCss'], function(){
  return gulp.src([
    'js/jquery.js',
    'js/fastclick.js',
    'js/foundation.js',
    'js/foundation.equalizer.js',
    'js/foundation.reveal.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('concatCss', function(){
  return gulp.src([
    'css/normalize.css',
    'css/foundation.css',
    'css/basics.css'
  ])
  .pipe(concat('main.css'))
  .pipe(gulp.dest('css'));
});

/*-------------------
Minify
---------------------*/
gulp.task('minify', ['concatScripts'], function(){
  gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));

  gulp.src('css/main.css')
  .pipe(uglify())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('css'));
});

/*-------------------
Browser sync watch files and server start
---------------------*/
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('*.html', ['reload'])
    gulp.watch('css/*.css', ['reload'])
    gulp.watch('js/*.js', ['reload'])
});


gulp.task('default',  function (){
  gulp.start('browser-sync');
});
