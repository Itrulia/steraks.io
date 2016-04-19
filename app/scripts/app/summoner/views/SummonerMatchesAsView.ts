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
        public championArray:any;

        constructor(
            private $q:angular.IQService,
            private $state:any,
            private $stateParams:any,
            private MatchService:App.MatchService,
            private SummonerService:App.SummonerService,
            private StaticService:App.StaticService
        ) {
            this.getMatches();
            this.getChampions();
        }

        private getChampions() {
            this.StaticService.getChampions().then((champions:any) => {
                let all = {id: 0, name: 'All'};
                this.championArray = [all].concat(_.sortBy(champions, 'name'));
            });
        }

        public selectChampion(champion:any) {
            if (champion.id == 0) {
                this.$state.go('summoner.matches.history');
            } else {
                this.$state.go('summoner.matches.as', {championId: champion.name, matchIds: null});
            }
        }

        private getMatches() {
            let promise:any;

            if (this.$stateParams.matchIds !== null) {
                promise = this.$q.when(this.$stateParams.matchIds);
            } else {
                promise = this.SummonerService.getMatches(this.summoner.id)
                    .then((matches:Array<any>) => {
                        matches = _.filter(matches, {champion: this.champion.id});

                        return _.map(matches, (match:any) => {
                            return match.matchId;
                        });
                    });
            }

            promise
                .then((matchIds:Array<any>) => {
                    let matchPromises = [];

                    _.forEach(matchIds, (matchId, index) => {
                        let promise = this.MatchService.getMatchForSummoner(matchId, this.summoner.id).then((match) => {
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
