import {SummonerViews} from "./SummonerViews";
import {SummonerService} from "../../service/SummonerService";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(SummonerViews, 'summonerRunePages', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/runes.html',
    controllerAs: 'ctrl',
})
class SummonerRunePagesController {
    public loading = true;
    public error = false;
    public runes = [];
    public summoner:any;

    // @ngInject
    constructor(
        private $state:any,
        private SummonerService:SummonerService
    ) {
        this.$state.current.data.title = this.summoner.name + '\'s Runes';

        this.SummonerService.getRunes(this.summoner.id)
            .then((runes:any) => {
                _.forEach(runes, (rune:any) => {
                    let runeGroups = _.groupBy(rune.slots, 'runeId');
                    rune.slots = _.map(runeGroups, function (runeGroup:any[], key) {
                        return {
                            runeId: runeGroup[0].runeId,
                            runeName: runeGroup[0].runeName,
                            runeDescription: runeGroup[0].runeDescription,
                            runeAvatar: runeGroup[0].runeAvatar,
                            rank: runeGroup.length
                        }
                    });
                });

                this.runes = runes;
                this.loading = false;
            })
            .catch(() => {
                this.error = true;
            });
    }
}
