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



describe('Creating a translator', function () {

  test('Passing a valid dictionary.', function () {

    // Arrange
    let translator;
    const dict = {
      en: { greeting: 'Hello!' },
      fr: { greeting: 'Bonjour!' },
      es: { greeting: 'Hola!' },
      br: { greeting: 'Jola!' }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.dictionary).toEqual(dict);
  });

  test('English “en” should be the default language if none was specified.', function () {

    // Arrange
    let translator;
    const dict = {
      en: { greeting: 'Hello!' },
      fr: { greeting: 'Bonjour!' },
      es: { greeting: 'Hola!' },
      br: { greeting: 'Jola!' }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.language).toEqual('en');
  });
});
