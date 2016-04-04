/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerProfileComponent {
        public bindings = {summoner: '<'};
        public templateUrl = 'summoner/summary.html';
        public controller = 'SummonerProfileController as ctrl';
    }

    // @ngInject
    export class SummonerProfileController {
        public summoner:any;

        constructor(private $scope) {

        }
    }
}
