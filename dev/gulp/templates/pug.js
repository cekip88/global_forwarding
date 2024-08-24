// const
// 	{ src, dest } = require('gulp'),
// 	notify = require('gulp-notify'),
// 	browserSync = require('browser-sync'),
// 	reload = browserSync.reload,
// 	pug = require('gulp-pug'),
// 	config = {
// 		pretty: true,
// 		pathFrom : ['../templates/**/*.pug','!../templates/data/**/*.pug','!../templates/parts/**/*.pug'],
// 		pathTo: '../../build'
// 	};
// module.exports = function pugTpl(){
// 	return src(config['pathFrom'])
// 	console.log(pug({
// 		pretty: config['pretty'],
// 	}))
// 		.pipe(
// 			pug({
// 				pretty: config['pretty'],
// 			})
// 		)
// 		.pipe(
// 			dest(config['pathTo'])
// 		)
// 		.pipe(reload({stream:true}))
// }
import gulp from 'gulp';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import pug from 'gulp-pug';

const { reload } = browserSync;

const config = {
	pretty: true,
	pathFrom : ['../templates/**/*.pug','!../templates/data/**/*.pug','!../templates/parts/**/*.pug'],
	pathTo: '../../build'
};

export default function pugTpl(){
	return gulp.src(config.pathFrom).pipe(
		pug({
			pretty: config.pretty,
		})
	).pipe(
		gulp.dest(config.pathTo)
	).pipe(reload({stream:true}))
};