/**
 * 
 * @name:       translatorjs
 * @version:    2.0.1
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */

(function (obj) {

    /**
     * The translate JS class.
     */
    class Translator {

        /**
         * The local language, by default `en` for `english`.
         */
        get local() {
            return this._local;
        }

        set local(local) {
            this._local = local;
        }

        /**
         * The dictionary that holds all the translations.
         */
        get dictionary() {
            return this.dictionary;
        }

        set dictionary(dictionary) {
            this._dictionary = dictionary;
        }

        /**
         * 
         * @param {Object} dictionary The dictionary that has all translations.
         * @param {String} local The local language.
         */
        constructor(dictionary = {}, local = 'en') {
            this._dictionary = dictionary;
            this._local = local;
        }

        /**
         * Translates to a specific language.
         * 
         * @param {String} language The language you want to translate to.
         */
        translate(language = this._local) {
            if (language.length === 0) {
                console.error("[Translate JS]: Make sure to Input a valid language.");
            }
            else if (!this.isValidLanguage(language)) {
                console.error(`[Translate JS]: The dictionary has no translations in “${language}”.`);
            } else {
                const translatableElements = document.querySelectorAll('.trnsjs');

                if (this._currentLanguage !== language) {
                    translatableElements.forEach(element => {

                        // Checking if any translations exist for the current element.
                        if (typeof this._dictionary[element.textContent] !== 'undefined') {
                            
                            // Checking if any translations exist in the passed language.
                            if (this._dictionary[element.textContent][language]) {
                                element.textContent = this._dictionary[element.textContent][language];
                            } else {
                                let translationFound = false;

                                for (const keyTerm in this._dictionary) {
                                    for (const keyLang in this._dictionary[keyTerm]) {
                                        if (this._dictionary[keyTerm][keyLang] === element.textContent) {
                                            element.textContent = keyTerm;
                                            translationFound = true;
                                        }
                                    }
                                }
                                
                                if (translationFound === false) {
                                    console.warn(`[Translate JS]: No translations in “${language}” were found for “${element.textContent}”.`);
                                }
                            }
                        } else {
                            console.warn(`[Translate JS]: No translations were found for “${element.textContent}”.`);
                        }
                    });

                    this._currentLanguage = language;
                }
            }
        }

        /**
         * Checks if a language exists in the dictionary.
         * 
         * @param {String} language The language to check.
         */
        isValidLanguage(language) {
            let exists = false;

            for (const keyTerm in this._dictionary) {
                for (const keyLang in this._dictionary[keyTerm]) {
                    if (language === keyLang) {
                        exists = true;

                        break;
                    }
                }

                if (exists === true) {
                    break;
                }
            }

            return language === this._local || exists;
        }
    }

    if (typeof exports !== 'undefined') {
        module.exports = Translator;
    } else {
        obj.Translator = Translator;
    }
})((typeof window !== 'undefined') ? window : this);
