module App.Resource {
    'use strict';
    // @ngInject

    export class SummonerResource {
        constructor(private $http:angular.IHttpService) {
        }

        public getSummoner(summonerId:number) {
            return this.$http.get('http://vanilla.app/summoner/' + summonerId).then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                return response.data;
            });
        }

        public getRank(summonerId:number) {
            return this.$http.get('http://vanilla.app/summoner/' + summonerId + '/rank')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getMasteries(summonerId:number) {
            return this.$http.get('http://vanilla.app/summoner/' + summonerId + '/masteries')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getRunes(summonerId:number) {
            return this.$http.get('http://vanilla.app/summoner/' + summonerId + '/runes')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getStats(summonerId:number) {
            return this.$http.get('http://vanilla.app/summoner/' + summonerId + '/stats')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getMatches(summonerId:number) {
            return this.$http.get('http://vanilla.app/summoner/' + summonerId + '/matches')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }
    }
}
