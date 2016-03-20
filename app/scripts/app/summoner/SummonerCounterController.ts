/// <reference path='../_reference.d.ts' />

module Summoner {
    'use strict';
    // @ngInject

    export class SummonerCounterController {
        public loading = true;
        public error = false;
        public counters = [];

        constructor(private $scope, private $q:angular.IQService, private SummonerService:App.SummonerService, public summoner:any) {
            this.SummonerService.getCounters(this.summoner.id)
                .then((counters:any) => {
                    this.counters = _.orderBy(counters, ['percent', 'games'], ['desc', 'desc']);
                })
                .catch(() => {
                    this.error = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
