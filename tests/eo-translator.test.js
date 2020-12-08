/**
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



// Importing the testing dependencies
var jsdom = require('jsdom');
var EOTranslator = require('./../dist/eo-translator');
var creation = require('./utils/creation');
var crud = require('./utils/crud');
var translations = require('./utils/translations');
var dom = require('./utils/dom');



describe('Creating a translator', function () {
  creation(EOTranslator);
});

describe('CRUD operations on the translator', function () {
  crud(EOTranslator);
});

describe('Translations', function () {
  translations(EOTranslator);
});

describe('DOM translations', function () {
  dom(EOTranslator, jsdom.JSDOM);
});
