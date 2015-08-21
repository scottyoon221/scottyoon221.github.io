var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var htmlreplace = require('gulp-html-replace');
var minifyHTML = require('gulp-minify-html');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


/**
 *  Clean up built folders and files
 */
gulp.task('cleanup', function() {
  return gulp.src(['./images', './css', './js', './video', './index.html'], { read: false }) // much faster
    .pipe(rimraf());
});


/**
 *  Compress images in image folder then copy it to root folder
 */
gulp.task('imagemin', function() {
	var imgSrc = './src/images/*',
		imgDst = './images';

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});


/**
 *  Move videos to root folder
 */
gulp.task('video', function() {
	var videoSrc = './src/video/**/*',
		videoDst = './video';

	gulp.src(videoSrc)
		.pipe(gulp.dest(videoDst));
});


/**
 *  Replace js and css path in HTML page then minify
 */
gulp.task('htmlpage', function() {
	var htmlSrc = './src/index.html',
		htmlDst = './';

	gulp.src(htmlSrc)
		.pipe(changed(htmlDst))
		.pipe(htmlreplace({
			'css': 'css/styles.min.css',
			'js': {
				'src': 'js/bundle.min.js',
				'tpl': '<script src="%s" defer="defer"></script>'
			},
			'remove': ''
		}))
		.pipe(minifyHTML())
		.pipe(gulp.dest(htmlDst));
});


/**
 *   combine and minify css
 */
gulp.task('styles', function() {
	gulp.src(['./src/css/*.css'])
		.pipe(concat('styles.min.css'))
		.pipe(autoprefix('last 2 versions'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./css/'));
});


/**
 *  Combine, and minify js files and rename it to bundle.js
 */
gulp.task('scripts', function() {
	gulp.src(['./src/js/libs/jquery-2.1.4.min.js', './src/js/libs/bootstrap.min.js', './src/js/main.js'])
	.pipe(concat('bundle.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./js'));
});


// default gulp task
gulp.task('default', ['imagemin', 'video', 'htmlpage', 'styles', 'scripts'], function() {
});
