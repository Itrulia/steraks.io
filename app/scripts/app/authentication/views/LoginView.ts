'use strict';

@Component('authentication.views', 'login', {
    templateUrl: 'authentication/login.html',
    controllerAs: 'ctrl',
})
class LoginController {
    public loading = false;
    public email;
    public password;

    // @ngInject
    constructor(
        private AuthenticationService:Authentication.AuthenticationService,
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
            console.log(reason);
            // todo handle errors
        }).finally(() => {
            this.loading = false;
        });
    }
}