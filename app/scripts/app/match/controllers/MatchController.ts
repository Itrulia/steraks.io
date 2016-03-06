/// <reference path='../../_reference.d.ts' />

module Match {
    'use strict';
    // @ngInject

    export class MatchController {
        public match:any;
        public matchId:any;
        public loading:Boolean;
        public selected:any;
        public firstBlood;
        public mostDamage;
        public mostWards;

        constructor(private $scope:angular.IScope, private $q:angular.IQService, private $stateParams:any, private MatchService:App.MatchService, private MatchStaticDataService:App.MatchStaticDataService) {
            this.loading = true;
            this.match = null;
            this.matchId = $stateParams.matchId;
            this.selected = null;

            var promise = null;
            if ($stateParams.match) {
                promise = this.$q.when(this.$stateParams.match);
            } else {
                promise = MatchService.getMatch(this.matchId)
                    .then((match:any) => {
                        this.MatchStaticDataService.setMatchStaticData(match);

                        return match;
                    });
            }

            promise.then((match:any) => {
                this.match = match;

                if (this.$stateParams.player) {
                    this.selectParticipant(this.$stateParams.player);
                } else {
                    this.selectParticipant(this.match.participants[0]);
                }
            }).finally(() => {
                this.loading = false;
            });
        }

        public selectParticipant(participant:any) {
            this.selected = participant;
        }

        public getWinningTeamId() {
            if (this.match === null) return;

            return this.match.teams.filter((team:any) => {
                return team.winner;
            })[0].teamId;
        }
    }
}