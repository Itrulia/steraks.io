/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerCountersComponent implements angular.IComponentOptions {
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

        constructor(private $state, private SummonerService:App.SummonerService) {
            this.$state.current.data.title = this.summoner.name + '\'s Counters';

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
