/**
 * 
 * @name:       eo-translatorjs
 * @version:    3.0.1
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/eo-translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */



// Importing EO TranslatorJS
var EOTranslator = require('./../dist/eo-translator');
var creation = require('./creation');



describe('Creating a translator', function () {
  creation(EOTranslator);
});
