/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerMatchesWithComponent {
        public bindings = {summoner: '<', champion: '<'};
        public templateUrl = 'summoner/matches.with.html';
        public controller = 'SummonerMatchesWithController as ctrl';
    }

    // @ngInject
    export class SummonerMatchesWithController {
        public loading = true;
        public matches = {};
        public summoner:any;
        public champion:any;

        constructor(private $scope, private $q:angular.IQService, private $stateParams:any, private MatchService:App.MatchService, private SummonerService:App.SummonerService) {
            var promise:any;

            if (this.$stateParams.matchIds !== null) {
                promise = this.$q.when(this.$stateParams.matchIds);
            } else {
                promise = SummonerService.getSynergies(this.summoner.id)
                    .then((synergies:Array<any>) => {
                        var synergie = _.filter(synergies, {championId: this.champion.id})[0];
                        return synergie.matchIds;
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
