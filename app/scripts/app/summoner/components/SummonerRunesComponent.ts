module Summoner {
    'use strict';

    export class SummonerRunesComponent implements angular.IComponentOptions {
        public templateUrl = 'summoner/components/summoner-runes.html';
        public bindings = {page: '<'};
        public controller = 'SummonerRunesController as ctrl'
    }

    // @ngInject
    export class SummonerRunesController {
        public page:any;

        public constructor(public $scope:any) {

        }
    }
}