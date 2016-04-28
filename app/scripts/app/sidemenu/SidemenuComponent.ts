module SideMenu.Components {
    'use strict';
    // @ngInject

    export class SideMenuDirective {
        public templateUrl = 'sidemenu/sidemenu.html';
        public bindings:any = {};
        public controllerAs = 'ctrl';
        public controller = ['$scope', function ($scope) {
            this.sideMenuOpen = false;
            this.regionMenuOpen = false;

            $scope.$root.$on('$stateChangeStart', () => {
                this.sideMenuOpen = false;
                this.regionMenuOpen = false;
            });
        }];
    }
}
