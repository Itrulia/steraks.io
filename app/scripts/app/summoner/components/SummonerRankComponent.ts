'use strict';

@Component('summoner.components', 'summonerRank', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/components/summoner-rank.html',
    controllerAs: 'ctrl',
})
class SummonerRankController {
    public tier:any;
    public name:any;
    public rank:any;
    public summoner:any;
    public loading = true;

    // @ngInject
    public constructor(protected SummonerService:App.SummonerService) {
        SummonerService.getRank(this.summoner.id)
            .then((rank:any) => {
                return _.filter(rank[this.summoner.id], (entry:any) => {
                    return entry.queue.toLowerCase() === 'ranked_solo_5x5';
                })[0];
            })
            .then((rank:any) => {
                this.name = rank.name;
                this.tier = rank.tier.toLowerCase();
                this.rank = rank.entries[0];
            })
            .catch(() => {
                this.name = 'Provisionals';
            }).finally(() => {
                this.loading = false;
            });
    }
}