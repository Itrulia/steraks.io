import {SummonerViews} from "./SummonerViews";
import {SummonerService} from "../../service/SummonerService";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerViews, 'summonerProfile', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/summary.html',
    controllerAs: 'ctrl',
})
class SummonerProfileController {
    public summoner:any;
    public championMasteries:any;
    public chestsGranted:number;
    public masteryLevelFilter:any;
    public masteryLevels = [
        {label: 'Level 5', value: 5},
        {label: 'Level 4', value: 4},
        {label: 'Level 3', value: 3},
        {label: 'Level 2', value: 2},
        {label: 'Level 1', value: 1},
    ];
    public loading = {
        championMastery: true
    };

    // @ngInject
    constructor(
        private $state:any,
        private SummonerService:SummonerService
    ) {
        this.$state.current.data.title = this.summoner.name;
        this.masteryLevelFilter = this.masteryLevels[0];

        this.SummonerService.getChampionMastery(this.summoner.id)
            .then((championMasteries) => {
                this.championMasteries = championMasteries;
            })
            .then((championMasteries) => {
                this.chestsGranted = _.filter(championMasteries, (championMastery:any) => {
                    return championMastery.chestGranted;
                }).length;
            }).finally(() => {
            this.loading.championMastery = false;
        });
    }

    public filterChampionsByLevel(masteryLevel:any) {
        return _.filter(this.championMasteries, (championMastery:any) => {
            return championMastery.championLevel === masteryLevel.value;
        });
    }
}
