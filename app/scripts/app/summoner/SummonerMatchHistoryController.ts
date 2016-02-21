/// <reference path='../_reference.d.ts' />

module Summoner.Controller {
    'use strict';
    // @ngInject

    export class SummonerMatchHistoryController {
        public loading = true;
        public matches = {};

        constructor(private $scope, private $q:angular.IQService, private MatchService:App.Service.MatchService, private SummonerService:App.Service.SummonerService, public summoner:any) {

            SummonerService.getMatches(summoner.id).then((matches:Array<any>) => {
                var matchPromises = [];

                _.forEach(matches.slice(0, 10), (match, index) => {
                    matchPromises.push(this.MatchService.getMatch(match.matchId).then((match) => {
                        this.matches[index] = match;
                    }));
                });

                this.$q.all(matchPromises).then(() => {
                  this.loading = false;
                })
            });
        }
    }
}
