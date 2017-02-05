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
    // vars = require('postcss-simple-vars'),
    // pxtorem = require('postcss-pxtorem'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');

var frontend = './app/';
var dest = './web/';

gulp.task('css', function() {
    var processors = [
        cssimport,
        autoprefixer,
        customproperties,
        apply,
        mixins,
        nested,
        customMedia
    ];

    var configNano = {
        autoprefixer: { browsers: ['last 2 version']},
        discardComments: { removeAll: true },
        safe: true
    };

    return gulp.src(frontend + 'styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(nano(configNano))
        .pipe(gulp.dest(dest + 'css/'))
        .pipe(livereload())
        .pipe(notify({ message: 'CSS Ready' }));
})

gulp.task('watch', function() {
    livereload.listen({
        start: true
    });
    gulp.watch(frontend + '**/*.css', ['css']);
});

gulp.task('default', ['css', 'watch']);
