/// <reference path='../_reference.d.ts' />

module Summoner.Controller {
    'use strict';
    // @ngInject

    export class SummonerController {
        constructor(private $scope:angular.IScope, private SummonerService:App.Service.SummonerService, public summoner:any, public league:any) {

        }
    }
}
