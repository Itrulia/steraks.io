/// <reference path='../_reference.d.ts' />

module SideMenu.Controller {
    'use strict';
    // @ngInject

    export class SideMenuController {

        public isOpen:boolean = false;

        constructor(private $scope:angular.IScope) {

        }
    }
}