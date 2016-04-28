'use strict';

import {MatchComponents} from './MatchComponents';
import {Component} from "../../../decorators/AngularComponent";

@Component(MatchComponents, 'participantJungleDistribution', {
    bindings: {participant: '<'},
    templateUrl: 'match/components/participant-jungle-distribution.html',
    controllerAs: 'ctrl',
})
class ParticipantJungleDistributionController {
    public participant:any;

    // @ngInject
    public constructor() {

    }
}