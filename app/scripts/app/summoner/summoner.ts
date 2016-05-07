'use strict';

import * as angular from 'angular';
//import * as uiRouter from 'angular-ui-router';
import * as _ from 'lodash';
import {SummonerComponents} from './components/SummonerComponents';
import {StaticService} from '../service/StaticService';
import {SummonerService} from '../service/SummonerService';
import {SummonerViews} from "./views/SummonerViews";
import './views/views';
import './components/components';

export let Summoner:angular.IModule = angular.module('summoner', [
    SummonerComponents.name,
    SummonerViews.name,
    'ui.router'
]);

Summoner.config(['$stateProvider', function ($stateProvider:any) {

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
            summoner: ['$q', '$timeout', '$stateParams', 'SummonerService', (
                $q:angular.IQService,
                $timeout:angular.ITimeoutService,
                $stateParams:any,
                SummonerService:SummonerService
            ) => {
                return SummonerService.getSummoner($stateParams.summonerId)
                    .catch((reason:any) => {
                        if (reason.status >= 500) {
                            return $timeout(() => {
                                return SummonerService.getSummoner($stateParams.summonerId);
                            }, 100);
                        }

                        return $q.reject(reason);
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
            champion: ['$stateParams', 'StaticService', function ($stateParams:any, StaticService:StaticService) {
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
            champion: ['$stateParams', 'StaticService', function ($stateParams:any, StaticService:StaticService) {
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
            champion: ['$stateParams', 'StaticService', function ($stateParams:any, StaticService:StaticService) {
                return StaticService.getChampions().then((champions) => {
                    return _.filter(champions, {'name': $stateParams.championId})[0];
                });
            }]
        }
    });
}]);
