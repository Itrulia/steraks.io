module App.Component {
    export class MatchSummaryComponent {
        public templateUrl = 'components/match-summary.html';
        public bindings = {summoner: '<', match: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', '$q', 'MatchService', function($scope, $q, MatchService: App.Service.MatchService) {

            this.player = this.match.participants.filter((element:any) => {
                return element.player.summonerId === this.summoner.id;
            })[0];

            this.team = this.match.teams.filter((element:any) => {
                return element.teamId === this.player.teamId;
            })[0];

            MatchService.setMatchStaticData(this.match);
        }];
    }
}