'use strict';

import { AuthenticationService } from '../service/AuthenticationService';

export function TokenInterceptor($q:angular.IQService, $injector:any) {
    let authenticationService:AuthenticationService;

    var getAuthenticationService = () => {
        if (_.isUndefined(authenticationService)) {
            authenticationService = $injector.get('AuthenticationService');
        }

        return authenticationService;
    };

    return {
        response: (response) => {
            let token = response.headers('X-Auth-Token');

            if (typeof token !== 'undefined' && token !== null) {
                getAuthenticationService().setToken(response.headers('X-Auth-Token'));
            }

            return response;
        },
        request: (request) => {
            if (getAuthenticationService().getToken() !== null) {
                request.headers['X-Auth-Token'] = getAuthenticationService().getToken();
            }

            return request;
        }
    }
}

TokenInterceptor.$inject = ['$q', '$injector'];