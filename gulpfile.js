var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    include     = require('gulp-html-tag-include'),
    auto        = require('gulp-autoprefixer'),
    sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['html-include','sass','auto-prefixer'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("dist/css/*.css", ['auto-prefixer']);
    gulp.watch('src/**/*.html', ['html-include']).on('change', browserSync.reload);
});

// Copy Bootstrap fonts
gulp.task('copy-fonts', function() {
   gulp.src(['./node_modules/bootstrap-sass/assets/fonts/bootstrap/**'])
   .pipe(gulp.dest('./dist/fonts/'));
});

// Compile HTML files
gulp.task('html-include', function() {
    return gulp.src('src/*.html')
        .pipe(include())
        .pipe(gulp.dest('dist/'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// use auto-prefixer because bootstrap uses gulp
gulp.task('auto-prefixer', function(){
    return gulp.src('dist/css/*.css')
        .pipe(auto('last 2 version'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['copy-fonts','serve']);
