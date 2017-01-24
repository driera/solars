var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

var frontend = './app/';
var dest = './web/';

gulp.task('css', function() {
    var processors = [
        autoprefixer({
            browsers: ['last 2 version']
        }),
        cssnext,
        precss
    ];

    return gulp.src(frontend + 'styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest + 'css/'))
})

gulp.task('watch', function() {
    gulp.watch(frontend + '**/*.css', ['css']);
});

gulp.task('default', ['css', 'watch']);
