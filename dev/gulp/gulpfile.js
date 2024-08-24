import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import gulp from 'gulp';
var src = gulp.src;
var dest = gulp.dest;
var watch = gulp.watch;
var parallel = gulp.parallel;
var series = gulp.series;
  //{ src, dest, watch, parallel, series } = require('gulp');
	//imagemin = require('gulp-imagemin')
//	del = require('del')
import stylusSheets from './styles/stylus.js'
//import sassSheets from './styles/sass.js';
import pugTpl from './templates/pug.js';
import jsScripts from './scripts/js.js';
import liveReload from './live/liveReload.js';
// Gulp File 2.0
const
	sassObservePath = '../sass/**/*.sass',
	stylesObservePath = '../stylus/**/*.styl',
	htmlObservePath = '../templates/**/*.pug',
	scriptsObservePath = '../js/**/*.js';
	//pugTpl = require('./templates/pug.js'),
//	jsScripts = require('./scripts/js.js'),
	//liveReload = require('./live/liveReload.js');


function observe(){
 // watch([sassObservePath],sassSheets);
  watch([stylesObservePath],stylusSheets);
  watch([htmlObservePath],pugTpl);
 watch([scriptsObservePath],jsScripts);
}

function fonts(){
	return src([
		'../fonts/**/*.*'
	])
	.pipe(dest('../../build/fonts'))
}
async function images(){
	return src([
		'../img/**/*.*'
	])
	.pipe(imagemin([
		gifsicle({interlaced: true}),
		mozjpeg({quality: 75, progressive: true}),
		optipng({optimizationLevel: 5}),
		]
	))
	.pipe(dest('../../build/img'))
}

function clean(){
	return del('../../build/',{force:true});
}



//export const sass= parallel([observe,pugTpl,liveReload,/*sassSheets*/,fonts,images]);
export default parallel([pugTpl,liveReload,stylusSheets,fonts,images,jsScripts,observe]);

