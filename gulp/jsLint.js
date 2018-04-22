var eslint = require('gulp-eslint');

module.exports = function(gulp, config, browserSync) {
    gulp.task('jsLint', () => {
        return gulp.src(config.tasks.jsLint.src + config.tasks.jsLint.pattern)
           .pipe(eslint())
           .pipe(eslint.format());
   });
};
