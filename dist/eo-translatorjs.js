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
 * @name:       eo-translatorjs
 * @version:    3.1.2
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/eo-translatorjs
 *
 * A simple javascript library for translating web content.
 *
 */

;
(function() {
    /**
     * @description
     * The translator class — manages a multilingual dictionary and
     * provides methods to translate strings and DOM elements.
     */
    var EOTranslator = /*#__PURE__*/ function() {
        // #endregion

        // #region Constructor

        /**
         * @description
         * Instantiates a translator object.
         *
         * @param {{ [lang: string]: { [key: string]: unknown } }} dict The translation dictionary
         * @param {string} [lang] The default language key. Defaults to the
         *   document's `lang` attribute when running in a browser, or `"en"`.
         *
         * @throws {Error} When the dictionary is not a valid plain object
         * @throws {TypeError} When the language is not a string
         * @throws {Error} When the language key does not exist in the dictionary
         */
        function EOTranslator(dict) {
            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            _classCallCheck(this, EOTranslator);
            if (!dict || _typeof(dict) !== "object" || Array.isArray(dict)) {
                throw new Error("[EOTranslatorJS] Invalid dictionary object.");
            }
            if (typeof lang !== "string") {
                throw new TypeError("[EOTranslatorJS] Invalid language key, expected \"string\" but received \"".concat(_typeof(lang), "\"."));
            }
            if (!Object.prototype.hasOwnProperty.call(dict, lang) && lang.length > 0) {
                throw new Error("[EOTranslatorJS] Invalid language key, \"".concat(lang, "\" does not exist in the passed dictionary."));
            }
            this.dictionary = dict;
            this.language = lang || ((typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" ? document.documentElement.lang : "") || "en";
        }

        // #endregion

        // #region Methods

        /**
         * @description
         * Translates a key against the active (or specified) language.
         *
         * Keys may be dot-separated to access nested translations
         * (e.g. `"section.title"`). When no matching translation is found the
         * fallback value is returned — which defaults to the key itself.
         *
         * @param {string} [input] The translation key (supports dot notation)
         * @param {{ lang?: string, fallback?: string, params?: Record<string, unknown> }} [options] Translation options
         * @param {string} [options.lang] Override the active language for this call
         * @param {string} [options.fallback] Value to return when the key is not found
         * @param {Record<string, unknown>} [options.params] Interpolation parameters (`{placeholder}` syntax)
         * @returns {string} The translated string, or the fallback value
         */
        return _createClass(EOTranslator, [{
            key: "dictionary",
            get:
                /**
                 * @description
                 * Gets the current translation dictionary.
                 *
                 * @returns {{ [lang: string]: { [key: string]: unknown } }} The current dictionary
                 */
                function get() {
                    return this._dictionary;
                }

                /**
                 * @description
                 * Sets the active language.
                 *
                 * The language must be a string that exists as a top-level key in the
                 * dictionary, unless the dictionary is empty or the string itself is empty.
                 *
                 * @param {string} lang The new language value
                 * @throws {TypeError} When the value is not a string
                 * @throws {Error} When the language key does not exist in the dictionary
                 */
                ,
            set:
                // #region Properties

                /**
                 * @description
                 * Sets the translation dictionary.
                 *
                 * The dictionary must be a plain object whose top-level keys are language
                 * codes and whose values are plain objects mapping translation keys to
                 * translated strings (or further nested objects for namespaced keys).
                 *
                 * @param {{ [lang: string]: { [key: string]: unknown } }} dict The new dictionary value
                 * @throws {Error} When the value is not a valid plain object
                 */
                function set(dict) {
                    if (!dict || _typeof(dict) !== "object" || Array.isArray(dict)) {
                        throw new Error("[EOTranslatorJS] Invalid dictionary object.");
                    }
                    this._dictionary = dict;
                }
        }, {
            key: "language",
            get:
                /**
                 * @description
                 * Gets the active language key.
                 *
                 * @returns {string} The current language
                 */
                function get() {
                    return this._language;
                }

                /**
                 * @description
                 * Gets the list of all language keys present in the dictionary.
                 *
                 * @returns {string[]} The list of available language keys
                 */
                ,
            set: function set(lang) {
                if (typeof lang !== "string") {
                    throw new TypeError("[EOTranslatorJS] Invalid language key, expected \"string\" but received \"".concat(_typeof(lang), "\"."));
                }
                if (!Object.prototype.hasOwnProperty.call(this.dictionary, lang) && Object.keys(this.dictionary).length > 0 && lang.length > 0) {
                    throw new Error("[EOTranslatorJS] Invalid language key, \"".concat(lang, "\" does not exist in the dictionary."));
                }
                this._language = lang;
            }
        }, {
            key: "languages",
            get: function get() {
                return this._dictionary ? Object.keys(this._dictionary) : [];
            }
        }, {
            key: "translate",
            value: function translate() {
                var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var language = options.lang || this.language;
                var fallback = options.fallback !== undefined ? options.fallback : input;
                var params = options.params || {};
                var frags = input.split(".").filter(function(frag) {
                    return frag.length > 0;
                });
                if (!this.isValidLanguage(language)) {
                    return fallback;
                }
                var output;
                if (frags.length > 1) {
                    output = extractValue(this.dictionary, language, frags);
                } else {
                    output = Object.prototype.hasOwnProperty.call(this.dictionary[language], input) ? this.dictionary[language][input] : undefined;
                }
                return output != null && output !== false && output !== "" ? assignParams(String(output), params) : fallback;
            }

            /**
             * @description
             * Translates the content of a single DOM element.
             *
             * The element must carry the `eo-translator` attribute whose value is the
             * translation key. Optional companion attributes:
             *
             * | Attribute | Description |
             * |---|---|
             * | `eo-translator` | _(required)_ The translation key |
             * | `eo-translator-fallback` | Fallback text when the key is not found |
             * | `eo-translator-params` | JSON object of interpolation parameters |
             * | `eo-translator-html` | `"true"` to set `innerHTML` instead of `textContent` |
             *
             * @param {Element} DOMElement The DOM element to translate
             * @param {string} [lang] Language override for this call
             */
        }, {
            key: "translateElement",
            value: function translateElement(DOMElement, lang) {
                if (!DOMElement) {
                    return;
                }
                var keyAttr = DOMElement.attributes["eo-translator"];
                if (!keyAttr) {
                    return;
                }
                var language = lang || this.language;
                var input = keyAttr.value || DOMElement.textContent || DOMElement.innerHTML || "";
                var fallbackAttr = DOMElement.attributes["eo-translator-fallback"];
                var fallback = fallbackAttr ? fallbackAttr.value : input;
                var paramsAttr = DOMElement.attributes["eo-translator-params"];
                var params = {};
                if (paramsAttr) {
                    try {
                        params = JSON.parse(paramsAttr.value) || {};
                    } catch (_unused) {
                        params = {};
                    }
                }
                var htmlAttr = DOMElement.attributes["eo-translator-html"];
                var useHTML = htmlAttr && htmlAttr.value === "true";
                DOMElement[useHTML ? "innerHTML" : "textContent"] = this.translate(input, {
                    lang: language,
                    fallback: fallback,
                    params: params
                });
            }

            /**
             * @description
             * Translates all `[eo-translator]` elements inside a container.
             *
             * When no container is provided, the entire `document` is used (browser only).
             *
             * @param {Element|Document} [DOMContainer] The root container to search within
             * @param {string} [lang] Language override for this call
             */
        }, {
            key: "translateDOM",
            value: function translateDOM(DOMContainer, lang) {
                var _this = this;
                var language = lang || this.language;
                var container = DOMContainer !== null && DOMContainer !== void 0 ? DOMContainer : (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" ? document : null;
                if (!container) {
                    return;
                }
                var elements = container.querySelectorAll("[eo-translator]");
                elements.forEach(function(element) {
                    return _this.translateElement(element, language);
                });
            }

            /**
             * @description
             * Adds or updates a translation entry in the dictionary.
             *
             * Supports dot-separated keys for nested entries
             * (e.g. `"section.title"` will create `{ section: { title: value } }`).
             * If the language does not yet exist in the dictionary it is created.
             *
             * @param {string} lang The language key to add the translation to
             * @param {string} key The translation key (supports dot notation)
             * @param {string} translation The translated string
             */
        }, {
            key: "add",
            value: function add(lang, key, translation) {
                var frags = key.split(".").filter(function(frag) {
                    return frag.length > 0;
                });
                if (frags.length === 0) {
                    return;
                }
                if (!Object.prototype.hasOwnProperty.call(this.dictionary, lang)) {
                    this.dictionary[lang] = {};
                }
                var node = this.dictionary[lang];
                for (var i = 0; i < frags.length - 1; i++) {
                    var frag = frags[i];
                    if (!node[frag] || _typeof(node[frag]) !== "object") {
                        node[frag] = {};
                    }
                    node = node[frag];
                }
                node[frags[frags.length - 1]] = translation;
            }

            /**
             * @description
             * Removes a translation entry from the dictionary.
             *
             * Supports dot-separated keys for nested entries. Does nothing if the
             * language or key does not exist.
             *
             * @param {string} lang The language key to remove the translation from
             * @param {string} key The translation key to remove (supports dot notation)
             */
        }, {
            key: "remove",
            value: function remove(lang, key) {
                if (!Object.prototype.hasOwnProperty.call(this.dictionary, lang)) {
                    return;
                }
                var frags = key.split(".").filter(function(frag) {
                    return frag.length > 0;
                });
                if (frags.length === 0) {
                    return;
                }
                var node = this.dictionary[lang];
                for (var i = 0; i < frags.length - 1; i++) {
                    node = node[frags[i]];
                    if (!node || _typeof(node) !== "object") {
                        return;
                    }
                }
                delete node[frags[frags.length - 1]];
            }

            /**
             * @description
             * Checks whether a language key is present in the dictionary.
             *
             * @param {string} lang The language key to check
             * @returns {boolean} `true` when the language exists in the dictionary
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
     * @description
     * Replaces `{placeholder}` tokens in a string with values from a
     * parameters object. Placeholder names are escaped before being used in a
     * RegExp to avoid injection from special characters in key names.
     *
     * @param {string} raw The template string containing `{placeholder}` tokens
     * @param {Record<string, unknown>} params The interpolation values
     * @returns {string} The string with all matching tokens replaced
     */
    function assignParams(raw, params) {
        return Object.keys(params).reduce(function(result, key) {
            var escapedKey = key.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
            var pattern = new RegExp("\\{".concat(escapedKey, "\\}"), "g");
            return result.replace(pattern, String(params[key]));
        }, raw);
    }

    /**
     * @description
     * Walks a nested dictionary object following a list of key
     * fragments, returning the value at the end of the path.
     *
     * Unlike a truthiness check, this uses an explicit `null`/`undefined` guard
     * so that falsy-but-valid values (`0`, `false`, `""`) are preserved.
     *
     * @param {{ [lang: string]: unknown }} dictionary The full dictionary object
     * @param {string} language The language key to look up
     * @param {string[]} frags The ordered list of nested key fragments
     * @returns {unknown} The value at the resolved path, or `undefined`
     */
    function extractValue(dictionary, language, frags) {
        var node = dictionary[language];
        var _iterator = _createForOfIteratorHelper(frags),
            _step;
        try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var frag = _step.value;
                if (node == null || _typeof(node) !== "object") {
                    return undefined;
                }
                node = node[frag];
            }
        } catch (err) {
            _iterator.e(err);
        } finally {
            _iterator.f();
        }
        return node;
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