module.exports = function (EOTranslator) {
  test('Passing a valid translator.', function () {

    // Arrange
    var translator;
    var dict = {
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

  test('Passing a valid translator with French as a default language.', function () {

    // Arrange
    var translator;
    var dict = {
      en: { greeting: 'Hello!' },
      fr: { greeting: 'Bonjour!' },
      es: { greeting: 'Hola!' },
      br: { greeting: 'Jola!' }
    }

    // Act
    try {
      translator = new EOTranslator(dict, 'fr');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.language).toEqual('fr');
  });

  test('English “en” should be the default language if none was specified.', function () {

    // Arrange
    var translator;
    var dict = {
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

  test('Creating a translator and changing its default language at run time.', function () {

    // Arrange
    var translator;
    var dict = {
      en: { greeting: 'Hello!' },
      fr: { greeting: 'Bonjour!' },
      es: { greeting: 'Hola!' },
      br: { greeting: 'Jola!' }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.language = 'br';
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.language).toEqual('br');
  });

  test('Passing an invalid string as a default language on translator creation should throw an error.', function () {

    // Arrange
    var errorThrown = false;
    var dict = {
      en: { greeting: 'Hello!' },
      fr: { greeting: 'Bonjour!' },
      es: { greeting: 'Hola!' },
      br: { greeting: 'Jola!' }
    }

    // Act
    try {
      new EOTranslator(dict, 'ar');
    }
    catch (e) {
      errorThrown = true;
      console.info(e.message);
    }

    // Assert
    expect(errorThrown).toBe(true);
  });

  test('Passing an invalid string as a default language at run time should throw an error.', function () {

    // Arrange
    var translator;
    var errorThrown = false;
    var dict = {
      en: { greeting: 'Hello!' },
      fr: { greeting: 'Bonjour!' },
      es: { greeting: 'Hola!' },
      br: { greeting: 'Jola!' }
    }

    // Act
    try {
      translator = new EOTranslator(dict, 'es');
      translator.language = 'ar';
    }
    catch (e) {
      errorThrown = true;
      console.info(e.message);
    }

    // Assert
    expect(errorThrown).toBe(true);
  });

  test('Passing an invalid object as a dictionary on creation should throw an error.', function () {

    // Arrange
    var errorThrown = false;
    var dict = true;

    // Act
    try {
      new EOTranslator(dict);
    }
    catch (e) {
      errorThrown = true;
      console.info(e.message);
    }

    // Assert
    expect(errorThrown).toBe(true);
  });

  test('Passing an invalid object as a dictionary at run time should throw an error.', function () {

    // Arrange
    var translator;
    var errorThrown = false;
    var dict = {
      en: { greeting: 'Hello!' },
      fr: { greeting: 'Bonjour!' },
      es: { greeting: 'Hola!' },
      br: { greeting: 'Jola!' }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.dictionary = [];
    }
    catch (e) {
      errorThrown = true;
      console.info(e.message);
    }

    // Assert
    expect(errorThrown).toBe(true);
  });
};
