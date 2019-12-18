/**
 * 
 * @name:       translatorjs
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

	// Translating the DOM
	translator.translate('br');
});
