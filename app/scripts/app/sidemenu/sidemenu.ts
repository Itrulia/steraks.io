/// <reference path='../_reference.d.ts' />
/// <reference path='SideMenuController.ts' />
/// <reference path='SidemenuDirective.ts' />
/// <reference path='GroupDirective.ts' />

var sidemenuApp:angular.IModule = angular.module('sidemenu', []);
sidemenuApp.controller('SideMenuController', SideMenu.Controller.SideMenuController);
sidemenuApp.directive('sidemenu', SideMenu.Directive.SideMenuDirective.instance);

