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

(function (obj) {

	/**
	 * The translator class
	 */
	class EOTranslator {

		//#region Constructor

		/**
		 * Instantiates a translator object
		 *
		 * @param {object} dictionary The translation dictionary
		 * @param {string} language The default language
		 */
		constructor(dictionary = {}, language = 'en') {
			this.dictionary = dictionary;
			this.language = language;

			console.log('EO TranslatorJS', this.dictionary, this.language);
		}

		//#endregion

		//#region Methods

		// Translates an input
		translate() {
			console.log('Translating...');
		}

		// Translates a DOM element
		translateElement() {
			console.log('Translating the element...');
		}

		// Translates the DOM
		translateDOM() {
			console.log('Translating the DOM...');
		}

		//#endregion
	}

	if (typeof exports !== 'undefined') {
		module.exports = EOTranslator;
	} else {
		obj.EOTranslator = EOTranslator;
	}
})((typeof window !== 'undefined') ? window : this);
