module App {
    'use strict';
    // @ngInject

    export class MatchService {
        public constructor(private MatchResource:App.MatchResource, private StaticService:App.StaticService) {

        }

        public getMatch(matchId) {
            return this.MatchResource.getMatch(matchId);
        }

        public getMatchForSummoner(matchId:number, summonerId:number) {
            return this.MatchResource.getMatchForSummoner(matchId, summonerId);
        }
    }
}
