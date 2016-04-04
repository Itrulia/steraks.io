/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerSynergyComponent {
        public bindings = {summoner: '<'};
        public templateUrl = 'summoner/synergy.html';
        public controller = 'SummonerSynergyController as ctrl'
    }

    // @ngInject
    export class SummonerSynergyController {
        public loading = true;
        public error = false;
        public counters = [];
        public summoner:any;

        constructor(private $scope, private SummonerService:App.SummonerService) {
            this.SummonerService.getSynergies(this.summoner.id)
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
