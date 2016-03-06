module App {
    'use strict';
    //@ngInject

    export class CacheService {
        public constructor() {

        }

        private isExpired(object) {
            var now = moment.utc();
            var expires = object.expires;

            return now.diff(expires) > 0;
        }

        public pull(key, fallback = null) {
            var $item = localStorage.getItem(key);
            $item = JSON.parse($item);

            if ($item !== null && !this.isExpired($item)) {
                if ($item.content !== null) {
                    return $item.content;
                }
            } else {
                this.forget(key);
            }

            if (typeof fallback === 'function') {
                return fallback.call();
            } else {
                return fallback || null;
            }
        }

        public remember(key, value, timeout = null) {
            timeout = timeout || moment.utc().add(1, 'weeks');

            if (value === null) {
                this.forget(key);
                return;
            }

            var item = JSON.stringify({
                expires: timeout,
                content: value
            });

            localStorage.setItem(key, item);
        }

        public has(key) {
            var $item = localStorage.getItem(key);
            $item = JSON.parse($item);

            if ($item === null) {
                return false;
            } else if (this.isExpired($item)) {
                this.forget(key);

                return false;
            }

            return true;
        }

        public clear() {
            localStorage.clear();
        }

        public forget(key) {
            localStorage.removeItem(key);
        }
    }
}