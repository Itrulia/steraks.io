'use strict';

// Core
var path = require('path');

// Frameworks
var gulp = require('gulp');
var swPrecache = require('sw-precache');

// Google Page Speed
var critical = require('critical').stream;
var psi = require('psi');

// Browserify
var buffer = require('vinyl-source-buffer');
var browserify = require('browserify');
var tsify = require('tsify');

// Browser Sync
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');
var reload = browserSync.reload;

// Config
var config = require('./gulpconfig');
var postProcessor = [
    require('postcss-zindex')(),
    require('autoprefixer')({browsers: ['last 1 version']})
];

// Util
var del = require('del');
var sequence = require('run-sequence');
var mergeStream = require('merge-stream');
var $ = require('gulp-load-plugins')();

var isProduction = function() {
    return process.env.NODE_ENV === 'production';
};

//////////////////////////////////////////
/// Util
//////////////////////////////////////////

gulp.task('clean', function () {
    del.sync('dist/*', {dot: true})
});

gulp.task('copy', function () {
    return gulp.src([
            'app/*',
            '!app/*.html',
            '!app/*.jade'
        ], {dot: true})
        .pipe(gulp.dest('dist'));
});

//////////////////////////////////////////
/// CSS
//////////////////////////////////////////

gulp.task('styles', ['styles:lint'], function () {
    return gulp.src(config.paths.styles.app)
        .pipe($.plumber())
        .pipe($.if(!isProduction(), $.sourcemaps.init()))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(postProcessor))
        .pipe($.if(isProduction(), $.cleanCss()))
        .pipe($.if(!isProduction(), $.sourcemaps.write('.')))
        .pipe(gulp.dest(config.paths.styles.dist))
        .pipe($.size({title: 'styles'}));
});

gulp.task('styles:lint', function () {
    return gulp.src(config.paths.styles.watch)
        .pipe($.plumber())
        .pipe($.postcss([
            require('stylelint')(),
            require('postcss-reporter')({clearMessages: true, throwError: false})
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
                { width: 320, height: 480 },
                { width: 768, height: 1024 },
                { width: 1280, height: 960 }
            ],
            minify: true,
            inline: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles:uncss', function() {
    return gulp.src(config.paths.styles.dist + '/app.css')
        .pipe($.purifycss([
            config.paths.templates.dist + '/**/*.js'
        ]))
        .pipe(gulp.dest(config.paths.styles.dist));
});

//////////////////////////////////////////
/// HTML
//////////////////////////////////////////

gulp.task('index', function () {
    return gulp.src(config.paths.index.app)
        .pipe($.plumber())
        .pipe($.if('*.jade', $.jade()))
        .pipe(gulp.dest(config.paths.index.dist))
        .pipe($.size({title: 'index'}));
});

gulp.task('templates', function () {
    return gulp.src(config.paths.templates.app)
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
            module: 'steraks',
            standalone: false
        }))
        .pipe(gulp.dest(config.paths.templates.dist))
        .pipe($.size({title: 'templates'}));
});

//////////////////////////////////////////
/// JavaScript
//////////////////////////////////////////

gulp.task('typescript', /*['typescript:lint'],*/ function () {
    return browserify()
        .add(config.paths.typescript.app + '/app.ts')
        .external('localForage')
        .external('angular')
        .external('moment')
        .external('lodash')
        .external('jquery')
        .plugin(tsify, {
            experimentalDecorators: true
        })
        .bundle()
        .on('error', function (error) {
            $.util.log($.util.colors.red(error.toString()));
        })
        .pipe($.plumber())
        .pipe(buffer('app.js'))
        .pipe($.stripLine('/// <reference path='))
        .pipe($.ngAnnotate())
        .pipe($.if(isProduction(), $.uglify()))
        .pipe($.if(isProduction(), $.replace('http://vanilla.app', 'https://api.steraks.io')))
        .pipe(gulp.dest(config.paths.typescript.dist))
        .pipe($.size({title: 'scripts'}));
});

