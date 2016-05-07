'use strict';

import * as _ from 'lodash';
import {SummonerComponents} from "./SummonerComponents";
import {SummonerService} from "../../service/SummonerService";
import {Component} from "../../../decorators/AngularComponent";

@Component(SummonerComponents, 'summonerChampionStats', {
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
    constructor(protected SummonerService:SummonerService) {
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