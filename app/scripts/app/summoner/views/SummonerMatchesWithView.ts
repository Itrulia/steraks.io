/// <reference path='../../_reference.d.ts' />

'use strict';

@Component('summoner.views', 'summonerMatchesWith', {
    bindings: {summoner: '<', champion: '<'},
    templateUrl: 'summoner/matches.with.html',
    controllerAs: 'ctrl',
})
class SummonerMatchesWithController {
    public loading = true;
    public matches = {};
    public summoner:any;
    public champion:any;
    public championArray:any;

    // @ngInject
    constructor(
        private $q:angular.IQService,
        private $state:any,
        private $stateParams:any,
        private MatchService:App.MatchService,
        private SummonerService:App.SummonerService,
        private StaticService:App.StaticService
    ) {
        this.$state.current.data.title = this.summoner.name + '\'s Matches with ' + this.champion.name;
        this.getMatches();
        this.getChampions();
    }

    private getChampions() {
        this.StaticService.getChampions().then((champions:any) => {
            this.championArray = _.sortBy(champions, 'name');
        });
    }

    public selectChampion(champion:any) {
        this.$state.go('summoner.matches.with', {championId: champion.name, matchIds: null});
    }

    private getMatches() {
        let promise:any;

        if (this.$stateParams.matchIds !== null) {
            promise = this.$q.when(this.$stateParams.matchIds);
        } else {
            promise = this.SummonerService.getSynergies(this.summoner.id)
                .then((synergies:Array<any>) => {
                    let synergie = _.filter(synergies, {championId: this.champion.id})[0];

                    if (_.isUndefined(synergie)) {
                        return [];
                    }

                    return synergie.matchIds;
                });
        }

        promise
            .then((matchIds:Array<any>) => {
                let matchPromises = [];

                _.forEach(matchIds, (matchId, index) => {
                    let promise = this.MatchService.getMatchForSummoner(matchId, this.summoner.id).then((match) => {
                        this.matches[index] = match;
                    });

                    matchPromises.push(promise);
                });

                return this.$q.all(matchPromises);
            })
            .finally(() => {
                this.loading = false;
            });
    }
}
