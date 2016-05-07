'use strict';

export class PaperInputDirective implements angular.IDirective {
    public link:(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs) => void;
    public restrict = 'C';
    public scope = false;

    // @ngInject
    constructor() {
        PaperInputDirective.prototype.link = (scope:any, element:angular.IAugmentedJQuery, attrs:any) => {

            if (element.val() != '') {
                element.addClass('is-touched');
            }

            element.on('keydown keyup focus blur change', function () {
                if (this.value != '') {
                    this.classList.add('is-touched');
                } else {
                    this.classList.remove('is-touched');
                }
            });

            element.on('keydown keyup focus blur change', function () {
                this.classList.add('is-dirty');
            });
        };
    }

    public static instance() {
        let directive = () => {
            return new PaperInputDirective();
        };

        directive.$inject = [];

        return directive;
    }
}