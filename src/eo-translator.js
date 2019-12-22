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

		//#region Properties

		/**
		 * @param {{ [x: string]: { [x: string]: any; }; }} dict The new dictionary value
		 */
		set dictionary(dict) {

			// Checking if the dictionary value is an object
			if (typeof dict === 'object' && !Array.isArray(dict)) {

				// If so, assign it the passed value
				this._dictionary = dict;
			}
		}

		/**
		 * Gets the dictionary value
		 */
		get dictionary() {

			// Returning the dictionary value
			return this._dictionary;
		}

		/**
		 * @param {{ [x: string]: { [x: string]: any; }; }} language The new language value
		 */
		set language(language) {

			// Checking if the language value is a string
			if (typeof language === 'string') {

				// If so, assign it the passed value
				this._language = language;
			}
		}

		/**
		 * Gets the language value
		 */
		get language() {

			// Returning the language value
			return this._language;
		}

		//#endregion

		//#region Constructor

		/**
		 * Instantiates a translator object
		 *
		 * @param {object} dict The translation dictionary
		 * @param {string} lang The default language
		 */
		constructor(dict, lang) {
			if (!dict || (typeof dict !== 'object') || Array.isArray(dict))
				throw '[EO TranslatorJS] Invalid dictionary object';

			this.dictionary = dict || {};
			this.language = lang || document.documentElement.lang || 'en';
		}

		//#endregion

		//#region Methods

		/**
		 * Translates an input value
		 *
		 * @param {string} input The input value to translate
		 * @param {object} options The translation options
		 */
		translate(input = '', options = {}) {
			const language = options.lang || this.language;
			const fallback = options.fallback || input;
			const params = options.params || {};
			const frags = input.split('.').filter(frag => frag.length > 0);

			let output = this.dictionary.hasOwnProperty(this.language);

			if (output) {
				if (frags.length > 1) {
					output = extractValue(this.dictionary, language, frags);
				} else {
					output = this.dictionary[language][input];
				}
			}

			return output ? assignParams(output, params) : fallback;
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
				const fallback = (DOMElement.attributes['eo-translator-fallback'] || { value: input }).value;
				const params = JSON.parse((DOMElement.attributes['eo-translator-params'] || { value: "{}" }).value) || {};

				DOMElement.textContent = this.translate(input, { lang: language, fallback, params });
			}
		}


		/**
		 * Translates a DOM document/element
		 *
		 * @param {HTMLElement} DOMContainer The HTML container
		 * @param {string} lang The language to translate to
		 */
		translateDOM(DOMContainer, lang) {
			const language = lang || this.language;
			const container = DOMContainer || document;
			const elements = container.querySelectorAll('[eo-translator]');

			elements.forEach((element) => this.translateElement(element, language));
		}

		/**
		 * Adds a new translation to a given language or updates an existing
		 * one accordingly.
		 *
		 * @param {string} lang The language to add the translation to
		 * @param {string} keys The key of the translation
		 * @param {string} translation The translation to add
		 */
		add(lang, key, translation) {

			// Filtering the fragments
			const frags = key.split('.').filter(frag => frag.length > 0);

			// Getting the raw key
			const rawKey = frags.pop();

			// Checking if the language already exists in the dictionary
			if (!this.dictionary.hasOwnProperty(lang)) {

				// Initiate a value for the language
				this.dictionary[lang] = {};
			}

			// Getting a copy of the dictionary
			let tempDict = this.dictionary[lang];

			// Checking if the passed key can be nested
			if (frags.length > 0) {

				// Looping through the fragments
				for (const [index, frag] of Object.entries(frags)) {

					// Updates the value of the temporary dictionary
					tempDict = tempDict[frag] || (tempDict[frag] = {});

					// Stopping the loop if the temporary dictionary is not valid
					if (!tempDict) break;

					// Checking if the last iteration has been reached
					if (parseInt(index) === frags.length - 1) {

						// Adding/Updating the transition
						tempDict[rawKey] = translation;
					}
				}
			} else {

				// If not, affect the translation directly
				tempDict[key] = translation;
			}
		}

		/**
		 * Removes a translation from a given language
		 *
		 * @param {string} lang The language to remove the translation from
		 * @param {string} keys The key of the translation to remove
		 */
		remove(lang, key) {

			// Filtering the fragments
			const frags = key.split('.').filter(frag => frag.length > 0);

			// Getting the raw key
			const rawKey = frags.pop();

			// Checking if the language already exists in the dictionary
			if (this.dictionary.hasOwnProperty(lang)) {

				// Getting a copy of the dictionary
				let tempDict = this.dictionary[lang];

				// Checking if the passed key can be nested
				if (frags.length > 0) {

					// Looping through the fragments
					for (const [index, frag] of Object.entries(frags)) {

						// Updates the value of the temporary dictionary
						tempDict = tempDict[frag];

						// Stopping the loop if the temporary dictionary is not valid
						if (!tempDict) break;

						// Checking if the last iteration has been reached
						if (parseInt(index) === frags.length - 1) {

							// Removing the transition
							delete tempDict[rawKey];
						}
					}
				} else {

					// If not, delete the translation directly
					delete tempDict[key]
				}
			}
		}

		//#endregion
	}

	/**
	 * Affects a raw string a collection of parameters
	 *
	 * @param {string} raw The raw string to add the parameters to
	 * @param {object} params The parameters object
	 */
	function assignParams(raw, params) {

		// Looping through the parameters
		Object.keys(params).forEach(key => {

			// Creating a replacement pattern
			const pattern = new RegExp(`{${key}}`, 'g');

			// Replacing the parameters accordingly
			raw = raw.replace(pattern, params[key]);
		});

		// Returning a parametated (if you will) output
		return raw;
	};

	/**
	 * Extracts the nested values
	 *
	 * @param {object} dictionary The dictionary object
	 * @param {string} language The language to translate to
	 * @param {array<string>} frags The list of nested keys
	 */
	function extractValue(dictionary, language, frags) {
		let temp = dictionary[language];

		for (const frag of frags) {
			temp = temp[frag] || undefined

			if (!temp) {
				break;
			}
		}

		return temp;
	}

	if (typeof exports !== 'undefined') {
		module.exports = EOTranslator;
	} else {
		obj.EOTranslator = EOTranslator;
	}
})((typeof window !== 'undefined') ? window : this);
