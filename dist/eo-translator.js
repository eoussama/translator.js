"use strict";

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

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
 * @name:       eo-translatorjs
 * @version:    3.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/eo-translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */
(function(obj) {
    /**
     * The translator class
     */
    var EOTranslator =
        /*#__PURE__*/
        function() {
            _createClass(EOTranslator, [{
                key: "dictionary",
                //#region Properties

                /**
                 * @param {{ [x: string]: { [x: string]: any; }; }} dict The new dictionary value
                 */
                set: function set(dict) {
                        // Checking if the dictionary value is an object
                        if (_typeof(dict) === 'object' && !Array.isArray(dict)) {
                            // If so, assign it the passed value
                            this._dictionary = dict;
                        }
                    }
                    /**
                     * Gets the dictionary value
                     */
                    ,
                get: function get() {
                    // Returning the dictionary value
                    return this._dictionary;
                }
                /**
                 * @param {{ [x: string]: { [x: string]: any; }; }} language The new language value
                 */

            }, {
                key: "language",
                set: function set(language) {
                        // Checking if the language value is a string
                        if (typeof language === 'string') {
                            // If so, assign it the passed value
                            this._language = language;
                        }
                    }
                    /**
                     * Gets the language value
                     */
                    ,
                get: function get() {
                    // Returning the language value
                    return this._language;
                } //#endregion
                //#region Constructor

                /**
                 * Instantiates a translator object
                 *
                 * @param {object} dict The translation dictionary
                 * @param {string} lang The default language
                 */

            }]);

            function EOTranslator(dict, lang) {
                _classCallCheck(this, EOTranslator);

                this.dictionary = dict || {};
                this.language = lang || document.documentElement.lang || 'en';
            } //#endregion
            //#region Methods

            /**
             * Translates an input value
             *
             * @param {string} input The input value to translate
             * @param {object} options The translation options
             */


            _createClass(EOTranslator, [{
                key: "translate",
                value: function translate() {
                    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                    var language = options.lang || this.language;
                    var fallback = options.fallback || input;
                    var params = options.params || {};
                    var frags = input.split('.');
                    var output = this.dictionary.hasOwnProperty(this.language);

                    if (output) {
                        if (frags.filter(function(frag) {
                                return frag.length > 0;
                            }).length > 1) {
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

            }, {
                key: "translateElement",
                value: function translateElement(DOMElement, lang) {
                    if (DOMElement) {
                        var language = lang || this.language;
                        var input = DOMElement.attributes['eo-translator'].value || DOMElement.textContent || DOMElement.innerText || DOMElement.innerHTML;
                        var fallback = (DOMElement.attributes['eo-translator-fallback'] || {
                            value: input
                        }).value;
                        var params = JSON.parse((DOMElement.attributes['eo-translator-params'] || {
                            value: "{}"
                        }).value) || {};
                        DOMElement.textContent = this.translate(input, {
                            lang: language,
                            fallback: fallback,
                            params: params
                        });
                    }
                } // Translates the DOM

            }, {
                key: "translateDOM",
                value: function translateDOM(DOMContainer, lang) {
                    var _this = this;

                    var language = lang || this.language;
                    var container = DOMContainer || document;
                    var elements = container.querySelectorAll('[eo-translator]');
                    elements.forEach(function(element) {
                        return _this.translateElement(element, language);
                    });
                } //#endregion

            }]);

            return EOTranslator;
        }();
    /**
     * Affects a raw string a collection of parameters
     *
     * @param {string} raw The raw string to add the parameters to
     * @param {object} params The parameters object
     */


    function assignParams(raw, params) {
        // Looping through the parameters
        Object.keys(params).forEach(function(key) {
            // Creating a replacement pattern
            var pattern = new RegExp("{".concat(key, "}"), 'g'); // Replacing the parameters accordingly

            raw = raw.replace(pattern, params[key]);
        }); // Returning a parametated (if you will) output

        return raw;
    }

    ;
    /**
     * Extracts the nested values
     *
     * @param {object} dictionary The dictionary object
     * @param {string} language The language to translate to
     * @param {array<string>} frags The list of nested keys
     */

    function extractValue(dictionary, language, frags) {
        var temp = dictionary[language];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = frags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var frag = _step.value;
                temp = temp[frag] || undefined;

                if (!temp) {
                    break;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return temp;
    }

    if (typeof exports !== 'undefined') {
        module.exports = EOTranslator;
    } else {
        obj.EOTranslator = EOTranslator;
    }
})(typeof window !== 'undefined' ? window : void 0);