import {SummonerService} from "../../service/SummonerService";
import {SummonerViews} from "./SummonerViews";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerViews, 'summonerChampions', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/champions.html',
    controllerAs: 'ctrl',
})
class SummonerChampionsController {
    public loading = true;
    public error = false;
    public champions = [];
    public summoner:any;

    // @ngInject
    constructor(
        private $state:any,
        private SummonerService:SummonerService
    ) {
        this.$state.current.data.title = this.summoner.name + '\'s Played Champions';

        this.SummonerService.getMatches(this.summoner.id)
            .then((matches:any) => {
                let champions:any = _.groupBy(matches, 'champion');
                champions = _.map(champions, function (champion:any) {
                    return {
                        championId: champion[0].champion,
                        championName: champion[0].championName,
                        championAvatar: champion[0].championAvatar,
                        matchIds: _.map(champion, (match:any) => {
                            return match.matchId
                        }),
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
