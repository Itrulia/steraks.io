module App.Interceptor {
    'use strict';
    // @ngInject

    export class NeedAuthenticationInterceptor {
        constructor(private $q, private $location) {

        }

        public response(response) {
            return response;
        }

        public responseError(response) {
            if(response.status === 401) {
                this.$location.path('/login');
            }

            return this.$q.reject(response);
        }

        public static instance()
        {
            var factory = ($q, $location) => {
                return new NeedAuthenticationInterceptor($q, $location);
            };

            factory.$inject = ['$q', '$location'];

            return factory;
        }
    }
}