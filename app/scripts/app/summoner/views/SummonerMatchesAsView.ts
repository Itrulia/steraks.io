'use strict';

import * as _ from 'lodash';
import {SummonerViews} from "./SummonerViews";
import {MatchService} from "../../service/MatchService";
import {SummonerService} from "../../service/SummonerService";
import {StaticService} from "../../service/StaticService";
import {Component} from "../../../decorators/AngularComponent";

@Component(SummonerViews, 'summonerMatchesAs', {
    bindings: {summoner: '<', champion: '<'},
    templateUrl: 'summoner/matches.as.html',
    controllerAs: 'ctrl',
})
class SummonerMatchesAsController {
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
        this.$state.current.data.title = this.summoner.name + '\'s Matches As ' + this.champion.name;
        this.getMatches();
        this.getChampions();
    }

    private getChampions() {
        this.StaticService.getChampions().then((champions:any) => {
            let all = {id: 0, name: 'All'};
            this.championArray = [all].concat(_.sortBy(champions, 'name'));
        });
    }

    public selectChampion(champion:any) {
        if (champion.id == 0) {
            this.$state.go('summoner.matches.history');
        } else {
            this.$state.go('summoner.matches.as', {championId: champion.name, matchIds: null});
        }
    }

    private getMatches() {
        let promise:any;

        if (this.$stateParams.matchIds !== null) {
            promise = this.$q.when(this.$stateParams.matchIds);
        } else {
            promise = this.SummonerService.getMatches(this.summoner.id)
                .then((matches:Array<any>) => {
                    matches = _.filter(matches, {champion: this.champion.id});

                    return _.map(matches, (match:any) => {
                        return match.matchId;
                    });
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
