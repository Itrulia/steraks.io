module App.Resource {
    'use strict';
    // @ngInject

    export class MatchResource {
        constructor(private $http:angular.IHttpService) {
        }

        public getMatch(matchId:number) {
            return this.$http.get('http://46.101.208.242/match/' + matchId)
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }
    }
}
