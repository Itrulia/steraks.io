module Match {
    'use strict';

    export class ParticipantRunesComponent implements angular.IComponentOptions {
        public templateUrl = 'match/components/participant-runes.html';
        public bindings:any = {participant: '<'};
        public controller = 'ParticipantRunesController as ctrl'
    }

    // @ngInject
    export class ParticipantRunesController {
        public participant:any;

        public constructor() {

        }
    }
}