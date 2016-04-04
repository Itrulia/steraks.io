module App {
    'use strict';
    // @ngInject

    export class SummonerService {
        constructor(private $q:angular.IQService,
                    private SummonerResource:App.SummonerResource,
                    private StaticService:App.StaticService) {
        }

        public getSummoner(summonerId:number) {
            return this.SummonerResource.getSummoner(summonerId);
        }

        public getRank(summonerId:number) {
            return this.SummonerResource.getRank(summonerId);
        }

        public getStats(summonerId:number) {
            return this.SummonerResource.getStats(summonerId);
        }

        public getMasteries(summonerId:number) {
            return this.SummonerResource.getMasteries(summonerId);
        }

        public getCounters(summonerId:number) {
            return this.SummonerResource.getCounters(summonerId);
        }

        public getSynergies(summonerId:number) {
            return this.SummonerResource.getSynergies(summonerId);
        }

        public getFriends(summonerId:number) {
            return this.SummonerResource.getFriends(summonerId);
        }

        public getRunes(summonerId:number) {
            return this.SummonerResource.getRunes(summonerId);
        }

        public getMatches(summonerId:number) {
            return this.SummonerResource.getMatches(summonerId);
        }
    }
}