import {SummonerComponents} from "./SummonerComponents";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerComponents, 'summonerRunes', {
    bindings: {page: '<'},
    templateUrl: 'summoner/components/summoner-runes.html',
    controllerAs: 'ctrl',
})
class SummonerRunesController {
    public page:any;

    // @ngInject
    constructor() {

    }
}