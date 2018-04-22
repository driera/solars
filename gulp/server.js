module.exports = function(gulp, config, browserSync) {
    gulp.task('server', () => {
        browserSync.init({
            open: config.plugins.browserSync.open ? 'local' : false,
            port: config.plugins.browserSync.port || 3000,
            server: {
                baseDir: config.tasks.server.src,
            }
        });
    });
}
