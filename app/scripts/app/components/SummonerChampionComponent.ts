module App {
    export class SummonerChampionComponent {
        public templateUrl = 'components/summoner-champion.html';
        public bindings = {champion: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', function($scope) {

        }];
    }
}