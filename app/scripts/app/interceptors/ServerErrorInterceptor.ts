'use strict';

export function ServerErrorInterceptor($q, $injector) {
    return {
        response: (response) => {
            return response;
        },
        responseError: (response) => {
            let $:any = jQuery;

            if (response.status === 'xxx') {
                let authenticationService = $injector.get('AuthenticationService');
                let $state = $injector.get('$state');

                $.notification({
                    message: 'Your session has expired.',
                    type: 'important'
                });

                authenticationService.logout();
                $state.go('login');
            } else if (response.status >= 500 || response.status < 100) {
                $.notification({
                    message: 'Server Error',
                    type: 'important'
                });
            }

            return $q.reject(response);
        }
    };
}

ServerErrorInterceptor.$inject = ['$q', '$injector'];