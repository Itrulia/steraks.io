module Summoner {
    'use strict';

    export class SummonerCounterComponent implements angular.IComponentOptions {
        public templateUrl = 'summoner/components/summoner-counter.html';
        public bindings = {counter: '<'};
        public controller = 'SummonerCounterController as ctrl'
    }

    // @ngInject
    export class SummonerCounterController {
        public counter:any;

        public constructor(public $scope:any) {

        }
    }
}