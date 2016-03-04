module App.Resource {
    'use strict';
    // @ngInject

    export class StaticResource {
        constructor(private $http:angular.IHttpService) {

        }

        public getRealm() {
            return this.$http.get('http://vanilla.app/static/realm')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getRunes() {
            return this.$http.get('http://vanilla.app/static/rune')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getMasteries() {
            return this.$http.get('http://vanilla.app/static/mastery')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getChampions() {
            return this.$http.get('http://vanilla.app/static/champion')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getItems() {
            return this.$http.get('http://vanilla.app/static/item')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getSummonerSpells() {
            return this.$http.get('http://vanilla.app/static/summoner-spell')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getSummonerIcons() {
            return this.$http.get('http://vanilla.app/static/summoner-icon')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }

        public getSpells() {
            return this.$http.get('http://vanilla.app/static/spell')
                .then((response:angular.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                });
        }
    }
}
