module.exports = function (EOTranslator, jsdom) {
  test('Translating a single DOM element.', function () {

    // Arrange
    var dom = new jsdom('<p id="target" eo-translator="greeting"></p>');
    var target = dom.window.document.getElementById('target');
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
      translator.translateElement(target);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(target.textContent).toEqual('Hello!');
  });

  test('Passing an invalid translation key should fallback to the specified value.', function () {

    // Arrange
    var dom = new jsdom('<p id="target" eo-translator="invalidKey" eo-translator-fallback="Fallback value"></p>');
    var target = dom.window.document.getElementById('target');
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
      translator.translateElement(target);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(target.textContent).toEqual('Fallback value');
  });

  test('Embedding values in a translation.', function () {

    // Arrange
    var dom = new jsdom('<p id="target" eo-translator="greeting" eo-translator-params=\'{"name": "Luffy"}\'></p>');
    var target = dom.window.document.getElementById('target');
    var translator;
    var dict = {
      en: { greeting: 'Hello, {name}!' },
      fr: { greeting: 'Bonjour {name}!' },
      es: { greeting: 'Hola {name}!' },
      br: { greeting: 'Jola {name}!' }
    }

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.translateElement(target);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(target.textContent).toEqual('Hello, Luffy!');
  });

  test('Translation to a language that\'s not the default one.', function () {

    // Arrange
    var dom = new jsdom('<p id="target" eo-translator="greeting"></p>');
    var target = dom.window.document.getElementById('target');
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
      translator.translateElement(target, 'fr');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(target.textContent).toEqual('Bonjour!');
  });
};
