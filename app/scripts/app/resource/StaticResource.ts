module App {
    'use strict';
    // @ngInject

    export class StaticResource {
        constructor(private $http:angular.IHttpService) {

        }

        public getRealm() {
            return this.$http.get('http://46.101.208.242/static/realm')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getRunes() {
            return this.$http.get('http://46.101.208.242/static/rune')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getMasteries() {
            return this.$http.get('http://46.101.208.242/static/mastery')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getChampions() {
            return this.$http.get('http://46.101.208.242/static/champion')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getItems() {
            return this.$http.get('http://46.101.208.242/static/item')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getSummonerSpells() {
            return this.$http.get('http://46.101.208.242/static/summoner-spell')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getSummonerIcons() {
            return this.$http.get('http://46.101.208.242/static/summoner-icon')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getSpells() {
            return this.$http.get('http://46.101.208.242/static/spell')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }
    }
}
