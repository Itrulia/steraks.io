'use strict';

export function NeedAuthenticationInterceptor($q:angular.IQService, $state:angular.ui.IStateService) {
    return {
        response: (response) => {
            return response;
        },
        responseError: (response) => {
            if (response.status === 401) {
                $state.go('authentication.login');
            }

            return $q.reject(response);
        }
    }
}

NeedAuthenticationInterceptor.$inject = ['$q', '$state'];