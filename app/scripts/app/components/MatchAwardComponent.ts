module App.Component {
    export class MatchAwardComponent {
        public templateUrl = 'components/match-award.html';
        public bindings = {match: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', function ($scope) {
            $scope.$watch('ctrl.match', () => {
                if (this.match !== null) {
                    this.firstBlood = this.match.participants.filter((participant:any) => {
                        return participant.stats.firstBloodKill;
                    })[0];

                    this.mostDamage = this.match.participants.sort((participant1, participant2) => {
                        return participant2.stats.totalDamageDealtToChampions - participant1.stats.totalDamageDealtToChampions;
                    })[0];

                    this.mostWards = this.match.participants.sort((participant1, participant2) => {
                        return participant2.stats.visionWardsBoughtInGame - participant1.stats.visionWardsBoughtInGame;
                    })[0];
                }
            });
        }];
    }
}