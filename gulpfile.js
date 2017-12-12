var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var del = require('del');
var template = require('gulp-template');
var gulpCfgObj = {
  allSrc: '/**',
  sassSrc: 'css/**/*.+(scss|sass)',//sass文件目录
  cssSrc: 'css/**/*.*',
  cssDist: 'dist/css/',
  jsSrc: 'js/**/*.js',//js文件目录
  jsDist: 'dist/js/',//js文件目录
  htmlSrc: './*.+(html|shtml)',//html文件目录
  htmlDist: 'dist/',
  fontsSrc: 'fonts/**/*.*',//字体文件夹
  fontsDist: 'dist/fonts/',
  imgSrc: 'img/*.*',
  imgDist: 'dist/img/'
};

//读取配置文件
var config = require('./config.json');
var curEnv;
if (gulp.env._ && gulp.env._.length > 0 && gulp.env._[0] === 'debug') {
  curEnv = config.debug;
} else if (gulp.env._[0] === 'dev') {
  curEnv = config.dev;
} else {
  curEnv = config.test;
}
// 清除 dist 文件夹
gulp.task('clean', function () {
  return del.sync('./dist');
});

// html 整合
gulp.task('bulidHtml', function () {
  return gulp.src(gulpCfgObj.htmlSrc)
    .pipe(fileinclude())
    .pipe(template(curEnv))
    .pipe(gulp.dest(gulpCfgObj.htmlDist));
});

//todo 整合其他，还包括整合css js
gulp.task('bulidCss', function () {
  return gulp.src(gulpCfgObj.cssSrc)
    .pipe(gulp.dest(gulpCfgObj.cssDist));
});
//todo 图片压缩？
gulp.task('bulidImg', function () {
  return gulp.src(gulpCfgObj.imgSrc)
    .pipe(gulp.dest(gulpCfgObj.imgDist));
});
//todo 分环境压缩合并
gulp.task('bulidJs', function () {
  return gulp.src(gulpCfgObj.jsSrc)
    .pipe(gulp.dest(gulpCfgObj.jsDist));
});
gulp.task('bulidFonts', function () {
  return gulp.src(gulpCfgObj.fontsSrc)
    .pipe(gulp.dest(gulpCfgObj.fontsDist));
});

gulp.task('bulidDist', function () {
  /*把各个文件编译压缩后输出到dist*/
  runSequence('clean', ['bulidHtml', 'bulidJs', 'bulidCss', 'bulidFonts', 'bulidImg']);
});

// 配置服务器
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 8001
  });
  // 监听 html
  gulp.watch(gulpCfgObj.htmlSrc, ['bulidHtml']);
  //.on('change', browserSync.reload);
});

/*
gulp.task('debug', ['bulidDist', 'serve']);
gulp.task('dev', ['bulidDist', 'serve']);
gulp.task('test', ['bulidDist', 'serve']);*/

gulp.task('debug', ['serve']);