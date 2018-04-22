module.exports = function(gulp, config, browserSync) {
    gulp.task('watch', () => {
        // Reload HTML
        gulp.watch(config.tasks.html.src + '**/*.html', [
            'html'
        ]);

        // Inject CSS
        gulp.watch(config.tasks.css.src + '**/*.css', [
            'css'
        ]);

        // Reload JS
        gulp.watch(config.tasks.browserify.src + '**/*.js', [
            'browserify'
        ]);
    });
}
