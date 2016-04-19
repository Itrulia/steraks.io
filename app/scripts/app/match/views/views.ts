/// <reference path='MatchView.ts' />

let matchApp:angular.IModule = angular.module('match.views', []);

matchApp.controller('MatchController', Match.MatchController);
matchApp.component('match', new Match.MatchComponent());