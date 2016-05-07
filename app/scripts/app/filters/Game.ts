'use strict';

import * as moment from "moment";

export function GameLength() {
    return (seconds:number):string => {
        if (seconds === null) return null;

        let duration = moment.duration(seconds, 'seconds');
        let minutes = duration.minutes();

        return minutes + ' minutes';
    }
}