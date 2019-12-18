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
		 * @param {object} dict The translation dictionary
		 * @param {string} lang The default language
		 */
		constructor(dict, lang) {
			this.dictionary = dict || {};
			this.language = lang || 'en';
		}

		//#endregion

		//#region Methods

		/**
		 * Translates an input value
		 *
		 * @param {string} input The input value to translate
		 * @param {string} lang The language to translate to
		 */
		translate(input = '', lang) {
			var language = lang || this.language;
			return this.dictionary[language][input] || input;
		}

		/**
		 * Translates the contents of a DOM elemnt
		 * 
		 * @param {HTMLElement} DOMElement The DOM element to translate the content of
		 * @param {string} lang The language to translate to
		 */
		translateElement(DOMElement, lang) {
			if (DOMElement) {
				var language = lang || this.language;
				var input = DOMElement.textContent || DOMElement.innerText || DOMElement.innerHTML;

				DOMElement.textContent = this.translate(input, language);
			}
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
