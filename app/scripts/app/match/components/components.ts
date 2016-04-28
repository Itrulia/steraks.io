/// <reference path='ParticipantJungleDistributionComponent.ts' />
/// <reference path='ParticipantDamageDistributionComponent.ts' />
/// <reference path='ParticipantBuildOrderComponent.ts' />
/// <reference path='ParticipantSkillOrderComponent.ts' />
/// <reference path='ParticipantRunesComponent.ts' />
/// <reference path='ParticipantMasteriesComponent.ts' />
/// <reference path='MatchAwardComponent.ts' />

let matchComponentsApp:angular.IModule = angular.module('match.components', []);

// Skill Order
matchComponentsApp.component('participantSkillOrder', new Match.ParticipantSkillOrderComponent());
matchComponentsApp.controller('ParticipantSkillOrderController', Match.ParticipantSkillOrderController);
// Build Order
matchComponentsApp.component('participantBuildOrder', new Match.ParticipantBuildOrder());
matchComponentsApp.controller('ParticipantBuildOrderController', Match.ParticipantBuildOrderController);
// Runes
matchComponentsApp.component('participantRunes', new Match.ParticipantRunesComponent());
matchComponentsApp.controller('ParticipantRunesController', Match.ParticipantRunesController);
// Masteries
matchComponentsApp.component('participantMasteries', new Match.ParticipantMasteriesComponent());
matchComponentsApp.controller('ParticipantMasteriesController', Match.ParticipantMasteriesController);
// Damage Distribution
matchComponentsApp.component('participantDamageDistribution', new Match.ParticipantDamageDistributionComponent());
matchComponentsApp.controller('ParticipantDamageDistributionController', Match.ParticipantDamageDistributionController);
// Jungle Distribution
matchComponentsApp.component('participantJungleDistribution', new Match.ParticipantJungleDistributionComponent());
matchComponentsApp.controller('ParticipantJungleDistributionController', Match.ParticipantJungleDistributionController);
// Award
matchComponentsApp.component('matchAward', new Match.MatchAwardComponent());
matchComponentsApp.controller('MatchAwardController', Match.MatchAwardController);