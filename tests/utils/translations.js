module.exports = function (EOTranslator) {
  test('Basic translation.', function () {

    // Arrange
    var translator;
    var translation = '';
    var dict = {
      en: {
        greet: 'Hello!'
      }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
      translation = translator.translate('greet');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual('Hello!');
  });

  test('Nested translation.', function () {

    // Arrange
    var translator;
    var translation = '';
    var dict = {
      en: {
        greet: {
          morning: 'Good morning!',
          evening: 'Good evening!'
        }
      }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
      translation = translator.translate('greet.evening');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual('Good evening!');
  });
};
