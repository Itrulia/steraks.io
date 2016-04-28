'use strict';

@Component('ranked.views', 'ranked', {
    templateUrl: 'ranked/index.html',
    controllerAs: 'ctrl',
})
class RankedController {
    public match:any;
    public matchId:any;
    public loading:Boolean;
    public selected:any;

    // @ngInject
    constructor(
        private $stateParams:any,
        private MatchService:App.MatchService,
        private MatchStaticDataService:App.MatchStaticDataService
    ) {
        this.loading = true;
        this.match = null;
        this.matchId = $stateParams.matchId;
        this.selected = null;

        this.MatchService.getMatch(this.matchId)
            .then((match:any) => {
                this.MatchStaticDataService.setRuneStaticData(match);
                this.MatchStaticDataService.setTimelineStaticData(match);

                _.forEach(match.participants, (participant:any) => {
                    var masteries = {};

                    _.forEach(participant.masteries, (mastery:any) => {
                        masteries[mastery.masteryId] = mastery;
                    });

                    participant.masteries = masteries;
                });


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