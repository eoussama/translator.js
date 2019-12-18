/**
 * 
 * @name:       eo-translatorjs
 * @version:    3.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/eo-translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */

'use strict';

window.addEventListener('load', () => {

	// The dictionary
	var dictionary = {
		'en': {
			'greeting': 'Hello!'
		},
		'fr': {
			'greeting': 'Bonjour!'
		},
		'es': {
			'greeting': 'Hola!'
		},
		'br': {
			'greeting': 'Jola!'
		}
	};

	// The translator
	var translator = new EOTranslator(dictionary);

	// Translating an input
	document
		.getElementById('translateBtn')
		.addEventListener('click', function () {
			var input = translator.translate('greeting', 'es');
			alert(input);
		});

	// Translating a DOM element
	var target = document.getElementById('target');
	translator.translateElement(target);

	// Global translation
	var globalParent = document.getElementById('global-parent');

	translator.translateDOM(globalParent);
	document
		.getElementById('globalTranslate')
		.addEventListener('change', function (e) {
			translator.translateDOM(globalParent, e.target.value);
		});
});
