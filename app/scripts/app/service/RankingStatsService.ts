module App {
    'use strict';
    // @ngInject

    export class RankingStatsService {
        constructor(private $q:angular.IQService, private CacheService:App.CacheService, private RankingStatsResource:App.RankingStatsResource) {

        }

        public getRankedStats(summonerId:number) {
            var cacheKey = 'stats:' + summonerId;
            var data:any = this.CacheService.pull(cacheKey);

            if (data === null) {
                data = this.RankingStatsResource.getRankedStats(summonerId).then((stats) => {
                    this.CacheService.remember(cacheKey, stats);
                    return stats;
                })
            }

            return this.$q.when(data)
        }
    }
}