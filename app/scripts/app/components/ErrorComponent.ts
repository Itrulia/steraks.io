module App.Component {
    export class ErrorComponent {
        public bindings = {text: '<'};
        public controllerAs = 'ctrl';
        public templateUrl = 'components/error.html';
        public controller = ['$scope', function ($scope) {

        }];
    }
}