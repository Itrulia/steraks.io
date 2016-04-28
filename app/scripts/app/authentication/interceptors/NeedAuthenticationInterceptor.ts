module Authentication {
    'use strict';

    export function NeedAuthenticationInterceptor($q:angular.IQService, $location:angular.ILocationService) {
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