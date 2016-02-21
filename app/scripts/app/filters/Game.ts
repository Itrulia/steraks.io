/// <reference path='../_reference.d.ts' />

module App.Filter {
    'use strict';
    // @ngInject

    export function gameLength() {
        return (seconds:number):string => {
            if (seconds === null) return null;

            var duration = moment.duration(seconds, 'seconds');
            var minutes = duration.minutes();

            return minutes + ' minutes';
        }
    }
}