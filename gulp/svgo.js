var cheerio = require('gulp-cheerio');
var svgo = require('gulp-svgo');

module.exports = function(gulp, config, browserSync) {
    gulp.task('svgo', () => {
        return gulp.src(config.tasks.svgo.src + config.tasks.svgo.pattern)
            .pipe(svgo(config.plugins.svgo))
            .pipe(cheerio({
                run: function($, file) {
                    var filename = file.relative.split('.')[0];
                    $('svg').attr('class', 'icon icon-' + filename);

                    if ($('title').length) {
                        $('title').text(filename.replace('-', ' '));
                        return;
                    }

                    $('svg').prepend('<title>' + filename.replace('-', ' ') + '</title>');
                },
                parserOptions: {
                    xmlMode: true,
                    normalizeWhitespace: true
                }
            }))
            .pipe(gulp.dest(config.tasks.svgo.dest));
    });
}
