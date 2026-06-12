/**
 *
 * @param EOTranslator
 */
module.exports = function (EOTranslator) {
  test("Basic translation.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = {
      en: {
        greet: "Hello!",
      },
    };

    // Act
    try {
      translator = new EOTranslator(dict);
      translation = translator.translate("greet");
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual("Hello!");
  });

  test("Nested translation.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = {
      en: {
        greet: {
          morning: "Good morning!",
          evening: "Good evening!",
        },
      },
    };

    // Act
    try {
      translator = new EOTranslator(dict);
      translation = translator.translate("greet.evening");
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual("Good evening!");
  });

  test("Embedded values in translation.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = {
      en: {
        greet: "Hello {name}!",
      },
    };

    // Act
    try {
      translator = new EOTranslator(dict);
      translation = translator.translate("greet", { params: { name: "Luffy" } });
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual("Hello Luffy!");
  });

  test("Translation with an explicit language override.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = {
      en: { greet: "Hello!" },
      fr: { greet: "Bonjour!" },
    };

    // Act
    try {
      translator = new EOTranslator(dict, "en");
      translation = translator.translate("greet", { lang: "fr" });
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert — default language is still "en" but we overrode it for this call
    expect(translation).toEqual("Bonjour!");
    expect(translator.language).toEqual("en");
  });

  test("Returns the key itself as fallback when no match is found.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = { en: { greet: "Hello!" } };

    // Act
    try {
      translator = new EOTranslator(dict, "en");
      translation = translator.translate("missing.key");
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual("missing.key");
  });

  test("Returns the specified fallback when the key is not found.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = { en: { greet: "Hello!" } };

    // Act
    try {
      translator = new EOTranslator(dict, "en");
      translation = translator.translate("missing.key", { fallback: "Fallback value" });
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual("Fallback value");
  });

  test("Returns the fallback when the requested language does not exist.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = { en: { greet: "Hello!" } };

    // Act
    try {
      translator = new EOTranslator(dict, "en");
      translation = translator.translate("greet", { lang: "ar", fallback: "N/A" });
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual("N/A");
  });

  test("Multiple embedded parameters are all replaced.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = { en: { msg: "Hello {first} {last}!" } };

    // Act
    try {
      translator = new EOTranslator(dict, "en");
      translation = translator.translate("msg", { params: { first: "Monkey", last: "D. Luffy" } });
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual("Hello Monkey D. Luffy!");
  });

  test("Deeply nested translation key resolves correctly.", () => {
    // Arrange
    let translator;
    let translation = "";
    const dict = { en: { a: { b: { c: { d: "Deep!" } } } } };

    // Act
    try {
      translator = new EOTranslator(dict, "en");
      translation = translator.translate("a.b.c.d");
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(translation).toEqual("Deep!");
  });
};
