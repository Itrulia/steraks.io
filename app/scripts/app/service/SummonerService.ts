import {SummonerResource} from "../resource/SummonerResource";
import {CacheService} from "./CacheService";

'use strict';

export class SummonerService {

    // @ngInject
    constructor(
        private SummonerResource:SummonerResource,
        private CacheService:CacheService
    ) {

    }

    public getSummoner(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId;

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getSummoner(summonerId)
                    .then((summoner) => {
                        this.CacheService.remember(cacheKey, summoner);
                        return summoner;
                    });
            });
    }

    public getChampionMastery(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':championmastery';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getChampionMastery(summonerId)
                    .then((championMastery) => {
                        this.CacheService.remember(cacheKey, championMastery);
                        return championMastery;
                    });
            });
    }

    public getRank(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':rank';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getRank(summonerId)
                    .then((rank) => {
                        this.CacheService.remember(cacheKey, rank);
                        return rank;
                    });
            });
    }

    public getStats(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':stats';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getStats(summonerId)
                    .then((stats) => {
                        this.CacheService.remember(cacheKey, stats);
                        return stats;
                    });
            });
    }

    public getMasteries(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':masteries';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getMasteries(summonerId)
                    .then((masteries) => {
                        this.CacheService.remember(cacheKey, masteries);
                        return masteries;
                    });
            });
    }

    public getCounters(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':counters';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getCounters(summonerId)
                    .then((counters) => {
                        this.CacheService.remember(cacheKey, counters);
                        return counters;
                    });
            });
    }

    public getSynergies(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':synergies';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getSynergies(summonerId)
                    .then((synergies) => {
                        this.CacheService.remember(cacheKey, synergies);
                        return synergies;
                    });
            });
    }

    public getFriends(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':friends';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getFriends(summonerId)
                    .then((friends) => {
                        this.CacheService.remember(cacheKey, friends);
                        return friends;
                    });
            });
    }

    public getRunes(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':runes';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getRunes(summonerId)
                    .then((runes) => {
                        this.CacheService.remember(cacheKey, runes);
                        return runes;
                    });
            });
    }

    public getMatches(summonerId:number) {
        let cacheKey = 'summoner:' + summonerId + ':matches';

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getMatches(summonerId)
                    .then((matches) => {
                        this.CacheService.remember(cacheKey, matches, moment.utc().add(1, 'minutes'));
                        return matches;
                    });
            });
    }
}