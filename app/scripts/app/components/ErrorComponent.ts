module App {
    'use strict';

    export class ErrorComponent {
        public bindings = {text: '<'};
        public templateUrl = 'components/error.html';
        public controller = 'ErrorComponentController as ctrl'
    }

    // @ngInject
    export class ErrorComponentController {
        public champion:any;

        public constructor(public $scope:any) {

        }
    }
}