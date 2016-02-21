module App.Component {

    export class SummonerChampionStatsComponent {
        public templateUrl = 'components/summoner-champion-stat.html';
        public bindings = {summoner: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', 'SummonerService', function($scope, SummonerService: App.Service.SummonerService) {
            this.champions = [];

            SummonerService.getStats(this.summoner.id).then((stats) => {
                var stats = _.filter(stats, (champion:any) => {
                    return champion.id !== 0;
                });

                this.champions = _.sortBy(stats, function(champion:any){
                    return -champion.stats.totalSessionsPlayed;
                }).slice(0, 5);

                SummonerService.setStatsStaticData(this.champions);
            });
        }];
    }
}