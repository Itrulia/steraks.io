/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerChampionsComponent {
        public bindings = {summoner: '<'};
        public templateUrl = 'summoner/champions.html';
        public controller = 'SummonerChampionsController as ctrl'
    }

    // @ngInject
    export class SummonerChampionsController {
        public loading = true;
        public error = false;
        public champions = [];
        public summoner:any;

        constructor(private $scope, private SummonerService:App.SummonerService) {
            this.SummonerService.getMatches(this.summoner.id)
                .then((matches:any) => {
                    var champions:any = _.groupBy(matches, 'champion');
                    champions = _.map(champions, function (champion:any) {
                        return {
                            championId: champion[0].champion,
                            championName: champion[0].championName,
                            championAvatar: champion[0].championAvatar,
                            matchIds: _.map(champion, (match:any) => { return match.matchId }),
                            total: champion.length
                        }
                    });

                    this.champions = _.orderBy(champions, ['total', 'championId'], ['desc', 'desc']);
                })
                .catch(() => {
                    this.error = true;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
