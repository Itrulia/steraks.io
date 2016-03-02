module App.Resource {
    'use strict';
    // @ngInject

    export class MatchResource {
        constructor(private $http:angular.IHttpService) {
        }

        public getMatch(matchId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/match/' + matchId)
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }
    }
}