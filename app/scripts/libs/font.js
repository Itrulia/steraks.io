'use strict';

(function (window) {
	let html = document.getElementsByTagName('html')[0];

	let Font = function(options) {
		let font = options.font;
		let className = options.className;

		html.classList.add('font-' + className + '-loading');

		let fileIsCached = function(href) {
			return localStorage.getItem(href) !== null;
		};

		let injectFontsStylesheetAjax = function() {
			let xhr = new XMLHttpRequest();

			xhr.open('GET', font, true);
			xhr.addEventListener('load', function () {
				injectFontsStylesheetRaw(this.responseText);
				localStorage.setItem(font, this.responseText);
			});

			xhr.send();
		};

		let injectFontsStylesheetRaw = function(text) {
			let style = document.createElement('style');
			style.innerHTML = text;
			document.getElementsByTagName('head')[0].appendChild(style);

			html.classList.remove('font-' + className + '-loading');
			html.classList.add('font-' + className + '-loaded');
		};

		if (fileIsCached(font)){
			injectFontsStylesheetRaw(localStorage.getItem(font));
		} else {
			injectFontsStylesheetAjax();
		}
	};

	if (typeof window.define === 'function' && window.define.amd) {
		window.define([], function() {
			return Font;
		});
	}

	window.Font = Font;
})(window);
