module SideMenu.Directive {
    'use strict';
    // @ngInject

    export class SideMenuDirective implements angular.IDirective {
        public link:angular.IDirectiveLinkFn;
        public restrict = 'E';
        public templateUrl = 'sidemenu/sidemenu.html';
        public scope = false;

        constructor() {
            SideMenuDirective.prototype.link = (scope, element, attr, ctrl) => {
                scope.sideMenuOpen = false;

                scope.$root.$on('$stateChangeStart', () => {
                    scope.sideMenuOpen = false;
                });
            }
        }

        static instance():angular.IDirective {
            return new SideMenuDirective();
        }
    }
}
