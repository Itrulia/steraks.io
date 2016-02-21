module App.Service {
    'use strict';
    // @ngInject

    export class SummonerService {
        constructor(private $q:angular.IQService,
                    private CacheService:App.Service.CacheService,
                    private SummonerResource:App.Resource.SummonerResource,
                    private StaticService:App.Service.StaticService) {
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

        public setStatsStaticData(stats:any) {
            var champions = this.StaticService.getChampions();
            var realm = this.StaticService.getRealm();

            this.$q.all([realm, champions]).then((response) => {
                var realm = response[0];
                var champions = response[1];

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