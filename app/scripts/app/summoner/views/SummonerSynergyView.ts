/// <reference path='../../_reference.d.ts' />

'use strict';

@Component('summoner.views', 'summonerSynergy', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/synergy.html',
    controllerAs: 'ctrl',
})
class SummonerSynergyController {
    public loading = true;
    public error = false;
    public counters = [];
    public summoner:any;

    // @ngInject
    constructor(private $state, private SummonerService:App.SummonerService) {
        this.$state.current.data.title = this.summoner.name + '\'s Synergizing Champions';

        this.SummonerService.getSynergies(this.summoner.id)
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
