/// <reference path='../_reference.d.ts' />

module Summoner.Controller {
    'use strict';
    // @ngInject

    export class SummonerCounterController {
        public loading = true;
        public counters = [];

        constructor(private $scope, private $q:angular.IQService, private SummonerService:App.Service.SummonerService, public summoner:any) {
            this.SummonerService.getCounters(this.summoner.id).then((counters:any) => {
                this.SummonerService.setCounterSynergyStaticData(counters);
                this.counters = _.orderBy(counters, ['percent', 'games'], ['desc', 'desc']);
                this.loading = false;
            });
        }
    }
}
