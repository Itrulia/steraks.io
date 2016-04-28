import {SummonerComponents} from "./SummonerComponents";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerComponents, 'summonerCounter', {
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