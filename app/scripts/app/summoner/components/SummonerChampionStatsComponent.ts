'use strict';

@Component('summoner.components', 'summonerChampionStats', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/components/summoner-champion-stat.html',
    controllerAs: 'ctrl',
})
class SummonerChampionStatsController {
    public loading = true;
    public error = false;
    public champions = [];
    public summoner:any;

    // @ngInject
    public constructor(protected SummonerService:App.SummonerService) {
        SummonerService.getStats(this.summoner.id)
            .then((stats:any) => {
                stats = _.filter(stats, (champion:any) => {
                    return champion.id !== 0;
                });

                this.champions = _.sortBy(stats, function (champion:any) {
                    return -champion.stats.totalSessionsPlayed;
                }).slice(0, 5);
            })
            .catch((response:any) => {
                if (response.status === 404) {
                    return response;
                }

                this.error = true;
            })
            .finally(() => {
                this.loading = false;
            });
    }
}