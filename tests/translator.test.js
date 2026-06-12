/**
 *
 * @name:       translatorjs
 * @version:    3.1.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/translatorjs
 *
 * A simple javascript library for translating web content.
 */



// Importing the testing dependencies
const jsdom = require("jsdom");
const EOTranslator = require("../dist/translator");
const creation = require("./utils/creation");
const crud = require("./utils/crud");
const dom = require("./utils/dom");
const translations = require("./utils/translations");



describe("creating a translator", () => {
  creation(EOTranslator);
});

describe("CRUD operations on the translator", () => {
  crud(EOTranslator);
});

describe("translations", () => {
  translations(EOTranslator);
});

describe("dOM translations", () => {
  dom(EOTranslator, jsdom.JSDOM);
});
