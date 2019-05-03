var gulp = require('gulp');
var rename = require('gulp-rename');
var zip = require('gulp-zip');
var merge = require('merge-stream');
var del = require('del');

gulp.task('copyApp', function() {
    // Copy app into dist
    return gulp.src('app/**').pipe(gulp.dest('dist/app/'));
});

gulp.task('copyDependencies', function() {
    // Copy css
    var normalizecss = gulp.src('node_modules/normalize.css/normalize.css').pipe(gulp.dest('dist/app/css'));
    var bootstrapcss = gulp.src('node_modules/bootstrap/dist/css/bootstrap.css').pipe(gulp.dest('dist/app/css'));
    var animatecss = gulp.src('node_modules/animate.css/animate.css').pipe(gulp.dest('dist/app/css'));

    // Copy javascript
    var bootstrapjs = gulp.src('node_modules/bootstrap/dist/js/bootstrap.js').pipe(gulp.dest('dist/app/js'));
    var jqueryjs = gulp.src('node_modules/jquery/dist/jquery.js').pipe(gulp.dest('dist/app/js'));
    var bootstrapnotifyjs = gulp.src('node_modules/bootstrap-notify/bootstrap-notify.js').pipe(gulp.dest('dist/app/js'));
    return merge(normalizecss, bootstrapcss, animatecss, bootstrapjs, jqueryjs, bootstrapnotifyjs);
});

gulp.task('copyLicense', function() {
    // Copy license
    return gulp.src('LICENSE.MD').pipe(rename('License.txt')).pipe(gulp.dest('dist/app'));
});

gulp.task('cleanDist', function() {
    // Cleaning the distribution folder
    return del('dist/**');
});

gulp.task('zipDist', function() {
    // Zipping the distribution folder
    return gulp.src('dist/app/**').pipe(zip('wakeup-vX.X.X.zip')).pipe(gulp.dest('dist/release'));
});

gulp.task('default', gulp.series('cleanDist','copyApp', 'copyDependencies', 'copyLicense',  'zipDist'));