gulp.task('typescript:lint', function () {
    gulp.src(config.paths.typescript.app)
        .pipe($.tslint({
            configuration: "tslint.json"
        }))
        .pipe($.tslint.report($.tslintStylish, {
            emitError: false,
            sort: true,
            bell: true,
            fullPath: true
        }));
});

gulp.task('libraries', function () {
    var libs = gulp.src(config.paths.libraries.app.libs)
        .pipe($.concat('libs.js'));

    return mergeStream(libs)
        .pipe($.plumber())
        .pipe($.if(isProduction(), $.uglify()))
        .pipe(gulp.dest(config.paths.libraries.dist))
        .pipe($.size({title: 'bundle'}));
});

//////////////////////////////////////////
/// Images
//////////////////////////////////////////

gulp.task('sprite:svg', function() {
    var logos = gulp.src(config.paths.sprites.logos.app)
        .pipe($.svgstore())
        .pipe($.rename('logos.svg'))
        .pipe(gulp.dest(config.paths.sprites.logos.dist));

    var material = gulp.src(config.paths.sprites.material.app)
        .pipe($.rename(function (path) {
            path.basename = path.basename.replace(/svg-sprite-|-symbol/gi, '');
        }))
        .pipe(gulp.dest(config.paths.sprites.material.dist));
    
    return mergeStream(logos, material);

});

gulp.task('images', function () {
    return gulp.src(config.paths.images.app)
        .pipe($.plumber())
        .pipe($.newer(config.paths.images.dist))
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            multipass: true,
            optimizationLevel: 7
        }))
        .pipe(gulp.dest(config.paths.images.dist))
        .pipe($.size({title: 'images'}));
});

//////////////////////////////////////////
/// Web-/Service Worker
//////////////////////////////////////////

gulp.task('workers', function () {
    return gulp.src(config.paths.workers.app)
        .pipe($.plumber())
        .pipe($.newer(config.paths.workers.dist))
        .pipe($.if(isProduction(), $.uglify()))
        .pipe(gulp.dest(config.paths.workers.dist))
        .pipe($.size({title: 'workers'}));
});

gulp.task('service-worker', function () {
    var rootDir = config.paths.workers.dist;
    var filepath = path.join(rootDir, 'service-worker.js');

    return swPrecache.write(filepath, {
        cacheId: 'steraks.io',
        stripPrefix: rootDir + '/',

        importScripts: [
            'sw-toolbox.js'
        ],

        staticFileGlobs: [
            'dist/images/**/*',
            'dist/scripts/**/*.js',
            'dist/styles/**/*.css',
            'dist/*.html',
            'dist/*.json'
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

//////////////////////////////////////////
/// Development
//////////////////////////////////////////

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

    gulp.watch(config.paths.typescript.watch, ['typescript', reload]);
    gulp.watch(config.paths.workers.watch, ['workers', 'service-worker', reload]);
    gulp.watch(config.paths.styles.watch, ['styles', reload]);
    gulp.watch(config.paths.templates.watch, ['templates', reload]);
    gulp.watch(config.paths.index.watch, ['index', reload]);
    gulp.watch(config.paths.images.watch, ['images', reload]);
    gulp.watch(config.paths.sprites.watch, ['sprite:svg', reload]);
});

//////////////////////////////////////////
/// Production
//////////////////////////////////////////

gulp.task('deploy', function (cb) {
    return $.surge({
        project: './dist',
        domain: 'steraks.io'
    });
});

//////////////////////////////////////////
/// Post deploy
//////////////////////////////////////////

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

//////////////////////////////////////////
/// Misc
//////////////////////////////////////////

gulp.task('default', ['clean'], function () {
    sequence([
        'copy',
        'index',
        'templates',
        'typescript',
        'libraries',
        'workers',
        'styles',
        'images',
        'sprite:svg'
    ], 'service-worker');
});

gulp.task('build:prod', ['clean'], function() {
    process.env.NODE_ENV = 'production';
    sequence([
        'copy',
        'index',
        'templates',
        'typescript',
        'libraries',
        'workers',
        'styles',
        'images',
        'sprite:svg'
    ], ['service-worker'], 'styles:critical', ['deploy'], ['psi:mobile', 'psi:desktop']);
});