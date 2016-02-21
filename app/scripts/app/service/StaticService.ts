module App.Service {
    'use strict';
    // @ngInject

    export class StaticService {
        public promises:any = {};

        constructor(private $q:angular.IQService, private CacheService:App.Service.CacheService, private StaticResource:App.Resource.StaticResource) {

        }

        public getRealm() {
            var cacheKey = 'static:realm';
            var data:any = this.CacheService.pull(cacheKey);

            if (typeof this.promises.realm !== 'undefined') {
                data = this.promises.realm;
            } else if (data === null) {
                data = this.StaticResource.getRealm();
                data.then((realm) => {
                    this.CacheService.remember(cacheKey, realm);
                    return realm;
                }).finally(() => {
                    delete this.promises.realm;
                });

                this.promises.realm = data;
            }

            return this.$q.when(data)
        }

        public getChampions() {
            var cacheKey = 'static:champions';
            var data:any = this.CacheService.pull(cacheKey);

            if (typeof this.promises.champions !== 'undefined') {
                data = this.promises.champions;
            } else if (data === null) {
                data = this.StaticResource.getChampions();
                data.then((champions) => {
                    this.CacheService.remember(cacheKey, champions);
                    return champions;
                }).finally(() => {
                    delete this.promises.champions;
                });

                this.promises.champions = data;
            }

            return this.$q.when(data)
        }

        public getItems() {
            var cacheKey = 'static:items';
            var data:any = this.CacheService.pull(cacheKey);

            if (typeof this.promises.items !== 'undefined') {
                data = this.promises.items;
            } else if (data === null) {
                data = this.StaticResource.getItems();
                data.then((items) => {
                    this.CacheService.remember(cacheKey, items);
                    return items;
                }).finally(() => {
                    delete this.promises.items;
                });

                this.promises.items = data;
            }

            return this.$q.when(data)
        }

        public getSummonerSpells() {
            var cacheKey = 'static:summonerSpells';
            var data:any = this.CacheService.pull(cacheKey);

            if (typeof this.promises.summonerSpells !== 'undefined') {
                data = this.promises.summonerSpells;
            } else if (data === null) {
                data = this.StaticResource.getSummonerSpells();
                data.then((summonerSpells) => {
                    this.CacheService.remember(cacheKey, summonerSpells);
                    return summonerSpells;
                }).finally(() => {
                    delete this.promises.summonerSpells;
                });

                this.promises.summonerSpells = data;
            }

            return this.$q.when(data)
        }

        public getSummonerIcons() {
            var cacheKey = 'static:summonerIcons';
            var data:any = this.CacheService.pull(cacheKey);

            if (typeof this.promises.summonerIcons !== 'undefined') {
                data = this.promises.summonerIcons;
            } else if (data === null) {
                data = this.StaticResource.getSummonerIcons();
                data.then((summonerIcons) => {
                    this.CacheService.remember(cacheKey, summonerIcons);
                    return summonerIcons;
                }).finally(() => {
                    delete this.promises.icons;
                });

                this.promises.icons = data;
            }

            return this.$q.when(data)
        }

        public getSpells() {
            var cacheKey = 'static:spells';
            var data:any = this.CacheService.pull(cacheKey);

            if (typeof this.promises.spells !== 'undefined') {
                data = this.promises.spells;
            } else if (data === null) {
                data = this.StaticResource.getSpells();
                data.then((spells) => {
                    this.CacheService.remember(cacheKey, spells);
                    return spells;
                }).finally(() => {
                    delete this.promises.spells;
                });

                this.promises.spells = data;
            }

            return this.$q.when(data)
        }
    }
}