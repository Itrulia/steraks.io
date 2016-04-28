'use strict';

@Component('summoner.components', 'summonerCounter', {
    bindings: {counter: '<'},
    templateUrl: 'summoner/components/summoner-counter.html',
    controllerAs: 'ctrl',
})
class SummonerCounterController {
    public counter:any;

    // @ngInject
    public constructor() {

    }
}