'use strict';

export class RankingStatsResource {

    // @ngInject
    constructor(private $http:angular.IHttpService) {

    }

    public getRankedStats(summonerId:Number) {
        return this.$http.get('http://vanilla.app/summoner/' + summonerId + '/rank')
            .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                return response.data;
            });
    }
}
