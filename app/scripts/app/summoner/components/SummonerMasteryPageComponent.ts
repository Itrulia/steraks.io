module Summoner {
    'use strict';

    export class SummonerMasteryPageComponent {
        public templateUrl = 'summoner/components/mastery-page.html';
        public bindings = {masteries: '<'};
        public controller = 'SummonerMasteryPageController as ctrl'
    }

    // @ngInject
    export class SummonerMasteryPageController {
        public masteries:any;

        public constructor(public $scope, public $q:angular.IQService, public StaticService:App.StaticService) {
            let realm:any = this.StaticService.getRealm();
            let masteries:any = this.StaticService.getMasteries();

            this.$q.all([realm, masteries]).then((response:any) => {
                realm = response[0];
                masteries = response[1];

                _.forEach(masteries.tree, (tree:any) => {
                    _.forEach(tree, (row:any) => {
                        _.forEach(row.masteryTreeItems, (mastery:any) => {
                            if (mastery === null) return;

                            let masteryData = masteries.data[mastery.masteryId];
                            mastery.name = masteryData.name;
                            mastery.description = masteryData.description;
                            mastery.masteryAvatar = realm.cdn + '/' + realm.dd + '/img/mastery/' + masteryData.image.full;
                        });
                    });
                });

                console.log(masteries.tree);
            });
        }
    }
}