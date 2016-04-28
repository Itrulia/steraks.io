/// <reference path='_reference.d.ts' />

let app:angular.IModule = angular.module('app', [
    'match',
    'ranked',
    'summoner',
    'search',
    'sidemenu',
    'authentication',
    'ui.router',
    'LocalForageModule',
    'angular-google-analytics',
    'templates'
]);

app.service('MatchResource', App.MatchResource);
app.service('MatchService', App.MatchService);
app.service('MatchStaticDataService', App.MatchStaticDataService);

app.service('RankingStatsResource', App.RankingStatsResource);
app.service('RankingStatsService', App.RankingStatsService);

app.service('StaticResource', App.StaticResource);
app.service('StaticService', App.StaticService);

app.service('SummonerResource', App.SummonerResource);
app.service('SummonerService', App.SummonerService);

app.service('CacheService', App.CacheService);
app.service('KeystoneMasteryService', App.KeystoneMasteryService);

//
app.factory('ServerErrorInterceptor', App.ServerErrorInterceptor);

//
app.filter('team', App.Filter.team);
app.filter('gameLength', App.Filter.gameLength);

// Date
app.filter('humanizeDate', App.Filter.humanizeDate);
app.filter('duration', App.Filter.duration);

//
app.directive('stickToTop', App.StickToTopDirective.instance());
app.directive('paperInput', App.PaperInputDirective.instance());
app.directive('paperDropdown', App.PaperDropdownDirective.instance());

/////////////////////////
/// General
/////////////////////////

// Spinner Component
app.component('spinner', new App.SpinnerComponent());
// Error Component
app.component('error', new App.ErrorComponent());
app.controller('ErrorComponentController', App.ErrorComponentController);

/////////////////////////
/// Match
/////////////////////////

// Summary
app.component('matchSummary', new App.MatchSummaryComponent());
app.controller('MatchSummaryController', App.MatchSummaryController);

app.config(['$locationProvider', '$httpProvider', '$compileProvider', (
    $locationProvider:angular.ILocationProvider,
    $httpProvider:angular.IHttpProvider,
    $compileProvider:angular.ICompileProvider
) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

	$httpProvider.useApplyAsync(true);
	$compileProvider.debugInfoEnabled(false);
}]);

app.config(['ChartJsProvider', (
    ChartJsProvider
) => {
    ChartJsProvider.setOptions({
        colours: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        responsive: true
    });
}]);

app.config(['$httpProvider', ($httpProvider:angular.IHttpProvider) => {
    $httpProvider.interceptors.push('ServerErrorInterceptor');
}]);

app.config(['$urlRouterProvider', '$stateProvider', (
    $urlRouterProvider:angular.ui.IUrlRouterProvider,
    $stateProvider:angular.ui.IStateProvider
) => {
    // remove trailing slash
    $urlRouterProvider.rule(function ($injector, $location) {
        let path = $location.path();
        if (path != '/' && path.slice(-1) === '/') {
            $location.replace().path(path.slice(0, -1));
        }
    });

    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'index.html',
        data: {
            toolbar: false,
            search: false,
            footer: true,
            title: 'Steraks'
        }
    }).state('about', {
        url: '/about',
        templateUrl: 'about.html',
        data: {
            toolbar: true,
            search: true,
            footer: true,
            title: 'About Steraks'
        }
    }).state('contact', {
        url: '/contact',
        templateUrl: 'contact.html',
        data: {
            toolbar: true,
            search: true,
            footer: true,
            title: 'Contact Steraks'
        }
    });
}]);

app.config(['$localForageProvider', ($localForageProvider:angular.localForage.ILocalForageProvider) => {
    $localForageProvider.config({
        driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
        name: 'steraks.io',
        version: 1.0,
        storeName: 'static',
        description: 'Steraks.io static data storage'
    });
}]);

// Cache Cleanup
app.run(['$interval', 'CacheService', (
    $interval:angular.IIntervalService,
    CacheService: App.CacheService
) => {
    CacheService.cleanUp();

    let interval = 1000 * 60 * 10; // 10min
    $interval(() => {
        CacheService.cleanUp();
    }, interval, 0, false);
}]);

// Analytics
app.config(['AnalyticsProvider', (AnalyticsProvider:any) => {
    AnalyticsProvider
        .useAnalytics(true)
        .logAllCalls(true)
        .trackPages(false)
        .setDomainName('steraks.io')
        .setAccount('UA-76478578-1');
}]);

app.run(['$location', '$transitions', 'Analytics', ($location:any, $transitions:any, Analytics:any) => {
    $transitions.onSuccess({}, () => {
        Analytics.trackPage($location.path());
    });
}]);

// Service Worker
app.run([() => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/scripts/workers/service-worker.js');
    }
}]);

app.run(['$rootScope', '$state', '$window', '$transitions', (
    $rootScope:any,
    $state:angular.ui.IStateService,
    $window:angular.IWindowService,
    $transitions:any
) => {
    $rootScope.$state = $state;

    // scroll to top..
    $transitions.onSuccess({}, ['$transition$', ($transition$:any) => {
        let fromState = $transition$.from();
        let toState = $transition$.to();

        if (fromState.name !== '') {
            let fromParent = fromState.name.split('.');
            let fromLength = fromParent.length;

            let toParent = toState.name.split('.');
            let toLength = toParent.length;

            if (fromLength === 1 ||
                toLength === 1 ||
                fromLength !== toLength ||
                fromParent[fromLength - 2] !== toParent[toLength - 2]
            ) {
                $window.scrollTo(0, 0);
            }
        }
    }]);

    // I am too lazy to refactor
    $rootScope.KDA = (stats:any) => {

        if (stats.hasOwnProperty('kills')) {
            return (stats.kills + stats.assists) / Math.max(1, stats.deaths);
        }

        if (stats.hasOwnProperty('totalChampionKills')) {
            return (stats.totalChampionKills + stats.totalAssists) / Math.max(1, stats.totalDeathsPerSession);
        }

        return 0;
    };

    $rootScope.getPosition = (player:any) => {
        let lane = player.timeline.lane.toLowerCase();
        let role = player.timeline.role.toLowerCase();

        if (role === 'duo_carry') {
            return 'adc'
        } else if (role === 'duo_support') {
            return 'support';
        }

        if (lane === 'top') {
            return 'top';
        } else if (lane === 'middle') {
            return 'mid';
        } else if (lane === 'jungle') {
            return 'jungle';
        } else if (lane === 'bottom') {
            return 'bot';
        }

        return 'unknown';
    }
}]);