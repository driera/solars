var stylelint = require('gulp-stylelint');


module.exports = function(gulp, config, browserSync) {
    gulp.task('cssLint', () => {
        return gulp.src(config.tasks.cssLint.src + config.tasks.cssLint.pattern)
            .pipe(stylelint({
                failAfterError: false,
                reporters: [{
                    formatter: 'string',
                    console: true
                }]
            }));
    });
}
