module App.Service {
    'use strict';
    // @ngInject

    export class RankingStatsService {
        constructor(private $q:angular.IQService, private CacheService:App.Service.CacheService, private RankingStatsResource:App.Resource.RankingStatsResource) {

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