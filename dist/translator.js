"use strict";

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [],
            _n = !0,
            _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = !1;
            } else
                for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
                    ;
                }
        } catch (err) {
            _d = !0, _e = err;
        } finally {
            try {
                if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
}

function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
/**
 *
 * @param obj
 * @name:       translatorjs
 * @version:    3.1.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/translatorjs
 *
 * A simple javascript library for translating web content.
 */

(function(obj) {
    /**
     * The translator class
     */
    var EOTranslator = /*#__PURE__*/ function() {
        _createClass(EOTranslator, [{
            key: "dictionary",
            // #region Properties
            /**
             * @param {{ [x: string]: { [x: string]: any; }; }} dict The new dictionary value
             * @throws Invalid dictionary object
             */
            set: function set(dict) {
                    if (!dict || _typeof(dict) !== "object" || Array.isArray(dict)) {
                        throw new Error("[TranslatorJS] Invalid dictionary object.");
                    }
                    this._dictionary = dict;
                }
                /**
                 * Gets the dictionary value
                 */
                ,
            get: function get() {
                return this._dictionary;
            }
            /**
             * @param {string} lang The new language value
             * @throws Invalid language key
             */
        }, {
            key: "language",
            set: function set(lang) {
                    // Checking if the language is a valid string
                    if (typeof lang !== "string") {
                        throw new TypeError("[TranslatorJS] Invalid language key, expected \u201Cstring\u201D by recieved \u201C".concat(_typeof(lang), "\u201D."));
                    }

                    // Checking if the language exists in the dictionary
                    if (!this.dictionary.hasOwnProperty(lang) && Object.keys(this.dictionary).length > 0 && lang.length > 0) {
                        throw new Error("[TranslatorJS] Invalid language key, \u201C".concat(_typeof(lang), "\u201D does not exist in the dictionary."));
                    }
                    this._language = lang;
                }
                /**
                 * Gets the language value
                 */
                ,
            get: function get() {
                return this._language;
            }
            /**
             * Gets the available languages
             */
        }, {
            key: "languages",
            get: function get() {
                return this.dictionary ? Object.keys(this.dictionary) : [];
            } // #endregion
            // #region Constructor
            /**
             * Instantiates a translator object
             *
             * @param {object} dict The translation dictionary
             * @param {string} lang The default language
             * @throws Invalid dictionary object
             * @throws Invalid language key
             */
        }]);

        function EOTranslator(dict) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            _classCallCheck(this, EOTranslator);
            // Checking if the dictionary is valid
            if (!dict || _typeof(dict) !== "object" || Array.isArray(dict)) {
                throw new Error("[TranslatorJS] Invalid dictionary object.");
            }

            // Checking if the language is a valid string
            if (typeof lang !== "string") {
                throw new TypeError("[TranslatorJS] Invalid language key, expected \u201Cstring\u201D by recieved \u201C".concat(_typeof(lang), "\u201D."));
            }

            // Checking if the language exists in the dictionary
            if (!dict.hasOwnProperty(lang) && lang.length > 0) {
                throw new Error("[TranslatorJS] Invalid language key, \u201C".concat(lang, "\u201D does not exist in the passed dictionary."));
            }
            this.dictionary = dict || {};
            this.language = lang || ((typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" ? document.documentElement.lang : "en") || "en";
        }

        // #endregion

        // #region Methods

        /**
         * Translates an input value
         *
         * @param {string} input The input value to translate
         * @param {object} options The translation options
         * @returns {string} The respective translation
         */
        _createClass(EOTranslator, [{
            key: "translate",
            value: function translate() {
                var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var language = options.lang || this.language;
                var fallback = options.fallback || input;
                var params = options.params || {};
                var frags = input.split(".").filter(function(frag) {
                    return frag.length > 0;
                });
                if (!this.isValidLanguage(language)) {
                    return fallback;
                } else {
                    var output = this.dictionary.hasOwnProperty(this.language);
                    if (output) {
                        if (frags.length > 1) {
                            output = extractValue(this.dictionary, language, frags);
                        } else {
                            output = this.dictionary[language][input];
                        }
                    }
                    return output ? assignParams(output, params) : fallback;
                }
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
                    var input = DOMElement.attributes["eo-translator"].value || DOMElement.textContent || DOMElement.innerText || DOMElement.innerHTML;
                    var fallback = (DOMElement.attributes["eo-translator-fallback"] || {
                        value: input
                    }).value;
                    var params = JSON.parse((DOMElement.attributes["eo-translator-params"] || {
                        value: "{}"
                    }).value) || {};
                    var html = DOMElement.attributes["eo-translator-html"] && ["true", "false"].includes(DOMElement.attributes["eo-translator-html"].value) ? JSON.parse(DOMElement.attributes["eo-translator-html"].value) === true : false;
                    DOMElement[html ? "innerHTML" : "textContent"] = this.translate(input, {
                        lang: language,
                        fallback: fallback,
                        params: params
                    });
                }
            }
            /**
             * Translates a DOM document/element
             *
             * @param {HTMLElement} DOMContainer The HTML container
             * @param {string} lang The language to translate to
             */
        }, {
            key: "translateDOM",
            value: function translateDOM(DOMContainer, lang) {
                var _this = this;
                var language = lang || this.language;
                var container = DOMContainer || (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" ? document : null;
                if (container) {
                    var elements = container.querySelectorAll("[eo-translator]");
                    elements.forEach(function(element) {
                        return _this.translateElement(element, language);
                    });
                }
            }
            /**
             * Adds a new translation to a given language or updates an existing
             * one accordingly.
             *
             * @param {string} lang The language to add the translation to
             * @param {string} keys The key of the translation
             * @param key
             * @param {string} translation The translation to add
             */
        }, {
            key: "add",
            value: function add(lang, key, translation) {
                // Filtering the fragments
                var frags = key.split(".").filter(function(frag) {
                    return frag.length > 0;
                });

                // Getting the raw key
                var rawKey = frags.pop();

                // Checking if the language already exists in the dictionary
                if (!this.dictionary.hasOwnProperty(lang)) {
                    // Initiate a value for the language
                    this.dictionary[lang] = {};
                }

                // Getting a copy of the dictionary
                var tempDict = this.dictionary[lang];

                // Checking if the passed key can be nested
                if (frags.length > 0) {
                    // Looping through the fragments
                    var _arr = Object.entries(frags);
                    for (var _i = 0; _i < _arr.length; _i++) {
                        var _arr$_i = _slicedToArray(_arr[_i], 2),
                            index = _arr$_i[0],
                            frag = _arr$_i[1];
                        // Updates the value of the temporary dictionary
                        tempDict = tempDict[frag] || (tempDict[frag] = {});

                        // Stopping the loop if the temporary dictionary is not valid
                        if (!tempDict) {
                            break;
                        }

                        // Checking if the last iteration has been reached
                        if (Number.parseInt(index) === frags.length - 1) {
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
             * @param key
             */
        }, {
            key: "remove",
            value: function remove(lang, key) {
                // Filtering the fragments
                var frags = key.split(".").filter(function(frag) {
                    return frag.length > 0;
                });

                // Getting the raw key
                var rawKey = frags.pop();

                // Checking if the language already exists in the dictionary
                if (this.dictionary.hasOwnProperty(lang)) {
                    // Getting a copy of the dictionary
                    var tempDict = this.dictionary[lang];

                    // Checking if the passed key can be nested
                    if (frags.length > 0) {
                        // Looping through the fragments
                        var _arr2 = Object.entries(frags);
                        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
                            var _arr2$_i = _slicedToArray(_arr2[_i2], 2),
                                index = _arr2$_i[0],
                                frag = _arr2$_i[1];
                            // Updates the value of the temporary dictionary
                            tempDict = tempDict[frag];

                            // Stopping the loop if the temporary dictionary is not valid
                            if (!tempDict) {
                                break;
                            }

                            // Checking if the last iteration has been reached
                            if (Number.parseInt(index) === frags.length - 1) {
                                // Removing the transition
                                delete tempDict[rawKey];
                            }
                        }
                    } else {
                        // If not, delete the translation directly
                        delete tempDict[key];
                    }
                }
            }
            /**
             * Checks if an input language is defined in the dictionary
             *
             * @param {string} lang The language to check
             * @returns {boolean} The availability of the corresponding language
             */
        }, {
            key: "isValidLanguage",
            value: function isValidLanguage(lang) {
                return this.dictionary.hasOwnProperty(lang);
            } // #endregion
        }]);
        return EOTranslator;
    }();
    /**
     * Affects a raw string from the collection of parameters
     *
     * @param {string} raw The raw string to add the parameters to
     * @param {object} params The parameters object
     * @returns {string} The parame
     */
    function assignParams(raw, params) {
        // Looping through the parameters
        Object.keys(params).forEach(function(key) {
            // Creating a replacement pattern
            var pattern = new RegExp("{".concat(key, "}"), "g");

            // Replacing the parameters accordingly
            raw = raw.replace(pattern, params[key]);
        });

        // Returning a parametated (if you will) output
        return raw;
    };

    /**
     * @description
     * Extracts the nested values
     *
     * @param {object} dictionary The dictionary object
     * @param {string} language The language to translate to
     * @param {Array<string>} frags The list of nested keys
     * @returns {string | undefined} The extracted value
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
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = EOTranslator;
    } else {
        if (typeof define === "function" && define.amd) {
            define([], function() {
                return EOTranslator;
            });
        } else {
            window.EOTranslator = EOTranslator;
        }
    }
})(typeof window !== "undefined" ? window : void 0);