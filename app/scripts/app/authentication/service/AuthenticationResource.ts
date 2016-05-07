'use strict';

export class AuthenticationResource {
    //@ngInject
    constructor(private $http:any) {

    }

    public login(email:string, password:string) {
        return this.$http.post('http://vanilla.app/login', {
            email: email,
            password: password
        });
    }

    public register(email:string, password:string) {
        return this.$http.post('http://vanilla.app/user', {
            email: email,
            password: password
        });
    }
}