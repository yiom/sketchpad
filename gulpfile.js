'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('default', function(){
  return gulp.src(['./scripts/initialize.js', './scripts/sketchpad.js'])
    .pipe(concat('sketchpad.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./scripts/'));
});
