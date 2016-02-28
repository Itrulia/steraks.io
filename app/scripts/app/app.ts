/// <reference path='_reference.d.ts' />

var app:angular.IModule = angular.module('app', [
    'matchHistory',
    'summoner',
    'search',
    'sidemenu',
    'ui.router',
    'templates'
]);

app.service('MatchResource', App.Resource.MatchResource);
app.service('MatchService', App.Service.MatchService);

app.service('RankingStatsResource', App.Resource.RankingStatsResource);
app.service('RankingStatsService', App.Service.RankingStatsService);

app.service('StaticResource', App.Resource.StaticResource);
app.service('StaticService', App.Service.StaticService);

app.service('SummonerResource', App.Resource.SummonerResource);
app.service('SummonerService', App.Service.SummonerService);

app.service('CacheService', App.Service.CacheService);
app.service('AuthenticationService', App.Service.AuthenticationService);

//
app.factory('ServerErrorInterceptor', App.Interceptor.TokenInterceptor.instance);
app.factory('NeedAuthenticationInterceptor', App.Interceptor.NeedAuthenticationInterceptor.instance);
app.factory('TokenInterceptor', App.Interceptor.TokenInterceptor.instance);

//
app.filter('team', App.Filter.team);
app.filter('gameLength', App.Filter.gameLength);

//
app.directive('stickToTop', App.Directive.StickToTopDirective.instance);
//
app.component('spinner', new App.Component.SpinnerComponent());

app.component('matchSummary', new App.Component.MatchSummaryComponent());
app.component('matchAward', new App.Component.MatchAwardComponent());

app.component('summonerRank', new App.Component.SummonerRankComponent());
app.component('summonerChampionStats', new App.Component.SummonerChampionStatsComponent());
app.component('summonerCounter', new App.Component.SummonerCounterComponent());

app.component('participantJungleDistribution', new App.Component.ParticipantJungleDistribution());
app.component('participantDamageDistribution', new App.Component.ParticipantDamageDistribution());
app.component('participantSkillOrder', new App.Component.ParticipantSkillOrder());
app.component('participantBuildOrder', new App.Component.ParticipantBuildOrder());
app.component('participantRunes', new App.Component.ParticipantRunes());

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
    // Response
    $httpProvider.interceptors.push('NeedAuthenticationInterceptor');
    $httpProvider.interceptors.push('ServerErrorInterceptor');
    // Request
    $httpProvider.interceptors.push('TokenInterceptor');
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        if (path != '/' && path.slice(-1) === '/') {
            $location.replace().path(path.slice(0, -1));
        }
    });

    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'index/index.html',
        data: {
            auth: null
        }
    });

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'index/login.html',
		data: {
			auth: false
		}
	});

    $urlRouterProvider.otherwise('404');
}]);

app.run(['$rootScope', ($rootScope:any) => {

    $rootScope.KDA = (stats:any) => {

        if (stats.hasOwnProperty('kills')) {
            return (stats.kills + stats.assists) / Math.max(1, stats.deaths);
        }

        if (stats.hasOwnProperty('totalChampionKills')) {
            return (stats.totalChampionKills + stats.totalAssists) / Math.max(1, stats.totalDeathsPerSession);
        }

        return '';
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