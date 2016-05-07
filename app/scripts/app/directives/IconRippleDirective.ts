'use strict';

export class IconRippleDirective implements angular.IDirective {
    public link:(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs) => void;
    public restrict = 'A';
    public scope = false;

    // @ngInject
    constructor() {
        IconRippleDirective.prototype.link = (scope:any, element:angular.IAugmentedJQuery, attrs:any) => {
            if(element.find(".ripple.ripple--center").length === 0) {
                element.append("<span class='ripple.ripple--center'></span>");
            }
            
            element.click(function(e){
                let circle = element.find(".ripple.ripple--center");
                circle.removeClass("is-active");
                circle.addClass("is-active");

                circle.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    circle.removeClass('is-active');
                    circle.css({});
                });
            });
        };
    }

    public static instance() {
        let directive = () => {
            return new IconRippleDirective();
        };

        directive.$inject = [];

        return directive;
    }
}