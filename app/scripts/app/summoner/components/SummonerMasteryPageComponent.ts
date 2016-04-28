import {SummonerComponents} from "./SummonerComponents";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerComponents, 'summonerMasteryPage', {
    bindings: {page: '<', trees: '<'},
    templateUrl: 'components/mastery-page.html',
    controllerAs: 'ctrl',
})
class SummonerMasteryPageController {
    public page:any;
    public trees:any;

    // @ngInject
    public getRank(masterId:any) {
        if (_.isUndefined(this.page.masteries[masterId.masteryId])) {
            return 1;
        }

        return this.page.masteries[masterId.masteryId].rank;
    }
}