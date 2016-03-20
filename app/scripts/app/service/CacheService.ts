module App {
    'use strict';
    //@ngInject

    export class CacheService {
        public constructor(private $q:angular.IQService, private $localForage: angular.localForage.ILocalForageService) {

        }

        public pull(key) {
            return this.$localForage.getItem(key).then((item) => {
                if (item == null) {
                    this.forget(key);
                    return this.$q.reject('null');
                }

                return item;
            });
        }

        public remember(key, value, timeout = null) {
            timeout = timeout || moment.utc().add(5, 'minutes').format('X');

            if (value == null) {
                this.forget(key);

                return;
            }

            return this.$localForage.setItem(key, value);
        }

        public clear() {
            return this.$localForage.clear();
        }

        public forget(key) {
            return this.$localForage.removeItem(key);
        }
    }
}