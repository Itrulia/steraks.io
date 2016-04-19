/// <reference path='../_reference.d.ts' />

module App.Filter {
    'use strict';
    // @ngInject

    export function gameLength() {
        return (seconds:number):string => {
            if (seconds === null) return null;

            let duration = moment.duration(seconds, 'seconds');
            let minutes = duration.minutes();

            return minutes + ' minutes';
        }
    }
}