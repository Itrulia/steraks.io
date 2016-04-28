import {Authentication} from "./authentication/authentication";
import {Ranked} from "./ranked/ranked";
import {Match} from "./match/match";
import {SideMenu} from "./sidemenu/sidemenu";
import {Search} from "./search/search";
import {Summoner} from "./summoner/summoner";

import {MatchResource} from "./resource/MatchResource";
import {RankingStatsResource} from "./resource/RankingStatsResource";
import {StaticResource} from "./resource/StaticResource";
import {SummonerResource} from "./resource/SummonerResource";
import {CacheService} from "./service/CacheService";
import {KeystoneMasteryService} from "./service/KeystoneMasteryService";
import {MatchService} from "./service/MatchService";
import {MatchStaticDataService} from "./service/MatchStaticDataService";
import {StaticService} from "./service/StaticService";
import {RankingStatsService} from "./service/RankingStatsService";
import {SummonerService} from "./service/SummonerService";
import {PaperDropdownDirective} from "./directives/PaperDropdownDirective";
import {PaperInputDirective} from "./directives/PaperInputDirective";
import {StickToTopDirective} from "./directives/StickToTopDirective";
import {ServerErrorInterceptor} from "./interceptors/ServerErrorInterceptor";
import {ErrorComponentController, ErrorComponent} from "./components/ErrorComponent";
import {SpinnerComponent} from "./components/SpinnerComponent";
import {MatchSummaryComponent, MatchSummaryController} from "./components/MatchSummaryComponent";
import {Team} from "./filters/Team";
import {GameLength} from "./filters/Game";
import {HumanizeDate, Duration} from "./filters/Date";

'use strict';

export let Application:angular.IModule = angular.module('app', [
    Match.name,
    Ranked.name,
    Summoner.name,
    Search.name,
    SideMenu.name,
    Authentication.name,
    'ui.router',
    'LocalForageModule',
    'angular-google-analytics',
    'templates'
]);

Application.service('MatchResource', MatchResource);
Application.service('MatchService', MatchService);
Application.service('MatchStaticDataService', MatchStaticDataService);

Application.service('RankingStatsResource', RankingStatsResource);
Application.service('RankingStatsService', RankingStatsService);

Application.service('StaticResource', StaticResource);
Application.service('StaticService', StaticService);

Application.service('SummonerResource', SummonerResource);
Application.service('SummonerService', SummonerService);

Application.service('CacheService', CacheService);
Application.service('KeystoneMasteryService', KeystoneMasteryService);

//
Application.factory('ServerErrorInterceptor', ServerErrorInterceptor);


//
Application.filter('team', Team);
Application.filter('gameLength', GameLength);

// Date
Application.filter('humanizeDate', HumanizeDate);
Application.filter('duration', Duration);

//
Application.directive('stickToTop', StickToTopDirective.instance());
Application.directive('paperInput', PaperInputDirective.instance());
Application.directive('paperDropdown', PaperDropdownDirective.instance());

/////////////////////////
/// General
/////////////////////////

// Spinner Component
Application.component('spinner', new SpinnerComponent());
// Error Component
Application.component('error', new ErrorComponent());
Application.controller('ErrorComponentController', ErrorComponentController);

/////////////////////////
/// Match
/////////////////////////

// Summary
Application.component('matchSummary', new MatchSummaryComponent());
Application.controller('MatchSummaryController', MatchSummaryController);

Application.config(['$locationProvider', '$httpProvider', '$compileProvider', (
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

Application.config(['ChartJsProvider', (
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

Application.config(['$httpProvider', ($httpProvider:angular.IHttpProvider) => {
    $httpProvider.interceptors.push('ServerErrorInterceptor');
}]);

Application.config(['$urlRouterProvider', '$stateProvider', (
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

Application.config(['$localForageProvider', ($localForageProvider:angular.localForage.ILocalForageProvider) => {
    $localForageProvider.config({
        driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
        name: 'steraks.io',
        version: 1.0,
        storeName: 'static',
        description: 'Steraks.io static data storage'
    });
}]);

// Cache Cleanup
Application.run(['$interval', 'CacheService', (
    $interval:angular.IIntervalService,
    CacheService: CacheService
) => {
    CacheService.cleanUp();

    let interval = 1000 * 60 * 10; // 10min
    $interval(() => {
        CacheService.cleanUp();
    }, interval, 0, false);
}]);

// Analytics
Application.config(['AnalyticsProvider', (AnalyticsProvider:any) => {
    AnalyticsProvider
        .useAnalytics(true)
        .logAllCalls(true)
        .trackPages(false)
        .setDomainName('steraks.io')
        .setAccount('UA-76478578-1');
}]);

Application.run(['$location', '$transitions', 'Analytics', (
    $location:any,
    $transitions:any,
    Analytics:any
) => {
    $transitions.onSuccess({}, () => {
        Analytics.trackPage($location.path());
    });
}]);

// Service Worker
Application.run([() => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/scripts/workers/service-worker.js');
    }
}]);

Application.run(['$rootScope', '$state', '$window', '$transitions', (
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