module Authentication {
    'use strict';

    export class LoginComponent {
        public templateUrl = 'authentication/login.html';
        public controller = 'LoginController as ctrl';
    }

    // @ngInject
    export class LoginController {

        public loading = false;
        public email;
        public password;

        constructor(private AuthenticationService:Authentication.AuthenticationService, private Analytics:any) {

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
                    console.log(reason);
                    // todo handle errors
                }).finally(() => {
                    this.loading = false;
                });
        }
    }
}