'use strict';

export function Team() {
    return (teamId:any):string => {
        switch (teamId) {
            case 100:
                return 'Blue';
            case 200:
                return 'Red';
            default:
                return null;
        }
    }
}