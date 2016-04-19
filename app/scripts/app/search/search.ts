/// <reference path='../_reference.d.ts' />
/// <reference path='SearchController.ts' />

let searchApp:angular.IModule = angular.module('search', ['ui.router']);
searchApp.controller('SearchController', Search.SearchController);