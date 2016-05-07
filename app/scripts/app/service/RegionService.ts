'use strict';

import * as _ from 'lodash';

export class RegionService {
    private regions:string[] = [
        'euw',
        'eune',
        'ru',
        'tr',
        'jp',
        'las',
        'lan',
        'br',
        'na',
        'kr',
        'oce',
    ];

    // @ngInject
    constructor(
        private $window:angular.IWindowService,
        private $location:angular.ILocationService
    ) {

    }

    public getAvailableRegions() {
        return this.regions;
    }

    public getRegion() {
        // let host = this.$location.host();
        // let parts = host.split('.');
        //
        // if (parts.length > 2) {
        //     return parts[0];
        // }

        return 'euw';
    }

    public setRegion(region:string) {
        if (_.indexOf(this.regions, region.toLocaleLowerCase()) === -1) {
            throw Error(`Region '${region}' does not exists`);
        }

        this.$window.location.href = `${this.$location.protocol()}://${region}.localhost:3000${this.$location.path()}`;
    }
}