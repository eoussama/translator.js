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
             * @param {object} dictionary The translation dictionary
             * @param {string} language The default language
             */
            function EOTranslator() {
                var dictionary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

                _classCallCheck(this, EOTranslator);

                this.dictionary = dictionary;
                this.language = language;
                console.log('EO TranslatorJS', this.dictionary, this.language);
            } //#endregion
            //#region Methods
            // Translates an input


            _createClass(EOTranslator, [{
                key: "translate",
                value: function translate() {
                    console.log('Translating...');
                } // Translates a DOM element

            }, {
                key: "translateElement",
                value: function translateElement() {
                    console.log('Translating the element...');
                } // Translates the DOM

            }, {
                key: "translateDOM",
                value: function translateDOM() {
                    console.log('Translating the DOM...');
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