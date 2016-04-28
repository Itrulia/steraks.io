import {SummonerViews} from "./SummonerViews";
import {SummonerService} from "../../service/SummonerService";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerViews, 'summonerCounters', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/counters.html',
    controllerAs: 'ctrl',
})
class SummonerCountersController {
    public loading = true;
    public error = false;
    public counters = [];
    public summoner:any;

    // @ngInject
    constructor(private $state, private SummonerService:SummonerService) {
        this.$state.current.data.title = this.summoner.name + '\'s Counters';

        this.SummonerService.getCounters(this.summoner.id)
            .then((counters:any) => {
                this.counters = _.orderBy(counters, ['percent', 'games'], ['desc', 'desc']);
            })
            .catch(() => {
                this.error = true;
            })
            .finally(() => {
                this.loading = false;
            });
    }
}
