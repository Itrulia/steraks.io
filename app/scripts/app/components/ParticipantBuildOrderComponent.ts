module App.Component {
    export class ParticipantBuildOrder {
        public templateUrl = 'components/participant-build-order.html';
        public bindings = {participant: '<', match: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', function ($scope) {
            this.skillOrder = [];

            $scope.$watch('ctrl.participant', () => {
                var buyOrder = {};

                if (this.match !== null) {
                    console.log(this);
                    _.forEach(this.match.timeline.frames, (frame:any) => {
                        if (!frame.hasOwnProperty('events') || frame.events === null) return;

                        var items = _.filter(frame.events, (event:any) => {
                            return (event.eventType === 'ITEM_PURCHASED' || event.eventType === 'ITEM_SOLD') &&
                                (event.participantId === this.participant.participantId);
                        });

                        var undo = _.filter(frame.events, (event:any) => {
                            return (event.eventType === 'ITEM_UNDO' && (event.participantId === this.participant.participantId));
                        });

                        _.forEach(undo, (event) => {
                            var index = _.findIndex(items, (bought) => {
                                return bought.itemId === event.itemBefore;
                            });

                            delete items[index];
                            items = _.compact(items);
                        });

                        if (items.length !== 0) {
                            buyOrder[items[0].timestamp] = items;
                        }
                    });
                }

                this.buyOrder = buyOrder;
            });
        }];
    }
}