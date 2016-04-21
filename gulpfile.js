'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();
var mergeStream = require('merge-stream');
var sequence = require('run-sequence');
var swPrecache = require('sw-precache');
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var reload = browserSync.reload;
var critical = require('critical').stream;
var psi = require('psi');

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
        app: [
            'app/scripts/libs/**/*.js',
            'node_modules/angular-localforage/dist/angular-localForage.min.js',
            'node_modules/angular-google-analytics/dist/angular-google-analytics.min.js'
        ],
        watch: ['app/scripts/libs/**/*.js'],
        dist: 'dist/scripts/libs'
    },
    workers: {
        app: [
            'app/scripts/workers/**/*.js',
            'node_modules/sw-toolbox/sw-toolbox.js'
        ],
        watch: ['app/scripts/workers/**/*.js'],
        dist: 'dist/scripts/workers'
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

var isProduction = function() {
    return process.env.NODE_ENV === 'production';
};

gulp.task('clean', function () {
    del(['dist/*', '!dist/.git'], {dot: true})
});

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
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(postProcessor))
        .pipe($.cleanCss())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dist))
        .pipe($.size({title: 'styles'}));
});

gulp.task('styles:lint', function () {
    return gulp.src(paths.styles.watch)
        .pipe($.plumber())
        .pipe($.postcss([
            require('stylelint')(),
            require('postcss-reporter')({clearMessages: true, throwError: true})
        ], {syntax: require('postcss-scss')}));
});

gulp.task('styles:critical', function () {
    return gulp.src('dist/*.html')
        .pipe(critical({
            src: 'localhost:3000/200.html',
            dest: '200.html',
            base: 'dist/',
            styleTarget: 'styles/app.css',
            ignore: ['@font-face'],
            dimensions: [
                {
                    width: 320,
                    height: 480
                },
                {
                    width: 768,
                    height: 1024
                },
                {
                    width: 1280,
                    height: 960
                }
            ],
            minify: true,
            inline: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('index', function () {
    return gulp.src(paths.index.app)
        .pipe($.plumber())
        .pipe($.if('*.jade', $.jade()))
        .pipe(gulp.dest(paths.index.dist))
        .pipe($.size({title: 'index'}));
});

gulp.task('templates', function () {
    return gulp.src(paths.templates.app)
        .pipe($.plumber())
        .pipe($.if('*.jade', $.jade()))
        .pipe($.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true
        }))
        .pipe($.angularTemplatecache({
            standalone: true
        }))
        .pipe(gulp.dest(paths.templates.dist))
        .pipe($.size({title: 'templates'}));
});

gulp.task('typescript', function () {
    return gulp.src(paths.typescript.app)
        .pipe($.plumber())
        .pipe($.typescript({
            target: 'ES5',
            out: 'app.js',
            typescript: require('typescript')
        }))
        .pipe($.stripLine('/// <reference path='))
        .pipe($.ngAnnotate())
        .pipe($.if(isProduction(), $.uglify()))
        .pipe($.if(isProduction(), $.replace('http://vanilla.app', 'https://api.steraks.io')))
        .pipe(gulp.dest(paths.typescript.dist))
        .pipe($.size({title: 'scripts'}));
});

gulp.task('javascript', function () {
    return gulp.src(paths.javascript.app)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.javascript.dist))
        .pipe($.size({title: 'javascript'}));
});

gulp.task('images', function () {
    return gulp.src(paths.images.app)
        .pipe($.plumber())
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.images.dist))
        .pipe($.size({title: 'images'}));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts.app)
        .pipe($.plumber())
        .pipe(gulp.dest(paths.fonts.dist))
        .pipe($.size({title: 'fonts'}));
});

gulp.task('workers', function () {
    return gulp.src(paths.workers.app)
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe(gulp.dest(paths.workers.dist))
        .pipe($.size({title: 'workers'}));
});

gulp.task('service-worker', function () {
    var rootDir = paths.workers.dist;
    var filepath = path.join(rootDir, 'service-worker.js');

    return swPrecache.write(filepath, {
        cacheId: 'steraks.io',
        stripPrefix: rootDir + '/',

        importScripts: [
            'sw-toolbox.js'
        ],

        staticFileGlobs: [
            'dist/images/**/*',
            'dist/scripts/libs/**/*.js',
            'dist/scripts/*.js',
            'dist/styles/**/*.css',
            'dist/*.{html,json}'
        ],

        runtimeCaching: [
            {
                urlPattern: /^https:\/\/ddragon\.leagueoflegends\.com\/cdn\/*/,
                handler: 'fastest',
                options: {
                    cache: {
                        name: 'ddragon'
                    }
                }
            },
            {
                urlPattern: /^https:\/\/api\.steraks\.io\/static\/*/,
                handler: 'fastest',
                options: {
                    cache: {
                        name: 'static'
                    }
                }
            },
            {
                urlPattern: /^https:\/\/api\.steraks\.io\/*\/summoner\/*/,
                handler: 'networkFirst',
                options: {
                    cache: {
                        maxEntries: 10,
                        name: 'summoner'
                    }
                }
            }
        ]
    });
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
    gulp.watch(paths.workers.watch, ['workers', 'service-worker', reload]);
    gulp.watch(paths.styles.watch, ['styles', reload]);
    gulp.watch(paths.templates.watch, ['templates', reload]);
    gulp.watch(paths.index.watch, ['index', reload]);
    gulp.watch(paths.images.watch, ['images', reload]);
    gulp.watch(paths.fonts.watch, ['fonts', reload]);
});

gulp.task('deploy', function (cb) {
    return $.surge({
        project: './dist',
        domain: 'steraks.io'
    });
});

gulp.task('psi:desktop', function () {
    return psi('https://steraks.io', {
        nokey: 'true',
        strategy: 'desktop'
    }).then(function (data) {
        console.log('========== Desktop');
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    });
});

gulp.task('psi:mobile', function () {
    return psi('https://steraks.io', {
        nokey: 'true',
        strategy: 'mobile'
    }).then(function (data) {
        console.log('========== Mobile');
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    });
});

gulp.task('lint', function() {
    sequence('scripts:lint', 'styles:lint');
});

gulp.task('build:dev', ['clean'], function () {
    process.env.NODE_ENV = 'development';

    sequence([
        'copy',
        'index',
        'templates',
        'typescript',
        'javascript',
        'workers',
        'fonts',
        'styles',
        'images'
    ], 'service-worker');
});

gulp.task('build:prod', ['clean'], function() {
    process.env.NODE_ENV = 'production';
    sequence([
        'copy',
        'index',
        'templates',
        'typescript',
        'javascript',
        'workers',
        'fonts',
        'styles',
        'images'
    ], ['service-worker', 'styles:critical'], ['deploy'], ['psi:mobile', 'psi:desktop']);
});

gulp.task('default', ['build:dev']);