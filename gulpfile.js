var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    svgo = require('gulp-svgo'),
    svgSymbols = require('gulp-svg-symbols'),
    nano = require('cssnano'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    pjson = require('./package.json');

var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssimport = require('postcss-import'),
    customproperties = require('postcss-custom-properties'),
    apply = require('postcss-apply'),
    mixins = require('postcss-mixins'),
    nested = require('postcss-nested'),
    customMedia = require('postcss-custom-media'),
    minmax = require('postcss-media-minmax'),
    cssFor = require('postcss-for'),
    color = require('postcss-color-function');

// var config = Object.assign({}, pjson.config, defaultNotification);
var config = pjson.config;

var processors = [
    cssimport,
    customproperties,
    apply,
    mixins,
    nested,
    customMedia,
    minmax,
    cssFor,
    color,
    autoprefixer({
        browsers: config.browserslist
    }),
    nano({
        discardComments: {
            removeAll: true
        },
        safe: true
    })
];

var defaultNotification = function(err) {
    return {
        subtitle: err.plugin,
        message: err.message,
        sound: 'Funk',
        onLast: true,
    };
};

gulp.task('default', ['css', 'svg', 'server', 'watch']);

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
    return gulp.src(config.origUrl + '/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe($.plumber({
            errorHandler: defaultNotification
        }))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.destUrl + '/css/'))
        .pipe(browserSync.stream())
        .pipe(notify({ message: '♦ CSS Ready ♦' }));

})

// SVG

gulp.task('svgo', function() {
    return gulp.src(config.origUrl + '/svg/initial/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest(config.origUrl + '/svg/optimized'));
});

gulp.task('svgSprite', ['svgo'], function () {
    return gulp.src(config.origUrl + '/svg/optimized/*.svg')
    .pipe(svgSymbols({
        fontSize: 32,
        title: '%f icon',
        className: '.icon-%f',
        id: 'icon-%f',
        templates: ['default-svg', 'default-css', 'default-demo']
    }))
    .pipe($.cheerio({
        run: function($) {
            $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(config.destUrl + '/svg/'));
});

gulp.task('svg', ['svgSprite'], function () {
    return gulp.src(config.destUrl + '/svg/*.svg')
    .pipe($.cheerio({
        run: function(){
        },
        parserOptions: {
            normalizeWhitespace: true
        }
    }))
    .pipe(gulp.dest(config.destUrl + '/svg/'))
    .pipe(notify({ message: "♦ SVG Ready ♦" }));
});
