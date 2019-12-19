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
            //#region Constructor

            /**
             * Instantiates a translator object
             *
             * @param {object} dict The translation dictionary
             * @param {string} lang The default language
             */
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
                    var fallbackVal = options.fallback || input;
                    var params = options.params || {};
                    var frags = input.split('.');
                    var output = null;

                    var assignParams = function assignParams(raw) {
                        Object.keys(params).forEach(function(key) {
                            var pattern = new RegExp("{".concat(key, "}"), 'g');
                            raw = raw.replace(pattern, params[key]);
                        });
                        return raw;
                    };

                    if (frags.filter(function(frag) {
                            return frag.length > 0;
                        }).length > 1) {
                        var temp = this.dictionary[language];
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

                        output = temp;
                    } else {
                        output = this.dictionary[language][input];
                    }

                    return output ? assignParams(output) : fallbackVal || input;
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

    if (typeof exports !== 'undefined') {
        module.exports = EOTranslator;
    } else {
        obj.EOTranslator = EOTranslator;
    }
})(typeof window !== 'undefined' ? window : void 0);