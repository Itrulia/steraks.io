'use strict';

@Component('summoner.components', 'summonerChampion', {
    bindings: {champion: '<'},
    templateUrl: 'summoner/components/summoner-champion.html',
    controllerAs: 'ctrl',
})
class SummonerChampionController {
    public champion:any;

    // @ngInject
    public constructor() {

    }
}