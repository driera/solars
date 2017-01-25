var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var px2Rem = require('postcss-pxtorem');
var nano = require('cssnano');
pjson = require('./package.json');

var defaultNotification = function(err) {
    return {
        subtitle: err.plugin,
        message: err.message,
        sound: 'Funk',
        onLast: true,
    };
};

var config = Object.assign({}, pjson.config, defaultNotification);

gulp.task('default', ['css', 'server', 'watch']);

// SERVER

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: config.destUrl
        },
        open: false,
        port: config.port || 3000
    });
});

// WATCH

gulp.task('watch', function() {
    gulp.watch(config.origUrl + '/**/*.css', ['css']);
    gulp.watch(config.destUrl + '/**/*.html', ['html']);
});

// HTML

gulp.task('html', function() {
  gulp.src(config.destUrl + '/*.html')
    .pipe(gulp.dest(config.destUrl))
    .pipe(browserSync.stream());
});

// CSS

gulp.task('css', function() {
    var processors = [
        cssnext,
        precss,
        px2Rem,
        autoprefixer({
            browsers: ['last 2 version']
        }),
        nano
    ];

    return gulp.src(config.origUrl + '/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.destUrl + '/css/'))
        .pipe(browserSync.stream());
})
