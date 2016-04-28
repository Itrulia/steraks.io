import {MatchComponents} from './MatchComponents';
import {StaticService} from "../../service/StaticService";
import {Component} from "../../../decorators/AngularComponent";

'use strict';

@Component(MatchComponents, 'participantMasteries', {
    bindings: {participant: '<'},
    templateUrl: 'match/components/participant-masteries.html',
    controllerAs: 'ctrl',
})
class ParticipantMasteriesController {
    public participant:any;
    public trees:any;
    public loading = true;

    // @ngInject
    public constructor(
        private $q:angular.IQService,
        private StaticService:StaticService
    ) {
        let realm:any = this.StaticService.getRealm();
        let masteries:any = this.StaticService.getMasteries();

        this.$q.all([realm, masteries]).then((response:any) => {
            realm = response[0];
            masteries = response[1];

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