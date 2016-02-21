/// <reference path='../_reference.d.ts' />
/// <reference path='SummonerController.ts' />
/// <reference path='SummonerProfileController.ts' />
/// <reference path='SummonerMatchHistoryController.ts' />

var summonerApp:angular.IModule = angular.module('summoner', ['ui.router']);
summonerApp.controller('SummonerController', Summoner.Controller.SummonerController);
summonerApp.controller('SummonerProfileController', Summoner.Controller.SummonerProfileController);
summonerApp.controller('SummonerMatchHistoryController', Summoner.Controller.SummonerMatchHistoryController);

summonerApp.config(['$stateProvider', function ($stateProvider:angular.ui.IStateProvider) {

    $stateProvider.state('summoner', {
        abstract: true,
        url: '/summoner/:summonerId',
        templateUrl: 'summoner/template.html',
        controller: 'SummonerController',
        controllerAs: 'ctrl',
        resolve: {
            summoner: ['$stateParams', 'SummonerService', function ($stateParams:angular.ui.IStateParamsService, SummonerService:App.Service.SummonerService) {
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
        templateUrl: 'summoner/index.html',
        controller: 'SummonerProfileController',
        controllerAs: 'ctrl'
    })
    .state('summoner.matchHistory', {
        url: '/matches',
        templateUrl: 'summoner/match-history.html',
        controller: 'SummonerMatchHistoryController',
        controllerAs: 'ctrl'
    });
}]);
