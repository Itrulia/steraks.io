module App {
    'use strict';
    //@ngInject

    export class AuthenticationService {
        public constructor(private CacheService:App.CacheService) {

        }

        public getToken() {
            return this.CacheService.pull('Token');
        }

        public setToken(token) {
            var $timeout = moment.utc().add(1, 'years');
            this.CacheService.remember('Token', token, $timeout);
        }

        public logout() {
            this.CacheService.forget('User');
        }
    }
}