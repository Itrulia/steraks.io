module App.Component {

    export class SummonerChampionStatsComponent {
        public templateUrl = 'components/summoner-champion-stat.html';
        public bindings = {summoner: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', 'SummonerService', function ($scope, SummonerService:App.Service.SummonerService) {
            this.loading = true;
            this.error = false;

            this.champions = [];

            SummonerService.getStats(this.summoner.id)
                .then((stats:any) => {
                    stats = _.filter(stats, (champion:any) => {
                        return champion.id !== 0;
                    });

                    this.champions = _.sortBy(stats, function (champion:any) {
                        return -champion.stats.totalSessionsPlayed;
                    }).slice(0, 5);

                    SummonerService.setStatsStaticData(this.champions);
                })
                .catch(() => {
                    this.error = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        }];
    }
}