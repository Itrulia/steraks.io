'use strict';

export class ErrorComponent implements angular.IComponentOptions {
    public bindings:any = {text: '<'};
    public templateUrl = 'components/error.html';
    public controller = 'ErrorComponentController as ctrl'
}

export class ErrorComponentController {
    public champion:any;

    // @ngInject
    constructor() {

    }
}