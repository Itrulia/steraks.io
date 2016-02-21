module App.Component {
    export class ParticipantSkillOrder {
        public templateUrl = 'components/participant-skill-order.html';
        public bindings = {participant: '<', match: '<'};
        public controllerAs = 'ctrl';
        public controller = ['$scope', '$q', 'StaticService', function ($scope, $q:angular.IQService, StaticService:App.Service.StaticService) {
            this.skillOrder = [];

            $scope.$watch('ctrl.participant', () => {
                var skillOrder = [];

                if (this.match !== null) {
                    _.forEach(this.match.timeline.frames, (frame:any) => {
                        if (!frame.hasOwnProperty('events') || frame.events === null) return;

                        var skill = frame.events.filter((event:any) => {
                            return (event.eventType === 'SKILL_LEVEL_UP') && (event.participantId === this.participant.participantId);
                        });

                        if (skill.length !== 0) {
                            skillOrder = skillOrder.concat(skill);
                        }
                    });

                    var champions = StaticService.getChampions();
                    var realm = StaticService.getRealm();

                    $q.all([realm, champions]).then((response) => {
                        var realm = response[0];
                        var champions = response[1];

                        this.participant.spells = _.map(champions[this.participant.championId].spells, (spell, index) => {
                            var key:string = null;

                            switch(index) {
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

                            return {
                                spellKey: key,
                                spellName: spell.name,
                                spellAvatar: realm.cdn + '/' + realm.dd + '/img/spell/' + spell.image.full
                            }
                        });
                    });
                }

                this.skillOrder = skillOrder;
            });
        }];
    }
}