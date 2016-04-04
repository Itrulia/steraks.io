/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerMatchesAsComponent {
        public bindings = {summoner: '<', champion: '<'};
        public templateUrl = 'summoner/matches.as.html';
        public controller = 'SummonerMatchesAsController as ctrl';
    }

    // @ngInject
    export class SummonerMatchesAsController {
        public loading = true;
        public matches = {};
        public summoner:any;
        public champion:any;

        constructor(private $scope, private $q:angular.IQService, private $stateParams:any, private MatchService:App.MatchService, private SummonerService:App.SummonerService) {
            var promise:any;

            if (this.$stateParams.matchIds !== null) {
                promise = this.$q.when(this.$stateParams.matchIds);
            } else {
                promise = SummonerService.getMatches(this.summoner.id)
                    .then((matches:Array<any>) => {
                        matches = _.filter(matches, {champion: this.champion.id});

                        return _.map(matches, (match:any) => {
                            return match.matchId;
                        });
                    });
            }

            promise
                .then((matchIds:Array<any>) => {
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
