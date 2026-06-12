"use strict";

function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
            t && (r = t);
            var _n = 0,
                F = function F() {};
            return {
                s: F,
                n: function n() {
                    return _n >= r.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: r[_n++]
                    };
                },
                e: function e(r) {
                    throw r;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a = !0,
        u = !1;
    return {
        s: function s() {
            t = t.call(r);
        },
        n: function n() {
            var r = t.next();
            return a = r.done, r;
        },
        e: function e(r) {
            u = !0, o = r;
        },
        f: function f() {
            try {
                a || null == t["return"] || t["return"]();
            } finally {
                if (u) throw o;
            }
        }
    };
}

function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}

function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
}

function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [],
            f = !0,
            o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else
                for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally {
            try {
                if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
            } finally {
                if (o) throw n;
            }
        }
        return a;
    }
}

function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}

function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}

function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}

function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}

function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}

function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
/*!
 *
 * @name:       translatorjs
 * @version:    3.1.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/translatorjs
 *
 * A simple javascript library for translating web content.
 *
 */

;
(function() {
    /**
     * @description The translator class
     */
    var EOTranslator = /*#__PURE__*/ function() {
        // #endregion

        // #region Constructor

        /**
         * @description Instantiates a translator object.
         *
         * @param {object} dict The translation dictionary
         * @param {string} lang The default language
         * @throws Invalid dictionary object
         * @throws Invalid language key
         */
        function EOTranslator(dict) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            _classCallCheck(this, EOTranslator);
            // Checking if the dictionary is valid
            if (!dict || _typeof(dict) !== "object" || Array.isArray(dict)) {
                throw new Error("[TranslatorJS] Invalid dictionary object.");
            }

            // Checking if the language is a valid string
            if (typeof lang !== "string") {
                throw new TypeError("[TranslatorJS] Invalid language key, expected \"string\" by recieved \"".concat(_typeof(lang), "\"."));
            }

            // Checking if the language exists in the dictionary
            if (!Object.prototype.hasOwnProperty.call(dict, lang) && lang.length > 0) {
                throw new Error("[TranslatorJS] Invalid language key, \"".concat(lang, "\" does not exist in the passed dictionary."));
            }
            this.dictionary = dict || {};
            this.language = lang || ((typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" ? document.documentElement.lang : "en") || "en";
        }

        // #endregion

        // #region Methods

        /**
         * @description Translates an input value.
         *
         * @param {string} input The input value to translate
         * @param {object} options The translation options
         * @returns {string} The respective translation
         */
        return _createClass(EOTranslator, [{
            key: "dictionary",
            get:
                /**
                 * @description Gets the dictionary value.
                 * @returns {{ [x: string]: { [x: string]: unknown } }} The current dictionary
                 */
                function get() {
                    return this._dictionary;
                }

                /**
                 * @description Sets the active language.
                 * @param {string} lang The new language value
                 * @throws Invalid language key
                 */
                ,
            set:
                // #region Properties

                /**
                 * @description Sets the translation dictionary.
                 * @param {{ [x: string]: { [x: string]: unknown } }} dict The new dictionary value
                 * @throws Invalid dictionary object
                 */
                function set(dict) {
                    if (!dict || _typeof(dict) !== "object" || Array.isArray(dict)) {
                        throw new Error("[TranslatorJS] Invalid dictionary object.");
                    }
                    this._dictionary = dict;
                }
        }, {
            key: "language",
            get:
                /**
                 * @description Gets the language value.
                 * @returns {string} The current language
                 */
                function get() {
                    return this._language;
                }

                /**
                 * @description Gets the available languages.
                 * @returns {string[]} The list of available languages
                 */
                ,
            set: function set(lang) {
                // Checking if the language is a valid string
                if (typeof lang !== "string") {
                    throw new TypeError("[TranslatorJS] Invalid language key, expected \"string\" by recieved \"".concat(_typeof(lang), "\"."));
                }

                // Checking if the language exists in the dictionary
                if (!Object.prototype.hasOwnProperty.call(this.dictionary, lang) && Object.keys(this.dictionary).length > 0 && lang.length > 0) {
                    throw new Error("[TranslatorJS] Invalid language key, \"".concat(_typeof(lang), "\" does not exist in the dictionary."));
                }
                this._language = lang;
            }
        }, {
            key: "languages",
            get: function get() {
                return this.dictionary ? Object.keys(this.dictionary) : [];
            }
        }, {
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
                    var output = Object.prototype.hasOwnProperty.call(this.dictionary, this.language);
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
             * @description Translates the contents of a DOM element.
             *
             * @param {HTMLElement} DOMElement The DOM element to translate the content of
             * @param {string} lang The language to translate to
             */
        }, {
            key: "translateElement",
            value: function translateElement(DOMElement, lang) {
                if (DOMElement) {
                    var language = lang || this.language;
                    var input = DOMElement.attributes["eo-translator"].value || DOMElement.textContent || DOMElement.innerHTML;
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
             * @description Translates a DOM document/element.
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
             * @description Adds a new translation to a given language or updates an existing one accordingly.
             *
             * @param {string} lang The language to add the translation to
             * @param {string} key The key of the translation
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
                if (!Object.prototype.hasOwnProperty.call(this.dictionary, lang)) {
                    // Initiate a value for the language
                    this.dictionary[lang] = {};
                }

                // Getting a copy of the dictionary
                var tempDict = this.dictionary[lang];

                // Checking if the passed key can be nested
                if (frags.length > 0) {
                    // Looping through the fragments
                    for (var _i = 0, _Object$entries = Object.entries(frags); _i < _Object$entries.length; _i++) {
                        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                            index = _Object$entries$_i[0],
                            frag = _Object$entries$_i[1];
                        // Ensure the nested object exists
                        if (!tempDict[frag]) {
                            tempDict[frag] = {};
                        }

                        // Updates the value of the temporary dictionary
                        tempDict = tempDict[frag];

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
             * @description Removes a translation from a given language.
             *
             * @param {string} lang The language to remove the translation from
             * @param {string} key The key of the translation to remove
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
                if (Object.prototype.hasOwnProperty.call(this.dictionary, lang)) {
                    // Getting a copy of the dictionary
                    var tempDict = this.dictionary[lang];

                    // Checking if the passed key can be nested
                    if (frags.length > 0) {
                        // Looping through the fragments
                        for (var _i2 = 0, _Object$entries2 = Object.entries(frags); _i2 < _Object$entries2.length; _i2++) {
                            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                                index = _Object$entries2$_i[0],
                                frag = _Object$entries2$_i[1];
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
             * @description Checks if an input language is defined in the dictionary.
             *
             * @param {string} lang The language to check
             * @returns {boolean} The availability of the corresponding language
             */
        }, {
            key: "isValidLanguage",
            value: function isValidLanguage(lang) {
                return Object.prototype.hasOwnProperty.call(this.dictionary, lang);
            }

            // #endregion
        }]);
    }();
    /**
     * @description Affects a raw string from the collection of parameters.
     *
     * @param {string} raw The raw string to add the parameters to
     * @param {object} params The parameters object
     * @returns {string} The parameterised output
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
    }

    /**
     * @description Extracts the nested values.
     *
     * @param {object} dictionary The dictionary object
     * @param {string} language The language to translate to
     * @param {Array<string>} frags The list of nested keys
     * @returns {string | undefined} The extracted value
     */
    function extractValue(dictionary, language, frags) {
        var temp = dictionary[language];
        var _iterator = _createForOfIteratorHelper(frags),
            _step;
        try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var frag = _step.value;
                temp = temp[frag] || undefined;
                if (!temp) {
                    break;
                }
            }
        } catch (err) {
            _iterator.e(err);
        } finally {
            _iterator.f();
        }
        return temp;
    }

    /* global define */
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
})();