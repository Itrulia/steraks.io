module Summoner {
    'use strict';

    export class SummonerChampionComponent {
        public templateUrl = 'summoner/components/summoner-champion.html';
        public bindings = {champion: '<'};
        public controller = 'SummonerChampionController as ctrl'
    }

    // @ngInject
    export class SummonerChampionController {
        public champion:any;

        public constructor(public $scope:any) {

        }
    }
}