/// <reference path='_reference.d.ts' />

var app:angular.IModule = angular.module('app', [
    'matchHistory',
    'summoner',
    'search',
    'sidemenu',
    'ui.router',
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
app.service('AuthenticationService', App.AuthenticationService);
app.service('KeystoneMasteryService', App.KeystoneMasteryService);

//
app.factory('ServerErrorInterceptor', App.ServerErrorInterceptor);
app.factory('NeedAuthenticationInterceptor', App.NeedAuthenticationInterceptor);
app.factory('TokenInterceptor', App.TokenInterceptor);

//
app.filter('team', App.Filter.team);
app.filter('gameLength', App.Filter.gameLength);

//
app.directive('stickToTop', App.StickToTopDirective.instance);
//
app.component('error', new App.ErrorComponent());
app.component('spinner', new App.SpinnerComponent());

app.component('matchSummary', new App.MatchSummaryComponent());
app.component('matchAward', new App.MatchAwardComponent());

app.component('masteryPage', new App.MasteryPageComponent());

app.component('summonerRank', new App.SummonerRankComponent());
app.component('summonerChampionStats', new App.SummonerChampionStatsComponent());
app.component('summonerCounter', new App.SummonerCounterComponent());
app.component('summonerChampion', new App.SummonerChampionComponent());
app.component('summonerRunes', new App.SummonerRunesComponent());

app.component('participantJungleDistribution', new App.ParticipantJungleDistribution());
app.component('participantDamageDistribution', new App.ParticipantDamageDistribution());
app.component('participantSkillOrder', new App.ParticipantSkillOrder());
app.component('participantBuildOrder', new App.ParticipantBuildOrder());
app.component('participantRunes', new App.ParticipantRunesComponent());

//
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