module App {
    export class MatchSummaryComponent {
        public templateUrl = 'components/match-summary.html';
        public bindings = {summoner: '<', match: '<'};
        public controllerAs = 'ctrl';
        public player;
        public controller = ['$scope', '$q', 'MatchService', 'MatchStaticDataService', 'KeystoneMasteryService', function ($scope, $q, MatchService:App.MatchService, MatchStaticDataService:App.MatchStaticDataService, KeystoneMasteryService:App.KeystoneMasteryService) {
            this.player = _.filter(this.match.participants, (element:any) => {
                return element.player.summonerId === this.summoner.id;
            })[0];

            this.player.keystone = KeystoneMasteryService.getParticipantKeystone(this.player);
        }];
    }
}