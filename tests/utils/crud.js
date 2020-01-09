module.exports = function (EOTranslator) {
  test('Passing a valid translator.', function () {

    // Arrange
    var translator;
    var dict = { en: {} }

    // Act
    try {
      translator = new EOTranslator(dict, 'fr');
    }
    catch (e) {
      console.error({ error: e });
    }

    console.log(translator.dictionary);
    // Assert
    // expect(translator.dictionary).toEqual(dict);
  });
};
