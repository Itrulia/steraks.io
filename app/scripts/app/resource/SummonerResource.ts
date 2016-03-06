module App {
    'use strict';
    // @ngInject

    export class SummonerResource {
        constructor(private $http:angular.IHttpService) {
        }

        public getSummoner(summonerId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/summoner/' + summonerId)
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getRank(summonerId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/summoner/' + summonerId + '/rank')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getMasteries(summonerId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/summoner/' + summonerId + '/masteries')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getRunes(summonerId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/summoner/' + summonerId + '/runes')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getStats(summonerId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/summoner/' + summonerId + '/stats')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getMatches(summonerId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/summoner/' + summonerId + '/matches')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getCounters(summonerId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/summoner/' + summonerId + '/counters')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }

        public getSynergies(summonerId:number, region:string = 'euw') {
            return this.$http.get('http://46.101.208.242/' + region + '/summoner/' + summonerId + '/synergy')
                .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                    return response.data;
                });
        }
    }
}
