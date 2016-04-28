'use strict';

@Component('authentication.views', 'register', {
    templateUrl: 'authentication/register.html',
    controllerAs: 'ctrl',
})
class RegisterController {
    public loading = false;
    public email;
    public password;

    // @ngInject
    constructor(
        private AuthenticationService:Authentication.AuthenticationService,
        private Analytics:any
    ) {

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