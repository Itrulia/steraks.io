'use strict';

@Component('ranked.components', 'participants', {
    bindings: {match: '<', selected: '='},
    templateUrl: 'ranked/components/participants.html',
    controllerAs: 'ctrl',
})
class ParticipantsController {
    public match:any;
    public selected:any;

    // @ngInject
    public constructor() {
        console.log(this.match, this.selected);
    }
}