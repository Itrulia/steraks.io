'use strict';
import {notify} from "../../libs/notification";

export function ServerErrorInterceptor($q, $injector) {
    return {
        response: (response) => {
            return response;
        },
        responseError: (response) => {
            if (response.status === 'xxx') {
                let authenticationService = $injector.get('AuthenticationService');
                let $state = $injector.get('$state');

                notify({
                    message: 'Your session has expired.',
                    type: 'important'
                });

                authenticationService.logout();
                $state.go('login');
            } else if (response.status >= 500 || response.status < 100) {
                notify({
                    message: 'Server Error',
                    type: 'important'
                });
            }

            return $q.reject(response);
        }
    };
}

ServerErrorInterceptor.$inject = ['$q', '$injector'];