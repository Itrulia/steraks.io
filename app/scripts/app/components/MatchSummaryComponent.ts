module App {
    'use strict';

    export class MatchSummaryComponent implements angular.IComponentOptions {
        public templateUrl = 'components/match-summary.html';
        public bindings = {summoner: '<', match: '<'};
        public controller = 'MatchSummaryController as ctrl';
    }

    // @ngInject
    export class MatchSummaryController {
        public summoner:any;
        public match:any;
        public player:any;

        public constructor(private KeystoneMasteryService:App.KeystoneMasteryService) {
            this.player = _.filter(this.match.participants, (element:any) => {
                return element.player.summonerId === this.summoner.id;
            })[0];

            this.player.keystone = KeystoneMasteryService.getParticipantKeystone(this.player);
        }
    }
}