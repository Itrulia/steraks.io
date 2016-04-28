'use strict';

import {MatchComponents} from './components/MatchComponents';
import {MatchMode} from './filters/MatchMode';
import {MinionsPerMinute} from './filters/MinionsPerMinute';
import {Position} from './filters/Position';
import './components/components';

export let Match:angular.IModule = angular.module('match', [
    MatchComponents.name,
    'ui.router',
    'chart.js'
]);

Match.filter('matchMode', MatchMode);
Match.filter('csPerMinute', MinionsPerMinute);
Match.filter('position', Position);
