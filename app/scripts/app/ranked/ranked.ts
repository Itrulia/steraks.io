'use strict';

import {RankedViews} from './views/RankedViews';
import {RankedComponents} from './components/RankedComponents';
import './views/views';
import './components/components';

export let Ranked:angular.IModule = angular.module('ranked', [
    RankedViews.name,
    RankedComponents.name,
    'ui.router'
]);

Ranked.config(['$stateProvider', function ($stateProvider:any) {
    $stateProvider.state('ranked', {
        url: '/match/:matchId',
        component: 'ranked',
        data: {
            toolbar: true,
            search: true,
            footer: true,
        },
        params: {
            player: null
        }
    });
}]);
