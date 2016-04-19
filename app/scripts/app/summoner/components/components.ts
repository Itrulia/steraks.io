/// <reference path='SummonerChampionStatsComponent.ts' />
/// <reference path='SummonerRankComponent.ts' />
/// <reference path='SummonerCounterComponent.ts' />
/// <reference path='SummonerChampionComponent.ts' />
/// <reference path='SummonerRunesComponent.ts' />
/// <reference path='SummonerMasteryPageComponent.ts' />
/// <reference path='SummonerFriendsComponent.ts' />
/// <reference path='SummonerChampionMasteryComponent.ts' />

let summonerComponentsApp:angular.IModule = angular.module('summoner.components', []);

// Champion Stats
summonerComponentsApp.component('summonerChampionStats', new Summoner.SummonerChampionStatsComponent());
summonerComponentsApp.controller('SummonerChampionStatsController', Summoner.SummonerChampionStatsController);
// Champion Games
summonerComponentsApp.component('summonerChampion', new Summoner.SummonerChampionComponent());
summonerComponentsApp.controller('SummonerChampionController', Summoner.SummonerChampionController);
// Champion Mastery
summonerComponentsApp.component('summonerChampionMastery', new Summoner.SummonerChampionMasteryComponent());
summonerComponentsApp.controller('SummonerChampionMasteryController', Summoner.SummonerChampionMasteryController);
// Counter
summonerComponentsApp.component('summonerCounter', new Summoner.SummonerCounterComponent());
summonerComponentsApp.controller('SummonerCounterController', Summoner.SummonerCounterController);
// Friends
summonerComponentsApp.component('summonerFriends', new Summoner.SummonerFriendsComponent());
summonerComponentsApp.controller('SummonerFriendsController', Summoner.SummonerFriendsController);
// Runes
summonerComponentsApp.component('summonerRunes', new Summoner.SummonerRunesComponent());
summonerComponentsApp.controller('SummonerRunesController', Summoner.SummonerRunesController);
// Mastery Page
summonerComponentsApp.component('summonerMasteryPage', new Summoner.SummonerMasteryPageComponent());
summonerComponentsApp.controller('SummonerMasteryPageController', Summoner.SummonerMasteryPageController);
// Rank
summonerComponentsApp.component('summonerRank', new Summoner.SummonerRankComponent());
summonerComponentsApp.controller('SummonerRankController', Summoner.SummonerRankController);

