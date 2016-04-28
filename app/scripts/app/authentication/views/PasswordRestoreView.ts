'use strict';

import {AuthenticationViews} from './AuthenticationViews';
import {AuthenticationService} from '../service/AuthenticationService';
import {Component} from "../../../decorators/AngularComponent";

@Component(AuthenticationViews, 'passwordRestore', {
    templateUrl: 'authentication/password-restore.html',
    controllerAs: 'ctrl',
})
class PasswordRestoreController {
    public loading = false;
    public email;
    public password;

    // @ngInject
    constructor(private AuthenticationService:AuthenticationService) {

    }

    public submit() {
        if (this.loading) return;
        this.loading = true;
    }
}