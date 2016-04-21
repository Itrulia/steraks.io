/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerMatchesHistoryComponent implements angular.IComponentOptions {
        public bindings = {summoner: '<'};
        public templateUrl = 'summoner/matches.history.html';
        public controller = 'SummonerMatchesHistoryController as ctrl'
    }

    // @ngInject
    export class SummonerMatchesHistoryController {
        public loading = true;
        public error = false;
        public matches = {};
        public summoner:any;
        public champion:any;
        public championArray:any;

        constructor(
            private $q:angular.IQService,
            private $state:any,
            private MatchService:App.MatchService,
            private SummonerService:App.SummonerService,
            private StaticService:App.StaticService
        ) {
            this.$state.current.data.title = this.summoner.name + '\'s Match History';
            this.getMatches();
            this.getChampions();
        }

        private getChampions() {
            this.StaticService.getChampions().then((champions:any) => {
                this.champion = {name: 'All'};
                this.championArray = [this.champion].concat(_.sortBy(champions, 'name'));
            });
        }

        public selectChampion(champion:any) {
            this.$state.go('summoner.matches.as', {championId: champion.name, matchIds: null});
        }

        public getMatches() {
            this.SummonerService.getMatches(this.summoner.id)
                .catch((reason:any) => {
                    this.error = true;

                    return this.$q.reject(reason);
                })
                .then((matches:Array<any>) => {
                    return matches.slice(0, 10);
                })
                .then((matches:Array<any>) => {
                    let matchPromises = [];

                    _.forEach(matches, (match, index) => {
                        let promise = this.MatchService.getMatchForSummoner(match.matchId, this.summoner.id)
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
