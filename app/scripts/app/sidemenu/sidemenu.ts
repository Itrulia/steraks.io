'use strict';

import {Component} from "../../decorators/AngularComponent";

export let SideMenu:angular.IModule = angular.module('sidemenu', []);

@Component(SideMenu, 'sidemenu', {
    templateUrl: 'sidemenu/sidemenu.html',
    controllerAs: 'ctrl',
})
class SidemenuController {
    public sideMenuOpen = false;
    public regionMenuOpen = false;

    // @ngInject
    public constructor(private $scope) {
        $scope.$root.$on('$stateChangeStart', () => {
            this.sideMenuOpen = false;
            this.regionMenuOpen = false;
        });
    }
}

