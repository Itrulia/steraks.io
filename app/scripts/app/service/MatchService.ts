'use strict';

import * as moment from 'moment';
import {MatchResource} from "../resource/MatchResource";
import {CacheService} from "./CacheService";

export class MatchService {

    // @ngInject
    constructor(
        private MatchResource:MatchResource,
        private CacheService:CacheService
    ) {

    }

    public getMatch(matchId) {
        let cacheKey = 'match:' + matchId;

        return this.CacheService.pull(cacheKey)
            .then((match) => {
                this.CacheService.remember(cacheKey, match, moment.utc().add(5, 'minutes'));

                return match;
            })
            .catch(() => {
                return this.MatchResource.getMatch(matchId)
                    .then((match) => {
                        this.CacheService.remember(cacheKey, match, moment.utc().add(5, 'minutes'));

                        return match;
                    });
            });
    }

    public getMatchForSummoner(matchId:number, summonerId:number) {
        let cacheKey = 'match:' + matchId + ':' + summonerId;

        return this.CacheService.pull(cacheKey)
            .then((match) => {
                this.CacheService.remember(cacheKey, match, moment.utc().add(5, 'minutes'));

                return match;
            })
            .catch(() => {
                return this.MatchResource.getMatchForSummoner(matchId, summonerId)
                    .then((match) => {
                        this.CacheService.remember(cacheKey, match, moment.utc().add(60, 'minutes'));

                        return match;
                    });
            });
    }
}
