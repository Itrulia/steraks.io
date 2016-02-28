module App.Service {
    'use strict';
    // @ngInject

    export class MatchService {
        public constructor(private $q, private MatchResource:App.Resource.MatchResource, private StaticService:App.Service.StaticService) {

        }

        public getMatch(matchId) {
			return this.MatchResource.getMatch(matchId);
        }

        public setMatchStaticData(match:any) {
            var realm:any = this.StaticService.getRealm();
            var champions:any = this.StaticService.getChampions();
            var items:any = this.StaticService.getItems();
            var spells:any = this.StaticService.getSummonerSpells();

            // champions
            this.$q.all([realm, champions]).then((response) => {
                realm = response[0];
                champions = response[1];

                angular.forEach(match.participants, (participant) => {
                    participant.championName = champions[participant.championId].name;
                    participant.championAvatar = realm.cdn + '/' + realm.dd + '/img/champion/' + champions[participant.championId].image.full;
                });
            });

            // items
            this.$q.all([realm, items]).then((response) => {
                realm = response[0];
                items = response[1];

                angular.forEach(match.participants, (participant) => {
                    var baseurl = realm.cdn + '/' + realm.dd + '/img/item/';
                    participant.stats.items = [
                        {
                            itemName: (items[participant.stats.item0]) ? items[participant.stats.item0].name : '',
                            itemAvatar: (items[participant.stats.item0]) ? baseurl + items[participant.stats.item0].image.full : ''
                        },
                        {
                            itemName: (items[participant.stats.item1]) ? items[participant.stats.item1].name : '',
                            itemAvatar: (items[participant.stats.item1]) ? baseurl + items[participant.stats.item1].image.full : ''
                        },
                        {
                            itemName: (items[participant.stats.item2]) ? items[participant.stats.item2].name : '',
                            itemAvatar: (items[participant.stats.item2]) ? baseurl + items[participant.stats.item2].image.full : ''
                        },
                        {
                            itemName: (items[participant.stats.item3]) ? items[participant.stats.item3].name : '',
                            itemAvatar: (items[participant.stats.item3]) ? baseurl + items[participant.stats.item3].image.full : ''
                        },
                        {
                            itemName: (items[participant.stats.item4]) ? items[participant.stats.item4].name : '',
                            itemAvatar: (items[participant.stats.item4]) ? baseurl + items[participant.stats.item4].image.full : ''
                        },
                        {
                            itemName: (items[participant.stats.item5]) ? items[participant.stats.item5].name : '',
                            itemAvatar: (items[participant.stats.item5]) ? baseurl + items[participant.stats.item5].image.full : ''
                        },
                        {
                            itemName: (items[participant.stats.item6]) ? items[participant.stats.item6].name : '',
                            itemAvatar: (items[participant.stats.item6]) ? baseurl + items[participant.stats.item6].image.full : ''
                        },
                    ];
                });
            });

            // spells
            this.$q.all([realm, spells]).then((response) => {
                realm = response[0];
                spells = response[1];

                angular.forEach(match.participants, (participant) => {
                    participant.spell1Name = spells[participant.spell1Id].name;
                    participant.spell1Avatar = realm.cdn + '/' + realm.dd + '/img/spell/' + spells[participant.spell1Id].image.full;

                    participant.spell2Name = spells[participant.spell2Id].name;
                    participant.spell2Avatar = realm.cdn + '/' + realm.dd + '/img/spell/' + spells[participant.spell2Id].image.full;
                });
            });
        }

        public setTimelineStaticData(match:any) {
            var realm:any = this.StaticService.getRealm();
            var champions:any = this.StaticService.getChampions();
            var items:any = this.StaticService.getItems();

            this.$q.all([realm, champions, items]).then((response) => {
                realm = response[0];
                champions = response[1];
                items = response[2];

                angular.forEach(match.timeline.frames, (frame:any) => {

                    if (!angular.isDefined(frame.events)) {
                        return;
                    }

                    var itemEvents = frame.events.filter((event:any) => {
                        return event.hasOwnProperty('itemId') && event.participantId !== 0;
                    });

                    var skillEvents = frame.events.filter((event:any) => {
                        return event.hasOwnProperty('skillSlot') && event.participantId !== 0;
                    });

                    angular.forEach(itemEvents, (event:any) => {
                        event.itemName = items[event.itemId].name;
                        event.itemAvatar = realm.cdn + '/' + realm.dd + '/img/item/' + items[event.itemId].image.full;
                    });

                    angular.forEach(skillEvents, (event:any) => {
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
