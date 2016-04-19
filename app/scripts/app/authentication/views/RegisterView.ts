module Authentication {
    'use strict';

    export class RegisterComponent {
        public templateUrl = 'authentication/register.html';
        public controller = 'RegisterController as ctrl';
    }

    // @ngInject
    export class RegisterController {

        public loading = false;
        public email;
        public password;

        constructor(private AuthenticationService:Authentication.AuthenticationService, private Analytics:any) {

        }

        public register() {
            if (this.loading) return;
            this.loading = true;

            this.AuthenticationService.logout();
            this.AuthenticationService.register(this.email, this.password)
                .then((response:any) => {
                    this.Analytics.trackEvent('register', 'success', response.config.data.email);
                    // todo login & redirect
                }).catch((reason) => {
                    this.Analytics.trackEvent('register', 'error', reason.config.data.email);
                    console.log(reason);
                    // todo handle errors
                }).finally(() => {
                    this.loading = false;
                });
        }
    }
}