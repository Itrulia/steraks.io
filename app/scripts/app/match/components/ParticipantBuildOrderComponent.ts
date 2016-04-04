module Match {
    'use strict';

    export class ParticipantBuildOrder {
        public templateUrl = 'match/components/participant-build-order.html';
        public bindings = {participant: '<', match: '<'};
        public controller = 'ParticipantBuildOrderController as ctrl'
    }

    // @ngInject
    export class ParticipantBuildOrderController {
        public participant:any;
        public match:any;
        public buildOrder:any = {};

        public constructor(public $scope) {
            this.$scope.$watch('ctrl.participant', () => {
                var buildOrder = {};

                if (this.match !== null) {
                    buildOrder = this.getBuildOrderEventsOfParticipant(this.match, this.participant);
                }

                this.buildOrder = buildOrder;
            });
        }

        protected getBuildOrderEventsOfParticipant(match:any, participant:any) {
            var buildOrder = {};

            _.forEach(match.timeline.frames, (frame:any) => {
                if (!frame.hasOwnProperty('events') || frame.events === null) return;

                var items:any = _.filter(frame.events, (event:any) => {
                    return (event.eventType === 'ITEM_PURCHASED' || event.eventType === 'ITEM_SOLD') &&
                        (event.participantId === participant.participantId);
                });

                var undo:any = _.filter(frame.events, (event:any) => {
                    return (event.eventType === 'ITEM_UNDO' && (event.participantId === participant.participantId));
                });

                _.forEach(undo, (event:any) => {
                    var index = _.findIndex(items, (bought:any) => {
                        return bought.itemId === event.itemBefore;
                    });

                    delete items[index];
                    items = _.compact(items);
                });

                if (items.length !== 0) {
                    buildOrder[items[0].timestamp] = items;
                }
            });

            return buildOrder;
        }
    }
}