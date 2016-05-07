'use strict';

import * as _ from 'lodash';
import {SummonerViews} from "./SummonerViews";
import {MatchService} from "../../service/MatchService";
import {SummonerService} from "../../service/SummonerService";
import {StaticService} from "../../service/StaticService";
import {Component} from "../../../decorators/AngularComponent";

@Component(SummonerViews, 'summonerMatchesHistory', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/matches.history.html',
    controllerAs: 'ctrl',
})
class SummonerMatchesHistoryController {
    public loading = true;
    public error = false;
    public matches = {};
    public summoner:any;
    public champion:any;
    public championArray:any;

    // @ngInject
    constructor(
        private $q:angular.IQService,
        private $state:any,
        private MatchService:MatchService,
        private SummonerService:SummonerService,
        private StaticService:StaticService
    ) {
        this.$state.current.data.title = this.summoner.name + '\'s Match History';
        this.getMatches();
        this.getChampions();
    }

    private getChampions() {
        this.StaticService.getChampions().then((champions:any) => {
            this.champion = {name: 'All'};
            this.championArray = [this.champion].concat(_.sortBy(champions, 'name'));
        });
    }

    public selectChampion(champion:any) {
        this.$state.go('summoner.matches.as', {championId: champion.name, matchIds: null});
    }

    public getMatches() {
        this.SummonerService.getMatches(this.summoner.id)
            .catch((reason:any) => {
                this.error = true;

                return this.$q.reject(reason);
            })
            .then((matches:Array<any>) => {
                return matches.slice(0, 10);
            })
            .then((matches:Array<any>) => {
                let matchPromises = [];

                _.forEach(matches, (match, index) => {
                    let promise = this.MatchService.getMatchForSummoner(match.matchId, this.summoner.id)
                        .then((match) => {
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
