import {MatchComponents} from './MatchComponents';
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(MatchComponents, 'participantRunes', {
    bindings: {participant: '<'},
    templateUrl: 'match/components/participant-runes.html',
    controllerAs: 'ctrl',
})
class ParticipantRunesController {
    public participant:any;

    // @ngInject
    public constructor() {

    }
}