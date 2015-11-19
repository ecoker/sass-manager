var gulp			= require('gulp');

/* MISC --- */
var source			= require('vinyl-source-stream');
var rename			= require('gulp-rename');
var glob			= require('glob');

/* SCSS --- */
var sass			= require('gulp-sass');
var autoprefixer	= require('gulp-autoprefixer');
var uglifycss		= require('gulp-uglifycss');

/* UPDATED GULP WATCH --- */
var watch			= require('gulp-watch');

/* FILE SYSTEM --- */
var fs = require('fs');

/* FOLDER SETTINGS --- */
var src = {
	styles:		'./source/styles/**/*.scss'
};
var dist = {
	styles:		'./Content/styles/'
};

var stylesTask = function(path) {
	gulp.src(path)
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['> 1%', 'last 2 versions'],
			cascade: false
		}))
		.pipe(uglifycss({
			'max-line-len' : 80
		}))
		.pipe(gulp.dest(dist.styles));
};

var sassMap = {}; // this is populated with the readSassDependencies function

var readSassDependencies = function() {
	glob(src.styles, function(err, files) {
		files.forEach(function(file){
			fs.readFile(file, 'utf8', function (err,data) {
			  if (err) return console.log(err);
			  var matches = data.match(/@import\s+'([^']+)'/gi);
			  if (matches) {
			  	sassMap[file] = {
			  		childrenExp : []
			  	};
			  	matches.forEach(function(m){
			  		sassMap[file].childrenExp.push( new RegExp(m.match(/@import\s+'([^']+)'/i)[1].replace(/\.+/,'').replace(/(_|.scss)/, "($1)?").replace(/([A-z]+)(.scss)?$/, "(_)?$1$2"), 'i') );
			  	});
			  }
			});
		});
	});
};

var readSassMap = function(filePath){
	for (var i in sassMap) {
		var run = false;
		sassMap[i].childrenExp.forEach(function(exp){
			if (exp.test(filePath) && !run) {
				console.log( 'run it: ' + i );
				stylesTask( i );
				run = !0;
			}
		});
	}
};

gulp.task('read-sass', function(){
	readSassDependencies();
});

gulp.task('styles', function () {
	stylesTask( src.styles );
});

gulp.task('watch', function(){
	watch(['./**/*.scss'], function(file) {
		stylesTask( file.path );
		readSassMap( file.path );
	});
});

gulp.task('default', ['watch', 'read-sass']);