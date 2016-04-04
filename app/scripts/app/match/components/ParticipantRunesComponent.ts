module Match {
    'use strict';

    export class ParticipantRunesComponent {
        public templateUrl = 'match/components/participant-runes.html';
        public bindings = {participant: '<'};
        public controller = 'ParticipantRunesController as ctrl'
    }

    // @ngInject
    export class ParticipantRunesController {
        public participant:any;

        public constructor() {

        }
    }
}