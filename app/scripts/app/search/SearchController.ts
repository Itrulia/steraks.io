/// <reference path='../_reference.d.ts' />

module Search {
    'use strict';

    // @ngInject
    export class SearchController {
        public summoner:any;
        public loading:boolean = false;

        constructor(private $state, private Analytics:any, private SummonerService:App.SummonerService) {

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
}