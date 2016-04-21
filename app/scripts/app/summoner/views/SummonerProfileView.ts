/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerProfileComponent implements angular.IComponentOptions {
        public bindings = {summoner: '<'};
        public templateUrl = 'summoner/summary.html';
        public controller = 'SummonerProfileController as ctrl';
    }

    // @ngInject
    export class SummonerProfileController {
        public summoner:any;
        public championMasteries:any;
        public chestsGranted:number;
        public masteryLevelFilter:any;
        public masteryLevels = [
            { label: 'Level 5', value: 5 },
            { label: 'Level 4', value: 4 },
            { label: 'Level 3', value: 3 },
            { label: 'Level 2', value: 2 },
            { label: 'Level 1', value: 1 },
        ];
        public loading = {
            championMastery: true
        };

        constructor(
            private $state:any,
            private SummonerService: App.SummonerService
        ) {
            this.$state.current.data.title = this.summoner.name;
            this.masteryLevelFilter = this.masteryLevels[0];

            this.SummonerService.getChampionMastery(this.summoner.id)
                .then((championMasteries) => {
                    this.championMasteries = championMasteries;
                })
                .then((championMasteries) => {
                    this.chestsGranted = _.filter(championMasteries, (championMastery:any) => {
                        return championMastery.chestGranted;
                    }).length;
                }).finally(() => {
                    this.loading.championMastery = false;
                });
        }
        
        public filterChampionsByLevel(masteryLevel:any) {
            return _.filter(this.championMasteries, (championMastery:any) => {
               return championMastery.championLevel === masteryLevel.value; 
            });
        }
    }
}
