'use strict';

import {SummonerService} from "../service/SummonerService";
import {CacheService} from "../service/CacheService";
import * as moment from "moment";
import {notify} from "../../libs/notification";
//import * as uiRouter from 'angular-ui-router';

export class SearchController {
    public summoner:any;
    public loading:boolean = false;
    private cacheKey = 'search';

    // @ngInject
    constructor(
        private $state:angular.ui.IStateService,
        private Analytics:any,
        private CacheService:CacheService,
        private SummonerService:SummonerService
    ) {
        this.CacheService.pull(this.cacheKey).then((summoner) => {
            this.summoner = summoner;
        });
    }

    public search() {
        this.CacheService.remember(this.cacheKey, this.summoner, moment.utc().add(1, 'month'));
        this.Analytics.trackEvent('search', 'search', this.summoner);
        this.loading = true;

        this.SummonerService.getSummoner(this.summoner)
            .then((summoner:any) => {

                this.Analytics.trackEvent('search', 'success', this.summoner);
                this.$state.go('summoner.index', {summonerId: summoner.name});
            })
            .catch(() => {
                this.Analytics.trackEvent('search', 'failed', this.summoner);

                notify({
                    message: `${this.summoner} has not been found.`,
                    type: 'dark'
                });
            })
            .finally(() => {
                this.loading = false;
            });
    }
}