/// <reference path='../../_reference.d.ts' />

module Match.Controller {
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

        constructor(private $scope:angular.IScope, private $stateParams:any, private MatchService:App.Service.MatchService, private MatchStaticDataService:App.Service.MatchStaticDataService) {
            this.loading = true;
            this.match = null;
            this.matchId = $stateParams.matchId;
            this.selected = null;

            var that = this;
            MatchService.getMatch(this.matchId).then((match:any) => {
                that.match = match;
                that.loading = false;
                that.selectParticipant(that.match.participants[0]);

                this.MatchStaticDataService.setMatchStaticData(this.match);
                this.MatchStaticDataService.setTimelineStaticData(this.match);
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