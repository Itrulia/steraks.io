'use strict';

@Component('summoner.components', 'summonerChampionMastery', {
    bindings: {champion: '<'},
    templateUrl: 'summoner/components/summoner-champion-mastery.html',
    controllerAs: 'ctrl',
})
class SummonerChampionMasteryController {
    public champion:any;

    // @ngInject
    public constructor() {
        this.champion.championPoints = this.shortVal(this.champion.championPoints);
    }

    private shortVal(val:number):string {
        if (val > 999999) {
            return (val / 1000000).toFixed(1) + 'm'
        } else if (val > 999) {
            return (val / 1000).toFixed(1) + 'k';
        }

        return val.toString();
    }
}