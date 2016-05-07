'use strict';

import * as moment from 'moment';
import {RegionService} from "./RegionService";
import {SummonerResource} from "../resource/SummonerResource";
import {CacheService} from "./CacheService";

export class SummonerService {

    // @ngInject
    constructor(
        private SummonerResource:SummonerResource,
        private RegionService:RegionService,
        private CacheService:CacheService
    ) {

    }

    public getSummoner(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getSummoner(summonerId, region)
                    .then((summoner) => {
                        this.CacheService.remember(cacheKey, summoner);
                        return summoner;
                    });
            });
    }

    public getChampionMastery(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:championmastery`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getChampionMastery(summonerId, region)
                    .then((championMastery) => {
                        this.CacheService.remember(cacheKey, championMastery);
                        return championMastery;
                    });
            });
    }

    public getRank(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:rank`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getRank(summonerId, region)
                    .then((rank) => {
                        this.CacheService.remember(cacheKey, rank);
                        return rank;
                    });
            });
    }

    public getStats(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:stats`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getStats(summonerId, region)
                    .then((stats) => {
                        this.CacheService.remember(cacheKey, stats);
                        return stats;
                    });
            });
    }

    public getMasteries(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:masteries`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getMasteries(summonerId, region)
                    .then((masteries) => {
                        this.CacheService.remember(cacheKey, masteries);
                        return masteries;
                    });
            });
    }

    public getCounters(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:counters`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getCounters(summonerId, region)
                    .then((counters) => {
                        this.CacheService.remember(cacheKey, counters);
                        return counters;
                    });
            });
    }

    public getSynergies(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:synergies`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getSynergies(summonerId, region)
                    .then((synergies) => {
                        this.CacheService.remember(cacheKey, synergies);
                        return synergies;
                    });
            });
    }

    public getFriends(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:friends`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getFriends(summonerId, region)
                    .then((friends) => {
                        this.CacheService.remember(cacheKey, friends);
                        return friends;
                    });
            });
    }

    public getRunes(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:runes`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getRunes(summonerId, region)
                    .then((runes) => {
                        this.CacheService.remember(cacheKey, runes);
                        return runes;
                    });
            });
    }

    public getMatches(summonerId:number, region?:string) {
        let cacheKey = `summoner:${region}:${summonerId}:matches`;
        region = region || this.RegionService.getRegion();

        return this.CacheService.pull(cacheKey)
            .catch(() => {
                return this.SummonerResource.getMatches(summonerId, region)
                    .then((matches) => {
                        this.CacheService.remember(cacheKey, matches, moment.utc().add(1, 'minutes'));
                        return matches;
                    });
            });
    }
}