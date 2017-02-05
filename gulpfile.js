var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssimport = require('postcss-import'),
    customproperties = require('postcss-custom-properties'),
    apply = require('postcss-apply'),
    mixins = require('postcss-mixins'),
    nested = require('postcss-nested'),
    customMedia = require('postcss-custom-media'),
    nano = require('gulp-cssnano'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
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
        cssimport,
        customproperties,
        apply,
        mixins,
        nested,
        customMedia
        autoprefixer({
            browsers: ['last 2 version']
        }),
        nano({
            discardComments: { removeAll: true },
            safe: true
        })
    ];

    return gulp.src(config.origUrl + '/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.destUrl + '/css/'))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'CSS Ready' }));

})
