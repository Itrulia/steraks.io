/// <reference path='../_reference.d.ts' />
/// <reference path='SidemenuComponent.ts' />

var sidemenuApp:angular.IModule = angular.module('sidemenu', []);
sidemenuApp.component('sidemenu', new SideMenu.Components.SideMenuDirective());

