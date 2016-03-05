module App.Component {
    export class MatchSummaryComponent {
        public templateUrl = 'components/match-summary.html';
        public bindings = {summoner: '<', match: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', '$q', 'MatchService', 'MatchStaticDataService', 'KeystoneMasteryService', function ($scope, $q, MatchService:App.Service.MatchService, MatchStaticDataService:App.Service.MatchStaticDataService, KeystoneMasteryService:App.Service.KeystoneMasteryService) {
            MatchStaticDataService.setMatchStaticData(this.match);

            this.player = _.filter(this.match.participants, (element:any) => {
                return element.player.summonerId === this.summoner.id;
            })[0];

            this.player.keystone = KeystoneMasteryService.getParticipantKeystone(this.player);

            this.team = _.filter(this.match.teams, (element:any) => {
                return element.teamId === this.player.teamId;
            })[0];
        }];
    }
}