"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * 
 * @name:       translatorjs
 * @version:    3.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */
(function(obj) {
    /**
     * The translate JS class.
     */
    var EOTranslator =
        /*#__PURE__*/
        function() {
            _createClass(EOTranslator, [{
                key: "local",

                /**
                 * The local language, by default `en` for `english`.
                 */
                get: function get() {
                    return this._local;
                },
                set: function set(local) {
                    this._local = local;
                }
                /**
                 * The dictionary that holds all the translations.
                 */

            }, {
                key: "dictionary",
                get: function get() {
                    return this.dictionary;
                },
                set: function set(dictionary) {
                    this._dictionary = dictionary;
                }
                /**
                 * 
                 * @param {Object} dictionary The dictionary that has all translations.
                 * @param {String} local The local language.
                 */

            }]);

            function EOTranslator() {
                var dictionary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var local = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

                _classCallCheck(this, EOTranslator);

                this._dictionary = dictionary;
                this._local = local;
            }
            /**
             * Translates to a specific language.
             * 
             * @param {String} language The language you want to translate to.
             */


            _createClass(EOTranslator, [{
                key: "translate",
                value: function translate() {
                    var _this = this;

                    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._local;

                    if (language.length === 0) {
                        console.error("[Translate JS]: Make sure to Input a valid language.");
                    } else if (!this.isValidLanguage(language)) {
                        console.error("[Translate JS]: The dictionary has no translations in \u201C".concat(language, "\u201D."));
                    } else {
                        var translatableElements = document.querySelectorAll('.trnsjs');

                        if (this._currentLanguage !== language) {
                            translatableElements.forEach(function(element) {
                                // Checking if any translations exist for the current element.
                                if (typeof _this._dictionary[element.textContent] !== 'undefined') {
                                    // Checking if any translations exist in the passed language.
                                    if (_this._dictionary[element.textContent][language]) {
                                        element.textContent = _this._dictionary[element.textContent][language];
                                    } else {
                                        var translationFound = false;

                                        for (var keyTerm in _this._dictionary) {
                                            for (var keyLang in _this._dictionary[keyTerm]) {
                                                if (_this._dictionary[keyTerm][keyLang] === element.textContent) {
                                                    element.textContent = keyTerm;
                                                    translationFound = true;
                                                }
                                            }
                                        }

                                        if (translationFound === false) {
                                            console.warn("[Translate JS]: No translations in \u201C".concat(language, "\u201D were found for \u201C").concat(element.textContent, "\u201D."));
                                        }
                                    }
                                } else {
                                    console.warn("[Translate JS]: No translations were found for \u201C".concat(element.textContent, "\u201D."));
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

            }, {
                key: "isValidLanguage",
                value: function isValidLanguage(language) {
                    var exists = false;

                    for (var keyTerm in this._dictionary) {
                        for (var keyLang in this._dictionary[keyTerm]) {
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
            }]);

            return EOTranslator;
        }();

    if (typeof exports !== 'undefined') {
        module.exports = EOTranslator;
    } else {
        obj.EOTranslator = EOTranslator;
    }
})(typeof window !== 'undefined' ? window : void 0);