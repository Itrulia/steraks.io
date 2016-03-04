/// <reference path='../_reference.d.ts' />

module Summoner.Controller {
    'use strict';
    // @ngInject

    export class SummonerRunesController {
        public loading = true;
        public error = false;
        public runes = [];

        constructor(private $scope, private $q:angular.IQService, private SummonerService:App.Service.SummonerService, public summoner:any) {
            this.SummonerService.getRunes(this.summoner.id)
                .then((runes:any) => {
                    _.forEach(runes, (rune:any) => {
                        var runeGroups = _.groupBy(rune.slots, 'runeId');
                        rune.slots = _.map(runeGroups, function (runeGroup:any[], key) {
                            return {
                                runeId: runeGroup[0].runeId,
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
}
