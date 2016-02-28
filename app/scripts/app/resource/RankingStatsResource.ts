module App.Resource {
    'use strict';
    // @ngInject

    export class RankingStatsResource {
        constructor(private $http:angular.IHttpService) {
        }

        public getRankedStats(summonerId:Number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId + '/rank')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }
    }
}
