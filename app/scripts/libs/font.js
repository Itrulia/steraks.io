'use strict';

(function (window) {
	localStorage.clear();
	var html = document.getElementsByTagName('html')[0];

	var Font = function(options) {
		var font = options.font;
		var className = options.className;

		html.classList.add('font-' + className + '-loading');

		var fileIsCached = function(href) {
			return localStorage.getItem(href) !== null;
		};

		var injectFontsStylesheetAjax = function() {
			var xhr = new XMLHttpRequest();

			xhr.open('GET', font, true);
			xhr.addEventListener('load', function () {
				injectFontsStylesheetRaw(this.responseText);
				localStorage.setItem(font, this.responseText);
			});

			xhr.send();
		};

		var injectFontsStylesheetRaw = function(text) {
			var style = document.createElement('style');
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
