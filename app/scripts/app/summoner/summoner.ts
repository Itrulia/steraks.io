/// <reference path='../_reference.d.ts' />
/// <reference path='components/components.ts' />
/// <reference path='views/views.ts' />

var summonerApp:angular.IModule = angular.module('summoner', [
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
            footer: true
        },
        component: 'summoner',
        resolve: {
            summoner: ['$stateParams', 'SummonerService', function ($stateParams:any, SummonerService:App.SummonerService) {
                return SummonerService.getSummoner($stateParams.summonerId);
            }],
            league: ['SummonerService', 'summoner', function (SummonerService:App.SummonerService, summoner) {
                return SummonerService.getRank(summoner.id)
                    .then((rank) => {
                        var tier = rank.tier.charAt(0).toUpperCase() + rank.tier.slice(1).toLowerCase();
                        var division = rank.entries.filter((rank:any) => {
                            return rank.playerOrTeamId == summoner.id;
                        })[0].division;

                        return [tier, division].join(' ');
                    })
                    .catch(() => {
                        return 'UNRANKED';
                    });
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
        url: '/masteries'
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
        template: '<div ui-view=""></div>'
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
