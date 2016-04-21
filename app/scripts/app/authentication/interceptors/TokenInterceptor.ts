module Authentication {
    'use strict';
    // @ngInject

    export function TokenInterceptor($q, $injector) {
        let authenticationService:Authentication.AuthenticationService = null;

        return {
            response: (response) => {
                let token = response.headers('X-Auth-Token');

                if (typeof token !== 'undefined' && token !== null) {
                    if (authenticationService === null) {
                        authenticationService = $injector.get('AuthenticationService');
                    }

                    authenticationService.setToken(response.headers('X-Auth-Token'));
                }

                return response;
            },
            request: (request) => {
                if (authenticationService === null) {
                    authenticationService = $injector.get('AuthenticationService');
                }

                if (authenticationService.getToken() !== null) {
                    request.headers['X-Auth-Token'] = authenticationService.getToken();
                }

                return request;
            }
        }
    }

    TokenInterceptor.$inject = ['$q', '$injector'];
}