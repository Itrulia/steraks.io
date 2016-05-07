'use strict';

import * as _ from 'lodash';
import {StaticService} from "./StaticService";

export class MatchStaticDataService {
    public realm:any;
    public items:any;
    public runes:any;
    public champions:any;

    // @ngInject
    constructor(
        private $q:angular.IQService,
        private StaticService:StaticService
    ) {

    }

    public setRuneStaticData(match:any) {
        _.forEach(match.participants, (participant:any) => {
            this.setRuneData(participant);
        });
    }

    public setRuneData(participant:any) {
        let realm:any = this.StaticService.getRealm();
        let runes:any = this.StaticService.getRunes();

        this.$q.all([realm, runes]).then((response) => {
            realm = response[0];
            runes = response[1];

            _.forEach(participant.runes, (rune:any) => {
                rune.runeName = runes[rune.runeId].name;
                rune.runeDescription = runes[rune.runeId].description;
                rune.runeAvatar = realm.cdn + '/' + realm.dd + '/img/rune/' + runes[rune.runeId].image.full;
            });
        });
    }

    public setTimelineStaticData(match:any) {
        let realm:any = this.StaticService.getRealm();
        let items:any = this.StaticService.getItems();
        let champions:any = this.StaticService.getChampions();

        this.$q.all([realm, champions, items]).then((response) => {
            realm = response[0];
            champions = response[1];
            items = response[2];

            _.forEach(match.timeline.frames, (frame:any) => {
                if (_.isUndefined(frame.events)) {
                    return;
                }

                let itemEvents = frame.events.filter((event:any) => {
                    return event.hasOwnProperty('itemId') && event.participantId !== 0;
                });

                let skillEvents = frame.events.filter((event:any) => {
                    return event.hasOwnProperty('skillSlot') && event.participantId !== 0;
                });

                _.forEach(itemEvents, (event:any) => {
                    event.itemName = items[event.itemId].name;
                    event.itemAvatar = realm.cdn + '/' + realm.dd + '/img/item/' + items[event.itemId].image.full;
                });

                _.forEach(skillEvents, (event:any) => {
                    let championId = match.participants[event.participantId - 1].championId;
                    let champion = champions[championId];
                    let spell = champion.spells[event.skillSlot - 1];

                    event.spellName = spell.name;
                    event.spellAvatar = realm.cdn + '/' + realm.dd + '/img/spell/' + spell.image.full;
                });
            });
        });
    }
}
