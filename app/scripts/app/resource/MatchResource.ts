'use strict';

export class MatchResource {

    // @ngInject
    constructor(private $http:angular.IHttpService) {
        
    }

    public getMatch(matchId:number, region:string = 'euw') {
        return this.$http.get('http://vanilla.app/' + region + '/match/' + matchId)
            .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                return response.data;
            });
    }

    public getMatchForSummoner(matchId:number, summonerId:number, region:string = 'euw') {
        return this.$http.get('http://vanilla.app/' + region + '/match/' + matchId + '/' + summonerId)
            .then(function (response:angular.IHttpPromiseCallbackArg<any>) {
                return response.data;
            });
    }
}