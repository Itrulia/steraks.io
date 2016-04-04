/// <reference path='../_reference.d.ts' />
/// <reference path='components/components.ts' />
/// <reference path='views/views.ts' />
/// <reference path='filters/MatchMode.ts' />
/// <reference path='filters/MinionsPerMinute.ts' />
/// <reference path='filters/Position.ts' />

var MatchApp:angular.IModule = angular.module('match', [
    'match.components',
    'match.views',
    'ui.router',
    'chart.js'
]);

MatchApp.filter('matchMode', Match.Filter.mode);
MatchApp.filter('csPerMinute', Match.Filter.csPerMinute);
MatchApp.filter('position', Match.Filter.position);

MatchApp.config(['$stateProvider', function ($stateProvider:angular.ui.IStateProvider) {
    $stateProvider.state('match', {
        url: '/match/:matchId',
        component: 'match',
        params: {
            player: null
        },
        data: {
            toolbar: true,
            search: true,
            footer: true
        }
    });
}]);
