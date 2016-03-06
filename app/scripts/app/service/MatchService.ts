module App {
    'use strict';
    // @ngInject

    export class MatchService {
        public constructor(private $q, private MatchResource:App.MatchResource, private StaticService:App.StaticService) {

        }

        public getMatch(matchId) {
			return this.MatchResource.getMatch(matchId);
        }
    }
}
