module Match.Filter {
    'use strict';
    // @ngInject

    export function csPerMinute() {
        return (match:any, player:any):String => {
            let minutes = match.matchDuration / 60;
            let minions = player.stats.minionsKilled + player.stats.neutralMinionsKilled;

            return (minions/minutes).toFixed(2);
        }
    }
}