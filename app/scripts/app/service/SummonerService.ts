module App {
    'use strict';
    // @ngInject

    export class SummonerService {
        constructor(private $q:angular.IQService,
                    private CacheService:App.CacheService,
                    private SummonerResource:App.SummonerResource,
                    private StaticService:App.StaticService) {
        }

        public getSummoner(summonerId:number) {
            var cacheKey = 'summoner:' + summonerId;
            var data:any = this.CacheService.pull(cacheKey);

            if (data === null) {
                data = this.SummonerResource.getSummoner(summonerId).then((summoner) => {
                    this.CacheService.remember(cacheKey, summoner);
                    return summoner;
                })
            }

            return this.$q.when(data)
        }

        public getRank(summonerId:number) {
            var cacheKey = 'summoner:' + summonerId + ':rank';
            var data:any = this.CacheService.pull(cacheKey);

            if (data === null) {
                data = this.SummonerResource.getRank(summonerId).then((rank) => {
                    this.CacheService.remember(cacheKey, rank);
                    return rank;
                })
            }

            return this.$q.when(data)
        }

        public getStats(summonerId:number) {
            var cacheKey = 'summoner:' + summonerId + ':stats';
            var data:any = this.CacheService.pull(cacheKey);

            if (data === null) {
                data = this.SummonerResource.getStats(summonerId).then((stats) => {
                    this.CacheService.remember(cacheKey, stats);
                    return stats;
                })
            }

            return this.$q.when(data)
        }

        public getMasteries(summonerId:number) {
            var cacheKey = 'summoner:' + summonerId + ':masteries';
            var data:any = this.CacheService.pull(cacheKey);

            if (data === null) {
                data = this.SummonerResource.getMasteries(summonerId).then((masteries) => {
                    this.CacheService.remember(cacheKey, masteries);
                    return masteries;
                })
            }

            return this.$q.when(data)
        }

        public getCounters(summonerId:number) {
            var cacheKey = 'summoner:' + summonerId + ':counters';
            var data:any = this.CacheService.pull(cacheKey);

            if (data === null) {
                data = this.SummonerResource.getCounters(summonerId).then((counters) => {
                    this.CacheService.remember(cacheKey, counters);
                    return counters;
                })
            }

            return this.$q.when(data)
        }

        public getSynergies(summonerId:number) {
            var cacheKey = 'summoner:' + summonerId + ':synergies';
            var data:any = this.CacheService.pull(cacheKey);

            if (data === null) {
                data = this.SummonerResource.getSynergies(summonerId).then((synergies) => {
                    this.CacheService.remember(cacheKey, synergies);
                    return synergies;
                })
            }

            return this.$q.when(data)
        }

        public getRunes(summonerId:number) {
            var cacheKey = 'summoner:' + summonerId + ':runes';
            var data:any = this.CacheService.pull(cacheKey);

            if (data === null) {
                data = this.SummonerResource.getRunes(summonerId).then((runes) => {
                    this.CacheService.remember(cacheKey, runes);
                    return runes;
                })
            }

            return this.$q.when(data)
        }

        public getMatches(summonerId:number) {
            return this.SummonerResource.getMatches(summonerId);
        }

        public setCounterSynergyStaticData(counters:any) {
            var champions:any = this.StaticService.getChampions();
            var realm:any = this.StaticService.getRealm();

            this.$q.all([realm, champions]).then((response) => {
                realm = response[0];
                champions = response[1];

                _.forEach(counters, (counter) => {
                    var champion = champions[counter.championId];
                    if (champion) {
                        counter.championName = champion.name;
                        counter.championAvatar = realm.cdn + '/' + realm.dd + '/img/champion/' + champion.image.full;
                    }
                });
            });
        }

        public setStatsStaticData(stats:any) {
            var champions:any = this.StaticService.getChampions();
            var realm:any = this.StaticService.getRealm();

            this.$q.all([realm, champions]).then((response) => {
                realm = response[0];
                champions = response[1];

                _.forEach(stats, (stat) => {
                    var champion = champions[stat.id];
                    if (champion) {
                        stat.championName = champion.name;
                        stat.championAvatar = realm.cdn + '/' + realm.dd + '/img/champion/' + champion.image.full;
                    }
                });
            });
        }
    }
}