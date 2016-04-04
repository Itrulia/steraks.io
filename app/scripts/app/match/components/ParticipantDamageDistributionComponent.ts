module Match {
    'use strict';

    export class ParticipantDamageDistributionComponent {
        public templateUrl = 'match/components/participant-damage-distribution.html';
        public bindings = {participant: '<'};
        public controller = 'ParticipantDamageDistributionController as ctrl'
    }

    // @ngInject
    export class ParticipantDamageDistributionController {
        public participant:any;

        public constructor(public $scope:any) {

        }
    }
}