/// <reference path='../_reference.d.ts' />

module Summoner {
    'use strict';
    // @ngInject

    export class SummonerMatchesAgainstController {
        public loading = true;
        public matches = {};

        constructor(private $scope, private $q:angular.IQService, private $stateParams:any, private MatchService:App.MatchService, private SummonerService:App.SummonerService, public summoner:any, public champion:any) {
            var promise:any;

            if (this.$stateParams.matchIds !== null) {
                promise = this.$q.when(this.$stateParams.matchIds);
            } else {
                if (this.$stateParams.matchIds !== null) {
                    promise = this.$q.when(this.$stateParams.matchIds);
                } else {
                    promise = SummonerService.getCounters(summoner.id)
                        .then((counters:Array<any>) => {
                            var counter = _.filter(counters, {championId: champion.id})[0];
                            return counter.matchIds;
                        });
                }
            }

            promise.then((matchIds:Array<any>) => {
                var matchPromises = [];

                _.forEach(matchIds, (matchId, index) => {
                    var promise = this.MatchService.getMatchForSummoner(matchId, this.summoner.id).then((match) => {
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
