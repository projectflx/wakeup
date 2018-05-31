var gulp = require('gulp');
var gulpSequence = require('gulp-sequence')
var rename = require('gulp-rename');
var zip = require('gulp-zip');
var del = require('del');

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

gulp.task('cleanDist', function() {
    // Cleaning the distribution folder
    return del('dist/**');
});

gulp.task('zipDist', function() {
    // Zipping the distribution folder
    return gulp.src('dist/**').pipe(zip('wakeup-vX.X.X.zip')).pipe(gulp.dest('dist'));
});

gulp.task('default', gulpSequence('cleanDist','copyApp', 'copyDependencies', 'copyLicense',  'zipDist'));