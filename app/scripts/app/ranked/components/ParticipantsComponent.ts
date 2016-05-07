'use strict';

import {RankedComponents} from './RankedComponents';
import {Component} from "../../../decorators/AngularComponent";

@Component(RankedComponents, 'participants', {
    bindings: {match: '<', selected: '='},
    templateUrl: 'ranked/components/participants.html',
    controllerAs: 'ctrl',
})
class ParticipantsController {
    public match:any;
    public selected:any;

    // @ngInject
    constructor() {
        console.log(this.match, this.selected);
    }
}