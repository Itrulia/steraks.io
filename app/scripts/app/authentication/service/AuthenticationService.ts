module Authentication {
    'use strict';
    //@ngInject

    export class AuthenticationService {
        public constructor(private CacheService:App.CacheService, private AuthenticationResource:Authentication.AuthenticationResource) {

        }

        /**
         * @param email
         * @param password
         * @returns {IHttpPromise<T>}
         */
        public register(email:string, password:string) {
            return this.AuthenticationResource.register(email, password);
        }

        /**
         * @returns {string}
         */
        public getToken() {
            return localStorage.getItem('authToken');
        }

        /**
         * @returns {void}
         */
        public setToken(token) {
            localStorage.setItem('authToken', token);
        }

        /**
         * @param email
         * @param password
         * @returns {IHttpPromise<T>}
         */
        public login(email:string, password:string) {
            return this.AuthenticationResource.login(email, password);
        }

        /**
         * @returns {void}
         */
        public logout() {
            this.CacheService.forget('Token');
        }
    }
}