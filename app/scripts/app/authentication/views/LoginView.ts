'use strict';

import {AuthenticationViews} from './AuthenticationViews';
import {AuthenticationService} from '../service/AuthenticationService';
import {Component} from "../../../decorators/AngularComponent";
import * as _ from 'lodash';
import {notify} from "../../../libs/notification";

@Component(AuthenticationViews, 'login', {
    templateUrl: 'authentication/login.html',
    controllerAs: 'ctrl',
})
class LoginController {
    public loading = false;
    public email:string;
    public password:string;
    public showPassword = false;

    // @ngInject
    constructor(
        private AuthenticationService:AuthenticationService,
        private Analytics:any
    ) {

    }

    public login() {
        if (this.loading) return;
        this.loading = true;

        this.AuthenticationService.login(this.email, this.password)
            .then((response:any) => {
                this.Analytics.trackEvent('login', 'success', response.config.data.email);
                // todo redirect
            }).catch((reason) => {
            this.Analytics.trackEvent('login', 'error', reason.config.data.email);

            if (reason.status === 422) {

                if (!_.isUndefined(reason.data.email)) {
                    notify({
                        message: 'Account does not exists.',
                        type: 'dark'
                    });

                    return;
                }

                notify({
                    message: 'Your password is invalid.',
                    type: 'dark'
                });

                return;
            }

            notify({
                message: 'There has been an error, please retry.',
                type: 'error'
            });

            // todo handle errors
        }).finally(() => {
            this.loading = false;
        });
    }
}