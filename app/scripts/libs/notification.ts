'use strict';

import * as $ from "jquery";

var timeout;

export function notify(options) {
    var self = this;
    var $notification = $('.notification');

    self.defaults = {
        duration: 5000,
        type: 'dark',
        message: 'No message'
    };

    self.settings = $.extend({}, self.defaults, options);

    if ($notification.length === 0) {
        $notification = $('<div></div>')
            .addClass('notification notification--hide notification--' + self.settings.type)
            .html(self.settings.message);
        $('body').append($notification);

        // Let's show the animation
        setTimeout(function() {
            $notification.removeClass('notification--hide');
        }, 0);
    } else {
        clearTimeout(timeout);

        if ($notification.html() !== self.settings.message) {
            var showNew = function() {
                $notification.attr('class', 'notification notification--' + self.settings.type);
                $notification.html(self.settings.message);
                $notification.off('transitionend');
            };

            if ($notification.hasClass('notification--hide')) {
                showNew();
            } else {
                $notification.addClass('notification--hide');
                $notification.on('transitionend', showNew);
            }
        } else {
            $notification.attr('class', 'notification notification--' + self.settings.type);
        }
    }

    timeout = setTimeout(function() {
        $notification.addClass('notification--hide');
    }, self.settings.duration);
}
