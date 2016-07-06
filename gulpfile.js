var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
// 一些插件测试 gulp-sass gulp-jade gulp-notify
// gulp.task("scss", function() {

// 	return gulp.src('./*.scss')
// 		.pipe(sass())
// 		.pipe(gulp.dest('./css'))
// 		.pipe(notify({message:'I have done scss!'}))
// })
// gulp.task("sass", function() {

// 	return gulp.src('./*.sass')
// 		.pipe(sass())
// 		.pipe(gulp.dest('./css'))
// 		.pipe(notify({message:'I have done sass!'}))
// })
// gulp.task("default", ["scss", "sass"], function(){
// 	gulp.src('./seat.txt')
// 		.pipe(notify({
// 			message:"This is default task and <%= file.relative %> and <%= options.date %>",
// 			templateOptions:{
// 				date: new Date()
// 			}
// 		}));
// 	gulp.start("help");
// })
// gulp.task("help", function(){
// 	console.log("	gulp build    文件打包");
// 	console.log("	gulp build    文件打包");
// 	console.log("	gulp build    文件打包");
// })


// var argv = require("yargs").argv,
// 	lodash = require("lodash"),
// 	path = require("path");

// gulp.task("build", function(){


// 	var evr=argv.p||!argv.d;
// 	var mod = argv.m||"all";
// })

gulp.task("main", function(){
	gulp.src("./index.jade")
		.pipe(jade())
		.pipe(rename({
			dirname:"result",
			basename:"yoyo",
			prefix:"pre-",
			suffix:".min",
			extname:".html"// . 不可少
		}))
		.pipe(gulp.dest("./html"))
})

notify.on("click", function(options){
	console.log("I clicked something",options);
})
notify.on("timeout", function(options){
	console.log("the notification time out", options);
})
gulp.task("notify",function(){
	return gulp.src("seat.txt")
		.pipe(notify({
			message:"Click or wait",
			wait: true
		}))
})

var Q = require("q");
gulp.task("one", function(a){
	var deferred = Q.defer();

	setTimeout(function(){
		deferred.resolve();
	}, 5000);

	return deferred.promise;
})

gulp.task("two", ["one"], function(){
	console.log("two is done");
})


var uglify=require("gulp-uglify");
gulp.task("uglify", function(){
	gulp.src("./main.js")
		.pipe(uglify())
		.pipe(gulp.dest("./js"))
})

var minifyCss=require("gulp-minify-css");
gulp.task("minifyCss", function(){
	gulp.src("./main.css")
		.pipe(minifyCss())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest("./css"))
})

gulp.task("minifyHtml", function(){
	gulp.src("./index.jade")
		.pipe(jade())
		.pipe(rename({
			suffix:".min"
		}))
		.pipe(gulp.dest("./html"))
})

gulp.task("jade", function(){
	gulp.src("./index.jade")
		.pipe(jade())
		.pipe(gulp.dest("./html"))
})

var jshint=require("gulp-jshint");
gulp.task("jshint", function(){
	gulp.src("./main.js")
		.pipe(jshint())
		.pipe(jshint.reporter())

})

var concat=require("gulp-concat");
gulp.task("concat", function(){
	//如果才用*.txt方式，则合并顺序为文件夹中的顺序，字母顺序
	gulp.src(["./seat.txt", "./appendix.txt"])
		.pipe(concat("./summary.txt", {newLine: "@@"}))
		.pipe(gulp.dest(""))
})

var imagemin=require("gulp-imagemin");
var jpegtran=require("imagemin-jpegtran");
gulp.task("imagemin", function(){
	gulp.src("./img/p2.jpg")
		.pipe(imagemin({
			progressive: true,
			use: [jpegtran()]
		}))
		.pipe(rename({
			suffix:".min"
		}))
		.pipe(gulp.dest("./img"))
})