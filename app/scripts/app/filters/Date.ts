'use strict';

export function HumanizeDate() {
    return (timestamp:any):string => {
        return moment(timestamp).fromNow();
    }
}

export function Duration() {
    return (timestamp:any):string => {
        return moment.duration(timestamp, 'seconds').asMinutes().toFixed(0);
    }
}