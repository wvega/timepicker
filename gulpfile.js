var Combine = require('stream-combiner'),
    gulp    = require('gulp'),
    less    = require('gulp-less');

gulp.task('default', function() {
    gulp.watch('resources/less/**/*.less', ['less']);
});

gulp.task('less', function () {
    stream = Combine(
        gulp.src('resources/less/**/*.less'),
        less({}),
        gulp.dest('resources/css/')
    );

    stream.on('error', function(error) {
        console.warn(error.message);
    });
});
