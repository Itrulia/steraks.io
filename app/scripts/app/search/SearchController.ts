/// <reference path='../_reference.d.ts' />

module Search {
    'use strict';

    // @ngInject
    export class SearchController {
        public summoner:any;

        constructor(private $state, private Analytics:any) {

        }

        public search() {
            this.Analytics.trackEvent('search', 'search', this.summoner);
            this.$state.go('summoner.matches.history', {summonerId: this.summoner});
        }
    }
}