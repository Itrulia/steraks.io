import {SummonerService} from "../service/SummonerService";

'use strict';

export class SearchController {
    public summoner:any;
    public loading:boolean = false;

    // @ngInject
    constructor(
        private $state:angular.ui.IStateService,
        private Analytics:any,
        private SummonerService:SummonerService
    ) {

    }

    public search() {
        this.Analytics.trackEvent('search', 'search', this.summoner);
        this.loading = true;

        this.SummonerService.getSummoner(this.summoner)
            .then((summoner:any) => {
                this.Analytics.trackEvent('search', 'success', this.summoner);
                this.$state.go('summoner.index', {summonerId: summoner.name});
            })
            .catch(() => {
                this.Analytics.trackEvent('search', 'failed', this.summoner);

                let $:any = jQuery;
                $.notification({
                    message: `${this.summoner} has not been found.`,
                    type: 'dark'
                });
            })
            .finally(() => {
                this.loading = false;
            });
    }
}