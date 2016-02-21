module Match.Filter {
    'use strict';
    // @ngInject

    export function mode() {
        return (match:any):String => {
            var matchMode = match.matchMode.toLowerCase();
            var matchType = match.matchType.toLowerCase();
            var queueType = match.queueType.toLowerCase();

            if (matchMode === 'classic' && matchType === 'matched_game' && queueType === 'ranked_solo_5x5') {
                return 'Solo Q';
            }

            if (matchMode === 'classic' && matchType === 'matched_game' && queueType === 'team_builder_draft_ranked_5x5') {
                return 'Dyanmic Q';
            }

            if (matchMode === 'classic' && matchType === 'matched_game' && queueType === 'ranked_team_5x5') {
                return 'Team';
            }

            return '';
        }
    }
}