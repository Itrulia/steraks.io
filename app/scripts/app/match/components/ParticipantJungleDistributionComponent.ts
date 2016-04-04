module Match {
    'use strict';

    export class ParticipantJungleDistributionComponent {
        public templateUrl = 'match/components/participant-jungle-distribution.html';
        public bindings = {participant: '<'};
        public controller = 'ParticipantJungleDistributionController as ctrl'
    }

    // @ngInject
    export class ParticipantJungleDistributionController {
        public participant:any;

        public constructor(public $scope:any) {

        }
    }
}