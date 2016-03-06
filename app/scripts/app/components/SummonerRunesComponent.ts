module App {
    export class SummonerRunesComponent {
        public templateUrl = 'components/summoner-runes.html';
        public bindings = {page: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', '$q', 'StaticService', function ($scope, $q:angular.IQService, StaticService:App.StaticService) {
            var realm:any = StaticService.getRealm();
            var runes:any = StaticService.getRunes();

            $q.all([realm, runes]).then((response:any) => {
                realm = response[0];
                runes = response[1];

                _.forEach(this.page.slots, (runeGroup:any) => {
                    var rune = runes[runeGroup.runeId];
                    runeGroup.runeName = rune.name;
                    runeGroup.runeDescription = rune.description;
                    runeGroup.runeAvatar = realm.cdn + '/' + realm.dd + '/img/rune/' + rune.image.full;
                });
            });
        }];
    }
}