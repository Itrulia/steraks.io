/// <reference path='_reference.d.ts' />

var app:angular.IModule = angular.module('app', [
    'match',
    'summoner',
    'search',
    'sidemenu',
    'authentication',
    'ui.router',
    'LocalForageModule',
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

app.config(['$locationProvider', '$httpProvider', '$compileProvider', function ($locationProvider, $httpProvider, $compileProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

	$httpProvider.useApplyAsync(true);
	$compileProvider.debugInfoEnabled(false);
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('ServerErrorInterceptor');
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    // remove trailing slash
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        if (path != '/' && path.slice(-1) === '/') {
            $location.replace().path(path.slice(0, -1));
        }
    });

    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'index.html',
        data: {
            toolbar: true,
            search: true,
            footer: true
        }
    });
}]);

app.config(['$localForageProvider', ($localForageProvider:any) => {
    $localForageProvider.config({
        driver: localforage.INDEXEDDB,
        name: 'fiora.gg',
        version: 1.0,
        storeName: 'static',
        description: 'Fiora.gg static data storage'
    });
}]);

app.run([() => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/scripts/workers/service-worker.js');
    }
}]);

app.run(['$rootScope', '$state', '$window', '$transitions', ($rootScope:any, $state:any, $window:any, $transitions:any) => {
    $rootScope.$state = $state;

    // scroll to top..
    $transitions.onSuccess({}, function() {
        $window.scrollTo(0, 0);
    });

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
        var lane = player.timeline.lane.toLowerCase();
        var role = player.timeline.role.toLowerCase();

        if (role === "duo_carry") {
            return "adc"
        } else if (role === "duo_support") {
            return "support";
        }

        if (lane === 'top') {
            return 'top';
        } else if (lane === 'middle') {
            return 'mid';
        } else if (lane === 'jungle') {
            return 'jungle';
        } else if (lane === "bottom") {
            return "bot";
        }

        return 'unknown';
    }
}]);