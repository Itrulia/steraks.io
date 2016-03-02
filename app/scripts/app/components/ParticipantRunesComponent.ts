module App.Component {
    export class ParticipantRunesComponent {
        public templateUrl = 'components/participant-runes.html';
        public bindings = {participant: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', '$q', 'StaticService', function ($scope, $q:angular.IQService, StaticService:App.Service.StaticService) {
            var realm:any = StaticService.getRealm();
            var runes:any = StaticService.getRunes();

            $scope.$watch('ctrl.participant', () => {
                if (this.participant === null) return;

                this.runes = this.participant.runes;

                $q.all([realm, runes]).then((response:any) => {
                    realm = response[0];
                    runes = response[1];

                    _.forEach(this.runes, (runeGroup:any) => {
                        var rune = runes[runeGroup.runeId];
                        runeGroup.runeName = rune.name;
                        runeGroup.runeDescription = rune.description;
                        runeGroup.runeAvatar = realm.cdn + '/' + realm.dd + '/img/rune/' + rune.image.full;
                    });
                });
            });
        }];
    }
}