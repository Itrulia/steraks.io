module App.Service {
    'use strict';
    // @ngInject

    export class MatchService {
        public constructor(private $q, private MatchResource:App.Resource.MatchResource, private StaticService:App.Service.StaticService) {

        }

        public getMatch(matchId) {
			return this.MatchResource.getMatch(matchId);
        }
    }
}
