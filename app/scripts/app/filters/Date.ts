module App.Filter {
    'use strict';

    export function humanizeDate() {
        return (timestamp:any):string => {
            return moment(timestamp).fromNow();
        }
    }

    export function duration() {
        return (timestamp:any):string => {
            return moment.duration(timestamp, 'seconds').asMinutes().toFixed(0);
        }
    }
}