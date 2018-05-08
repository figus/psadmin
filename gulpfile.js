"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');  // Local web server
var open = require('gulp-open');        // Opens a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');     // Transforms React JSX to JS
var source = require('vinyl-source-stream');    //Use conventional text streams with Gulp 
var concat = require('gulp-concat');    //concatenates files
var lint = require('gulp-eslint');  //lint js files, including jsx

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
};

//Start local dev server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//Open index.html
gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({
            uri: config.devBaseUrl + ':' + config.port + '/',
            app: 'google chrome'
        }));
});

//copy html files from src to dist
gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.mainJs) //take all js files
        .transform(reactify)        //transform jsx to js
        .bundle()                   //bundle now
        .on('error', console.error.bind(console))           //output errors to the console
        .pipe(source('bundle.js'))                          //creates a file stream called bundle.js
        .pipe(gulp.dest(config.paths.dist + '/scripts'))    //writes the file stream to disk
        .pipe(connect.reload());    //reloads connect servers with livereload enabled
});

//bundle all css together
gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

//lint js files
gulp.task('lint', function() {
    return gulp.src(config.paths.js)
               .pipe(lint({
                    configFile: 'eslint.config.json'
               }))
               .pipe(lint.format());
})

//watch the html file, on every change, it will reload
gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']);