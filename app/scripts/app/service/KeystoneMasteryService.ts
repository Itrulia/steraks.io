module App.Service {
    'use strict';
    //@ngInject

    export class KeystoneMasteryService {
        private keystoneIds = [
          6161, // warlords bloodlust
          6162, // fervor of battle
          6164, //deathfire touch
          6361, //stormraiders surge
          6362, //thunderlords decree
          6363, //windspeakers blessing
          6261, //grasp of the undying
          6262, //strength of the ages
          6263, //bond of stone
        ];

        public getParticipantKeystone(participant:any) {
            return _.filter(participant.masteries, (mastery:any) => {
               return _.indexOf(this.keystoneIds, mastery.masteryId) >= 0;
            })[0];
        }
    }
}