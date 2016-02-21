module App.Interceptor {
    'use strict';
    // @ngInject

    export class TokenInterceptor {
        private authenticationService:App.Service.AuthenticationService = null;

        constructor(private $q, private $injector) {

        }

        public response(response) {
            var token = response.headers('X-Auth-Token');

            if (typeof token !== 'undefined' && token !== null) {
                if (this.authenticationService === null) {
                    this.authenticationService = this.$injector.get('AuthenticationService');
                }

                this.authenticationService.setToken(response.headers('X-Auth-Token'));
            }

            return response;
        }

        public request(request) {
            if (this.authenticationService === null) {
                this.authenticationService = this.$injector.get('AuthenticationService');
            }

            if (this.authenticationService.getToken() !== null) {
                request.headers['X-Auth-Token'] = this.authenticationService.getToken();
            }

            return request;
        }

        public static instance()
        {
            var factory = ($q, $injector) => {
                return new TokenInterceptor($q, $injector);
            };

            factory.$inject = ['$q', '$injector'];

            return factory;
        }
    }
}