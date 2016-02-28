module App.Resource {
    'use strict';
    // @ngInject

    export class SummonerResource {
        constructor(private $http:angular.IHttpService) {
        }

        public getSummoner(summonerId:number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId).then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                return response.data;
            });
        }

        public getRank(summonerId:number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId + '/rank')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getMasteries(summonerId:number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId + '/masteries')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getRunes(summonerId:number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId + '/runes')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getStats(summonerId:number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId + '/stats')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getMatches(summonerId:number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId + '/matches')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getCounters(summonerId:number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId + '/counters')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getSynergies(summonerId:number) {
            return this.$http.get('http://46.101.208.242/summoner/' + summonerId + '/synergy')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }
    }
}
