var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('./config.json');

module.exports = function(gulp, config, browserSync) {
    gulp.task('html', [config.tasks.html.dependencies], () => {
        return gulp.src(config.tasks.html.src + config.tasks.html.entry)
            .pipe(gulp.dest(config.tasks.html.dest))
            .pipe(browserSync.stream());
    });
}
