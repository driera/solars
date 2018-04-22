var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('./gulp/config.json');
var tasks = require('require-dir')('./gulp');
delete tasks.config;

Object.keys(tasks).filter(function(task) {
    require('./gulp/' + task)(gulp, config, browserSync);
});

gulp.task('default', [
    'server',
    'html',
    'css',
    'browserify',
    'svg',
    'watch'
]);
