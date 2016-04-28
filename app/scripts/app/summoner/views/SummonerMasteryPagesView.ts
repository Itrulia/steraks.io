/// <reference path='../../_reference.d.ts' />

'use strict';

@Component('summoner.views', 'summonerMasteryPages', {
    bindings: {summoner: '<'},
    templateUrl: 'summoner/masteries.html',
    controllerAs: 'ctrl',
})
class SummonerMasteryPagesController {
    public loading = true;
    public summoner:any;
    public trees:any;
    public pages:any;
    public page:any;

    // @ngInject
    constructor(
        private $state:any,
        private $q:angular.IQService,
        private SummonerService:App.SummonerService,
        private StaticService:App.StaticService
    ) {
        this.$state.current.data.title = this.summoner.name + '\'s Masteries';
        let realm:any = this.StaticService.getRealm();
        let masteries:any = this.StaticService.getMasteries();
        let masteryPages:any = this.SummonerService.getMasteries(this.summoner.id);

        this.$q.all([realm, masteries, masteryPages]).then((response:any) => {
            realm = response[0];
            masteries = response[1];
            this.pages = response[2];
            this.page = this.pages[0];

            _.forEach(masteries.tree, (tree:any) => {
                _.forEach(tree, (row:any) => {
                    _.forEach(row.masteryTreeItems, (mastery:any) => {
                        if (mastery === null) return;

                        let masteryData = masteries.data[mastery.masteryId];
                        mastery.name = masteryData.name;
                        mastery.description = masteryData.description;
                        mastery.masteryAvatar = realm.cdn + '/' + realm.dd + '/img/mastery/' + masteryData.image.full;
                    });
                });
            });

            this.trees = masteries.tree;
            this.loading = false;
        });
    }
}
