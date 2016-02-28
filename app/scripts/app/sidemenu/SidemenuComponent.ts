module SideMenu.Components {
    'use strict';
    // @ngInject

    export class SideMenuDirective {
        public templateUrl = 'sidemenu/sidemenu.html';
        public bindings = {};
        public controllerAs = 'ctrl';
        public controller = ['$scope', function ($scope) {
            this.sideMenuOpen = false;

            $scope.$root.$on('$stateChangeStart', () => {
                this.sideMenuOpen = false;
            });
        }];
    }


}
