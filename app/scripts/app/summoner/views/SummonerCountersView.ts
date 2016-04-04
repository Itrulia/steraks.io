/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerCountersComponent {
        public bindings = {summoner: '<'};
        public templateUrl = 'summoner/counters.html';
        public controller = 'SummonerCountersController as ctrl'
    }

    // @ngInject
    export class SummonerCountersController {
        public loading = true;
        public error = false;
        public counters = [];
        public summoner:any;

        constructor(private $scope, private SummonerService:App.SummonerService) {
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
