module Summoner {
    'use strict';

    export class SummonerChampionMasteryComponent implements angular.IComponentOptions {
        public templateUrl = 'summoner/components/summoner-champion-mastery.html';
        public bindings = {champion: '<'};
        public controller = 'SummonerChampionMasteryController as ctrl'
    }

    // @ngInject
    export class SummonerChampionMasteryController {
        public champion:any;

        public constructor() {
            this.champion.championPoints = this.shortVal(this.champion.championPoints);
        }

        private shortVal(val:number):string {
            if (val > 999999) {
                return (val/1000000).toFixed(1) + 'm'
            } else if (val > 999) {
                return (val/1000).toFixed(1) + 'k';
            }

            return val.toString();
        }
    }
}