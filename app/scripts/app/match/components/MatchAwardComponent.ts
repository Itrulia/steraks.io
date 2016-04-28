'use strict';

import {MatchComponents} from './MatchComponents';
import {Component} from "../../../decorators/AngularComponent";

@Component(MatchComponents, 'matchAward', {
    bindings: {match: '<'},
    templateUrl: 'match/components/match-award.html',
    controllerAs: 'ctrl',
})
class MatchAwardController {
    public match:any;
    public firstBlood:any;
    public mostDamage:any;
    public mostWards:any;

    // @ngInject
    public constructor(public $scope) {
        this.$scope.$watch('ctrl.match', () => {
            if (this.match !== null) {
                this.firstBlood = this.match.participants.filter((participant:any) => {
                    return participant.stats.firstBloodKill;
                })[0];

                this.mostDamage = this.match.participants.sort((participant1:any, participant2:any) => {
                    return participant2.stats.totalDamageDealtToChampions - participant1.stats.totalDamageDealtToChampions;
                })[0];

                this.mostWards = this.match.participants.sort((participant1:any, participant2:any) => {
                    return participant2.stats.visionWardsBoughtInGame - participant1.stats.visionWardsBoughtInGame;
                })[0];
            }
        });
    }
}