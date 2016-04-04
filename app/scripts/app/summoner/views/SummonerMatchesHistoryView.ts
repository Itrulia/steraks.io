/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerMatchesHistoryComponent {
        public bindings = {summoner: '<'};
        public templateUrl = 'summoner/matches.html';
        public controller = 'SummonerMatchesHistoryController as ctrl'
    }

    // @ngInject
    export class SummonerMatchesHistoryController {
        public loading = true;
        public error = false;
        public matches = {};
        public summoner:any;

        constructor(private $scope, private $q:angular.IQService, private MatchService:App.MatchService, private SummonerService:App.SummonerService) {
            SummonerService.getMatches(this.summoner.id)
                .catch((reason:any) => {
                    this.error = true;

                    return this.$q.reject(reason);
                })
                .then((matches:Array<any>) => {
                    return matches.slice(0, 10);
                })
                .then((matches:Array<any>) => {
                    var matchPromises = [];

                    _.forEach(matches, (match, index) => {
                        var promise = this.MatchService.getMatchForSummoner(match.matchId, this.summoner.id)
                            .then((match) => {
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
