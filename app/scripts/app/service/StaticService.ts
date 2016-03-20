module App {
    'use strict';
    // @ngInject

    export class StaticService {
        public promises:any = {};

        constructor(private $q:angular.IQService, private StaticResource:App.StaticResource) {

        }

        public getRealm() {
            if (typeof this.promises.realm !== 'undefined') {
                return this.$q.when(this.promises.realm);
            }

            return this.promises.realm = this.StaticResource.getRealm()
                .then((realm) => {
                    this.promises.realm = realm;

                    return realm;
                }).catch(() => {
                    delete this.promises.realm;
                });
        }

        public getRunes() {
            if (typeof this.promises.runes !== 'undefined') {
                return this.$q.when(this.promises.runes);
            }

            return this.promises.runes = this.StaticResource.getRunes()
                .then((runes) => {
                    this.promises.runes = runes;

                    return runes;
                }).catch(() => {
                    delete this.promises.runes;
                });
        }

        public getMasteries() {
            if (typeof this.promises.masteries !== 'undefined') {
                return this.$q.when(this.promises.masteries);
            }

            return this.promises.masteries = this.StaticResource.getMasteries()
                .then((masteries) => {
                    this.promises.masteries = masteries;

                    return masteries;
                }).catch(() => {
                    delete this.promises.masteries;
                });
        }

        public getChampions() {
            if (typeof this.promises.champions !== 'undefined') {
                return this.$q.when(this.promises.champions);
            }

            return this.promises.champions = this.StaticResource.getChampions()
                .then((champions) => {
                    this.promises.champions = champions;

                    return champions;
                }).catch(() => {
                    delete this.promises.champions;
                });
        }

        public getItems() {
            if (typeof this.promises.items !== 'undefined') {
                return this.$q.when(this.promises.items);
            }

            return this.promises.items = this.StaticResource.getItems()
                .then((items) => {
                    this.promises.items = items;

                    return items;
                }).catch(() => {
                    delete this.promises.items;
                });
        }

        public getSummonerSpells() {
            if (typeof this.promises.summonerSpells !== 'undefined') {
                return this.$q.when(this.promises.summonerSpells);
            }

            return this.promises.summonerSpells = this.StaticResource.getSummonerSpells()
                .then((summonerSpells) => {
                    this.promises.summonerSpells = summonerSpells;

                    return summonerSpells;
                }).catch(() => {
                    delete this.promises.summonerSpells;
                });
        }

        public getSummonerIcons() {
            if (typeof this.promises.summonerIcons !== 'undefined') {
                return this.$q.when(this.promises.summonerIcons);
            }

            return this.promises.summonerIcons = this.StaticResource.getSummonerIcons()
                .then((summonerIcons) => {
                    this.promises.icons = summonerIcons;

                    return summonerIcons;
                }).catch(() => {
                    delete this.promises.icons;
                });
        }
    }
}