module App {
    'use strict';
    // @ngInject

    export function NeedAuthenticationInterceptor($q, $location) {
        return {
            response: (response) => {
                return response;
            },
            responseError: (response) => {
                if(response.status === 401) {
                    $location.path('/login');
                }

                return $q.reject(response);
            }
        }
    }

    NeedAuthenticationInterceptor.$inject = ['$q', '$location'];
}