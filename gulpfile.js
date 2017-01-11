//加载第三方库
/*
1)gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀。使用她我们可以很潇洒地写代码，不必考虑各浏览器兼容前缀。 npm install autoprefixer --save-dev
2)gulp-minify-css使用gulp-minify-css压缩css文件，减小文件大小，并给引用url添加版本号避免缓存 npm install gulp-minify-css --save-dev
3)gulp-livereload 当监听文件发生变化时，浏览器自动刷新页面。 npm install gulp-livereload --save-dev
4)gulp-jshint插件主要用于检查代码，打印报告信息  npm install  gulp-jshint --save-dev  
5)gulp-uglify使用gulp-uglify压缩javascript文件，减小文件大小  npm  install gulp-uglify --save-dev
6)gulp-imagemin  使用gulp-imagemin压缩图片文件（包括PNG、JPEG、GIF和SVG图片） npm install gulp-imagemin --save-dev
7)gulp-rename 修改文件名称npm install gulp-rename --save-dev
8)gulp-concat  对文件进行合并 npm install gulp-concat --save-dev
9)gulp-notify   JS代码优化工具，可用于压缩和美化（或者叫“丑化”）JavaScript代码  npm install gulp-notify --save-dev
10)gulp-cache  对所要进行压缩的图片进行缓存(图片没有更新的时候  不会在第二次进行压缩,只有在图片进行更新的时候  图片才会进行压缩)
11)gulp-ruby-sass  基于ruby和sass的Sass文件编译，可将Sass文件为CSS文件 npm install gulp-ruby-sass --save-dev
*/
//对于一些方法的gulp一些方法的解释说明
//1)gulp.task()：方法用来定义任务，内部使用的是Orchestrator
//2)gulp.src()：gulp是基于Node.js的流进行任务转接及处理的，gulp.src()用于引入流，即：读取要操作的文件。可以是下面几种：
//	/public/js/index.js：指定的一个文件
//	/public/js/*.js：某个目录下的所有文件
//	/public/**/*.js：目录下及其所有子目录下的所有js文件
//	!/public/js/main.js：某个目录下，除main.js以外的所有js文件
//	*.+(js|css);正则表达式匹配根目录下扩展名是js和css的所有文件
//3)gulp.dest()：在指定路径输出文件。只能对其指定路径，而不能对输出文件重命名，重命名可以使用插件gulp-rename
//4)gulp.watch()：监视文件的变化（如：CSS、JS、图片），当文件发生变化后，我们可以利用它来执行相应的任务



var gulp = require('gulp');  
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var webpack = require('gulp-webpack');
var sass = require('gulp-ruby-sass');
var cache = require('gulp-cache');
var pngquant = require('imagemin-pngquant');

//脚本
gulp.task('scripts',function(callback){
	return gulp.src('src/entry.js')
			.pipe(webpack(require('./webpack.config.js')))
			.pipe(gulp.dest('dist/js'));
});	

//压缩image
gulp.task('images', function() {
	return  gulp.src('src/images/*.{png,jpg,gif,ico}')
				.pipe(imagemin({
					optimizationLevel:5, //类型：Number  默认：3  取值范围：0-7（优化等级）
					progressive: true,  //类型：Boolean 默认：false 无损压缩jpg图片
					interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
					multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
					}))
				.pipe(gulp.dest('dist/images'))
				
});


//压缩css
gulp.task('styles', function() {
  return sass(['src/css/*.scss'])
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('dist/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css'))
      .pipe(notify({ message: 'Styles task complete' }));
});

// 清理
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js','dist/images'], {read: false})
      .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts','images');
});

gulp.task('watch', function() {

	// 监听所有.scss文档
	gulp.watch('src/css/**/*.scss', ['styles']);
	// 监听所有.css文档
	gulp.watch('src/css/**/*.css', ['styles']);
	// 监听所有.js文档
	gulp.watch('src/js/**/*.js', ['scripts']);
	// 监听所有图片
	gulp.watch('src/images/*',['images']);




  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);
});