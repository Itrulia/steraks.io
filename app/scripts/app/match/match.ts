/// <reference path='../_reference.d.ts' />
/// <reference path='controllers/MatchController.ts' />
/// <reference path='filters/MatchMode.ts' />
/// <reference path='filters/MinionsPerMinute.ts' />
/// <reference path='filters/Position.ts' />

var MatchApp:angular.IModule = angular.module('matchHistory', ['ui.router', 'chart.js']);
MatchApp.controller('MatchController', Match.Controller.MatchController);
MatchApp.filter('matchMode', Match.Filter.mode);
MatchApp.filter('csPerMinute', Match.Filter.csPerMinute);
MatchApp.filter('position', Match.Filter.position);

MatchApp.config(['$stateProvider', function ($stateProvider:angular.ui.IStateProvider) {
    $stateProvider.state('match', {
        url: '/match/:matchId',
        templateUrl: 'match/index.html',
        controller: 'MatchController',
        controllerAs: 'ctrl',
        data: {
            auth: null
        }
    });
}]);
