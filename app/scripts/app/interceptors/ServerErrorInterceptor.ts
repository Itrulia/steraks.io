module App {
    'use strict';
    // @ngInject

    export function ServerErrorInterceptor($q, $injector) {
        return {
            response: (response) => {
                return response;
            },
            responseError: (response) => {
                var $:any = jQuery;

                if (response.status === 'xxx') {
                    var authenticationService = $injector.get('AuthenticationService');
                    var $state = $injector.get('$state');

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
}