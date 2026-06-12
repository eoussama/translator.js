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
};
