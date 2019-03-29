var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');


module.exports = function(gulp, config, browserSync) {
    var processors = [
        require('postcss-import'),
        require('postcss-custom-properties')({
            preserve: 'computed'
        }),
        require('postcss-apply'),
        require('postcss-mixins'),
        require('postcss-for'),
        require('postcss-nested'),
        require('postcss-custom-media'),
        require('postcss-media-minmax'),
        require('postcss-color-function'),
        require('autoprefixer')(config.plugins.autoprefixer),
        require('cssnano')(config.plugins.nano)
    ];

    gulp.task('css', config.tasks.css.dependencies, () => {
        return gulp.src(config.tasks.css.src + config.tasks.css.entry)
            .pipe(sourcemaps.init())
            .pipe(plumber({
                errorHandler: function(err) {
                    notify.onError({
                        title: 'Gulp',
                        subtitle: '☠ CSS error ☠',
                        message: '<%= error.message %>',
                        sound: 'Funk'
                    })(err);
                    this.emit('end');
                }
            }))
            .pipe(postcss(processors))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.tasks.css.dest))
            .pipe(browserSync.stream());
    });
}
