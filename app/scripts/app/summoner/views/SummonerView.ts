import {SummonerViews} from "./SummonerViews";
import {SummonerService} from "../../service/SummonerService";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerViews, 'summoner', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/template.html',
    controllerAs: 'ctrl',
})
class SummonerController {
    public summoner:any;
    public league:any;

    // @ngInject
    constructor(private SummonerService:SummonerService) {

        this.SummonerService.getRank(this.summoner.id)
            .then((rank) => {
                return _.filter(rank[this.summoner.id], (entry) => {
                    return entry.queue.toLowerCase() === 'ranked_solo_5x5';
                })[0];
            })
            .then((rank) => {
                let tier = rank.tier.charAt(0).toUpperCase() + rank.tier.slice(1).toLowerCase();
                let division = rank.entries[0].division;

                this.league = [tier, division].join(' ');
            })
            .catch(() => {
                this.league = 'UNRANKED';
            });
    }
}
