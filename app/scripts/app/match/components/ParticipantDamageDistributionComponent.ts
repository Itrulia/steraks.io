module Match {
    'use strict';

    export class ParticipantDamageDistributionComponent implements angular.IComponentOptions {
        public templateUrl = 'match/components/participant-damage-distribution.html';
        public bindings:any = {participant: '<'};
        public controller = 'ParticipantDamageDistributionController as ctrl'
    }

    // @ngInject
    export class ParticipantDamageDistributionController {
        public participant:any;

        public constructor(public $scope:any) {

        }
    }
}