/// <reference path='../_reference.d.ts' />

module Summoner {
    'use strict';
    // @ngInject

    export class SummonerChampionController {
        public loading = true;
        public matches = {};

        constructor(private $scope, private $q:angular.IQService, private MatchService:App.MatchService, private SummonerService:App.SummonerService, public summoner:any, public champion:any) {
            SummonerService.getMatches(summoner.id)
                .then((matches:Array<any>) => {
                    matches = _.filter(matches, {champion: champion.id});

                    var matchPromises = [];
                    _.forEach(matches, (match, index) => {
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
