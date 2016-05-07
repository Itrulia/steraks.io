"use strict";

import * as angular from "angular";
import {Match} from "./match/match";
import {Ranked} from "./ranked/ranked";
import {Summoner} from "./summoner/summoner";
import {Search} from "./search/search";
import {SideMenu} from "./sidemenu/sidemenu";
import {Authentication} from "./authentication/authentication";
import {MatchResource} from "./resource/MatchResource";
import {MatchService} from "./service/MatchService";
import {MatchStaticDataService} from "./service/MatchStaticDataService";
import {RankingStatsResource} from "./resource/RankingStatsResource";
import {RankingStatsService} from "./service/RankingStatsService";
import {StaticResource} from "./resource/StaticResource";
import {StaticService} from "./service/StaticService";
import {SummonerResource} from "./resource/SummonerResource";
import {SummonerService} from "./service/SummonerService";
import {RegionService} from "./service/RegionService";
import {CacheService} from "./service/CacheService";
import {KeystoneMasteryService} from "./service/KeystoneMasteryService";
import {ServerErrorInterceptor} from "./interceptors/ServerErrorInterceptor";
import {Team} from "./filters/Team";
import {GameLength} from "./filters/Game";
import {HumanizeDate, Duration} from "./filters/Date";
import {StickToTopDirective} from "./directives/StickToTopDirective";
import {PaperInputDirective} from "./directives/PaperInputDirective";
import {PaperDropdownDirective} from "./directives/PaperDropdownDirective";
import {PaperRippleDirective} from "./directives/PaperRippleDirective";
import {ErrorComponent, ErrorComponentController} from "./components/ErrorComponent";
import {MatchSummaryComponent, MatchSummaryController} from "./components/MatchSummaryComponent";
import {SpinnerComponent} from "./components/SpinnerComponent";

export let Application:angular.IModule = angular.module('steraks', [
    Match.name,
    Ranked.name,
    Summoner.name,
    Search.name,
    SideMenu.name,
    Authentication.name,
    'ui.router',
    'LocalForageModule',
    'angular-google-analytics'
]);

/////////////////////////
/// General
/////////////////////////

// Spinner Component
Application.component('spinner', new SpinnerComponent());

// Error Component
Application.component('error', new ErrorComponent());
Application.controller('ErrorComponentController', ErrorComponentController);

/////////////////////////
/// Match
/////////////////////////

// Summary
Application.component('matchSummary', new MatchSummaryComponent());
Application.controller('MatchSummaryController', MatchSummaryController);

Application.service('MatchResource', MatchResource);
Application.service('MatchService', MatchService);
Application.service('MatchStaticDataService', MatchStaticDataService);

Application.service('RankingStatsResource', RankingStatsResource);
Application.service('RankingStatsService', RankingStatsService);

Application.service('StaticResource', StaticResource);
Application.service('StaticService', StaticService);

Application.service('SummonerResource', SummonerResource);
Application.service('SummonerService', SummonerService);
Application.service('RegionService', RegionService);

Application.service('CacheService', CacheService);
Application.service('KeystoneMasteryService', KeystoneMasteryService);

//
Application.factory('ServerErrorInterceptor', ServerErrorInterceptor);

//
Application.filter('team', Team);
Application.filter('gameLength', GameLength);

// Date
Application.filter('humanizeDate', HumanizeDate);
Application.filter('duration', Duration);

//
Application.directive('stickToTop', StickToTopDirective.instance());
Application.directive('paperInput', PaperInputDirective.instance());
Application.directive('paperDropdown', PaperDropdownDirective.instance());
Application.directive('paperRipple', PaperRippleDirective.instance());