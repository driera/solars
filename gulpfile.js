var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var vars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var pxtorem = require('postcss-pxtorem');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

var frontend = './app/';
var dest = './web/';

gulp.task('css', function() {
    var processors = [
        vars,
        nested,
        pxtorem({
            root_value: 16,
            unit_precision: 2,
            prop_white_list: ['font-size', 'line-height', 'padding'],
            replace: true,
            media_query: false
        }),
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    return gulp.src(frontend + 'styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + 'css/'))
        .pipe(livereload());
})

gulp.task('watch', function() {
    livereload.listen({
        start: true
    });
    gulp.watch(frontend + '**/*.css', ['css']);
});

gulp.task('default', ['css', 'watch']);
