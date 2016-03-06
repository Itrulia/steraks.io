module App {
    export class ParticipantBuildOrder {
        public templateUrl = 'components/participant-build-order.html';
        public bindings = {participant: '<', match: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', function ($scope) {
            this.buildOrder = {};

            $scope.$watch('ctrl.participant', () => {
                var buildOrder = {};

                if (this.match !== null) {
                    _.forEach(this.match.timeline.frames, (frame:any) => {
                        if (!frame.hasOwnProperty('events') || frame.events === null) return;

                        var items:any = _.filter(frame.events, (event:any) => {
                            return (event.eventType === 'ITEM_PURCHASED' || event.eventType === 'ITEM_SOLD') &&
                                (event.participantId === this.participant.participantId);
                        });

                        var undo:any = _.filter(frame.events, (event:any) => {
                            return (event.eventType === 'ITEM_UNDO' && (event.participantId === this.participant.participantId));
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
                }

                this.buildOrder = buildOrder;
            });
        }];
    }
}