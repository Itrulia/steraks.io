/// <reference path='LoginView.ts' />
/// <reference path='RegisterView.ts' />
/// <reference path='PasswordRestoreView.ts' />

let authenticationViewsApp:angular.IModule = angular.module('match.views', []);

// Login
authenticationViewsApp.controller('LoginController', Authentication.LoginController);
authenticationViewsApp.component('login', new Authentication.LoginComponent());
// Restore Password
authenticationViewsApp.controller('PasswordRestoreController', Authentication.PasswordRestoreController);
authenticationViewsApp.component('passwordRestore', new Authentication.PasswordRestoreComponent());
// Register
authenticationViewsApp.controller('RegisterController', Authentication.RegisterController);
authenticationViewsApp.component('register', new Authentication.RegisterComponent());