/// <reference path='../_reference.d.ts' />
/// <reference path='SearchController.ts' />

var searchApp:angular.IModule = angular.module('search', ['ui.router']);
searchApp.controller('SearchController', Search.SearchController);