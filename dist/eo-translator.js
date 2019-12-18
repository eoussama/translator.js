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
                this.language = lang || 'en';
            } //#endregion
            //#region Methods

            /**
             * Translates an input value
             *
             * @param {string} input The input value to translate
             * @param {string} fallback The fallback value to use
             * @param {string} lang The language to translate to
             */


            _createClass(EOTranslator, [{
                key: "translate",
                value: function translate() {
                    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                    var lang = arguments.length > 1 ? arguments[1] : undefined;
                    var fallback = arguments.length > 2 ? arguments[2] : undefined;
                    var language = lang || this.language;
                    var fallbackVal = fallback || input;
                    return this.dictionary[language][input] || fallbackVal || input;
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
                        var fallbackVal = (DOMElement.attributes['eo-translator-fallback'] || {
                            value: input
                        }).value;
                        DOMElement.textContent = this.translate(input, language, fallbackVal);
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