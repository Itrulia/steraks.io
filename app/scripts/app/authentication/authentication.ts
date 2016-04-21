/// <reference path='../_reference.d.ts' />
/// <reference path='service/AuthenticationService.ts' />
/// <reference path='service/AuthenticationResource.ts' />
/// <reference path='interceptors/NeedAuthenticationInterceptor.ts' />
/// <reference path='interceptors/TokenInterceptor.ts' />

let authApp:angular.IModule = angular.module('authentication', ['ui.router']);

authApp.service('AuthenticationService', Authentication.AuthenticationService);
authApp.service('AuthenticationResource', Authentication.AuthenticationResource);
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
        component: 'login',
        data: {
            title: 'Log in to Steraks'
        }
    })
    .state('authentication.restore', {
        url: '/restore',
        component: 'passwordRestore',
        data: {
            title: 'Restore Password'
        }
    })
    .state('authentication.restoreVerification', {
        url: '/restore/verify',
        component: 'passwordRestore',
        data: {
            title: 'Password Restore Verification'
        }
    })
    .state('authentication.register', {
        url: '/register',
        component: 'register',
        data: {
            title: 'Register on Steraks'
        }
    });

    //
    $urlRouterProvider.when('/signup', '/register');
    $urlRouterProvider.when('/signin', '/login');
}]);
