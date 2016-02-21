module Match.Filter {
    'use strict';
    // @ngInject

    export function csPerMinute() {
        return (match:any, player:any):String => {
            var minutes = match.matchDuration / 60;
            var minions = player.stats.minionsKilled + player.stats.neutralMinionsKilled;

            return (minions/minutes).toFixed(2);
        }
    }
}