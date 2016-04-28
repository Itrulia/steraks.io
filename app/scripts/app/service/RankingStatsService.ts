import {CacheService} from "./CacheService";
import {RankingStatsResource} from "../resource/RankingStatsResource";

'use strict';

export class RankingStatsService {

    // @ngInject
    constructor(
        private $q:angular.IQService,
        private CacheService:CacheService,
        private RankingStatsResource:RankingStatsResource
    ) {

    }

    public getRankedStats(summonerId:number) {
        let cacheKey = 'stats:' + summonerId;
        let data:any = this.CacheService.pull(cacheKey);

        if (data === null) {
            data = this.RankingStatsResource.getRankedStats(summonerId).then((stats) => {
                this.CacheService.remember(cacheKey, stats);
                return stats;
            })
        }

        return this.$q.when(data)
    }
}