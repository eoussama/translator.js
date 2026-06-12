/**
 *
 * @param EOTranslator
 * @param jsdom
 */
module.exports = function (EOTranslator, jsdom) {
  const DICT = {
    en: { greeting: "Hello!" },
    fr: { greeting: "Bonjour!" },
    es: { greeting: "Hola!" },
    br: { greeting: "Jola!" },
  };

  // ---------------------------------------------------------------------------
  // translateElement
  // ---------------------------------------------------------------------------

  test("Translating a single DOM element.", () => {
    // Arrange
    const dom = new jsdom("<p id=\"target\" eo-translator=\"greeting\"></p>");
    const target = dom.window.document.getElementById("target");
    let translator;

    // Act
    try {
      translator = new EOTranslator(DICT);
      translator.translateElement(target);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(target.textContent).toEqual("Hello!");
  });

  test("Passing an invalid translation key should fallback to the specified value.", () => {
    // Arrange
    const dom = new jsdom("<p id=\"target\" eo-translator=\"invalidKey\" eo-translator-fallback=\"Fallback value\"></p>");
    const target = dom.window.document.getElementById("target");
    let translator;

    // Act
    try {
      translator = new EOTranslator(DICT);
      translator.translateElement(target);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(target.textContent).toEqual("Fallback value");
  });

  test("Embedding values in a translation.", () => {
    // Arrange
    const dom = new jsdom("<p id=\"target\" eo-translator=\"greeting\" eo-translator-params='{\"name\": \"Luffy\"}'></p>");
    const target = dom.window.document.getElementById("target");
    let translator;
    const dict = {
      en: { greeting: "Hello, {name}!" },
      fr: { greeting: "Bonjour {name}!" },
      es: { greeting: "Hola {name}!" },
      br: { greeting: "Jola {name}!" },
    };

    // Act
    try {
      translator = new EOTranslator(dict);
      translator.translateElement(target);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(target.textContent).toEqual("Hello, Luffy!");
  });

  test("Translation to a language that's not the default one.", () => {
    // Arrange
    const dom = new jsdom("<p id=\"target\" eo-translator=\"greeting\"></p>");
    const target = dom.window.document.getElementById("target");
    let translator;

    // Act
    try {
      translator = new EOTranslator(DICT);
      translator.translateElement(target, "fr");
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(target.textContent).toEqual("Bonjour!");
  });

  test("Renders HTML when eo-translator-html is true.", () => {
    // Arrange
    const dom = new jsdom("<p id=\"target\" eo-translator=\"greeting\" eo-translator-html=\"true\"></p>");
    const target = dom.window.document.getElementById("target");
    let translator;
    const dict = { en: { greeting: "Hello <b>World</b>!" } };

    // Act
    try {
      translator = new EOTranslator(dict, "en");
      translator.translateElement(target);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert — innerHTML should contain the tag, not escaped text
    expect(target.innerHTML).toEqual("Hello <b>World</b>!");
    expect(target.querySelector("b")).not.toBeNull();
  });

  test("Does not render HTML when eo-translator-html is false.", () => {
    // Arrange
    const dom = new jsdom("<p id=\"target\" eo-translator=\"greeting\" eo-translator-html=\"false\"></p>");
    const target = dom.window.document.getElementById("target");
    let translator;
    const dict = { en: { greeting: "Hello <b>World</b>!" } };

    // Act
    try {
      translator = new EOTranslator(dict, "en");
      translator.translateElement(target);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert — textContent should contain the raw string, no child elements
    expect(target.textContent).toEqual("Hello <b>World</b>!");
    expect(target.querySelector("b")).toBeNull();
  });

  test("translateElement does nothing when passed null.", () => {
    // Arrange
    let translator;
    let threw = false;

    // Act
    try {
      translator = new EOTranslator(DICT);
      translator.translateElement(null);
    }
    catch {
      threw = true;
    }

    // Assert
    expect(threw).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // translateDOM
  // ---------------------------------------------------------------------------

  test("translateDOM translates all marked elements in a container.", () => {
    // Arrange
    const dom = new jsdom(
      "<div id=\"container\">"
      + "<span eo-translator=\"greeting\" id=\"a\"></span>"
      + "<span eo-translator=\"greeting\" id=\"b\"></span>"
      + "</div>",
    );
    const document = dom.window.document;
    const container = document.getElementById("container");
    let translator;

    // Act
    try {
      translator = new EOTranslator(DICT, "fr");
      translator.translateDOM(container);
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert
    expect(document.getElementById("a").textContent).toEqual("Bonjour!");
    expect(document.getElementById("b").textContent).toEqual("Bonjour!");
  });

  test("translateDOM respects a language override.", () => {
    // Arrange
    const dom = new jsdom("<span id=\"target\" eo-translator=\"greeting\"></span>");
    const document = dom.window.document;
    const container = document.body;
    let translator;

    // Act
    try {
      translator = new EOTranslator(DICT, "en");
      translator.translateDOM(container, "es");
    }
    catch (e) {
      console.error({ error: e });
    }

    // Assert — should use "es" override, not the default "en"
    expect(document.getElementById("target").textContent).toEqual("Hola!");
    expect(translator.language).toEqual("en");
  });
};
