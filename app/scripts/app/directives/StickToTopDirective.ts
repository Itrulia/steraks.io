'use strict';

import * as _ from 'lodash';

export class StickToTopDirective {
    public link:(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs) => void;
    public restrict = 'A';
    public replace = false;
    public scope = false;
    public timeout:any;

    // @ngInject
    constructor(private $window:angular.IWindowService) {
        StickToTopDirective.prototype.link = (
            scope:angular.IScope,
            element:angular.IAugmentedJQuery,
            attrs
        ) => {
            let $:any = jQuery;

            // $(window).scroll(this.onScroll());
        };
    }

    private onScroll() {
        return _.debounce(() => {
            this.stickToTop();

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.stickToTop();
            }, 100, this);
        }, 50);
    }

    private stickToTop() {
        console.log('lel');
    }

    public static instance() {
        let directive = ($window) => {
            return new StickToTopDirective($window);
        };

        directive.$inject = ['$window'];

        return directive;
    }
}