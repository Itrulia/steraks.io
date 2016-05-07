'use strict';

//import * as angular from 'angular';
//import * as uiRouter from 'angular-ui-router';
import {Component} from "../../decorators/AngularComponent";
import {RegionService} from "../service/RegionService";

export let SideMenu:angular.IModule = angular.module('sidemenu', []);

@Component(SideMenu, 'sidemenu', {
    templateUrl: 'sidemenu/sidemenu.html',
    controllerAs: 'ctrl',
})
class SidemenuController {
    public sideMenuOpen = false;
    public regionMenuOpen = false;

    // @ngInject
    constructor(private $scope, public RegionService:RegionService) {
        $scope.$root.$on('$stateChangeStart', () => {
            this.sideMenuOpen = false;
            this.regionMenuOpen = false;
        });
    }
}

