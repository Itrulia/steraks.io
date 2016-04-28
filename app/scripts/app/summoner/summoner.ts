/// <reference path='../_reference.d.ts' />
/// <reference path='components/components.ts' />
/// <reference path='views/views.ts' />

let summonerApp:angular.IModule = angular.module('summoner', [
    'summoner.components',
    'summoner.views',
    'ui.router'
]);

summonerApp.config(['$stateProvider', function ($stateProvider:any) {

    $stateProvider.state('summoner', {
        abstract: true,
        url: '/summoner/:summonerId',
        data: {
            toolbar: true,
            search: true,
            footer: true,
        },
        component: 'summoner',
        resolve: {
            summoner: ['$stateParams', 'SummonerService', (
                $stateParams:any,
                SummonerService:App.SummonerService
            ) => {
                return SummonerService.getSummoner($stateParams.summonerId);
            }]
        }
    })
    .state('summoner.index', {
        url: '',
        component: 'summonerProfile'
    })
    .state('summoner.runes', {
        url: '/runes',
        component: 'summonerRunePages'
    })
    .state('summoner.masteries', {
        url: '/masteries',
        component: 'summonerMasteryPages'
    })
    .state('summoner.champions', {
        url: '/champions',
        component: 'summonerChampions'
    })
    .state('summoner.counters', {
        url: '/counters',
        component: 'summonerCounters'
    })
    .state('summoner.synergy', {
        url: '/synergy',
        component: 'summonerSynergy'
    });

    // matches
    $stateProvider.state('summoner.matches', {
        url: '/matches',
        abstract: true,
        templateUrl: 'summoner/matches.html'
    })
    .state('summoner.matches.history', {
        url: '',
        component: 'summonerMatchesHistory'
    })
    .state('summoner.matches.as', {
        url: '/as/:championId',
        component: 'summonerMatchesAs',
        params: {
            matchIds: null
        },
        resolve: {
            champion: ['$stateParams', 'StaticService', function ($stateParams:any, StaticService:App.StaticService) {
                return StaticService.getChampions().then((champions) => {
                    return _.filter(champions, {'name': $stateParams.championId})[0];
                });
            }]
        }
    })
    .state('summoner.matches.with', {
        url: '/with/:championId',
        component: 'summonerMatchesWith',
        params: {
            matchIds: null
        },
        resolve: {
            champion: ['$stateParams', 'StaticService', function ($stateParams:any, StaticService:App.StaticService) {
                return StaticService.getChampions().then((champions) => {
                    return _.filter(champions, {'name': $stateParams.championId})[0];
                });
            }]
        }
    })
    .state('summoner.matches.against', {
        url: '/against/:championId',
        component: 'summonerMatchesAgainst',
        params: {
            matchIds: null
        },
        resolve: {
            champion: ['$stateParams', 'StaticService', function ($stateParams:any, StaticService:App.StaticService) {
                return StaticService.getChampions().then((champions) => {
                    return _.filter(champions, {'name': $stateParams.championId})[0];
                });
            }]
        }
    });
}]);
