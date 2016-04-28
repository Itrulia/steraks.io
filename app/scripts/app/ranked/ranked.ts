/// <reference path='../_reference.d.ts' />
/// <reference path='views/views.ts' />
/// <reference path='components/components.ts' />

let rankedApp:angular.IModule = angular.module('ranked', [
    'ranked.views',
    'ranked.components',
    'ui.router'
]);

rankedApp.config(['$stateProvider', function ($stateProvider:any) {
    $stateProvider.state('ranked', {
        url: '/match/:matchId',
        component: 'ranked',
        data: {
            toolbar: true,
            search: true,
            footer: true,
        },
        params: {
            player: null
        }
    });
}]);
