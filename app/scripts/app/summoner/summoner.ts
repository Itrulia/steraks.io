/// <reference path='../_reference.d.ts' />
/// <reference path='SummonerController.ts' />
/// <reference path='SummonerProfileController.ts' />
/// <reference path='SummonerCounterController.ts' />
/// <reference path='SummonerSynergyController.ts' />
/// <reference path='SummonerChampionsController.ts' />
/// <reference path='SummonerMatchHistoryController.ts' />
/// <reference path='SummonerChampionController.ts' />
/// <reference path='SummonerRunesController.ts' />

var summonerApp:angular.IModule = angular.module('summoner', ['ui.router']);
summonerApp.controller('SummonerController', Summoner.Controller.SummonerController);
summonerApp.controller('SummonerProfileController', Summoner.Controller.SummonerProfileController);
summonerApp.controller('SummonerMatchHistoryController', Summoner.Controller.SummonerMatchHistoryController);
summonerApp.controller('SummonerCounterController', Summoner.Controller.SummonerCounterController);
summonerApp.controller('SummonerSynergyController', Summoner.Controller.SummonerSynergyController);
summonerApp.controller('SummonerChampionsController', Summoner.Controller.SummonerChampionsController);
summonerApp.controller('SummonerChampionController', Summoner.Controller.SummonerChampionController);
summonerApp.controller('SummonerRunesController', Summoner.Controller.SummonerRunesController);

summonerApp.config(['$stateProvider', function ($stateProvider:angular.ui.IStateProvider) {

    $stateProvider.state('summoner', {
        abstract: true,
        url: '/summoner/:summonerId',
        templateUrl: 'summoner/template.html',
        controller: 'SummonerController',
        controllerAs: 'ctrl',
        resolve: {
            summoner: ['$stateParams', 'SummonerService', function ($stateParams:any, SummonerService:App.Service.SummonerService) {
                return SummonerService.getSummoner($stateParams.summonerId);
            }],
            league: ['SummonerService', 'summoner', function (SummonerService:App.Service.SummonerService, summoner) {
                return SummonerService.getRank(summoner.id).then((rank) => {
                    var tier = rank.tier.charAt(0).toUpperCase() + rank.tier.slice(1).toLowerCase();
                    var division = rank.entries.filter((rank:any) => {
                        return rank.playerOrTeamId == summoner.id;
                    })[0].division;

                    return [tier, division].join(' ');
                });
            }]
        }
    })
    .state('summoner.index', {
        url: '',
        templateUrl: 'summoner/summary.html',
        controller: 'SummonerProfileController',
        controllerAs: 'ctrl'
    })
    .state('summoner.runes', {
        url: '/runes',
        templateUrl: 'summoner/runes.html',
        controller: 'SummonerRunesController',
        controllerAs: 'ctrl'
    })
    .state('summoner.champions', {
        url: '/champions',
        templateUrl: 'summoner/champions.html',
        controller: 'SummonerChampionsController',
        controllerAs: 'ctrl'
    })
    .state('summoner.counters', {
        url: '/counters',
        templateUrl: 'summoner/counters.html',
        controller: 'SummonerCounterController',
        controllerAs: 'ctrl'
    })
    .state('summoner.synergy', {
        url: '/synergy',
        templateUrl: 'summoner/synergy.html',
        controller: 'SummonerSynergyController',
        controllerAs: 'ctrl'
    });

    // matches
    $stateProvider.state('summoner.matches', {
        template: '<div ui-view=""></div>'
    })
    .state('summoner.matches.history', {
        url: '/matches',
        templateUrl: 'summoner/match-history.html',
        controller: 'SummonerMatchHistoryController',
        controllerAs: 'ctrl'
    })
    .state('summoner.matches.as', {
        url: '/matches/as/:championId',
        templateUrl: 'summoner/match-history.html',
        controller: 'SummonerChampionController',
        controllerAs: 'ctrl',
        resolve: {
            champion: ['$stateParams', 'StaticService', function ($stateParams:any, StaticService:App.Service.StaticService) {
                return StaticService.getChampions().then((champions) => {
                    return _.filter(champions, {'name': $stateParams.championId})[0];
                });
            }]
        }
    })
    .state('summoner.matches.with', {
        url: '/matches/with/:championId',
        templateUrl: 'summoner/match-history.html'
    })
    .state('summoner.matches.against', {
        url: '/matches/against/:championId',
        templateUrl: 'summoner/match-history.html'
    });
}]);
