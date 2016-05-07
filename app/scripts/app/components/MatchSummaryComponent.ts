'use strict';

import * as _ from 'lodash';
import {KeystoneMasteryService} from "../service/KeystoneMasteryService";

export class MatchSummaryComponent implements angular.IComponentOptions {
    public templateUrl = 'components/match-summary.html';
    public bindings:any = {summoner: '<', match: '<'};
    public controller = 'MatchSummaryController as ctrl';
}

export class MatchSummaryController {
    public summoner:any;
    public match:any;
    public player:any;

    // @ngInject
    constructor(private KeystoneMasteryService:KeystoneMasteryService) {
        this.player = _.filter(this.match.participants, (element:any) => {
            return element.player.summonerId === this.summoner.id;
        })[0];

        this.player.keystone = KeystoneMasteryService.getParticipantKeystone(this.player);
    }
}