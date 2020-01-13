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
};
