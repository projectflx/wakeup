var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('copyApp', function() {
    // Copy app into dist
    return gulp.src('app/**').pipe(gulp.dest('dist/'));
});

gulp.task('copyDependencies', function() {
    // Copy css
    gulp.src('node_modules/normalize.css/normalize.css').pipe(gulp.dest('dist/css'));
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.css').pipe(gulp.dest('dist/css'));
    gulp.src('node_modules/animate.css/animate.css').pipe(gulp.dest('dist/css'));

    // Copy javascript
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.js').pipe(gulp.dest('dist/js'));
    gulp.src('node_modules/jquery/dist/jquery.js').pipe(gulp.dest('dist/js'));
    gulp.src('node_modules/bootstrap-notify/bootstrap-notify.js').pipe(gulp.dest('dist/js'));
});

gulp.task('copyLicense', function() {
    // Copy license
    return gulp.src('LICENSE.MD').pipe(rename('License.txt')).pipe(gulp.dest('dist'));
});

gulp.task('default', ['copyApp', 'copyDependencies', 'copyLicense']);