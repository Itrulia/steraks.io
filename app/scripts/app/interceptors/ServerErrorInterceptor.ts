module App.Interceptor {
    'use strict';
    // @ngInject

    export class ServerErrorInterceptor {
        constructor(private $q, private $injector) {

        }

        public response(response) {
            return response;
        }

        public responseError(response) {
            var $:any = jQuery;

            if (response.status === 400) {
                var authenticationService = this.$injector.get('authenticationService');
                var $state = this.$injector.get('$state');

                $.notification({
                    message: 'Your session has expired.',
                    type: 'important'
                });

                authenticationService.logout();
                $state.go('login');
            } else if (response.status === 500 || response.status === 0) {
                $.notification({
                    message: 'Server Error',
                    type: 'important'
                });
            }

            return this.$q.reject(response);
        }

        public static instance()
        {
            var factory = ($q, $injector) => {
                return new ServerErrorInterceptor($q, $injector);
            };

            factory.$inject = ['$q', '$injector'];

            return factory;
        }
    }
}