/// <reference path='../_reference.d.ts' />
/// <reference path='service/AuthenticationService.ts' />
/// <reference path='interceptors/NeedAuthenticationInterceptor.ts' />
/// <reference path='interceptors/TokenInterceptor.ts' />

var authApp:angular.IModule = angular.module('authentication', ['ui.router']);

authApp.service('AuthenticationService', Summoner.AuthenticationService);
authApp.factory('NeedAuthenticationInterceptor', Authentication.NeedAuthenticationInterceptor);
authApp.factory('TokenInterceptor', Authentication.TokenInterceptor);

authApp.config(['$httpProvider', function ($httpProvider:any) {
    $httpProvider.interceptors.push('NeedAuthenticationInterceptor');
    $httpProvider.interceptors.push('TokenInterceptor');
}]);

authApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider:any, $stateProvider:any) {
    $stateProvider.state('authentication', {
        abstract: true,
        template: '<div ui-view=""></div>',
        data: {
            toolbar: false,
            search: false,
            footer: false,
            bodyClass: 'body--login'
        }
    })
    .state('authentication.login', {
        url: '/login',
        templateUrl: 'authentication/login.html'
    })
    .state('authentication.register', {
        url: '/register',
        templateUrl: 'authentication/register.html'
    });

    //
    $urlRouterProvider.when('/signup', '/register');
    $urlRouterProvider.when('/signin', '/login');
}]);
