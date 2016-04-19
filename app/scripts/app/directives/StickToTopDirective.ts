module App {
    'use strict';
    // @ngInject

    export class StickToTopDirective {
        public link:(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs) => void;
        public restrict = 'A';
        public replace = false;
        public scope = false;

        constructor(public $window: angular.IWindowService) {
            StickToTopDirective.prototype.link = (scope:angular.IScope, element:angular.IAugmentedJQuery, attrs) => {
                angular.element($window).bind('scroll', (e) => {
                    //console.log(e);
                });
            };
        }

        public static instance() {
            let directive = ($window) => {
                return new StickToTopDirective($window);
            };

            directive.$inject = ['$window'];

            return directive;
        }
    }
}