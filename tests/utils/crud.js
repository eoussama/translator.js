module.exports = function (EOTranslator) {
  test('Adding a basic translation at run time.', function () {

    // Arrange
    var translator;
    var dict = {}

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.add('en', 'translation', 'Hello, I\'m a translation');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.dictionary).toEqual({ en: { translation: 'Hello, I\'m a translation' } });
  });

  test('Editing a basic translation at run time.', function () {

    // Arrange
    var translator;
    var dict = {
      en: {
        greet: 'Hello there!'
      }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.add('en', 'greet', 'Hi there!');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.dictionary).toEqual({ en: { greet: 'Hi there!' } });
  });

  test('Removing a translation at run time.', function () {

    // Arrange
    var translator;
    var dict = {
      en: {
        greet: 'Hello there!'
      }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.remove('en', 'greet');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.dictionary).toEqual({ en: {} });
  });
};
