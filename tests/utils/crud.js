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

  test('Adding a nested translation at run time.', function () {

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
      translator.add('en', 'nested.a.b.c', '...');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.dictionary).toEqual({ en: { greet: 'Hello there!', nested: { a: { b: { c: '...' } } } } });
  });

  test('Adding a nested translation to an nestable object at run time.', function () {

    // Arrange
    var translator;
    var dict = {
      en: {
        greet: 'Hello there!',
        nested: {
          a: '...'
        }
      }
    };

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.add('en', 'nested.b', '..');
      translator.add('en', 'nested.c.d', '.');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.dictionary).toEqual({ en: { greet: 'Hello there!', nested: { a: '...', b: '..', c: { d: '.' } } } });
  });

  test('Updating nested translations at run time.', function () {

    // Arrange
    var translator;
    var dict = {
      en: {
        greet: 'Hello there!',
        nested: {
          a: {
            b: {
              c: '...'
            }
          }
        }
      }
    };

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.add('en', 'nested.a.b.c', '.');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.dictionary).toEqual({ en: { greet: 'Hello there!', nested: { a: { b: { c: '.' } } } } });
  });

  test('Removing a nested translation at run time.', function () {

    // Arrange
    var translator;
    var dict = {
      en: {
        greet: 'Hello there!',
        nested: {
          a: '...',
          b: '..',
          c: '.'
        }
      }
    };

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.remove('en', 'nested.ab');
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translator.dictionary).toEqual({ en: { greet: 'Hello there!', nested: { a: '...', b: '..', c: '.' } } });
  });
};
