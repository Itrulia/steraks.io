'use strict';

import * as moment from 'moment';
// import * as localForage from 'localforage';
// import * as angularForage from 'angular-localforage';

export class CacheService {

    //@ngInject
    constructor(
        protected $q:angular.IQService,
        protected $localForage:angular.localForage.ILocalForageService
    ) {

    }

    protected isExpired(object:any) {
        if (object == null) return false;

        let now = moment.utc().format('X');
        let expires = object.expires;

        return now > expires;
    }

    public pull(key) {
        return this.$localForage.getItem(key).then((item) => {
            if (item !== null && item.content !== null && !this.isExpired(item)) {
                return item.content;
            }

            if (this.isExpired(item)) {
                this.forget(key);
            }

            return this.$q.reject('null');
        });
    }

    public remember(key, value, timeout = null) {
        timeout = timeout || moment.utc().add(10, 'minutes');
        timeout = timeout.format('X');

        let item = {
            expires: timeout,
            content: value
        };

        return this.$localForage.setItem(key, item);
    }

    public cleanUp() {
        this.$localForage.iterate((item:any, key) => {
            if (item === null || this.isExpired(item) || item.content === null) {
                this.forget(key);
                console.log(key, 'has been cleared');
            }
        });
    }

    public forget(key) {
        return this.$localForage.removeItem(key);
    }
}