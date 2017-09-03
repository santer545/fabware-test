/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps');

// Styles
gulp.task('styles', function() {
    return gulp.src('sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 4 version'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        
        .pipe(gulp.dest('dist/css'))
        
});

gulp.task('html', function() {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./dist/'));
});

// Local server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});





// Scripts
gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
        //.pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        
});

// Images
gulp.task('images', function() {
    return gulp.src('assets/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/assets/'))
        
});

// Clean
gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/images']);
});

// Default task
gulp.task('default', function() {
    gulp.start('html', 'styles', 'scripts', 'images');
});

gulp.task('server', function() {
    gulp.start('default', 'watch', 'browser-sync');
});



// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('sass/**/*.scss', ['styles', browserSync.reload]);

    // Watch .js files
    gulp.watch('js/**/*.js', ['scripts', browserSync.reload]);

    // Watch image files
    gulp.watch('assets/images/**/*', ['images', browserSync.reload]);

    //gulp.watch('assets/svg/**/*', ['svgSprite', browserSync.reload]);
    gulp.watch('./*.html', ['html', browserSync.reload]);

});
