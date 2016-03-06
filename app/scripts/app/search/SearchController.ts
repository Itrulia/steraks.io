/// <reference path='../_reference.d.ts' />

module Search {
    'use strict';
    // @ngInject

    export class SearchController {
        public summoner:any;

        constructor(private $scope:angular.IScope, private $state) {

        }

        public search() {
            this.$state.go('summoner.matches', {summonerId: this.summoner});
        }
    }
}