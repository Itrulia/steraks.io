/// <reference path='../_reference.d.ts' />

module Summoner {
    'use strict';
    // @ngInject

    export class SummonerController {
        constructor(private $scope:angular.IScope, private SummonerService:App.SummonerService, public summoner:any, public league:any) {

        }
    }
}
