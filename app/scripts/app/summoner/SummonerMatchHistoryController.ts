/// <reference path='../_reference.d.ts' />

module Summoner {
    'use strict';
    // @ngInject

    export class SummonerMatchHistoryController {
        public loading = true;
        public matches = {};

        constructor(private $scope, private $q:angular.IQService, private MatchService:App.MatchService, private SummonerService:App.SummonerService, public summoner:any) {
            SummonerService.getMatches(summoner.id)
                .then((matches:Array<any>) => {
                    var matchPromises = [];

                    _.forEach(matches.slice(0, 10), (match, index) => {
                        var promise = this.MatchService.getMatch(match.matchId).then((match) => {
                            this.matches[index] = match;
                        });

                        matchPromises.push(promise);
                    });

                    return this.$q.all(matchPromises);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
