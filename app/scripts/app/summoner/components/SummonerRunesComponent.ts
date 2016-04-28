'use strict';

@Component('summoner.components', 'summonerRunes', {
    bindings: {page: '<'},
    templateUrl: 'summoner/components/summoner-runes.html',
    controllerAs: 'ctrl',
})
class SummonerRunesController {
    public page:any;

    // @ngInject
    public constructor() {

    }
}