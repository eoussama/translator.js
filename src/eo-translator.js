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
		 * @param {string} fallback The fallback value to use
		 * @param {string} lang The language to translate to
		 */
		translate(input = '', lang, fallback) {
			const language = lang || this.language;
			const fallbackVal = fallback || input;

			return this.dictionary[language][input] || fallbackVal || input;
		}

		/**
		 * Translates the contents of a DOM elemnt
		 * 
		 * @param {HTMLElement} DOMElement The DOM element to translate the content of
		 * @param {string} lang The language to translate to
		 */
		translateElement(DOMElement, lang) {
			if (DOMElement) {
				const language = lang || this.language;
				const input = DOMElement.attributes['eo-translator'].value || DOMElement.textContent || DOMElement.innerText || DOMElement.innerHTML;
				const fallbackVal = (DOMElement.attributes['eo-translator-fallback'] || { value: input }).value;

				DOMElement.textContent = this.translate(input, language, fallbackVal);
			}
		}

		// Translates the DOM
		translateDOM(DOMContainer, lang) {
			const language = lang || this.language;
			const container = DOMContainer || document;
			const elements = container.querySelectorAll('[eo-translator]');

			elements.forEach((element) => this.translateElement(element, language));
		}

		//#endregion
	}

	if (typeof exports !== 'undefined') {
		module.exports = EOTranslator;
	} else {
		obj.EOTranslator = EOTranslator;
	}
})((typeof window !== 'undefined') ? window : this);
