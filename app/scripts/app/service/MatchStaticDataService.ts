module App {
    'use strict';
    // @ngInject

    export class MatchStaticDataService {
        public realm:any;
        public items:any;
        public runes:any;
        public champions:any;

        public constructor(private $q, private StaticService:App.StaticService) {

        }

        public setRuneStaticData(match:any) {
            _.forEach(match.participants, (participant:any) => {
                this.setRuneData(participant);
            });
        }

        public setRuneData(participant:any) {
            var realm:any = this.StaticService.getRealm();
            var runes:any = this.StaticService.getRunes();

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
            var realm:any = this.StaticService.getRealm();
            var items:any = this.StaticService.getItems();
            var champions:any = this.StaticService.getChampions();

            this.$q.all([realm, champions, items]).then((response) => {
                realm = response[0];
                champions = response[1];
                items = response[2];

                _.forEach(match.timeline.frames, (frame:any) => {
                    if (!angular.isDefined(frame.events)) {
                        return;
                    }

                    var itemEvents = frame.events.filter((event:any) => {
                        return event.hasOwnProperty('itemId') && event.participantId !== 0;
                    });

                    var skillEvents = frame.events.filter((event:any) => {
                        return event.hasOwnProperty('skillSlot') && event.participantId !== 0;
                    });

                    _.forEach(itemEvents, (event:any) => {
                        event.itemName = items[event.itemId].name;
                        event.itemAvatar = realm.cdn + '/' + realm.dd + '/img/item/' + items[event.itemId].image.full;
                    });

                    _.forEach(skillEvents, (event:any) => {
                        var championId = match.participants[event.participantId - 1].championId;
                        var champion = champions[championId];
                        var spell = champion.spells[event.skillSlot - 1];

                        event.spellName = spell.name;
                        event.spellAvatar = realm.cdn + '/' + realm.dd + '/img/spell/' + spell.image.full;
                    });
                });
            });
        }
    }
}
