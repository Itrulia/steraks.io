import {AuthenticationResource} from './service/AuthenticationResource';
import {AuthenticationService} from './service/AuthenticationService';
import {NeedAuthenticationInterceptor} from "./interceptors/NeedAuthenticationInterceptor";
import {TokenInterceptor} from "./interceptors/TokenInterceptor";
import {AuthenticationViews} from "./views/AuthenticationViews";
import "./views/views";

'use strict';

export let Authentication:angular.IModule = angular.module('authentication', [
    'ui.router',
    AuthenticationViews.name
]);

Authentication.service('AuthenticationService', AuthenticationService);
Authentication.service('AuthenticationResource', AuthenticationResource);
Authentication.factory('NeedAuthenticationInterceptor', NeedAuthenticationInterceptor);
Authentication.factory('TokenInterceptor', TokenInterceptor);

Authentication.config(['$httpProvider', function ($httpProvider:angular.IHttpProvider) {
    $httpProvider.interceptors.push('NeedAuthenticationInterceptor');
    $httpProvider.interceptors.push('TokenInterceptor');
}]);

Authentication.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider:any, $stateProvider:any) {
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

    // Rewrite
    $urlRouterProvider.when('/signup', '/register');
    $urlRouterProvider.when('/signin', '/login');
}]);