var cheerio = require('gulp-cheerio');
var svgSymbols = require('gulp-svg-symbols');

module.exports = function(gulp, config, browserSync) {
    gulp.task('svg', [config.tasks.svg.dependencies], () => {
        return gulp.src(config.tasks.svg.src + config.tasks.svg.pattern)
            .pipe(svgSymbols(config.plugins.svgSymbols))
            .pipe(cheerio({
                parserOptions: {
                    xmlMode: true,
                    normalizeWhitespace: true
                }
            }))
            .pipe(gulp.dest(config.tasks.svg.dest));
    });
}
