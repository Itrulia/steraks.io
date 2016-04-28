'use strict';

import {MatchComponents} from './MatchComponents';
import {Component} from "../../../decorators/AngularComponent";

@Component(MatchComponents, 'participantDamageDistribution', {
    bindings: {participant: '<'},
    templateUrl: 'match/components/participant-damage-distribution.html',
    controllerAs: 'ctrl',
})
class ParticipantDamageDistributionController {
    public participant:any;

    // @ngInject
    public constructor() {

    }
}