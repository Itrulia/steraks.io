module App {
    export class MasteryPageComponent {
        public templateUrl = 'components/mastery-page.html';
        public bindings = {masteries: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', '$q', 'StaticService', function ($scope, $q:angular.IQService, StaticService:App.StaticService) {
            var realm:any = StaticService.getRealm();
            var masteries:any = StaticService.getMasteries();

            $q.all([realm, masteries]).then((response:any) => {
                realm = response[0];
                masteries = response[1];

                _.forEach(masteries.tree, (tree:any) => {
                    _.forEach(tree, (row:any) => {
                        _.forEach(row.masteryTreeItems, (mastery:any) => {
                            if (mastery === null) return;

                            var masteryData = masteries.data[mastery.masteryId];
                            mastery.name = masteryData.name;
                            mastery.description = masteryData.description;
                            mastery.masteryAvatar = realm.cdn + '/' + realm.dd + '/img/mastery/' + masteryData.image.full;
                        });
                    });
                });

                console.log(masteries.tree);
            });
        }];
    }
}