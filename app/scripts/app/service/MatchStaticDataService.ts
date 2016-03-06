module App {
    'use strict';
    // @ngInject

    export class MatchStaticDataService {
        public realm:any;
        public champions:any;
        public items:any;
        public summonerSpells:any;
        public masteries:any;

        public constructor(private $q, private StaticService:App.StaticService) {
            this.masteries = this.StaticService.getMasteries();
            this.realm = this.StaticService.getRealm();
            this.champions = this.StaticService.getChampions();
            this.summonerSpells = this.StaticService.getSummonerSpells();
            this.items = this.StaticService.getItems();
            this.realm = this.StaticService.getRealm();
        }

        public setMatchStaticData(match:any) {
            _.forEach(match.participants, (participant:any) => {
                this.setChampionData(participant);
                this.setItemData(participant);
                this.setSummonerSpellData(participant);
                this.setMasteryData(participant);
            });

            this.setTimelineStaticData(match);
        }

        public setMasteryData(participant:any) {
            this.$q.all([this.realm, this.masteries]).then((response) => {
                this.realm = response[0];
                this.masteries = response[1];

                _.forEach(participant.masteries, (mastery:any) => {
                    mastery.masteryName = this.masteries.data[mastery.masteryId].name;
                    mastery.masteryAvatar = this.realm.cdn + '/' + this.realm.dd + '/img/mastery/' + this.masteries.data[mastery.masteryId].image.full;
                });
            });
        }

        public setChampionData(participant:any) {
            this.$q.all([this.realm, this.champions]).then((response) => {
                this.realm = response[0];
                this.champions = response[1];

                participant.championName = this.champions[participant.championId].name;
                participant.championAvatar = this.realm.cdn + '/' + this.realm.dd + '/img/champion/' + this.champions[participant.championId].image.full;
            });
        }

        public setSummonerSpellData(participant:any) {
            var realm:any = this.StaticService.getRealm();


            this.$q.all([this.realm, this.summonerSpells]).then((response) => {
                this.realm = response[0];
                this.summonerSpells = response[1];

                participant.spell1Name = this.summonerSpells[participant.spell1Id].name;
                participant.spell1Avatar = this.realm.cdn + '/' + this.realm.dd + '/img/spell/' + this.summonerSpells[participant.spell1Id].image.full;

                participant.spell2Name = this.summonerSpells[participant.spell2Id].name;
                participant.spell2Avatar = this.realm.cdn + '/' + this.realm.dd + '/img/spell/' + this.summonerSpells[participant.spell2Id].image.full;
            });
        }

        public setItemData(participant:any) {
            this.$q.all([this.realm, this.items]).then((response) => {
                this.realm = response[0];
                this.items = response[1];

                var baseurl = this.realm.cdn + '/' + this.realm.dd + '/img/item/';
                participant.stats.items = [
                    {
                        itemName: (this.items[participant.stats.item0]) ? this.items[participant.stats.item0].name : '',
                        itemAvatar: (this.items[participant.stats.item0]) ? baseurl + this.items[participant.stats.item0].image.full : ''
                    },
                    {
                        itemName: (this.items[participant.stats.item1]) ? this.items[participant.stats.item1].name : '',
                        itemAvatar: (this.items[participant.stats.item1]) ? baseurl + this.items[participant.stats.item1].image.full : ''
                    },
                    {
                        itemName: (this.items[participant.stats.item2]) ? this.items[participant.stats.item2].name : '',
                        itemAvatar: (this.items[participant.stats.item2]) ? baseurl + this.items[participant.stats.item2].image.full : ''
                    },
                    {
                        itemName: (this.items[participant.stats.item3]) ? this.items[participant.stats.item3].name : '',
                        itemAvatar: (this.items[participant.stats.item3]) ? baseurl + this.items[participant.stats.item3].image.full : ''
                    },
                    {
                        itemName: (this.items[participant.stats.item4]) ? this.items[participant.stats.item4].name : '',
                        itemAvatar: (this.items[participant.stats.item4]) ? baseurl + this.items[participant.stats.item4].image.full : ''
                    },
                    {
                        itemName: (this.items[participant.stats.item5]) ? this.items[participant.stats.item5].name : '',
                        itemAvatar: (this.items[participant.stats.item5]) ? baseurl + this.items[participant.stats.item5].image.full : ''
                    },
                    {
                        itemName: (this.items[participant.stats.item6]) ? this.items[participant.stats.item6].name : '',
                        itemAvatar: (this.items[participant.stats.item6]) ? baseurl + this.items[participant.stats.item6].image.full : ''
                    },
                ];
            });
        }

        public setTimelineStaticData(match:any) {
            this.$q.all([this.realm, this.champions, this.items]).then((response) => {
                this.realm = response[0];
                this.champions = response[1];
                this.items = response[2];

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
                        event.itemName = this.items[event.itemId].name;
                        event.itemAvatar = this.realm.cdn + '/' + this.realm.dd + '/img/item/' + this.items[event.itemId].image.full;
                    });

                    _.forEach(skillEvents, (event:any) => {
                        var championId = match.participants[event.participantId - 1].championId;
                        var champion = this.champions[championId];
                        var spell = champion.spells[event.skillSlot - 1];

                        event.spellName = spell.name;
                        event.spellAvatar = this.realm.cdn + '/' + this.realm.dd + '/img/spell/' + spell.image.full;
                    });
                });
            });
        }
    }
}
