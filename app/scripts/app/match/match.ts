/// <reference path='../_reference.d.ts' />
/// <reference path='filters/MatchMode.ts' />
/// <reference path='filters/MinionsPerMinute.ts' />
/// <reference path='filters/Position.ts' />
/// <reference path='components/components.ts' />

let matchApp:angular.IModule = angular.module('match', [
    'match.components',
    'ui.router',
    'chart.js'
]);

matchApp.filter('matchMode', Match.Filter.mode);
matchApp.filter('csPerMinute', Match.Filter.csPerMinute);
matchApp.filter('position', Match.Filter.position);
