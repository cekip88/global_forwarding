// const
// 	{ src, dest } = require('gulp'),
// 	concat = require('gulp-concat'),
// 	autoprefixer = require('gulp-autoprefixer'),
// 	browserSync = require('browser-sync'),
// 	gcmq = require('gulp-group-css-media-queries'),
// 	reload = browserSync.reload,
// 	stylus = require('gulp-stylus');
// 	config = {
// 		compress: false,
// 		pathFrom: '../stylus/main.styl',
// 		pathTo: '../../build/',
// 		outputFile: 'front.css'
// 	};
//
//
// module.exports =  function stylusSheets(){
// 	return src(config['pathFrom'])
// 		.pipe(stylus({
// 			compress: config['compress']
// 		}))
// 		.pipe(autoprefixer({
// 			overrideBrowserslist: ['last 1 version'],
// 			grid: true
// 		}))
// 		.pipe(
// 			concat(config['outputFile'])
// 		)
// 		.pipe(gcmq())
// 		.pipe(dest(config['pathTo']))
// 		.pipe(reload({stream:true}))
// }
import gulp from 'gulp';
var src = gulp.src;
var dest = gulp.dest;
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import gcmq from 'gulp-group-css-media-queries';
import stylus from 'gulp-stylus';

const { reload } = browserSync;
const config = {
	compress: false,
	pathFrom: '../stylus/main.styl',
	pathTo: '../../build/',
	outputFile: 'front.css'
};

export default function stylusSheets(){
	return src(config.pathFrom)
		.pipe(stylus({
			compress: config.compress
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 1 version'],
			grid: true
		}))
		.pipe(concat(config.outputFile))
		.pipe(gcmq())
		.pipe(dest(config.pathTo))
		.pipe(reload({stream:true}))
}