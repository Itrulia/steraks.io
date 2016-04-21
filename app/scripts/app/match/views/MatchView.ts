module Match {
    'use strict';

    export class MatchComponent implements angular.IComponentOptions {
        public bindings = {};
        public templateUrl = 'match/index.html';
        public controller = 'MatchController as ctrl';
    }

    // @ngInject
    export class MatchController {
        public match:any;
        public matchId:any;
        public loading:Boolean;
        public selected:any;

        constructor(
            private $stateParams:any,
            private MatchService:App.MatchService,
            private MatchStaticDataService:App.MatchStaticDataService
        ) {
            this.loading = true;
            this.match = null;
            this.matchId = $stateParams.matchId;
            this.selected = null;

            MatchService.getMatch(this.matchId)
                .then((match:any) => {
                    this.MatchStaticDataService.setRuneStaticData(match);
                    this.MatchStaticDataService.setTimelineStaticData(match);

                    if (this.$stateParams.player) {
                        this.selectParticipant(match.participants[this.$stateParams.player.participantId - 1]);
                    } else {
                        this.selectParticipant(match.participants[0]);
                    }

                    this.match = match;
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