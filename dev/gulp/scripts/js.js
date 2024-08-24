import gulp from 'gulp';
import { create as createBrowserSync } from 'browser-sync';
import minify from 'gulp-terser';

const browserSync = createBrowserSync();

const config = {
	compress: false,
	pathFrom: '../js/**/*.js',
	pathTo: '../../build'
};

export default function jsScripts() {
	return gulp.src([config['pathFrom']])
		.pipe(minify({
			compress: config['compress']
		}))
		.pipe(gulp.dest(config['pathTo']))
		.pipe(browserSync.reload({stream:true}));
}