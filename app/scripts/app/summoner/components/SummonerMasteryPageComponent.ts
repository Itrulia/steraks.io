module Summoner {
    'use strict';

    export class SummonerMasteryPageComponent implements angular.IComponentOptions {
        public templateUrl = 'components/mastery-page.html';
        public bindings = {page: '<', trees: '<'};
        public controller = 'SummonerMasteryPageController as ctrl'
    }

    // @ngInject
    export class SummonerMasteryPageController {
        public page:any;
        public trees:any;

        public getRank(masterId:any) {
            if (_.isUndefined(this.page.masteries[masterId.masteryId])) {
                return 1;
            }

            return this.page.masteries[masterId.masteryId].rank;
        }
    }
}