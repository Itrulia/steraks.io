import {SummonerViews} from "./SummonerViews";
import {MatchService} from "../../service/MatchService";
import {SummonerService} from "../../service/SummonerService";
import {StaticService} from "../../service/StaticService";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerViews, 'summonerMatchesAgainst', {
    bindings: {summoner: '<', champion: '<'},
    templateUrl: 'summoner/matches.against.html',
    controllerAs: 'ctrl',
})
class SummonerMatchesAgainstController {
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
        private MatchService:MatchService,
        private SummonerService:SummonerService,
        private StaticService:StaticService
    ) {
        this.$state.current.data.title = this.summoner.name + '\'s Matches against ' + this.champion.name;
        this.getMatches();
        this.getChampions();
    }

    private getChampions() {
        this.StaticService.getChampions().then((champions:any) => {
            this.championArray = _.sortBy(champions, 'name');
        });
    }

    public selectChampion(champion:any) {
        this.$state.go('summoner.matches.against', {championId: champion.name, matchIds: null});
    }

    private getMatches() {
        let promise:any;

        if (this.$stateParams.matchIds !== null) {
            promise = this.$q.when(this.$stateParams.matchIds);
        } else {
            if (this.$stateParams.matchIds !== null) {
                promise = this.$q.when(this.$stateParams.matchIds);
            } else {
                promise = this.SummonerService.getCounters(this.summoner.id)
                    .then((counters:any) => {
                        let counter:any = _.filter(counters, {championId: this.champion.id})[0];

                        if (_.isUndefined(counter)) {
                            return [];
                        }

                        return counter.matchIds;
                    });
            }
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
