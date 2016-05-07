import {SummonerComponents} from "./SummonerComponents";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerComponents, 'summonerChampion', {
    bindings: {champion: '<'},
    templateUrl: 'summoner/components/summoner-champion.html',
    controllerAs: 'ctrl',
})
class SummonerChampionController {
    public champion:any;

    // @ngInject
    constructor() {

    }
}