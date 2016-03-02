/// <reference path='../_reference.d.ts' />

module Summoner.Controller {
    'use strict';
    // @ngInject

    export class SummonerChampionsController {
        public loading = true;
        public champions = [];

        constructor(private $scope, private $q:angular.IQService, private SummonerService:App.Service.SummonerService, public summoner:any) {
            this.SummonerService.getMatches(this.summoner.id).then((matches:any) => {
                var champions = _.groupBy(matches, 'champion');
                champions = _.map(champions, function(champion:any[], key) {
                    return {
                        championId: champion[0].champion,
                        total: champion.length
                    }
                });

                this.SummonerService.setCounterSynergyStaticData(champions);
                this.champions = _.orderBy(champions, ['total', 'championId'], ['desc', 'desc']);
                this.loading = false;
            });
        }
    }
}
