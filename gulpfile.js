'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mergeStream = require('merge-stream');
var sequence = require('run-sequence');

var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var reload = browserSync.reload;

var paths = {
	styles: {
		app: ['app/styles/app.scss'],
		watch: ['app/styles/**/*.scss'],
		dist: 'dist/styles'
	},
	typescript: {
		app: ['app/scripts/**/*.ts'],
		watch: ['app/scripts/**/*.ts'],
		dist: 'dist/scripts'
	},
	javascript: {
		app: ['app/scripts/libs/**/*.js'],
		watch: ['app/scripts/libs/**/*.js'],
		dist: 'dist/scripts/libs'
	},
	images: {
		app: ['app/images/**/*'],
		watch: ['app/images/**/*'],
		dist: 'dist/images'
	},
	fonts: {
		app: ['app/fonts/**/*'],
		watch: ['app/fonts/**/*'],
		dist: 'dist/fonts'
	},
	index: {
		app: ['app/*.jade'],
		watch: ['app/*.jade'],
		dist: 'dist'
	},
	templates: {
		app: ['app/templates/**/*.jade'],
		watch: ['app/templates/**/*.jade'],
		dist: 'dist/scripts'
	}
};

var postProcessor = [
	require('autoprefixer')({browsers: ['last 1 version']})
];

gulp.task('scripts:lint', function () {
	return gulp.src(paths.typescript.dist + '/**/*.js')
		.pipe($.eslint())
		.pipe($.eslint.format())
});

gulp.task('copy', function () {
	return gulp.src([
		'app/*',
		'!app/*.html',
		'!app/*.jade'
	], {dot: true})
		.pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
	return gulp.src(paths.styles.app)
		.pipe($.plumber())
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.postcss(postProcessor))
		.pipe(gulp.dest(paths.styles.dist));
});

gulp.task('styles:lint', function () {
	return gulp.src(paths.styles.watch)
		.pipe($.plumber())
		.pipe($.postcss([
			require('stylelint')(),
			require('postcss-reporter')({clearMessages: true, throwError: true})
		], {syntax: require('postcss-scss')}))
});

gulp.task('index', function () {
	return gulp.src(paths.index.app)
		.pipe($.plumber())
		.pipe($.if('*.jade', $.jade()))
		.pipe(gulp.dest(paths.index.dist));
});

gulp.task('templates', function () {
	return gulp.src(paths.templates.app)
		.pipe($.plumber())
		.pipe($.if('*.jade', $.jade()))
		.pipe($.angularTemplatecache({
			standalone: true
		}))
		.pipe(gulp.dest(paths.templates.dist));
});

gulp.task('typescript', function () {
	return gulp.src(paths.typescript.app)
		.pipe($.plumber())
		.pipe($.typescript({
			out: 'app.js'
		}))
		.pipe($.stripLine('reference path'))
		.pipe($.ngAnnotate())
		.pipe(gulp.dest(paths.typescript.dist));
});

gulp.task('javascript', function () {
	return gulp.src(paths.javascript.app)
		.pipe($.plumber())
		.pipe(gulp.dest(paths.javascript.dist));
});

gulp.task('images', function () {
	return gulp.src(paths.images.app)
		.pipe($.plumber())
		.pipe(gulp.dest(paths.images.dist));
});

gulp.task('fonts', function () {
	return gulp.src(paths.fonts.app)
		.pipe($.plumber())
		.pipe(gulp.dest(paths.fonts.dist));
});

gulp.task('watch', function () {
	browserSync({
		notify: false,
		server: ['dist'],
		middleware: [
			modRewrite([
				'!\\.\\w+$ /200.html [L]'
			])
		]
	});

	gulp.watch(paths.typescript.watch, ['typescript', reload]);
	gulp.watch(paths.javascript.watch, ['javascript', reload]);
	gulp.watch(paths.styles.watch, ['styles', reload]);
	gulp.watch(paths.templates.watch, ['templates', reload]);
	gulp.watch(paths.index.watch, ['index', reload]);
	gulp.watch(paths.images.watch, ['images', reload]);
	gulp.watch(paths.fonts.watch, ['fonts', reload]);
});

gulp.task('default', ['copy', 'index', 'templates', 'typescript', 'javascript', 'fonts', 'styles', 'images']);