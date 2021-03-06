'use strict';

export function Position() {
    return (player:any):String => {
        let lane = player.timeline.lane.toLowerCase();
        let role = player.timeline.role.toLowerCase();

        if (role === 'duo_carry') {
            return 'AD Carry'
        } else if (role === 'duo_support') {
            return 'Support';
        }

        if (lane === 'top') {
            return 'Toplane';
        } else if (lane === 'middle') {
            return 'Midlane';
        } else if (lane === 'jungle') {
            return 'Jungle';
        } else if (lane === 'bottom') {
            return 'Bottomlane';
        }

        return 'Unknown Lane';
    }
}