module App {
    export class SummonerCounterComponent {
        public templateUrl = 'components/summoner-counter.html';
        public bindings = {counter: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', function($scope) {

        }];
    }
}