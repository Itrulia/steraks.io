module App {
    export class SummonerRankComponent {
        public templateUrl = 'components/summoner-rank.html';
        public bindings = {summoner: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', 'SummonerService', function($scope, SummonerService: App.SummonerService) {
            this.tier = null;
            this.name = null;
            this.rank = [];

            SummonerService.getRank(this.summoner.id).then((rank) => {
                this.tier = rank.tier.toLowerCase();
                this.name = rank.name;
                this.rank = _.find(rank.entries, (entry:any) => {
                    return entry.playerOrTeamId == this.summoner.id;
                });
            });
        }];
    }
}