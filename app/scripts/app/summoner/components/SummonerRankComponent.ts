module Summoner {
    'use strict';

    export class SummonerRankComponent {
        public templateUrl = 'summoner/components/summoner-rank.html';
        public bindings = {summoner: '<'};
        public controller = 'SummonerRankController as ctrl'
    }

    // @ngInject
    export class SummonerRankController {
        public tier:any;
        public name:any;
        public rank:any[];
        public summoner:any;

        public constructor(public SummonerService:App.SummonerService) {
            SummonerService.getRank(this.summoner.id)
                .then((rank) => {
                    this.tier = rank.tier.toLowerCase();
                    this.name = rank.name;
                    this.rank = _.find(rank.entries, (entry:any) => {
                        return entry.playerOrTeamId == this.summoner.id;
                    });
                });
        }
    }
}