/// <reference path='SummonerChampionsView.ts' />
/// <reference path='SummonerCountersView.ts' />
/// <reference path='SummonerSynergyView.ts' />
/// <reference path='SummonerMatchesAsView.ts' />
/// <reference path='SummonerMatchesAgainstView.ts' />
/// <reference path='SummonerMatchesHistoryView.ts' />
/// <reference path='SummonerMatchesWithView.ts' />
/// <reference path='SummonerRunePagesView.ts' />
/// <reference path='SummonerProfileView.ts' />
/// <reference path='SummonerView.ts' />

var summonerViewsApp:angular.IModule = angular.module('summoner.views', []);

// Summoner
summonerViewsApp.controller('SummonerController', Summoner.SummonerController);
summonerViewsApp.component('summoner', new Summoner.SummonerComponent());
// Runes
summonerViewsApp.controller('SummonerRunePagesController', Summoner.SummonerRunePagesController);
summonerViewsApp.component('summonerRunePages', new Summoner.SummonerRunePagesComponent());
// Profile
summonerViewsApp.controller('SummonerProfileController', Summoner.SummonerProfileController);
summonerViewsApp.component('summonerProfile', new Summoner.SummonerProfileComponent());
// Champions
summonerViewsApp.controller('SummonerChampionsController', Summoner.SummonerChampionsController);
summonerViewsApp.component('summonerChampions', new Summoner.SummonerChampionsComponent());
// Counters
summonerViewsApp.controller('SummonerCountersController', Summoner.SummonerCountersController);
summonerViewsApp.component('summonerCounters', new Summoner.SummonerCountersComponent());
// Synergy
summonerViewsApp.controller('SummonerSynergyController', Summoner.SummonerSynergyController);
summonerViewsApp.component('summonerSynergy', new Summoner.SummonerSynergyComponent());
// Matches
summonerViewsApp.controller('SummonerMatchesHistoryController', Summoner.SummonerMatchesHistoryController);
summonerViewsApp.component('summonerMatchesHistory', new Summoner.SummonerMatchesHistoryComponent());
// Matches As
summonerViewsApp.controller('SummonerMatchesAsController', Summoner.SummonerMatchesAsController);
summonerViewsApp.component('summonerMatchesAs', new Summoner.SummonerMatchesAsComponent());
// Matches Against
summonerViewsApp.controller('SummonerMatchesAgainstController', Summoner.SummonerMatchesAgainstController);
summonerViewsApp.component('summonerMatchesAgainst', new Summoner.SummonerMatchesAgainstComponent());
// Matches With
summonerViewsApp.controller('SummonerMatchesWithController', Summoner.SummonerMatchesWithController);
summonerViewsApp.component('summonerMatchesWith', new Summoner.SummonerMatchesWithComponent());