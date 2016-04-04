/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerComponent {
        public bindings = {summoner: '<', league: '<'};
        public templateUrl = 'summoner/template.html';
        public controller = 'SummonerController as ctrl';
    }

    // @ngInject
    export class SummonerController {
        public summoner:any;
        public league:any;

        constructor(private $scope) {

        }
    }
}
