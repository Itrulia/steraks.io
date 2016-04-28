'use strict';

@Component('authentication.views', 'passwordRestore', {
    templateUrl: 'authentication/password-restore.html',
    controllerAs: 'ctrl',
})
class PasswordRestoreController {
    public loading = false;
    public email;
    public password;

    // @ngInject
    constructor(private AuthenticationService:Authentication.AuthenticationService) {

    }

    public submit() {
        if (this.loading) return;
        this.loading = true;
    }
}