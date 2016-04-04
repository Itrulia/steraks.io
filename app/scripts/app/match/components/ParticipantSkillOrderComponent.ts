module Match {
    'use strict';

    export class ParticipantSkillOrderComponent {
        public templateUrl = 'match/components/participant-skill-order.html';
        public bindings = {participant: '<', match: '<'};
        public controller = 'ParticipantSkillOrderController as ctrl'
    }

    // @ngInject
    export class ParticipantSkillOrderController {
        public participant:any;
        public match:any;
        public skillOrder:any[];

        public constructor(public $scope, public $q:angular.IQService, public StaticService:App.StaticService) {
            this.$scope.$watch('ctrl.participant', () => {
                var skillOrder = [];

                if (this.match !== null) {
                    skillOrder = this.getSkillOrderEventsOfParticipant(this.match, this.participant);
                    this.mapChampionSpellsOfParticipant(this.participant);
                }

                this.skillOrder = skillOrder;
            });
        }

        private mapSpellIndexToKey(index:number) {
            var key:string;

            switch (index) {
                case 0:
                    key = 'Q';
                    break;
                case 1:
                    key = 'W';
                    break;
                case 2:
                    key = 'E';
                    break;
                case 3:
                    key = 'R';
                    break;
            }

            return key;
        }

        protected getSkillOrderEventsOfParticipant(match:any, participant:any) {
            var skillOrder = [];

            _.forEach(match.timeline.frames, (frame:any) => {
                if (!frame.hasOwnProperty('events') || frame.events === null) return;

                var skill = frame.events.filter((event:any) => {
                    return (event.eventType === 'SKILL_LEVEL_UP') && (event.participantId === participant.participantId);
                });

                if (skill.length !== 0) {
                    skillOrder = skillOrder.concat(skill);
                }
            });

            return skillOrder;
        }

        protected mapChampionSpellsOfParticipant(participant:any) {
            var realm:any = this.StaticService.getRealm();
            var champions:any = this.StaticService.getChampions();

            this.$q.all([realm, champions]).then((response) => {
                realm = response[0];
                champions = response[1];

                participant.spells = _.map(champions[participant.championId].spells, (spell:any, index) => {
                    var key:string = this.mapSpellIndexToKey(index);

                    return {
                        spellKey: key,
                        spellName: spell.name,
                        spellAvatar: realm.cdn + '/' + realm.dd + '/img/spell/' + spell.image.full
                    }
                });
            });
        }
    }
}