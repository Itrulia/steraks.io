module Authentication {
    'use strict';

    export class PasswordRestoreComponent {
        public templateUrl = 'authentication/password-restore.html';
        public controller = 'PasswordRestoreController as ctrl';
    }

    // @ngInject
    export class PasswordRestoreController {

        public loading = false;
        public email;
        public password;

        constructor(private AuthenticationService:Authentication.AuthenticationService) {

        }

        public submit() {
            if (this.loading) return;
            this.loading = true;
        }
    }
}