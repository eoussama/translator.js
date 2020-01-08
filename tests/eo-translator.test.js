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
var creation = require('./utils/creation');
var crud = require('./utils/crud');
var translations = require('./utils/translations');



describe('Creating a translator', function () {
  creation(EOTranslator);
});

describe('CRUD operations on the translator', function () {
  crud(EOTranslator);
});

describe('Translations', function () {
  translations(EOTranslator);
});
