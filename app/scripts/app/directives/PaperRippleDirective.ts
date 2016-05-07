'use strict';

export class PaperRippleDirective implements angular.IDirective {
    public link:(scope:angular.IScope, element:angular.IAugmentedJQuery, attrs) => void;
    public restrict = 'A';
    public scope = false;

    // @ngInject
    constructor() {
        PaperRippleDirective.prototype.link = (scope:any, element:angular.IAugmentedJQuery, attrs:any) => {
            if(element.find(".paper-ripple").length === 0) {
                element.append("<span class='paper-ripple'></span>");
            }
            
            element.click(function(e){
                var circle, d, x, y;

                circle = element.find(".paper-ripple");
                circle.removeClass("is-active");

                if(!circle.height() && !circle.width()) {
                    d = Math.max(element.outerWidth(), element.outerHeight());
                    circle.css({height: d, width: d});
                }

                x = e.pageX - element.offset().left - circle.width()/2;
                y = e.pageY - element.offset().top - circle.height()/2;

                circle.css({top: y+'px', left: x+'px'}).addClass("is-active");

                circle.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    circle.removeClass('is-active');
                    circle.css({});
                });
            });
        };
    }

    public static instance() {
        let directive = () => {
            return new PaperRippleDirective();
        };

        directive.$inject = [];

        return directive;
    }
}