/// <reference path='../../_reference.d.ts' />

module Summoner {
    'use strict';

    export class SummonerRunePagesComponent {
        public bindings = {summoner: '<'};
        public templateUrl = 'summoner/runes.html';
        public controller = 'SummonerRunePagesController as ctrl';
    }

    // @ngInject
    export class SummonerRunePagesController {
        public loading = true;
        public error = false;
        public runes = [];
        public summoner:any;

        constructor(private $scope, private $q:angular.IQService, private SummonerService:App.SummonerService) {
            this.SummonerService.getRunes(this.summoner.id)
                .then((runes:any) => {
                    _.forEach(runes, (rune:any) => {
                        var runeGroups = _.groupBy(rune.slots, 'runeId');
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
}
