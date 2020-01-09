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
};
