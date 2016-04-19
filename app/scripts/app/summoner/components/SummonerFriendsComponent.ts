module Summoner {
    'use strict';

    export class SummonerFriendsComponent {
        public templateUrl = 'summoner/components/summoner-friends.html';
        public bindings = {summoner: '<'};
        public controller = 'SummonerFriendsController as ctrl'
    }

    // @ngInject
    export class SummonerFriendsController {
        public summoner:any;
        public friends:any;
        public loading = true;

        public constructor(protected $scope:any, protected SummonerService:App.SummonerService) {
            this.SummonerService.getFriends(this.summoner.id)
                .then((friends:any[]) => {
                    let summonerIds:any = _.map(friends, (friend) => {
                        return friend.summonerId;
                    });

                    return this.SummonerService.getSummoner(summonerIds).then((summoners:any) => {

                        if (!_.isArray(summonerIds)) {
                            summoners = [summoners];
                        }

                        _.forEach(summoners, (summoner:any) => {
                            friends[summoner.id].summoner = summoner;
                        });

                        this.friends = _.orderBy(_.values(friends), ['games', 'percent'], ['desc', 'desc']);
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}