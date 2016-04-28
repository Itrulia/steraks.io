'use strict';

export class PaperDropdownDirective implements angular.IDirective {
    public link:(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs) => void;
    public restrict = 'C';
    public scope = false;

    constructor() {
        PaperDropdownDirective.prototype.link = (scope:any, element:angular.IAugmentedJQuery, attrs:any) => {
            element.parent().click(function (e) {
                e.stopPropagation();
                element.addClass('is-visible');
            });

            element.click(function (e) {
                e.stopPropagation();
            });

            angular.element('body').click(function () {
                element.removeClass('is-visible');
            });
        };
    }

    public static instance() {
        let directive = () => {
            return new PaperDropdownDirective();
        };

        directive.$inject = [];

        return directive;
    }
}