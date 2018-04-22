var browserify = require('browserify');
var vueify = require('vueify');
var source = require('vinyl-source-stream');

module.exports = function(gulp, config, browserSync) {
    gulp.task('browserify', [config.tasks.browserify.dependencies], () => {
        return browserify(config.tasks.browserify.src + config.tasks.browserify.entry)
            .transform('babelify', config.plugins.babel)
            .transform(vueify)
            .bundle()
            .on('error', function (err) {
                notify.onError({
                    title: 'Gulp',
                    subtitle: '☠ JS error ☠',
                    message: '<%= error.message %>',
                    sound: 'Funk'
                })(err);
                this.emit('end');
            })
            .pipe(source(config.tasks.browserify.entry))
            .pipe(gulp.dest(config.tasks.browserify.dest))
            .pipe(browserSync.stream());
    });
}
